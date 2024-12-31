/**
 *
 * Asynchronously loads the component for UserData
 *
 */

import { lazyLoad } from "utils/loadable";
import { CircularProgress } from "@material-ui/core";
import React from "react";

export const UserData = lazyLoad(
  () => import("./index"),
  (module) => module.UserData,
  { fallback: <CircularProgress size={100} /> }
);
