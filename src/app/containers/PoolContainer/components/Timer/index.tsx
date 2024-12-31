/**
 *
 * Timer
 *
 */
import { CircularProgress } from "@material-ui/core";
import { Tooltip } from "app/components/Tooltip";
import useStakingPools from "graphql/hooks/useStakingPools";
import { useStakingContract } from "graphql/useStakingContract";
import moment from "moment";
import * as React from "react";
import { useEffect, useState } from "react";
import { useStakingPool } from "services/contracts";
import "styles/scss/pool-container.scss";

interface Props {
  endTime?: number;
  currentPool: any;
}

export function Timer({ endTime, currentPool }: Props) {
  var { loading: loadingPools } = useStakingPools(0);
  const [days, setDays] = useState<any>("");
  const normalizeTime = (time) => {
    return parseInt(time).toString().length === 1 ? `0${time}` : time;
  };
  let stakingPool = currentPool
    ? currentPool
    : { isLocked: false, startDate: 0, lockTime: 0, id: "" };

  const lockTime = +stakingPool?.lockTime + +stakingPool?.startDate;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateTime = () => {
    var timeNow = moment().unix();
    const timeToWait = lockTime - timeNow;
    var days = Math.floor(timeToWait / (3600 * 24));
    var hours = Math.floor((timeToWait % (3600 * 24)) / 3600);
    var mn = Math.floor((timeToWait % 3600) / 60);
    var sec = Math.floor((timeToWait % 3600) % 60);
    var dDisplay = days > 0 ? days + (days === 1 ? ":" : ":") : "0:";
    var hDisplay = hours > 0 ? hours + (hours === 1 ? ":" : ":") : "0:";
    var mDisplay = mn > 0 ? mn + ":" : "0:";
    var sDisplay = sec > 0 ? sec + "" : "0";
    var dateToWait =
      normalizeTime(dDisplay) +
      normalizeTime(hDisplay) +
      normalizeTime(mDisplay) +
      normalizeTime(sDisplay);

    return dateToWait;
  };
  const [time, setTime] = useState(updateTime() || "00:00:00:00");

  useEffect(() => {
    setTime(updateTime());
    const interval = setInterval(() => {
      setTime(updateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime, updateTime]);

  const gotoWikiPage = () => {
    alert("Yet not decided where to go!");
  };

  const contract = useStakingPool(stakingPool?.id);
  const { getDays } = useStakingContract(contract, stakingPool?.id);

  let prevStakingPool;
  const getDaysBeforeLaunchNextPool = () => {
    prevStakingPool = stakingPool;
    getDays().then((value: any) => {
      setDays(value.days);
    });
  };

  useEffect(() => {
    if (stakingPool.id !== prevStakingPool?.id) {
      getDaysBeforeLaunchNextPool();
    }
  }, [stakingPool, contract]);

  return (
    <div className="pc-timer-main-div">
      <span className="pc-timer-title">Next Pool Departs</span>
      <Tooltip
        position="left"
        text={`A new pool will launch every ${days} days or if the max pool size is met, whichever is sooner`}
        onClick={() => {
          window.open("https://bit.ly/totemFAQs", "_blank");
        }}
      />
      <div className="pc-timer-time-wrapper">
        {loadingPools ? (
          <CircularProgress size={60} />
        ) : (
          <div className="pc-timer">{time}</div>
        )}
        <div className="pc-timer-names-wrapper">
          <div className="pc-timer-names-item">Days</div>
          <div className="pc-timer-names-item">Hrs</div>
          <div className="pc-timer-names-item">Mins</div>
          <div className="pc-timer-names-item">Secs</div>
        </div>
      </div>
    </div>
  );
}
