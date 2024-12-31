import moment from "moment";

export const convertDate = (date: Date) => {
  const now = moment();
  const stakeDate = moment(date);
  if (stakeDate < now) {
    return "0D  0H  0M";
  } else {
    const days = stakeDate.diff(now, "days");
    const hours = stakeDate.diff(now.add(days, "days"), "hours");
    const minutes = stakeDate.diff(now.add(hours, "hours"), "m");
    return `${days}D  ${hours}H  ${minutes}M`;
  }
};
