/**
 *
 * ActivePools
 *
 */
import * as React from "react";
import { BigNumber } from "ethers";

import { TotemsData } from "types/constants";
import { convertDate } from "../../helpers";
import { Stake } from "graphql/models";
import { useTotemToken } from "services/token";
import "styles/scss/user-data.scss";

interface Props {
  stakes: Stake[];
}

export const ActivePools = ({ stakes }: Props) => {
  const { toTOTM, toBTC } = useTotemToken();
  const getDataWrapperStyle = (totem) => {
    return {
      backgroundColor: `${TotemsData[totem.toUpperCase()].color}99`,
    };
  };

  return (
    <div className="ud-activepools">
      <h1 className="ud-activepools-title">Active pools</h1>

      {stakes.length ? (
        stakes.map((stake, index) => {
          // Todo: Get this from pool info
          const totem = "Fox";
          // Todo: Projected returns need to be calculated
          const projectedReturns = 0;

          return (
            <div key={index}>
              <div
                style={getDataWrapperStyle(totem)}
                className="ud-activepools-pool"
              >
                <h2>{totem}</h2>

                <div className="ud-activepools-pool-item">
                  <div className="ud-activepools-pool-item-label">
                    Time left
                  </div>
                  <div className="ud-activepools-pool-item-value">
                    {convertDate(new Date(stake.timestamp * 1000))}
                  </div>
                </div>
                <div className="ud-activepools-pool-item">
                  <div className="ud-activepools-pool-item-label">Stake</div>
                  <div className="ud-activepools-pool-item-value">
                    {toTOTM(BigNumber.from(stake.value))} TOTM
                  </div>
                </div>
                <div className="ud-activepools-pool-item">
                  <div className="ud-activepools-pool-item-label">
                    Your Prediction
                  </div>
                  <div className="ud-activepools-pool-item-value">
                    ${toBTC(BigNumber.from(stake.pricePrediction))}(&#xb1;500)
                  </div>
                </div>
                <div className="ud-activepools-pool-item">
                  <div className="ud-activepools-pool-item-label">
                    Projected returns
                  </div>
                  <div className="ud-activepools-pool-item-value">
                    {projectedReturns} TOTM
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h3>You don't have a stakes</h3>
      )}
    </div>
  );
};
