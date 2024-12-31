/**
 *
 * Sidebar
 *
 */
import React, { memo } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { Menu } from "./Menu";
import { Icon } from "./Icon";
import "styles/scss/components.scss";

export const Sidebar = memo(() => {
  const { account } = useWeb3React<Web3Provider>();

  return (
    <div className="comp-sidebar-main-div">
      <Menu isLogin={!!account} />
      <div className="comp-sidebar-sidebar-bottom">
        <div className="social-links">
          <Icon
            url={"telegram-dark.svg"}
            width={30}
            height={30}
            margin={"0 0 15px 15px"}
            cursor={"pointer"}
            onClick={() => window.open("https://t.me/totemfi", "_blank")}
          />
          <Icon
            url={"twitter-dark.svg"}
            width={30}
            height={30}
            margin={"0 0 0 15px"}
            cursor={"pointer"}
            onClick={() => window.open("https://twitter.com/TotemFi", "_blank")}
          />
        </div>
      </div>
    </div>
  );
});
