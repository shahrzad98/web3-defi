import { useQuery } from "@apollo/client";
import { StakingPoolsData, StakingPoolsVars } from "../models";
import { STAKINGPOOLS } from "../queries/stakingPools";

export const POOLS_PER_PAGE = 10;

const useStakingPools = (pageNumber: number, filter: any = {}) => {
  const { data, loading, refetch } = useQuery<
    StakingPoolsData,
    StakingPoolsVars
  >(STAKINGPOOLS, {
    variables: {
      first: POOLS_PER_PAGE,
      where: filter,
      skip: pageNumber * POOLS_PER_PAGE,
      orderBy: "startDate",
      orderDirection: "desc",
    },
    notifyOnNetworkStatusChange: true,
    pollInterval: 600000, // Every 10 minutes
  });

  return {
    pools: data ? data.stakingPools : [],
    loading,
    refetch,
  };
};

export default useStakingPools;
