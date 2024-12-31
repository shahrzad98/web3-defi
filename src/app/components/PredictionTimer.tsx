/**
 *
 * PredictionTimer
 *
 */
import moment from "moment";
import * as React from "react";
import "styles/scss/components.scss";

interface Props {
  endTime?: number;
}

export const PredictionTimer = (props: Props) => {
  const { date, time } = PredictionTimer.convert({
    time: props.endTime,
  });

  return (
    <div className="prediction-timer">
      <span>
        {date} at {time} UTC
      </span>
    </div>
  );
};

PredictionTimer.convert = (param: { time?: number }) => {
  const { time: endTime = new Date().getTime() } = param;

  const date = moment.utc(endTime).format("DD/MM/YY");
  const time = moment.utc(endTime).format("HH:mm");
  return {
    date: date,
    time: time,
    dateTime: (
      <>
        {date} at {time}
      </>
    ),
  };
};
