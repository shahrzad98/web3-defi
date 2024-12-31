/**
 *
 * Image
 *
 */
import * as React from "react";
import "styles/scss/components.scss";

interface Props {
  url: string;
  width?: number;
  height?: number;
  margin?: string;
  cursor?: string;
  classes?: string;
  onClick?: (event?: any) => void;
}

export const Icon = (props: Props) => {
  const styles = {
    margin: props.margin || null,
    cursor: props.cursor || null,
    width: props.width,
    height: props.height,
    background: `center no-repeat url("${process.env.PUBLIC_URL}/assets/images/${props.url}")`,
  };
  return (
    <div
      className={`icon-mobile ${props.classes || ""}`}
      onClick={(event) => (props.onClick ? props.onClick(event) : () => {})}
      style={styles}
      {...props}
    ></div>
  );
};
