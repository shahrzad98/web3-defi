/**
 *
 * LoginButton
 *
 */
import * as React from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import Popup from "reactjs-popup";
import { Icon } from "./Icon";

//wallet importation

import { WalletOptions } from "./WalletOptions";
import "./modal.css";

// loading?: boolean;
interface Props {
  totem: string;
  isOpen: boolean;
  close: () => void;
}

export const ConnectButton = ({ totem, isOpen, close }: Props) => {
  //support chain wallet connect
  const { account } = useWeb3React<Web3Provider>();
  // display address
  const showAddress =
    account && account.length
      ? `${account.substr(0, 5)}...${account.substr(
          account.length - 4,
          account.length - 1
        )}`
      : null;
  return (
    //pop up to display the different wallet, connect and kill process
    <Popup
      trigger={
        <div className="comp-connect-button-main-div" onClick={() => account}>
          <p>{!account ? "Connect Wallet" : showAddress}</p>
          {!account ? (
            <Icon
              url={"wallet-white.svg"}
              width={25}
              height={25}
              margin={"0 0 0 20px"}
            />
          ) : null}
        </div>
      }
      modal
      nested
    >
      {(close) => <WalletOptions totem={totem} isOpen={isOpen} close={close} />}
    </Popup>
  );
};
