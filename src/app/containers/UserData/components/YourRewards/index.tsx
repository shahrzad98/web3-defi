/**
 *
 * YourReward
 *
 */
import * as React from "react";
import { Icon } from "app/components/Icon";
import { TotemsData } from "../../../../../types/constants";
import { Stake } from "graphql/models";
import "styles/scss/user-data.scss";
import { getTotem } from "graphql/hooks/usePool";

interface Props {
  tokenPrice: number;
  stakes: Stake[];
}

export function YourRewards({ stakes, tokenPrice }: Props) {
  const getRewardTableRowStyle = (totem) => {
    return {
      backgroundColor: TotemsData[totem].color,
    };
  };
  const getRewardClaimMobileStyle = (totem) => {
    return {
      backgroundColor:
        totem === "fox" ? "#FB8331" : totem === "wolf" ? "#3B424B" : "#AFC7CB",
    };
  };
  return (
    <div className="ud-your-rewards-main-div">
      <h1>Your rewards</h1>
      {stakes.length ? (
        <div className="ud-your-rewards-table">
          <div className="ud-your-rewards-table-header">
            <div className="ud-your-rewards-staking-pool">
              <p>Staking poll</p>
            </div>
            <div className="ud-your-rewards-totm">
              <p>TOTM</p>
            </div>
            <div className="ud-your-rewards-btc">
              <p>BTC</p>
            </div>
            <div className="ud-your-rewards-total">
              <p>Total</p>
            </div>
            <div className="ud-your-rewards-button-block" />
          </div>
          {stakes.map((stake, index) => {
            // Todo: Get the pool type from stake.pool
            const totem = getTotem();
            const totalReward = 0;
            const claimReward = () => {};

            return (
              <div
                className="ud-your-rewards-table-row"
                key={index}
                style={getRewardTableRowStyle(totem)}
              >
                <div className="ud-your-rewards-staking-pool">
                  <Icon url={TotemsData[totem].icon} width={15} height={15} />
                  <p>{`${totem.charAt(0).toUpperCase()}${totem.substr(1)}`}</p>
                </div>
                <div className="ud-your-rewards-totm">
                  <p>{totalReward}</p>
                </div>
                <div className="ud-your-rewards-btc">
                  <p>0.03</p>
                </div>
                <div className="ud-your-rewards-total">
                  <p>${Math.round(totalReward * tokenPrice)}</p>
                </div>
                <div className="ud-your-rewards-button-block">
                  <div
                    className="ud-your-rewards-claim-mobile"
                    style={getRewardClaimMobileStyle(totem)}
                    onClick={claimReward}
                  >
                    <h3>Claim</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h3>You don't have a reward</h3>
      )}
    </div>
  );
}
