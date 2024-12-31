/**
 *
 * PercentageGage
 *
 */
import * as React from "react";
import "styles/scss/components.scss";

interface Props {
  percent: number | string;
}

export const PercentGage = (props: Props) => {
  return (
    <div className="percent-gage">
      <progress value="10" max="100"></progress>
    </div>
  );
};
