/**
 *
 * Scale
 *
 */
import * as React from "react";
import "styles/scss/components.scss";

interface Props {
  fill: number;
}

export const Scale = (props: Props) => {
  const scaleFillStyle = {
    width: `${props.fill >= 100 ? 100 : props.fill}%`,
  };
  return (
    <div className="comp-scale-main-div">
      <div className="comp-scale-scale-fill" style={scaleFillStyle} />
    </div>
  );
};
