/**
 *
 * Stake
 *
 */
import { Currency, CurrencyUnit } from "app/components/Currency";
import { Icon } from "app/components/Icon";
import useNotification from "app/hooks/useNotification";
import { BigNumberish } from "ethers";
import { Stake } from "graphql/models";
import React, { memo, useEffect, useState } from "react";
import { useStakingPool } from "services/contracts";
import { useTotemToken } from "services/token";
import "styles/scss/user-data.scss";
import { calculateRange, isMatured, isLocked } from "utils/pool";
import { convertDate } from "../../helpers";
interface Props {
  stake: Stake;
  setStakingPool: (stakingPool) => void;
  onRefetchStakes: () => void;
  stakeIndex: BigNumberish;
  showClaim: boolean;
  stakesCount: number;
  len: number;
}

export const StakeRow = memo(
  ({
    stake,
    setStakingPool,
    onRefetchStakes,
    stakeIndex,
    showClaim,
    stakesCount,
    len,
  }: Props) => {
    const { toTOTM, toBTC } = useTotemToken();
    const [reward, setReward] = useState([0, 0]);
    const [totalReward, setTotalReward] = useState([0, 0]);
    const [isClaimed, setIsClaimed] = useState(false);
    const [userRankInPool, setUserRankInPool] = useState(-1);
    const [finalPrice, setFinalPrice] = useState(-1);
    const notification = useNotification();

    // Todo: Get this from pool infoz
    const totem = stake?.pool?.poolType ? stake?.pool?.poolType : "fox";
    const stakingPool = useStakingPool(stake.pool.id);

    useEffect(() => {
      if (!!stakingPool) {
        stakingPool
          .maturingPrice()
          .then((value) => {
            setFinalPrice(toBTC(value));
          })
          .catch((error) => {});
        stakingPool
          .getIndexedReward(stakeIndex)
          .then((_reward) => {
            if (_reward && _reward.length === 2) {
              setReward([toTOTM(_reward[0]), toTOTM(_reward[1])]);
            }
          })
          .catch((error) => {
            //
          });

        stakingPool
          .getIndexedReward(stakeIndex)
          .then((_totalReward) => {
            if (_totalReward && _totalReward.length === 2) {
              setTotalReward([
                toTOTM(_totalReward[0]),
                toTOTM(_totalReward[1]),
              ]);
            }
          })
          .catch((error) => {
            //
          });

        stakingPool
          .hasUnStaked(stake.user.id, stakeIndex)
          .then((hasUnStaked) => {
            setIsClaimed(hasUnStaked);
          })
          .catch((error) => {});
      }
      stakingPool
        ?.predictions(stake.user.id, stakeIndex)
        .then((predictions) => {
          const { rank } = predictions;

          setUserRankInPool(Number(rank));
        })
        .catch((error) => {});
    }, [stakingPool]);

    const finished = isMatured(stake?.pool); // true means matured

    let leftTime = "Matured";
    if (!finished) {
      leftTime = convertDate(
        new Date(
          (parseInt(stake.pool.startDate.toString()) +
            parseInt(stake.pool?.lockTime.toString()) +
            parseInt(stake.pool.maturityTime.toString())) *
            1000
        )
      );
    }

    const composeClaimState = () => {
      const { totalStaked, sizeAllocation } = stake.pool;
      const lockStatus = isLocked(stake.pool);
      const maturityStatus = isMatured(stake.pool);

      const lockBySize =
        0.95 * toTOTM(sizeAllocation) - toTOTM(totalStaked) <= 0;

      let poolCondition = "";
      if (maturityStatus) {
        poolCondition = "Matured";
      } else if (lockStatus || lockBySize) {
        poolCondition = "Active";
      } else {
        poolCondition = "Open";
      }

      if (poolCondition === "Matured") {
        if (finished && totalReward[0] > 0 && !isClaimed) {
          poolCondition = "Claim";
        } else {
          poolCondition = "Claimed";
        }
      }

      return poolCondition;
    };

    const poolCondition = composeClaimState();

    const payout = async () => {
      stakingPool
        .claimReward()
        .then((res) => {
          notification.success("Your prediction was claimed successfully.");
          onRefetchStakes();
          setIsClaimed(true);
        })
        .catch((error) => {
          const customError = { ...error };
          notification.error(customError?.message);
        });
    };

    var ROI = (reward[0] * 100) / toTOTM(stake.value);
    if (ROI >= 1) {
      ROI = Math.round(ROI);
    }

    return (
      <>
        <span>
          <Icon
            url={`${totem}-warning.svg`}
            width={20}
            height={20}
            classes="inline-icon"
            onClick={() => {
              setStakingPool(stake);
            }}
          />
          <span>{totem.charAt(0).toUpperCase() + totem.slice(1)}</span>
        </span>

        <span>
          <Currency
            value={toTOTM(stake.value)}
            unit={CurrencyUnit.TOTEM}
            size={18}
          />
        </span>

        <span>
          {calculateRange((100 * toTOTM(stake.value)) / 97) === 0 ? (
            <Currency
              value={toBTC(stake.pricePrediction)}
              unit={CurrencyUnit.DOLLAR}
              size={18}
            />
          ) : (
            <div
              style={{ fontSize: "18px", fontWeight: 600, lineHeight: "24px" }}
            >
              ${Number(toBTC(stake.pricePrediction)).toLocaleString("en")}
              &#xb1;
              {calculateRange((100 * toTOTM(stake.value)) / 97)}
            </div>
          )}
        </span>

        <span>
          {finalPrice <= 0 ? (
            <>-</>
          ) : (
            <Currency
              value={finalPrice}
              unit={CurrencyUnit.DOLLAR}
              size={18}
              fixed={0}
            />
          )}
        </span>

        <span>
          {userRankInPool <= 0 || userRankInPool > 25 ? <>-</> : userRankInPool}
        </span>

        <span>
          <Currency
            value={reward[0] > 0 ? reward[0] : "-"}
            unit={CurrencyUnit.NO_SYMBOL}
            fixed={5}
            size={18}
            parse={false}
            localization={false}
          />
        </span>

        <span>
          <Currency
            value={reward[1] > 0 ? reward[1] : "(Defined at Maturity)"}
            unit={CurrencyUnit.NO_SYMBOL}
            fixed={5}
            size={18}
            parse={false}
            localization={false}
          />
        </span>

        <span>{leftTime}</span>

        <span style={{ height: 0 }}>
          {showClaim && (
            <button
              style={
                len > 1
                  ? {
                      height: `${len * 24 + (len - 1) * 10}px`,
                      position: "relative",
                      top: `${(len - 1) * -24 + (len - 1) * -10}px`,
                      verticalAlign: "middle",
                    }
                  : {}
              }
              onClick={payout}
              disabled={poolCondition !== "Claim"}
              className={`stake-claim-button ${poolCondition}`}
            >
              {poolCondition}
            </button>
          )}
        </span>
      </>
    );
  }
);
