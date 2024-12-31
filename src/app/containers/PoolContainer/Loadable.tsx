/**
 *
 * Asynchronously loads the component for PoolContainer
 *
 */

import { lazyLoad } from "utils/loadable";
import { CircularProgress } from "@material-ui/core";
import React from "react";

export const PoolContainer = lazyLoad(
  () => import("./index"),
  (module) => module.PoolContainer,
  {
    fallback: <div style={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress size={200} />
    </div>
  }
);
