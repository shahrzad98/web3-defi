/**
 *
 * PredictModal
 *
 */
import { Currency, CurrencyUnit } from "app/components/Currency";
import { Icon } from "app/components/Icon";
import { PredictionTimer } from "app/components/PredictionTimer";
import { Tooltip } from "app/components/Tooltip";
import { TradingViewWidget } from "app/components/TradingView";
import { ReactGAM } from "app/google-analytics/google-analytics";
import useNotification from "app/hooks/useNotification";
import useTransactions from "app/hooks/useTransaction";
import axios from "axios";
import {
  BigNumber,
  BigNumberish,
  ContractReceipt,
  ContractTransaction,
} from "ethers";
import useStakingPools from "graphql/hooks/useStakingPools";
import React, { memo, useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";
import { useStakingPool } from "services/contracts";
import { useTotemToken } from "services/token";
import { TotemsData } from "types/constants";
import { calculateRange, isActivePool } from "utils/pool";
import {
  calculatePoolRemainingSize,
  PoolStakeCalculations,
} from "../../../../../graphql/hooks/usePool";
interface Props {
  endTime: number;
  contractReceipt: ContractReceipt;
  contractTransaction: ContractTransaction;
  isOpen: boolean;
  close: () => void;
  totem: string;
  initBet: number;
  makeBet: (
    bitcoinValue: BigNumberish,
    betValue: BigNumberish,
    range: BigNumberish,
    status?: boolean
  ) => void;
  confirm: (stakeValue?: any) => void;
  currentPool: any;
}

export const PredictModal = memo(
  ({
    endTime,
    contractReceipt,
    isOpen,
    initBet,
    totem,
    close,
    makeBet,
    confirm,
    currentPool,
  }: Props) => {
    const betPercentageValues = [25, 50, 75, 100];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let stakingPool = currentPool
      ? currentPool
      : { maturityTime: 0, isLocked: false, startDate: 0, id: "" };
    const currenctStakingPool = useStakingPool(stakingPool?.id);
    const [isInRejectedState, setIsInRejectedState] = useState({
      status: false,
      type: "",
    });
    const [autoBet, setAutoBet] = useState(0);
    const [remainedStaking, setRemainedStaking] = useState(0);
    const [sizeAllocation, setSizeAllocation] = useState(0);
    const [bitcoinValue, setBitcoinValue] = useState(0);
    const [activePercent, setIsActivePercent] = useState(0);
    const [betValue, setBetValue] = useState(initBet);
    const [range, setRange] = useState(calculateRange(betValue));
    const checkIsMobile = (value) => value < 600;
    const [isMobile, setIsMobile] = useState(checkIsMobile(window.innerWidth));
    const [customStyles, setCustomStyles] = useState(setModalStyle(isMobile));
    const { toTOTM, toBTC } = useTotemToken();
    const subscribe = fromEvent(window, "resize")
      .pipe(
        map((e: any) => e.currentTarget.innerWidth),
        filter((width) => isMobile !== checkIsMobile(width))
      )
      .subscribe((data) => {
        setIsMobile(checkIsMobile(data));
        setCustomStyles(setModalStyle(isMobile));
      });

    const notification = useNotification();

    const { state: transactionsState, clearById } = useTransactions();
    useEffect(() => {
      axios
        .get("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then(({ data }) => {
          setBitcoinValue(Math.floor(data.bpi.USD.rate_float));
        })
        .catch((e) => {
          console.error(e);
        });
    }, []);

    calculatePoolRemainingSize(currenctStakingPool).then(
      (value: PoolStakeCalculations) => {
        const { remainingAmountToStake, poolSizeAllocation } = value;

        setRemainedStaking(remainingAmountToStake);
        setSizeAllocation(poolSizeAllocation);
      }
    );

    useEffect(() => {
      ReactGAM().trackModalView("prediction");
      setBetValue((initBet * (activePercent || 100)) / 100);
      setRange(calculateRange(betValue));

      changeBetValue(betPercentageValues[betPercentageValues.length - 1]);

      return () => subscribe.unsubscribe();
    }, [totem, initBet]);

    const changeBetValue = (value: number) => {
      setIsActivePercent(value);
      setBetValue(Math.floor((initBet * value) / 100));
      setRange(calculateRange((initBet * value) / 100));
    };
    const changeInputBetValue = (value: number) => {
      setBetValue(value);
      setRange(calculateRange(value));
      setIsActivePercent((100 * value) / initBet);
    };
    const makeStake = (status = true) => {
      clearById(1);
      var exp = BigNumber.from("10").pow(18);
      var expBtc = BigNumber.from("10").pow(8);
      const supply = BigNumber.from(betValue).mul(exp);

      if (betValue < 250) {
        notification.error("Minimum bet value is 250 TOTM");
        return;
      }

      if (betValue > initBet) {
        notification.error("Bet value is more than your balance.");
        return;
      }

      if (betValue > 0 && bitcoinValue > 0) {
        ReactGAM().trackEvent("makeStake", "click", "staking");
        makeBet(
          BigNumber.from(bitcoinValue).mul(expBtc),
          supply,
          BigNumber.from(range),
          status
        );
      }
    };

    const backgroundStyle = {
      backgroundColor: TotemsData[totem].color,
    };
    const totemWrapperBackgroundStyle = {
      minWidth: 0, // dummy style
      "@media screen and (maxWidth: 450px)": {
        backgroundColor: TotemsData[totem].color,
      },
    };
    const inputWrapperBackgroundStyle = {
      minWidth: 0, // dummy style
      "@media screen and (maxWidth: 450px)": {
        'input[type="number"]': {
          backgroundColor: TotemsData[totem].color,
        },
      },
    };

    const confirmPredictBackgroundStyle = {
      minWidth: 0, // dummy style
      width: "202.45px",
      "@media screen and (maxWidth: 450px)": {
        width: "100%",
        h2: {
          backgroundColor: TotemsData[totem].color,
        },
      },
    };
    const getPercentBlockStyle = (v) => {
      return {
        backgroundColor: `#9eacbe${Math.ceil(
          (100 - v > 0.1 ? 100 - v : 10) * 2.5
        ).toString(16)}`,
        border:
          Number(Number(activePercent).toFixed(0)) === v
            ? "2px solid #ff6600"
            : "2px solid transparent",
      };
    };
    const isProcessing =
      transactionsState?.transactions?.filter((i) => i.status === "processing")
        .length > 0;

    const isRejected =
      transactionsState?.transactions?.filter((i) => i.status === "rejected")
        .length > 0;

    let rejectionReason =
      transactionsState?.transactions?.filter(
        (i) => i.status === "rejected" && i.type === 3 // exceeded sizeAllocation
      ).length > 0;
    if (isRejected && !isInRejectedState.status) {
      setIsInRejectedState({
        status: true,
        type: rejectionReason ? "exceeded" : "unknown",
      });
    }

    const calculateBtcPricePredictionDollarPosition = () => {
      const { length } = Currency.formatByComma(bitcoinValue).replaceAll(
        ",",
        ""
      );
      const gap = length > 3 ? 3 : 0.5;
      return length * 5 + 5 + gap;
    };

    return (
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="pc-predict-model-totem-wrapper">
          <div
            className="pc-predict-model-totem-wrapper"
            style={totemWrapperBackgroundStyle}
          >
            <Icon
              url={`${totem.toLowerCase()}-white.svg`}
              height={20}
              width={20}
            />
          </div>
          <p style={{ fontWeight: 600, fontSize: "18px" }}>{totem} Pool</p>
          <Icon
            url={`close-${isMobile ? "white" : "white"}.svg`}
            height={15}
            width={15}
            cursor={"pointer"}
            onClick={() => {
              setAutoBet(0);
              setIsInRejectedState({ status: false, type: "" });
              close();
            }}
          />
        </div>

        {contractReceipt || isInRejectedState.status ? (
          <div className="transaction-confirmed-section">
            {isInRejectedState.type === "exceeded" ? (
              <h1 className="pool-size-rejection-error">
                {betValue < 250
                  ? "Minimum amount of staking is 250 TOTM"
                  : `Maximum Stake of ${Number(sizeAllocation).toLocaleString(
                      "en"
                    )}
                exceeded`}
              </h1>
            ) : (
              <></>
            )}
            <h1 style={{ marginTop: 0 }}>
              Prediction {isInRejectedState.status ? "Failed!" : "Successful!"}
            </h1>
            <div className="transaction-details">
              <div
                className="prediction-details-confirmation"
                style={{ width: "max-content", margin: "0 auto" }}
              >
                <p style={{ fontWeight: 600 }}>Prediction details:</p>
                <hr />

                <p className="special-text-2">Your stake:</p>
                <p>
                  <Currency
                    value={autoBet ? autoBet : betValue}
                    unit={CurrencyUnit.NO_SYMBOL}
                    size={18}
                  />{" "}
                  <b>TOTM</b>
                </p>

                <br />
                <p className="special-text-2" style={{ margin: 0 }}>
                  You Predict that:
                </p>
                <p>
                  {"BTC will be between "}
                  <Currency
                    size={16}
                    value={bitcoinValue - range}
                    unit={CurrencyUnit.DOLLAR}
                  />
                  {" and "}
                  <Currency
                    size={16}
                    value={bitcoinValue + range}
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

            {isInRejectedState.status ? (
              <div>
                <div className="reconfirm-transaction">
                  <div
                    className="edit-bet"
                    onClick={() => {
                      setAutoBet(0);
                      setIsInRejectedState({ status: false, type: "" });
                    }}
                  >
                    Edit
                  </div>
                  <div
                    className="auto-confirm-bet"
                    onClick={() => {
                      const exp = BigNumber.from("10").pow(18);
                      const expBtc = BigNumber.from("10").pow(8);

                      if (isInRejectedState.type === "exceeded") {
                        const remained = parseInt(
                          Number(remainedStaking).toString()
                        );
                        const nextStake = BigNumber.from(remained).mul(exp);

                        changeInputBetValue(remained);
                        makeBet(
                          BigNumber.from(bitcoinValue).mul(expBtc),
                          nextStake,
                          BigNumber.from(range),
                          false
                        );
                        confirm(nextStake);

                        setTimeout(() => {
                          setAutoBet(remained);
                          setIsInRejectedState({ status: false, type: "" });
                        }, 1500);
                      } else {
                        const nextStake = BigNumber.from(betValue).mul(exp);
                        makeBet(
                          BigNumber.from(bitcoinValue).mul(expBtc),
                          nextStake,
                          BigNumber.from(range),
                          false
                        );
                        confirm(nextStake);

                        setTimeout(() => {
                          setAutoBet(0);
                          setIsInRejectedState({ status: false, type: "" });
                        }, 1500);
                      }
                      ReactGAM().trackEvent("user", "actual prediction");
                    }}
                  >
                    {isInRejectedState.type === "exceeded"
                      ? "Confirm"
                      : "Retry"}
                  </div>
                </div>
                <p
                  className="rejection-mode-helper-note"
                  hidden={isInRejectedState.type !== "exceeded"}
                >
                  <b>{"NOTE ! "}</b>
                  <span>
                    click on Edit to change your prediction or click on confirm
                    to use the remaining amount of the Pool size (
                    {Number(remainedStaking).toLocaleString("en")} TOTM) as your
                    bet
                  </span>
                </p>
              </div>
            ) : (
              <>
                <div className="transaction-confirmations">
                  <p style={{ marginBottom: "15px", color: "transparent" }}>
                    {"_"}
                  </p>

                  <Link className="transaction-completed-next" to="/user">
                    My Account Page
                  </Link>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            {!isActivePool(stakingPool) ? (
              <>
                <div className="pc-predict-model-top">
                  <div className="matureBox">
                    <div className="pc-predict-model-block pc-predict-model-block--flex-start">
                      <h3>
                        <b>there are no active pools</b>
                      </h3>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {isProcessing ? (
                  <>
                    <div className="process-predict-dialog">
                      <h2>Your prediction is being processed</h2>
                      <h4 className="special-text">Please wait...</h4>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mature-info-prediction-modal">
                      <div>
                        <div>
                          <h3 style={{ marginBottom: 0 }}>
                            <b>This pool will mature on: {"    "}</b>
                            <span style={{ color: "orange" }}>
                              <PredictionTimer endTime={endTime} />
                            </span>
                          </h3>
                        </div>
                      </div>
                      <div style={{ marginBottom: "50px" }}>
                        <TradingViewWidget height={200} exchange="Binance" />
                      </div>
                    </div>
                    {/* <TEMP_LEFT></TEMP_LEFT> */}
                    <div className="prediction-modal-phase-one">
                      <div className="staking-bet-part prediction-modal-phase-one-staking">
                        <div className="staking-bet-part-header">
                          <h4>How much TOTM are you staking?</h4>
                          <hr />
                        </div>

                        <div className="staking-bet-part-input">
                          <input
                            placeholder="0"
                            value={Currency.formatByComma(betValue)}
                            onChange={(e) => {
                              const totemAmount =
                                e.target.value.indexOf(",") >= 0
                                  ? e.target.value.replaceAll(",", "")
                                  : e.target.value;
                              changeInputBetValue(
                                parseFloat(totemAmount) > 1000000
                                  ? betValue
                                  : isNaN(parseFloat(totemAmount))
                                  ? 0
                                  : parseFloat(totemAmount)
                              );
                            }}
                          />
                        </div>

                        <div className="staking-bet-part-percentage-chips">
                          {betPercentageValues.map((v, index) => (
                            <span
                              key={index}
                              style={getPercentBlockStyle(v)}
                              onClick={() => changeBetValue(v)}
                            >
                              {v}%
                            </span>
                          ))}
                        </div>

                        <div className="staking-bet-part-confirm">
                          <button onClick={() => makeStake()}>
                            Confirm stake
                          </button>
                        </div>
                      </div>
                      {/* <RIGHT></RIGHT> */}
                      <div className="staking-prediction-part prediction-modal-phase-one-staking">
                        <div className="staking-prediction-part-header">
                          <h4>What Will the price of BTC be?</h4>
                          <hr />
                          <Tooltip
                            icon="question"
                            text="The more you stake, the wider your prediction range."
                            onClick={() => {
                              window.open("https://bit.ly/totemFAQs", "_blank");
                            }}
                          />
                        </div>

                        <div className="staking-prediction-part-prediction-and-range">
                          <div className="staking-prediction-part-prediction-and-range-header">
                            <span>Prediction</span>
                            <span>Range</span>
                          </div>
                          <div className="staking-prediction-part-prediction-and-range-value">
                            <span className="staking-prediction-part-prediction-and-range-input">
                              <b
                                style={{
                                  left: `calc(50% - ${calculateBtcPricePredictionDollarPosition()}px)`,
                                }}
                              >
                                $
                              </b>
                              <input
                                defaultValue={Currency.formatByComma(
                                  bitcoinValue
                                )}
                                value={Currency.formatByComma(bitcoinValue)}
                                pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]"
                                onChange={(e) => {
                                  const prediction =
                                    e.target.value.indexOf(",") >= 0
                                      ? e.target.value
                                          .replaceAll(",", "")
                                          .replaceAll("$", "")
                                      : e.target.value;

                                  const btcPrice =
                                    parseFloat(prediction) > 1000000
                                      ? bitcoinValue
                                      : isNaN(parseFloat(prediction))
                                      ? 0
                                      : parseFloat(prediction);

                                  setBitcoinValue(btcPrice);
                                }}
                              />
                            </span>
                            <span style={{ lineHeight: "36px" }}>
                              &plusmn;
                              <Currency
                                unit={CurrencyUnit.DOLLAR}
                                value={range}
                                size={20}
                              />
                            </span>
                          </div>
                          <div className="staking-prediction-part-prediction-and-range-explain">
                            <span>
                              <Currency
                                unit={CurrencyUnit.DOLLAR}
                                value={bitcoinValue - range}
                                size={15}
                              />
                              <span style={{ whiteSpace: "pre" }}> - </span>
                              <Currency
                                unit={CurrencyUnit.DOLLAR}
                                value={bitcoinValue + range}
                                size={15}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Modal>
    );
  }
);

function setModalStyle(isMobile: boolean) {
  let styles: any;

  let customStyles = {
    overlay: {},
    content: {
      background: `url("${process.env.PUBLIC_URL}/assets/images/aaaa.png") center center no-repeat white`,
      backgroundSize: "contain",
      width: "100%",
      maxWidth: 800,
      height: "100%",
      maxHeight: 520,
      border: 0,
      padding: 0,
    },
  };
  if (isMobile) {
    styles = {
      overlay: { backgroundColor: "rgba(0, 0, 0, 0, 0.7)" },
      content: {
        width: "100%",
        maxHeight: "100vh",
        height: "100%",
        inset: "auto",
        left: 0,
        top: 0,
      },
    };
  } else {
    styles = {
      overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
    };
  }
  return {
    overlay: { ...customStyles.overlay, ...styles.overlay },
    content: { ...customStyles.content, ...styles.content },
  };
}
