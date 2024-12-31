/**
 *
 * Tooltip
 *
 */
// @ts-ignore
import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import TradingView from "react-tradingview-widget";
import "styles/scss/components.scss";
interface Props {
  exchange?: string;
  pair?: string;
  height?: number;
  hideTopToolbar?: boolean;
}

/*

 {
  "autosize": true,
  "symbol": "COINBASE:BTCUSDT",
  "interval": "D",
  "timezone": "Etc/UTC",
  "theme": "dark",
  "style": "1",
  "locale": "en",
  "toolbar_bg": "#f1f3f6",
  "enable_publishing": false,
  "hide_top_toolbar": true,
  "hide_legend": true,
  "save_image": false,
  "container_id": "tradingview_3db65"
}

*/

export const TradingViewWidget = (props: Props) => {
  const {
    exchange = "Coinbase",
    pair = "BTCUSDT",
    height = 300,
    hideTopToolbar = false,
  } = props;
  const symbol = `${exchange}:${pair}`;

  return (
    <div className="trading-view-widget" style={{ height: `${height}px` }}>
      <CircularProgress size={60} />
      <TradingView
        symbol={symbol}
        autosize={false}
        theme="dark"
        height={height}
        locale="en"
        hide_top_toolbar={hideTopToolbar}
        hide_legend={false}
        save_image={false}
      />
    </div>
  );
};
