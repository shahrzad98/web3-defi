/**
 *
 * PoolInfo
 *
 */
import { Web3Provider } from "@ethersproject/providers";
import { CircularProgress } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { CtaButton } from "app/components/CtaButton";
import { Icon } from "app/components/Icon";
import { PredictionTimer } from "app/components/PredictionTimer";
import { Scale } from "app/components/Scale";
import { WalletOptions } from "app/components/WalletOptions";
import useStakingPools from "graphql/hooks/useStakingPools";
import * as React from "react";
import Popup from "reactjs-popup";
import "styles/scss/pool-container.scss";
interface Props {
  showModal: (() => void) | null;
  totem: string;
  poolFill?: number;
  endTime?: number;
  currentPool: any;
}

export function PoolInfo({
  showModal,
  totem,
  poolFill = 0,
  currentPool,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  var { pools, loading: loadingPools } = useStakingPools(0);
  const { account } = useWeb3React<Web3Provider>();
  const isOpen = false;

  let stakingPool = currentPool
    ? currentPool
    : {
        id: null,
        totalStaked: 0,
        totalStakes: 0,
        sizeAllocation: 0,
        isLocked: false,
        startDate: null,
        lockTime: null,
        maturityTime: null,
      };
  poolFill =
    (stakingPool.totalStaked / (1.05 * stakingPool.sizeAllocation)) * 100;
  if (isNaN(poolFill)) {
    poolFill = 0;
  }

  // note: endTime login changed from maturity to lock based on TOT-330
  const endTime =
    (parseInt(stakingPool?.startDate) + parseInt(stakingPool?.lockTime)) * 1000;
  return (
    <div className="pc-pool-info-main-div">
      <div className="pc-pool-info-title">
        <Icon height={40} width={40} url={"gif-fox.gif"} />
        <p>
          {totem.charAt(0).toUpperCase() + totem.substr(1).toLowerCase()}{" "}
          Predictor Pool
        </p>
      </div>

      <div className="pc-pool-info-scale-container">
        {loadingPools ? (
          <CircularProgress size={60} />
        ) : (
          <>
            {stakingPool?.id ? (
              <>
                <p>
                  <b>This pool is {poolFill?.toFixed(2)}% full</b>
                </p>
                <Scale fill={poolFill || 0} />

                <span>
                  <b>and will lock on:</b>
                  <br />
                  <PredictionTimer endTime={endTime} />
                </span>
              </>
            ) : (
              <>
                <p>
                  <b>there are no active pools</b>
                </p>
              </>
            )}
          </>
        )}
      </div>
      {!account ? (
        <Popup
          trigger={
            <div className="pc-pool-info-button-wrapper">
              {showModal && (
                <CtaButton
                  color={"#181818"}
                  background={"white"}
                  showModal={showModal}
                />
              )}
            </div>
          }
          modal
          nested
        >
          {(close) => (
            <WalletOptions totem={totem} isOpen={isOpen} close={close} />
          )}
        </Popup>
      ) : (
        <div className="pc-pool-info-button-wrapper">
          {showModal && (
            <CtaButton
              color={"#181818"}
              background={"white"}
              showModal={showModal}
            />
          )}
        </div>
      )}
    </div>
  );
}
