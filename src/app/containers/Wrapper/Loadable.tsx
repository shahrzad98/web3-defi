/**
 *
 * Asynchronously loads the component for Wrapper
 *
 */

import { lazyLoad } from "utils/loadable";
import { CircularProgress } from "@material-ui/core";
import React from "react";

export const Wrapper = lazyLoad(
  () => import("./index"),
  (module) => module.Wrapper,
  { fallback: <CircularProgress size={100} /> }
);
