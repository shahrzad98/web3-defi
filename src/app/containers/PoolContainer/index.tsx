import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ConfirmModal } from "app/components/ConfirmModal";
import { CtaButton } from "app/components/CtaButton";
import { Currency, CurrencyUnit } from "app/components/Currency";
import { PredictionTimer } from "app/components/PredictionTimer";
import { WalletOptions } from "app/components/WalletOptions";
import usePrices from "app/hooks/prices";
import { BigNumber, BigNumberish, constants } from "ethers";
import useStakingPools from "graphql/hooks/useStakingPools";
import * as React from "react";
import { useState } from "react";
import { RouteComponentProps } from "react-router";
import Popup from "reactjs-popup";
import { useStakingPool } from "services/contracts";
import { useTotemToken } from "services/token";
import { TotemsData } from "types/constants";
import { getChainByChainId } from "utils/chain";
import { extractNumbers } from "utils/number";
import { isActivePool } from "utils/pool";
import useNotification from "../../hooks/useNotification";
import { Calculator } from "./components/Calculator";
import { PoolInfo } from "./components/PoolInfo";
import { PredictModal } from "./components/PredictModal";
import { Reward } from "./components/Reward";
import { Timer } from "./components/Timer";
import { getCurrentPool, getTotem } from "graphql/hooks/usePool";

interface PoolParams {
  id: string;
}

