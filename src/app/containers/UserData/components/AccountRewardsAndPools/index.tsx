/**
 *
 * AccountRewards
 *
 */
import { PredictionTimer } from "app/components/PredictionTimer";
import { Stake } from "graphql/models";
import _ from "lodash";
import groupBy from "lodash/groupBy";
import orderBy from "lodash/orderBy";
import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { useTotemToken } from "services/token";
import "styles/scss/user-data.scss";
import { StakeRow } from "./StakeRow";
import { isMatured, isLocked } from "utils/pool";
interface Props {
  stakes: Stake[];
  onRefetchStakes: () => void;
}

export const AccountRewardsAndPools = memo(
  ({ stakes = [], onRefetchStakes }: Props) => {
    const hasStakes = stakes.length > 0;
    const [stakingPool, setStakingPool] = useState(undefined);
    const [poolLockStatus, setLockPoolStatus] = useState("");
    const handleSettingStakingPool = (stakingPool: Stake) => {
      const { totalStaked, sizeAllocation } = stakingPool.pool;
      const lockStatus = isLocked(stakingPool.pool);
      const maturityStatus = isMatured(stakingPool.pool);
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

      setLockPoolStatus(poolCondition);
      setStakingPool(stakingPool);
    };
    const closeStakingPoolInfoDialog = () => {
      setStakingPool(undefined);
    };
    const { toTOTM } = useTotemToken();
    let poolsCounter = _.chain(stakes)
      .groupBy((v: any) => {
        return v.pool.id;
      })
      .reduce((res, val, key) => {
        res[key] = 0;
        return res;
      }, [])
      .value();

    const getArrangeData = () => {
      const orderByData = orderBy(stakes, ["timestamp"], ["asc"]);
      const groupByData = groupBy(orderByData, (stake) => {
        return stake?.pool?.id;
      });
      const filterData = groupByData;
      return filterData;
    };

    return (
      <section className="account-rewards-pools">
        <h1>Pools & Rewards</h1>

        {hasStakes ? (
          <>
            {stakingPool ? (
              <dialog open={stakingPool !== undefined}>
                <h1>Staking Pool Info</h1>
                <div className="dialog-container">
                  <p style={{ marginBottom: "15px" }}>
                    <b>Status:</b>
                    <span>
                      {poolLockStatus === "Active" ? "Locked" : poolLockStatus}
                    </span>
                  </p>

                  <p style={{ marginBottom: "15px" }}>
                    <b>Open Date: </b>
                    <span>
                      <PredictionTimer
                        endTime={parseInt(stakingPool?.pool.startDate) * 1000}
                      />
                    </span>
                    <br />
                    {["Active", "Matured"].includes(poolLockStatus) ? (
                      <>
                        <b>Lock Date: </b>
                        <span>
                          <PredictionTimer
                            endTime={
                              (parseInt(stakingPool?.pool.startDate) +
                                parseInt(stakingPool?.pool.lockTime)) *
                              1000
                            }
                          />
                        </span>
                        <br />
                      </>
                    ) : (
                      <></>
                    )}

                    {["Matured"].includes(poolLockStatus) ? (
                      <>
                        <b>Maturity Date: </b>
                        <span>
                          <PredictionTimer
                            endTime={
                              (parseInt(stakingPool?.pool.startDate) +
                                parseInt(stakingPool?.pool.lockTime) +
                                parseInt(stakingPool?.pool.maturityTime)) *
                              1000
                            }
                          />
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                  </p>

                  <p style={{ marginBottom: "15px" }}>
                    <b>Participants: </b>
                    <span>{stakingPool?.pool.totalStakes}</span>
                  </p>

                  <p>
                    <b>Pool size: </b>
                    <span>
                      {Number(
                        toTOTM(stakingPool.pool.sizeAllocation)
                      ).toLocaleString("en")}{" "}
                      TOTM
                    </span>
                    <br />
                    <b>Fill %: </b>
                    <span>
                      {Number(
                        (Number(stakingPool.pool.totalStaked) /
                          Number(stakingPool.pool.sizeAllocation)) *
                          100
                      ).toFixed(2)}
                      %
                    </span>
                  </p>

                  <p className="dialog-action-container">
                    <button
                      onClick={() => {
                        closeStakingPoolInfoDialog();
                      }}
                    >
                      Ok
                    </button>
                  </p>
                </div>
              </dialog>
            ) : (
              <></>
            )}
            <p className="pool-reward-hint">
              <span>*</span>
              <b>3% fee was deducted from the stake</b>
            </p>
            <p className="pool-reward-hint">
              <span>*</span>
              <b>
                Click on fox icon in order to see details of related staking
                pool
              </b>
            </p>
            <div className="stake-rows-container">
              <div className="stake-row">
                <b>Pool</b>
                <b>Stake</b>
                <b>Prediction</b>

                <b>Final Price</b>
                <b>Position</b>

                <b>Totem Reward</b>
                <b>BTC Reward</b>
                <b>Time left</b>
                <b>Status</b>
                <hr />
                <hr />
                <hr />
                <hr />
                <hr />
                <hr />
                <hr />
                <hr />
                <hr />

                {Object.keys(getArrangeData())?.map((pool, poolIndex) => {
                  return (
                    <>
                      {getArrangeData()[pool].map((stake, stakePoolIndex) => {
                        return (
                          <StakeRow
                            key={poolIndex + "_" + stakePoolIndex}
                            stake={stake}
                            stakeIndex={poolsCounter[stake.pool.id]++}
                            setStakingPool={handleSettingStakingPool}
                            onRefetchStakes={onRefetchStakes}
                            stakesCount={getArrangeData()[pool]?.length}
                            len={getArrangeData()[pool]?.length}
                            showClaim={
                              stakePoolIndex ===
                              getArrangeData()[pool]?.length - 1
                            }
                          />
                        );
                      })}
                      {poolIndex !==
                        Object.keys(getArrangeData())?.length - 1 && (
                        <>
                          <hr className="divider" />
                          <hr className="divider" />
                          <hr className="divider" />
                          <hr className="divider" />
                          <hr className="divider" />
                          <hr className="divider" />
                          <hr className="divider" />
                          <hr className="divider" />
                          <hr className="divider" />
                        </>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <h3 className="ud-rewards-pools-subtitle">
            <span>You don't currently have any active or completed pools.</span>
            <Link to="/pools/fox">Stake now</Link>
          </h3>
        )}
      </section>
    );
  }
);
