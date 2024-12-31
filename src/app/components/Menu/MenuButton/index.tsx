/**
 *
 * MenuButton
 *
 */
import React, { memo } from "react";
import { useHistory } from "react-router-dom";
import { Icon } from "app/components/Icon";
import { TotemsData } from "types/constants";
import { Paths } from "app/constants/paths";
import "styles/scss/components.scss";
import { ReactGAM } from "app/google-analytics/google-analytics";

export interface Props {
  name: string;
  path: string;
  isActive?: boolean;
  isMobile?: boolean;
  onPathChange?: (string) => void;
}

export const MenuButton = memo((props: Props) => {
  const history = useHistory();
  const redirect = (url) => {
    switch (url) {
      case Paths.uniswap:
        return window.open(
          `https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${process.env.REACT_APP_UNISWAP_CONTRACT_ADDRESS}`,
          "_blank"
        );
      case Paths.gate:
        return window.open("https://www.gate.io/en/trade/TOTM_USDT", "_blank");
      case Paths.pancakeSwap:
        return window.open(
          `https://exchange.pancakeswap.finance/#/swap?outputCurrency=${process.env.REACT_APP_UNISWAP_CONTRACT_ADDRESS}`,
          "_blank"
        );
      case Paths.duckBridge:
        return window.open("https://duckbridge.io", "_blank");
      case Paths.faqs:
        return window.open("https://bit.ly/totemFAQs", "_blank");
      case Paths.support:
        return window.open(
          "mailto:" +
            "support@totemfi.com" +
            "?cc=" +
            "support" +
            "&subject=" +
            "" +
            "&body=" +
            ""
        );
      default:
        break;
    }
    props.onPathChange && props.onPathChange(props.name);
    history.push(`${url}`);
  };

  const mainDivStyle = {
    color:
      props.name === "UNISWAP" ||
      props.name === "GATE" ||
      props.name === "PANCAKE_SWAP" ||
      props.name === "DUCK_BRIDGE" ||
      props.name === "FAQS" ||
      props.name === "SUPPORT"
        ? "#272E38"
        : "white",
    borderBottom:
      props.name === "UNISWAP" ||
      props.name === "GATE" ||
      props.name === "PANCAKE_SWAP" ||
      props.name === "DUCK_BRIDGE" ||
      props.name === "FAQS" ||
      props.name === "SUPPORT"
        ? "2px solid black"
        : null,
    backgroundColor:
      props.isActive && props.name !== "UNISWAP"
        ? "#121212"
        : props.isActive && props.name === "UNISWAP"
        ? "#739BA2"
        : props.name === "UNISWAP" ||
          props.name === "GATE" ||
          props.name === "PANCAKE_SWAP" ||
          props.name === "DUCK_BRIDGE" ||
          props.name === "FAQS" ||
          props.name === "SUPPORT"
        ? TotemsData[props.name].color
        : null,
    borderRight: props.isActive ? "solid #FF6700 6px" : null,
    "&:hover": {
      backgroundColor: props.name === "UNISWAP" ? "#739BA2" : "#121212",
    },
    "@media only screen and (maxWidth: 450px)": {
      backgroundColor: TotemsData[props.name].color,
      "&:hover": {
        backgroundColor: TotemsData[props.name].color,
      },
    },
    "@media only screen and (maxWidth: 1100px)": {
      backgroundColor: TotemsData[props.name].color,
    },
  };
  return (
    <div
      {...props}
      className="comp-menu-button-main-div"
      style={mainDivStyle}
      onClick={() => {
        ReactGAM().trackPageView(props.path.toLowerCase());
        redirect(props.path.toLowerCase());
      }}
      {...props}
    >
      <Icon
        url={
          props.isMobile && TotemsData[props.name].iconMobile
            ? TotemsData[props.name].iconMobile
            : TotemsData[props.name].icon
        }
        width={props.isMobile ? 20 : 30}
        height={props.isMobile ? 20 : 30}
      />
      <div className="comp-menu-button-title">
        {TotemsData[props.name].name}
      </div>
      <div className="comp-menu-button-tablet-title">
        {TotemsData[props.name].message}
      </div>
    </div>
  );
});
