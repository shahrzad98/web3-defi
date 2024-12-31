export type Totems = "fox" | "wolf" | "owl";

export enum Urls {
  FOX = "fox",
  WOLF = "wolf",
  OWL = "owl",
  USER = "user",
}
export interface Totem {
  name: string;
  color: string;
  mobileColor: string;
}

export enum LocalStorageKeys {
  AUTH_TOKEN = "authToken",
}
