import { useQuery } from "@apollo/client";
import { STAKES } from "../queries/stakes";
import { StakesData, StakesVars } from "../models";

export const STAKES_PER_PAGE = 1000;

const useStakes = (filter: any) => {
  const { data, loading, refetch } = useQuery<StakesData, StakesVars>(STAKES, {
    variables: {
      first: STAKES_PER_PAGE,
      orderBy: "timestamp",
      orderDirection: "asc",
      where: filter,
      skip: 0,
    },
    notifyOnNetworkStatusChange: true,
    pollInterval: 60000, // Every 1 minutes
  });
  return {
    stakes: data ? data.stakes : [],
    loading,
    refetch,
  };
};

export default useStakes;
