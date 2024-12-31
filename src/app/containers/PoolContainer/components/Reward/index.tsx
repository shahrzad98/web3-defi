/**
 *
 * Reward
 *
 */
import { CircularProgress } from "@material-ui/core";
import { Currency, CurrencyUnit } from "app/components/Currency";
import useStakingPool from "graphql/hooks/useStakingPool";
import * as React from "react";
import { useContext } from "react";
import "styles/scss/pool-container.scss";
import { convertBusdToUsd } from "utils/busd";
import { AppContext } from "../../../../../state/app/appContext";
interface Props {
  totem?: string;
  currentPool: any;
}

export function Reward({ currentPool }: Props) {
  const { state } = useContext(AppContext);
  let stakingPool = currentPool
    ? currentPool
    : { id: "", isLocked: false, usdPrizeAmount: 0 };
  var { data, loading } = useStakingPool(stakingPool ? stakingPool?.id : null);

  const prize = data?.stakingPool?.usdPrizeAmount;
  const stakeApr = data?.stakingPool?.stakeApr;

  const predictionrewards = [
    { label: "1st", value: "37.5" },
    { label: "2nd", value: "20" },
    { label: "3rd", value: "11" },
    { label: "4th - 10th", value: "2.5" },
    { label: "11th - 25th", value: "1" },
  ];

  const { allBTC, allTotem } = state.calculatedRewards;

  return (
    <div className="pc-reward-main-div">
      <div className="pc-reward-top">
        <div className="pc-reward-column-reward">
          <p>Prediction Reward Distribution</p>
          <div className=" pc-reward-column-reward-title">
            <ul>
              <li>Place</li>
            </ul>
            <ul>
              <li>Reward</li>
            </ul>
          </div>
          <div
            className="row"
            style={{ width: "100%", justifyContent: "center" }}
          >
            <ul className="reward-keys">
              <li>1st</li>
              <li>2nd</li>
              <li>3rd</li>
              <li>4th - 10th</li>
              <li>11th - 25th</li>
            </ul>

            <ul className="reward-value">
              {predictionrewards.map((item, index) => {
                return (
                  <>
                    <li>
                      <b>
                        {" "}
                        <span className="reward-value-size">
                          {item.value}%
                        </span>{" "}
                        &nbsp;
                        {state?.calculatedRewards[index]?.btc ? (
                          <>
                            <Currency
                              unit={CurrencyUnit.NO_SYMBOL}
                              value={state?.calculatedRewards[index]?.btc}
                              fixed={5}
                              localization={false}
                              size={20}
                            />
                          </>
                        ) : (
                          <>-</>
                        )}
                        &nbsp; BTC, &nbsp; &nbsp;
                        {state?.calculatedRewards[index]?.totem ? (
                          <>
                            <Currency
                              unit={CurrencyUnit.NO_SYMBOL}
                              value={state?.calculatedRewards[index]?.totem}
                              size={20}
                            />
                          </>
                        ) : (
                          <>-</>
                        )}
                        &nbsp; TOTM
                      </b>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="stake-reward">
        <p>
          Staking Return:{" "}
          {stakingPool?.id ? (
            stakeApr / 100 + "% APY"
          ) : (
            <span>no active pool</span>
          )}
        </p>
      </div>
      <div className="pc-reward-bottom">
        <p>Total Distribution to Community:</p>

        <h4>
          {loading ? (
            <CircularProgress size={40} />
          ) : stakingPool?.id ? (
            <Currency
              unit={CurrencyUnit.DOLLAR}
              value={convertBusdToUsd(prize)}
              size={25}
            />
          ) : (
            <span>no active pool</span>
          )}
        </h4>
      </div>
    </div>
  );
}