export const PoolContainer = (props: RouteComponentProps<PoolParams>) => {
  const { account, chainId, error } = useWeb3React<Web3Provider>();
  const isOpen = false;
  const { totmPrice, btcPrice, loading: loadingPrice } = usePrices();
  const [showPredictModal, setShowPredictModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [confirmMessage, setConfirmMessage] = useState(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [predictValue, setPredictValue] = useState({
    bitcoinPrice: BigNumber.from(0),
    stakeValue: BigNumber.from(0),
    days: BigNumber.from(0),
  });

  const [poolFill, setPoolFill] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const [totalStakesPool, setTotalStakesPool] = useState(0);
  const [sizeAllocationsPool, setSizeAllocationsPool] = useState(0);

  const notification = useNotification();
  let totem = getTotem();
  const filter = totem !== "ALL" ? { poolType: totem.toLowerCase() } : {};
  var { pools, loading: loadingPools, refetch } = useStakingPools(0, filter);
  var position = 0;
  let currentPool = getCurrentPool(pools);
  const stakingPool = useStakingPool(currentPool?.id);
  const {
    approve,
    allowance,
    contractTransaction,
    contractReceipt,
    setContractTransaction,
    setContractReceipt,
    balance,
    toTOTM,
  } = useTotemToken(account, currentPool?.id, 0, stakingPool, predictValue);

  React.useEffect(() => {
    if (stakingPool) {
      stakingPool
        .totalStaked()
        .then((totalStaked) => {
          stakingPool
            .sizeAllocation()
            .then((sizeAllocation) => {
              setTotalStakesPool(toTOTM(totalStaked));
              setSizeAllocationsPool(toTOTM(sizeAllocation));
              setPoolFill(
                toTOTM(totalStaked) / (1.05 * toTOTM(sizeAllocation) * 100)
              );
            })
            .catch((err) => {
              //   const customError = { ...err };
              //   notification.error(customError?.code);
            });
        })
        .catch((err) => {
          const customError = { ...err };
          if (customError?.method === "totalStaked()") {
            notification.error("You don't have totem token in your wallet");
          } else {
            notification.error(customError?.code);
          }
        });

      stakingPool
        .startDate()
        .then((startDate) => {
          stakingPool
            .maturityTime()
            .then((maturityTime) => {
              stakingPool
                .lockTime()
                .then((lockTime) => {
                  setEndTime(
                    startDate
                      .add(lockTime)
                      .add(maturityTime)
                      .mul(1000)
                      .toNumber()
                  );
                })
                .catch((err) => {
                  //   const customError = { ...err };
                  //   notification.error(customError?.code);
                });
            })
            .catch((err) => {
              //   const customError = { ...err };
              //   notification.error(customError?.code);
            });
        })
        .catch((err) => {
          //   const customError = { ...err };
          //   notification.error(customError?.code);
        });
    }
  }, [stakingPool]);

  React.useEffect(() => {
    if (contractReceipt) {
      refetch();
    }
  }, [contractReceipt]);

  React.useEffect(() => {
    const customError: any = { ...error };
    async function errorHandle(error) {
      if (error) {
        if (customError?.message?.includes("Unsupported chain id")) {
          const chainIds = extractNumbers(error + "");
          const userNetwork = await getChainByChainId(Number(chainIds[0]));
          const correctNetwork = await getChainByChainId(Number(chainIds[1]));
          notification.error(`You are connected to an incorrect network: ${userNetwork.name} </br>
                              Supported networks: ${correctNetwork.name}
                             `);
        } else if (customError?.code === 4001) {
          notification.error("The user rejected the request.");
        }
      }
    }
    errorHandle(error);
  }, [error]);

  const makePredict = async (
    pricePrediction: BigNumberish,
    stakeAmount: BigNumberish
  ) => {
    setLoading(true);
    try {
      let ct = await approve(stakingPool.address, stakeAmount);
      setLoading(false);
      // if (stakingPool) await stakingPool.stake(stakeAmount, pricePrediction);
    } catch (error) {
      setLoading(false);
    }
  };

  const makePredictFromModal = (
    bitcoinPrice: BigNumberish,
    stakeValue: BigNumberish,
    range: BigNumberish,
    confirmModalShowStatus = true
  ) => {
    setShowPredictModal(true);
    setShowConfirmModal(false);
    setPredictValue({
      bitcoinPrice: BigNumber.from(bitcoinPrice),
      stakeValue: BigNumber.from(stakeValue),
      days: TotemsData[totem].days,
    });

    var exp = BigNumber.from("10").pow(18);
    var expBtc = BigNumber.from("10").pow(8);
    var expectedBtc = BigNumber.from(bitcoinPrice).div(expBtc);
    var expectedBtcMin = BigNumber.from(bitcoinPrice).div(expBtc).sub(range);
    var expectedBtcMax = BigNumber.from(bitcoinPrice).div(expBtc).add(range);
    var stakedTOTM = BigNumber.from(stakeValue).div(exp);

    setConfirmMessage(
      <div className="transaction-confirmed-section">
        {+toTOTM(stakeValue) + totalStakesPool > 1.05 * sizeAllocationsPool ? (
          <p className="alert warning">
            !! This pool is less than value you entered !!
          </p>
        ) : (
          <></>
        )}
        <div className="transaction-details">
          <h1 style={{ marginTop: 0 }}>
            <b>Your Stake</b>
          </h1>

          <div className="prediction-details-confirmation">
            <p style={{ fontWeight: 600 }}>Prediction details:</p>

            <hr />

            <p className="special-text-2">Your Stake:</p>
            <p>
              <Currency
                value={stakedTOTM}
                unit={CurrencyUnit.NO_SYMBOL}
                size={18}
              />{" "}
              <b>TOTM</b>
            </p>

            <br />
            <p className="special-text-2" style={{ margin: 0 }}>
              You predict that:
            </p>
            <p>
              {"BTC will be between "}
              <Currency
                size={16}
                value={expectedBtcMin}
                unit={CurrencyUnit.DOLLAR}
              />
              {" and "}
              <Currency
                size={16}
                value={expectedBtcMax}
                unit={CurrencyUnit.DOLLAR}
              />
            </p>

            <br />
            <p className="special-text-2" style={{ margin: 0 }}>
              When this pool matures on:
            </p>
            <h3 style={{ marginTop: 0 }}>
              <PredictionTimer endTime={endTime} />
            </h3>
          </div>
        </div>
      </div>
    );

    setShowConfirmModal(confirmModalShowStatus);
  };

  const doAction = async () => {
    if (account && stakingPool) {
      if (
        allowance.eq(position) &&
        position !== 0 &&
        isActivePool(stakingPool)
      ) {
        approve(stakingPool.address, constants.MaxUint256);
      } else {
        setShowPredictModal(true);
        setShowConfirmModal(false);
      }
    }
  };

  return (
    <>
      <div className="pc-main-div">
        <div className="pc-top">
          <div className="pc-time-wrapper">
            <Timer currentPool={currentPool} endTime={endTime} />
          </div>
          <PoolInfo
            totem={totem}
            showModal={doAction}
            poolFill={poolFill}
            endTime={endTime}
            currentPool={currentPool}
          />
        </div>
        <div className="pc-bottom">
          <div className="pc-bottom-content">
            <Calculator
              // showModal={() => setShowPredictModal(!showPredictModal)}
              showModal={doAction}
              totem={totem}
              tokenPrice={totmPrice}
              btcLastPrice={btcPrice}
              loadingPrice={loadingPrice}
              loadingPools={loadingPools}
              stakingPool={currentPool}
              poolType={totem}
            />
            <Reward currentPool={currentPool} />
          </div>
          <div className="pc-button-wrapper">
            {!account ? (
              <Popup
                trigger={
                  <CtaButton
                    background={"white"}
                    color={"#272e38"}
                    showModal={doAction}
                  />
                }
                modal
                nested
              >
                {(close) => (
                  <WalletOptions totem={totem} isOpen={isOpen} close={close} />
                )}
              </Popup>
            ) : (
              <CtaButton
                color={"#272e38"}
                background={"white"}
                showModal={doAction}
              />
            )}
          </div>
        </div>
        {
          <PredictModal
            endTime={endTime || new Date().getTime()}
            contractReceipt={contractReceipt}
            contractTransaction={contractTransaction}
            isOpen={showPredictModal} // showPredictModal
            initBet={toTOTM(balance) > 1000000 ? 1000000 : toTOTM(balance)}
            close={() => {
              setContractTransaction(null);
              setContractReceipt(null);
              setShowPredictModal(false);
            }}
            totem={totem}
            makeBet={
              (
                bitcoinValue: BigNumberish,
                betValue: BigNumberish,
                range: BigNumberish,
                status?: boolean
              ) => makePredictFromModal(bitcoinValue, betValue, range, status)
              //makePredict(bitcoinValue, betValue)
            }
            confirm={(stakeValue = predictValue.stakeValue) => {
              makePredict(predictValue.bitcoinPrice, stakeValue);
            }}
            currentPool={currentPool}
          />
        }
        {
          <ConfirmModal
            totem={totem}
            isOpen={showConfirmModal}
            close={() => setShowConfirmModal(false)}
            message={confirmMessage}
            loading={loading}
            confirm={() => {
              makePredict(predictValue.bitcoinPrice, predictValue.stakeValue);
              setShowConfirmModal(false);
            }}
          />
        }
      </div>
    </>
  );
};
