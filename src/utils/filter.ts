import { filter } from "lodash";

export const filterLIstByKey = (list: any, key: any, index: number) =>
  filter(list, (o) => {
    return o[index] !== key;
  });
