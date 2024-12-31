/**
 *
 * Header
 *
 */
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ConnectButton } from "app/components/ConnectButton";
import { useHistory } from "react-router-dom";
import { Icon } from "app/components/Icon";
import OpenBeta from "app/components/OpenBeta";
import Transactions from "app/components/Transactions";
import { getTotem } from "graphql/hooks/usePool";
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "styles/scss/header.scss";
import MobileMenuButton from "./components/mobile-menu-button/MobileMenuButton";
import { currentPath } from "utils/path";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const [showPools, setShowPools] = useState(false);
  const [activePath, setActivePath] = useState<string>(
    currentPath(location.pathname)
  );
  const [mobileSliderClass, setMobileSliderClass] = useState("hide");
  const { account } = useWeb3React<Web3Provider>();
  const totem = getTotem();
  const history = useHistory();
  const [showConnectMetamaskModel, setShowConnectMetamaskModel] = useState(
    false
  );

  const externals = [
    {
      name: "Uniswap",
      url: `https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${process.env.REACT_APP_UNISWAP_CONTRACT_ADDRESS}`,
    },
    {
      name: "Gate.io",
      url: "https://www.gate.io/en/trade/TOTM_USDT",
    },
    {
      name: "Pancake Swap",
      url: `https://exchange.pancakeswap.finance/#/swap?outputCurrency=${process.env.REACT_APP_UNISWAP_CONTRACT_ADDRESS}`,
    },
    {
      name: "Duck Bridge",
      url: "https://duckbridge.io",
    },
  ];

  return (
    <>
      <header className="app-header">
        <Link to="/">
          <Icon url={"logo-white.svg"} width={90} height={25} />
        </Link>

        <div className="middle-element">
          <div className="hint-links">
            <a
              href="https://www.youtube.com/watch?v=LMI1g37yi6g"
              target="_blank"
              rel="noreferrer"
            >
              How to TOTEM ?
            </a>
            <a
              href="https://docs.google.com/document/d/1geWWJ73JSIexhwvozNnGvx4DKqJ3X_ck/edit?usp=sharing&ouid=102874357959007446897&rtpof=true&sd=true"
              target="_blank"
              rel="noreferrer"
            >
              Totem Guide
            </a>
          </div>
          <div className="desktop-size">&nbsp;</div>

          <div className="mobile-size">
            <div
              className="mobile-triple-line"
              onClick={() => {
                setMobileSliderClass(
                  mobileSliderClass === "hide" ? "show" : "hide"
                );
              }}
            >
              ...
            </div>
            <div className={`mobile-slider-menu ${mobileSliderClass}`}>
              <div className="mobile-slider-menu-expandable-pool">
                <div className="button">
                  <div
                    onClick={() => setShowPools((prev) => !prev)}
                    className="menu-expandable-pool-button"
                  >
                    <img src="/assets/images/totem.svg" />
                    POOLS
                    <div
                      className={
                        showPools
                          ? "mobile-slider-menu-arrow rotate-arrow"
                          : "mobile-slider-menu-arrow arrow "
                      }
                    >
                      <Icon
                        url="keyboard_arrow_down_white_24dp.svg"
                        width={10}
                        height={10}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={
                    showPools ? "mobile-pool-items-show" : "mobile-pool-items"
                  }
                >
                  <div className="item">
                    <MobileMenuButton
                      key="0"
                      onPathChange={(pathName) => {
                        setActivePath(pathName);
                      }}
                      isActive={activePath === "FOX"}
                      name="FOX"
                      path="/pools/fox"
                    />
                  </div>
                  <div className="item">
                    <MobileMenuButton
                      key="1"
                      onPathChange={(pathName) => {
                        setActivePath(pathName);
                      }}
                      isActive={activePath === "OWL"}
                      name="OWL"
                      path="/pools/owl"
                    />
                  </div>
                  <div className="item">
                    <MobileMenuButton
                      key="2"
                      onPathChange={(pathName) => {
                        setActivePath(pathName);
                      }}
                      isActive={activePath === "WOLF"}
                      name="WOLF"
                      path="/pools/wolf"
                    />
                  </div>
                </div>
              </div>
              <div className="user">
                <MobileMenuButton
                  key="3"
                  onPathChange={(pathName) => {
                    setActivePath(pathName);
                  }}
                  isActive={activePath === "USER"}
                  name="USER"
                  path="/user"
                  isMobile={false}
                  img="account-white.svg"
                />
              </div>
              {externals.map((external) => {
                const { name, url } = external;

                return (
                  <div>
                    <a
                      onClick={() => {
                        setMobileSliderClass("hide");
                      }}
                      href={url}
                      target="_blank"
                    >
                      <img src="/assets/images/uniswap-white.svg" />
                      {name}
                    </a>
                  </div>
                );
              })}
              <div>
                <a
                  onClick={() => {
                    setMobileSliderClass("hide");
                  }}
                  href="https://bit.ly/totemFAQs"
                  target="_blank"
                >
                  FAQs
                </a>
              </div>
              <div>
                <a
                  onClick={() => {
                    setMobileSliderClass("hide");
                    window.open(
                      "mailto:" +
                        "support@totemfi.com" +
                        "?cc=" +
                        "support" +
                        "&subject=" +
                        "" +
                        "&body=" +
                        ""
                    );
                  }}
                  target="_blank"
                >
                  Support
                </a>
              </div>
            </div>
          </div>
        </div>
        <ConnectButton
          isOpen={showConnectMetamaskModel}
          close={() => setShowConnectMetamaskModel(false)}
          totem={totem}
        />
        <Transactions />
        <OpenBeta />
      </header>
    </>
  );
};
