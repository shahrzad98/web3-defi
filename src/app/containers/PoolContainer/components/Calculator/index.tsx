/**
 *
 * Calculator
 *
 */
import { BigNumber } from "@ethersproject/bignumber";
import { CircularProgress } from "@material-ui/core";
import { Currency, CurrencyUnit } from "app/components/Currency";
import CustomizedSlider from "app/components/CustomSlider";
import Switch from "app/components/Switch";
import { Tooltip } from "app/components/Tooltip";
import usePrices from "app/hooks/prices";
import { useStakingContract } from "graphql/useStakingContract";
import moment from "moment";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useStakingPool } from "services/contracts";
import { AppContext } from "state/app/appContext";
import { TotemsData } from "../../../../../types/constants";

interface Props {
  showModal?: () => void;
  btcLastPrice: number;
  tokenPrice: number;
  totem: string;
  loadingPrice: boolean;
  loadingPools: boolean;
  stakingPool: any;
  poolType: string;
}

export function Calculator({
  showModal,
  btcLastPrice: btcPrice,
  tokenPrice: totmPrice,
  totem,
  loadingPrice,
  loadingPools,
  stakingPool,
  poolType,
}: Props) {
  const { dispatch } = useContext(AppContext);
  const contract = useStakingPool(stakingPool?.id);
  const {
    getCollaborationReward,
    getBTCPrizeAmountInUSD,
    getStakingAPR,
    getBTCPrizeAmount,
    getTotemPrizeAmountInUSD,
    getTotemPrizeAmount,
    getCollaborationRange,
  } = useStakingContract(contract, stakingPool?.id);
  const [selectValue, setSelectValue] = useState(1);
  const [inputValue, setInputValue] = useState(1000);
  const [checkBoxValue, setCheckBoxValue] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [calculationData, setCalculationData] = useState<{
    btcPrizeAmountInUSD?: number;
    stakingApr?: number;
    stakingAprPercent?: number;
    btcPrizeAmount?: number;
    totemPrizeAmountInUSD?: number;
    totemPrizeAmount?: number;
    collaborationReward?: number;
    collaborationRange?: number;
  }>({});

  const getPoolDataForCalculationFromContract = () => {
    let daysLeft;
    if (stakingPool) {
      const { startDate, lockTime, maturityTime } = stakingPool;
      const maturityDate = BigNumber.from(startDate)
        .add(lockTime)
        .add(maturityTime)
        .mul(1000)
        .toNumber();
      const now = moment();
      const momentDate = moment(new Date(maturityDate));
      daysLeft = momentDate.diff(now, "days");
    } else {
      daysLeft = TotemsData[poolType].days;
    }

    Promise.all([
      getCollaborationReward(),
      getBTCPrizeAmount(),
      getBTCPrizeAmountInUSD(),
      getTotemPrizeAmount(),
      getTotemPrizeAmountInUSD(),
      getStakingAPR(daysLeft),
      getCollaborationRange(),
    ]).then((values: any) => {
      const [
        collaborationReward,
        btcPrizeAmount,
        btcPrizeAmountInUSD,
        totemPrizeAmount,
        totemPrizeAmountInUSD,
        apr,
        collaborationRange,
      ] = values;

      setCalculationData({
        collaborationReward,
        btcPrizeAmount,
        btcPrizeAmountInUSD,
        totemPrizeAmount,
        totemPrizeAmountInUSD,
        stakingApr: apr.apr,
        stakingAprPercent: apr.percent,
        collaborationRange,
      });
    });
  };

  const getCollabRatio = () => {
    if (checkBoxValue) {
      return 1 + calculationData.collaborationReward;
    }

    return 1;
  };

  const selectValues = {
    1: 37.5,
    2: 20,
    3: 11,
    4: 2.5,
    5: 1,
  };

  useEffect(() => {
    console.log({ poolType });
    getPoolDataForCalculationFromContract();
  }, [stakingPool, contract, poolType, totmPrice, btcPrice]);

  useEffect(() => {
    setCalculationData((prev) => ({
      ...prev,
      btcPrizeAmountInUSD: prev.btcPrizeAmount * btcPrice,
      totemPrizeAmountInUSD: prev.totemPrizeAmount * totmPrice,
    }));
  }, [btcPrice, totmPrice]);

  const onChangeSelect = (e) => {
    setSelectValue(e.target.value);
  };

  const onChangeInput = (e) => {
    const amount =
      e.target.value.indexOf(",") >= 0
        ? e.target.value.replaceAll(",", "")
        : e.target.value;

    setInputValue(
      parseFloat(amount) > 1000000
        ? inputValue
        : isNaN(parseFloat(amount))
        ? 0
        : parseFloat(amount)
    );
  };

  const onChangeCheckBox = (e: boolean) => setCheckBoxValue(e);
  const onChangeSlider = (e: number) => setSliderValue(e);

  const constPart =
    (0.97 + calculationData.stakingApr + 0.1 * Number(sliderValue)) *
    inputValue;
  const sharedPart =
    (selectValues[selectValue] / 100) * calculationData.totemPrizeAmount;
  const allTotem = getCollabRatio() * (constPart + sharedPart);
  const allBTC =
    getCollabRatio() *
    Number(
      Number(
        ((calculationData.btcPrizeAmountInUSD / btcPrice) *
          selectValues[selectValue]) /
          100
      ).toFixed(5)
    );
  const allPrize = allTotem * totmPrice + allBTC * btcPrice;

  useEffect(() => {
    if (!isNaN(allPrize)) {
      dispatch({
        type: "setCalculatedRewards",
        value: Object.values(selectValues).map((value) => {
          return {
            totem:
              getCollabRatio() *
              (constPart + (value / 100) * calculationData.totemPrizeAmount),
            btc:
              getCollabRatio() *
              Number(
                Number(
                  (calculationData.btcPrizeAmountInUSD / btcPrice) *
                    (value / 100)
                ).toFixed(5)
              ),
          };
        }),
      });
    }
  }, [
    checkBoxValue,
    inputValue,
    btcPrice,
    totmPrice,
    calculationData.stakingApr,
    sliderValue,
    calculationData.totemPrizeAmount,
    calculationData.btcPrizeAmountInUSD,
  ]);

  return (
    <div className="pc-calculator-main-div">
      <div className="pc-calculator-top">
        <div className="next">
          <span>Returns Calculator</span>
          <Tooltip
            text="Stake to a TOTM pool and be given a chance to predict the price of BTC"
            onClick={() => {
              window.open("https://bit.ly/totemFAQs", "_blank");
            }}
          />
        </div>
        <div className="pc-calculator-row-calc">
          <p>If you stake</p>
          <input
            className={"calculator-input-number"}
            value={Currency.formatByComma(inputValue)}
            onChange={onChangeInput}
          />
          <p> TOTM</p>
        </div>
        <div className="pc-calculator-row-calc">
          <p>and come in</p>
          <select
            className={"calculator-select-place"}
            value={selectValue}
            onChange={onChangeSelect}
          >
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4-10th</option>
            <option value="5">11-25th</option>
          </select>
          <p>place...</p>
        </div>
        <div className="pc-calculator-space-between" />
        <div className="pc-calculator-row-small">
          <p>Collaborative rewards</p>
          <Tooltip
            title="New"
            text={`If the weighted average prediction is within $${calculationData.collaborationRange} of the BTC price at pool maturity, everyone receives additional rewards.`}
            position="left"
          />
          <Switch status={checkBoxValue} onChange={setCheckBoxValue} />
        </div>
        <div className="pc-calculator-row-small">
          <p>Enhance rewards</p>
          <div className="pc-calculator-slider-wrapper">
            <CustomizedSlider
              totem={totem}
              value={1}
              onChangeValue={onChangeSlider}
              disabled
            />
          </div>
          <Tooltip
            title="COMING SOON"
            text="Staking early will earn you greater returns."
            position="left"
          />
        </div>
      </div>
      <div className="pc-calculator-bottom">
        <span>You stand to win:</span>
        <div className="pc-calculator-currency-block">
          <div className="pc-calculator-amount-currency">
            <h5>BTC</h5>
            {loadingPrice || loadingPools || isNaN(allPrize) ? (
              <>
                <div>
                  <CircularProgress size={15} />
                </div>
              </>
            ) : (
              <>
                <Currency
                  unit={CurrencyUnit.NO_SYMBOL}
                  value={allBTC}
                  fixed={5}
                  localization={false}
                  size={20}
                />
                <h6>
                  (
                  <Currency
                    unit={CurrencyUnit.DOLLAR}
                    value={allBTC * btcPrice}
                    fixed={0}
                    size={12}
                  />
                  )
                </h6>
              </>
            )}
          </div>
          <p>&</p>
          <div className="pc-calculator-amount-currency">
            <h5>TOTM</h5>
            {loadingPrice || loadingPools || isNaN(allPrize) ? (
              <>
                <div>
                  <CircularProgress size={20} />
                </div>
              </>
            ) : (
              <>
                <Currency
                  unit={CurrencyUnit.NO_SYMBOL}
                  value={allTotem}
                  size={15}
                />
                <h6>
                  (
                  <Currency
                    unit={CurrencyUnit.DOLLAR}
                    value={allTotem * totmPrice}
                    fixed={0}
                    size={12}
                  />
                  )
                </h6>
              </>
            )}
          </div>
        </div>
        <div className="pc-calculator-amount-currency">
          <h4>Total reward:</h4>
          <h2>
            {loadingPrice || isNaN(allPrize) ? (
              <div>
                <CircularProgress size={30} />
              </div>
            ) : (
              <Currency unit={CurrencyUnit.DOLLAR} value={allPrize} />
            )}
          </h2>
        </div>
      </div>
    </div>
  );
}
