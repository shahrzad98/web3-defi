export type Summary = {
  id: string;
  totalPools: number;
  totalStaked: string;
};

export interface SummaryData {
  summary: Summary;
}

export interface SummaryVars {
  id: string;
}

export type User = {
  id: string;
  totalStaked: number;
};

export interface UsersData {
  users: User[];
}

export interface UsersVars {
  first: number;
  skip: number;
  where: any;
  orderBy: string;
  orderDirection: string;
}

export type StakingPool = {
  id: string;
  totalStakes: number;
  totalStaked: number;
  startDate: string;
  launchTime: string;
  lockTime: string;
  maturityTime: string;
  sizeAllocation: number;
  usdPrizeAmount: number;
  stakeApr: number;
  isLocked: boolean;
  poolType: string;
};

export interface StakingPoolData {
  stakingPool: StakingPool;
}

export interface StakingPoolVars {
  id: string;
}

export interface StakingPoolsData {
  stakingPools: StakingPool[];
}

export interface StakingPoolsVars {
  first: number;
  skip: number;
  where: any;
  orderBy: string;
  orderDirection: string;
}

export interface Stake {
  id: string;
  pool: StakingPool;
  user: User;
  value: string;
  pricePrediction: string;
  timestamp: number;
}

export interface StakesData {
  stakes: Stake[];
}

export interface StakesVars {
  first: number;
  skip: number;
  where: any;
  orderBy: string;
  orderDirection: string;
}

export type _Block_ = {
  hash: string;
  number: number;
};

export type _Meta_ = {
  block: _Block_;
  deployment: string;
  hasIndexingErrors: boolean;
};

export interface UserData {
  user: User;
}

export interface UserVars {
  id: string;
}

export interface MetaData {
  _meta: _Meta_;
}
