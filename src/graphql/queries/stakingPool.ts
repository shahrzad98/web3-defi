import gql from "graphql-tag";

export const STAKINGPOOL = gql`
  query stakingPool($id: String) {
    stakingPool(id: $id) {
      id
      totalStakes
      totalStaked
      startDate
      lockTime
      maturityTime
      sizeAllocation
      usdPrizeAmount
      stakeApr
      isLocked
      isMatured
    }
  }
`;

export const stakingPoolQueryVars = {
  id: "0",
};
