import usePrices from "app/hooks/prices";
import { StakingPool } from "contracts/types";
import { BigNumber } from "ethers";
import moment from "moment";
import { useTotemToken } from "services/token";
import { TotemsData } from "../types/constants";
import { getTotem } from "./hooks/usePool";

const useStakingContract = (contract: StakingPool, stakingPoolId: string) => {
  const poolType = getTotem();
  const { toTOTM } = useTotemToken();
  const { btcPrice, totmPrice } = usePrices();

  const fallback = (key: string) => {
    return TotemsData[poolType][key];
  };

  const shouldUseFallBack = () => {
    return !contract || !stakingPoolId;
  };

  const calculateAprBasedOnStakedDays = (ratio: number, days: number) => {
    const apr = Math.pow(1 + ratio, days / 365);
    const finalAPR = apr - 1;

    return Number(finalAPR.toFixed(5));
  };

  const getDays = async () => {
    const fallbackKey = "days";

    return new Promise((resolve) => {
      if (shouldUseFallBack()) {
        const days = fallback(fallbackKey);

        return resolve({ days });
      }

      Promise.all([
        contract.startDate(),
        contract.lockTime(),
        contract.maturityTime(),
      ])
        .then((values: any) => {
          const [startDate, lockTime, maturityTime] = values;
          const timestamp = BigNumber.from(startDate)
            .add(lockTime)
            .add(maturityTime)
            .mul(1000)
            .toNumber();
          const momentTimestamp = moment(new Date(timestamp));
          const momentCurrent = moment();
          const days = moment(momentTimestamp).diff(momentCurrent, "days");

          resolve({ days });
        })
        .catch(() => {
          const days = fallback(fallbackKey);

          resolve({ days });
        });
    });
  };

  const getStakingAPR = async (days: number) => {
    const fallbackKey = "stakingReward";

    return new Promise((resolve) => {
      if (shouldUseFallBack()) {
        const percent = fallback(fallbackKey);
        const apr = calculateAprBasedOnStakedDays(percent, days);

        return resolve({ apr, percent });
      }

      contract
        .stakeApr()
        .then((value: BigNumber) => {
          const percent = value.toNumber() / 10000;
          const apr = calculateAprBasedOnStakedDays(percent, days);
          resolve({ apr, percent });
        })
        .catch(() => {
          const percent = fallback(fallbackKey);
          const apr = calculateAprBasedOnStakedDays(percent, days);
          resolve({ apr, percent });
        });
    });
  };

  const getTotemPrizeAmount = async () => {
    const fallbackKey = "totemReward";

    return new Promise((resolve) => {
      if (shouldUseFallBack()) {
        return resolve(fallback(fallbackKey));
      }

      contract
        .prizeAmount()
        .then((value: BigNumber) => {
          resolve(toTOTM(value));
        })
        .catch(() => {
          resolve(fallback(fallbackKey));
        });
    });
  };

  const getTotemPrizeAmountInUSD = async () => {
    return new Promise((resolve) => {
      getTotemPrizeAmount().then((totemPrizeAmount: number) => {
        return resolve(totmPrice * totemPrizeAmount);
      });
    });
  };

  const getBTCPrizeAmountInUSD = async () => {
    const fallbackKey = "btcUsdPrize";

    return new Promise((resolve) => {
      if (shouldUseFallBack()) {
        return resolve(fallback(fallbackKey));
      }

      contract
        .usdPrizeAmount()
        .then((value: BigNumber) => {
          resolve(toTOTM(value));
        })
        .catch(() => {
          resolve(fallback(fallbackKey));
        });
    });
  };

  const getBTCPrizeAmount = async () => {
    const fallbackKey = "btcUsdPrize";

    return new Promise((resolve) => {
      if (shouldUseFallBack()) {
        let btcInUsd = fallback(fallbackKey);
        let btcReward = btcInUsd / btcPrice;

        return resolve(btcReward);
      }

      getBTCPrizeAmountInUSD().then((btcPrizeAmountInUSD: number) => {
        if (contract) {
          const value = Number(
            Number(btcPrizeAmountInUSD / btcPrice).toFixed(5)
          );
          resolve(value);
        }
      });
    });
  };

  const getCollaborationReward = async () => {
    const fallbackKey = "collaborateBonus";

    return new Promise((resolve) => {
      if (shouldUseFallBack()) {
        return resolve(fallback(fallbackKey));
      }

      contract
        .potentialCollabReward()
        .then((value: BigNumber) => {
          resolve(value.toNumber() / 10000);
        })
        .catch(() => {
          resolve(fallback(fallbackKey));
        });
    });
  };

  const getCollaborationRange = async () => {
    const fallbackKey = "collaborateRange";

    return new Promise((resolve) => {
      if (shouldUseFallBack()) {
        return resolve(fallback(fallbackKey));
      }

      contract
        .collaborativeRange()
        .then((value: BigNumber) => {
          resolve(value.toNumber() / 100000000);
        })
        .catch(() => {
          resolve(fallback(fallbackKey));
        });
    });
  };

  return {
    getDays,
    getStakingAPR,
    getBTCPrizeAmount,
    getBTCPrizeAmountInUSD,
    getTotemPrizeAmount,
    getTotemPrizeAmountInUSD,
    getCollaborationRange,
    getCollaborationReward,
  };
};

export { useStakingContract };
