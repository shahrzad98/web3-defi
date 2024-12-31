import axios from "axios";
import React from "react";

interface DocLoaderProps {
  readonly name: string;
  readonly fetched: boolean;
  readonly children: any;

  onLoaded: Function;
}

export const DocLoader = ({
  name,
  fetched,
  onLoaded,
  children,
}: DocLoaderProps) => {
  let path;

  if (name === "terms") {
    path =
      "https://docs.google.com/document/d/e/2PACX-1vQgg7M1EU0CFfpXUfWbEp38h5ikenr2wizNgnNPTSCGOq_VHqnNRttjiNWOanUSI3zQy7GbR8e0BH64/pub?embedded=true";
  } else if (name === "privacy") {
    path =
      "https://docs.google.com/document/d/e/2PACX-1vT77DPvUDzORf6DrwBTlgV4coyMLsnE0ahUtS5BosT5m5RhVUZDredwC5uhiqD_anj4kTH7g7dn2-wW/pub?embedded=true";
  } else if (name === "restricted") {
    path =
      "https://docs.google.com/document/d/e/2PACX-1vTb2dcP2TdVJWbLZ89nd-nsr7DGeIMfbXIO8GKLC-T0YKdtykEkKgcemoM2DXwjVOkhI9QA57PHqRKE/pub?embedded=true";
  }

  if (!fetched) {
    throw axios
      .request({
        method: "GET",
        url: path,
        headers: { "Content-Type": "text/html; charset=UTF-8" },
      })
      .then((data) => {
        const html = data.data;
        const content = html.substring(0, html.indexOf("</html>") + 7);
        onLoaded(content);
      });
  } else {
    return <>{children}</>;
  }
};
