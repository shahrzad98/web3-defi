/**
 *
 * Wrapper
 *
 */

import React, { memo } from "react";
import "styles/scss/wrapper.scss";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Wrapper = memo(({ children }: Props) => {
  return (
    <>
      <div className="wrapper-main-div">{children}</div>
    </>
  );
});
