export interface TotemBackground {
  background?: string;
}

export interface User {
  publicAddress: string;
  balance: number;
  inGame: number;
  btcAddress: string;
}

export interface Prediction {
  id: string;
  bet: number;
  prediction: number;
}
export interface Draw {
  id: number;
  type: string;
  endTime: number;
  users: Prediction[];
}
