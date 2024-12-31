/**
 *
 * Content
 *
 */

import React, { memo, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ConnectButton } from "app/components/ConnectButton";
import { ConnectMetamaskModal } from "./components/ConnectMetamaskModal";

import { networks } from "utils/networks";
import "styles/scss/content.scss";
import { getTotem } from "graphql/hooks/usePool";

interface Props {
  isShow?: boolean;
  children: JSX.Element | JSX.Element[];
}

export const Content = memo(({ isShow, children }: Props) => {
  // Todo: Need to get this from context
  const totem = getTotem();
  const supportedChainIds = Object.keys(networks).map((key) => parseInt(key));
  const connectorInjected = new InjectedConnector({ supportedChainIds });
  const { activate } = useWeb3React<Web3Provider>();
  const walletIsConnect = localStorage.getItem("walletIsConnect");
  React.useEffect(() => {
    connectorInjected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized && walletIsConnect === "true") {
        activate(connectorInjected);
      }
    });
  }, []);
  const { account } = useWeb3React<Web3Provider>();

  const [showConnectMetamaskModel, setShowConnectMetamaskModel] = useState(
    false
  );
  // const isShowErrorModal = useSelector(showErrorModalSelector);
  const style = {
    display: isShow ? "block" : "none",
  };
  return (
    <div className="content-main-div">
        <div className="content-main-div-content">
         {children}
      </div>
      <div className="content-login-button-wrapper" style={style}>
        <ConnectButton
          isOpen={showConnectMetamaskModel}
          close={() => setShowConnectMetamaskModel(false)}
          totem={totem}
        />
      </div>
      <ConnectMetamaskModal
        isOpen={showConnectMetamaskModel}
        close={() => setShowConnectMetamaskModel(false)}
        totem={totem}
      />
      {/* <ErrorModal
           isOpen={isShowErrorModal}
           close={() => dispatch(error(false))}
           totem={totem}
         /> */}
    </div>
  );
});
