import { useQuery } from "@apollo/client";
import { StakingPoolData, StakingPoolVars } from "../models";
import { STAKINGPOOL } from "../queries/stakingPool";

const useStakingPool = (id: string) => {
  const { data, loading } = useQuery<StakingPoolData, StakingPoolVars>(
    STAKINGPOOL,
    {
      variables: {
        id: id?.toLowerCase(),
      },
      notifyOnNetworkStatusChange: true,
      pollInterval: 60000,
    }
  );

  return {
    data,
    loading,
  };
};

export default useStakingPool;
