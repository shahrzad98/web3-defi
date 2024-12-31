import { StakingPool } from "contracts/types";
import { BigNumber } from "ethers";
import { sortBy } from "lodash";
import { useLocation, useHistory } from "react-router";
import { useTotemToken } from "services/token";
import { TotemsData } from "types/constants";
import { isActivePool } from "utils/pool";

export interface PoolStakeCalculations {
  readonly remainingAmountToStake: number;
  readonly poolSizeAllocation: number;
}

export const calculatePoolRemainingSize = async (
  stakingPool: StakingPool
): Promise<PoolStakeCalculations> => {
  const { toTOTM } = useTotemToken();

  return new Promise((resolve) => {
    if (stakingPool) {
      stakingPool.totalStaked().then((totalStaked: BigNumber) => {
        stakingPool.sizeAllocation().then((poolSizeAllocation: BigNumber) => {
          const totalStakedInTotem = toTOTM(totalStaked);
          const poolSizeAllocationInTotem = toTOTM(poolSizeAllocation);
          const poolSizeLowerBandInTotem = poolSizeAllocationInTotem * 0.95;
          const poolSizeUpperBandInTotem = poolSizeAllocationInTotem * 1.05;

          const minimumAvailableToSake =
            (poolSizeLowerBandInTotem - totalStakedInTotem) / 0.97;
          const maximumAvailableToStake =
            (poolSizeUpperBandInTotem - totalStakedInTotem) / 0.97;

          const remainingAmountToStake = Math.floor(
            (minimumAvailableToSake + maximumAvailableToStake) / 2
          );

          return resolve({
            remainingAmountToStake,
            poolSizeAllocation: Math.floor(poolSizeUpperBandInTotem),
          });
        });
      });
    } else {
      resolve({ remainingAmountToStake: NaN, poolSizeAllocation: NaN });
    }
  });
};
export const getTotem = () => {
  const pathname = useLocation().pathname;
  const array = pathname.split("/");
  const index = array.indexOf("pools") + 1;

  if ((pathname.includes("pools") || pathname === "/") && !array[index]) {
    //history.push(allowShow ? "/pools/all" : "/pools/fox");     // Todo: I had to comment this line, because hotjar need change URL and this line dont allow to it
    return "FOX";
  } else {
    if (array[index]) return array[index].toLocaleUpperCase();
    else {
      return "FOX";
    }
  }
};

export const getCurrentPool = (pools: any) => {
  const currentPool =
    pools &&
      pools.length > 0 &&
      pools.filter((pool) => isActivePool(pool)).length > 0
      ? pools.filter((pool) => isActivePool(pool))[0]
      : null;

  return currentPool;
};
