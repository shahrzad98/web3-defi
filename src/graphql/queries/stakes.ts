import gql from "graphql-tag";

export const STAKES = gql`
  query stakes(
    $first: Int
    $skip: Int
    $where: Stake_filter
    $orderBy: Stake_orderBy
    $orderDirection: OrderDirection
  ) {
    stakes(
      first: $first
      skip: $skip
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      value
      timestamp
      pricePrediction

      pool {
        id
        poolType
        totalStakes
        totalStaked
        startDate
        lockTime
        maturityTime
        sizeAllocation
        stakeApr
        isLocked
        isMatured
      }

      user {
        id
        totalStaked
      }
    }
  }
`;

export const stakesQueryVars = {
  first: 10,
  where: {},
  orderBy: "timestamp",
  orderDirection: "desc",
};
