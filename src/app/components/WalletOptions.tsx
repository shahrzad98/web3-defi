import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { PortisConnector } from "@web3-react/portis-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import * as React from "react";
import "styles/scss/components.scss";
import "styles/scss/pool-container.scss";
import { TotemsData } from "types/constants";
import { IChainData } from "utils/chain";
import { networks ,rpc_urls} from "utils/networks";
import { Icon } from "./Icon";

interface Props {
  totem: string;
  isOpen: boolean;
  close: () => void;
}

export const WalletOptions = ({ totem, isOpen, close }: Props) => {
  const isMobile = false;
  const POLLING_INTERVAL = 12000;

  //frame wallet initiate and supported chain
  //const frame = new FrameConnector({ supportedChainIds: [1] })

  // lattice wallet connect + support chain

  // const lattice = new LatticeConnector({
  //   chainId: 4,
  //   appName: "TotemFi",
  //   url: RPC_URLS[4],
  // });

  const supportedChainIds = Object.keys(networks).map((key) => parseInt(key));

  const connectorInjected = new InjectedConnector({ supportedChainIds });


  const { chainId, activate, deactivate, account } = useWeb3React<
    Web3Provider
  >();
  const [chain, setChain] = React.useState<IChainData>(undefined);

    // formatic connect
    // const fortmatic = new FortmaticConnector({
    //   apiKey: `${process.env.REACT_APP_FORTMATIC_API_KEY}`,
    //   chainId: 4,
    // });
    // chainId: supportedChainIds[0],
  

  // this function allow wallet Connector connexion
  const walletconnect = new WalletConnectConnector({
    rpc: rpc_urls,
    supportedChainIds,
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
  });
  // this function enable injected wallet
  const connectNetwork = () => {
    activate(connectorInjected);
    localStorage.setItem("walletIsConnect","true");
  };

  const walletlink = new WalletLinkConnector({
    url: rpc_urls[supportedChainIds[0]],
    appName: "TotemFi App",
    supportedChainIds
  });

  // portis

  // const portis = new PortisConnector({
  //   dAppId: `${process.env.REACT_APP_PORTIS_DAPP_ID}`,
  //   networks: [4],
  // });
  // networks: supportedChainIds,

  const totemModalHeaderBgStyle = {
    minWidth: 0, // dummy style
    "@media screen and (maxWidth: 450px)": {
      backgroundColor: TotemsData[totem].color,
    },
  };

  const totemWrapperBgStyle = {
    minWidth: 0, // dummy style
    "@media screen and (maxWidth: 450px)": {
      backgroundColor: "#739BA2",
    },
  };

  const wrapperLinkBgStyle = {
    minWidth: 0, // dummy style
    "&:hover": {
      border: `1px solid ${TotemsData[totem].color}`,
    },
  };

  const buttonBgStyle = {
    backgroundColor: TotemsData[totem].color,
  };

  return (
    <div className="order-container">
      <div
        className="pc-predict-model-totem-wrapper"
        style={totemModalHeaderBgStyle}
      >
        <div
          className="pc-predict-model-totem-wrapper"
          style={totemWrapperBgStyle}
        >
          <Icon
            url={`${totem.toLowerCase()}-white.svg`}
            height={20}
            width={20}
          ></Icon>
        </div>
        <p>Connect Wallet</p>
        <Icon
          url={`close-${isMobile ? "grey" : "white"}.svg`}
          height={15}
          width={15}
          cursor={"pointer"}
          onClick={(event): void => {
            event.stopPropagation();

            close();
          }}
        ></Icon>
      </div>
      <div className="order-list">
        <div
          className="comp-wrapper-link"
          style={wrapperLinkBgStyle}
          onClick={() => {
            connectNetwork();
            close();
          }}
        >
          {" "}
          <div className="comp-connect-button-message">
            <p>Metamask</p>
          </div>
          <img
            alt=""
            src={`${process.env.PUBLIC_URL}/assets/images/metamask-icon.png`}
            width={24}
            height={24}
          />
        </div>
        <div
          className="comp-wrapper-link"
          onClick={() => {
            activate(walletconnect);
            close();
          }}
        >
          {" "}
          <div className="comp-connect-button-message">
            <p>WalletConnect</p>
          </div>
          <img
            alt=""
            src={`${process.env.PUBLIC_URL}/assets/images/walletconnect-logo.svg`}
            width={24}
            height={24}
          />
        </div>
        <div
          className="comp-wrapper-link"
          onClick={() => {
            activate(walletlink);
            close();
          }}
        >
          {" "}
          <div className="comp-connect-button-message">
            <p>Coinbase Wallet</p>
          </div>
          <img
            alt=""
            src={`${process.env.PUBLIC_URL}/assets/images/coinbase.png`}
            width={24}
            height={24}
          />
        </div>

        {/* <WrapperLink
							 background={TotemsData[totem].color}
							 onClick={() => { activate(lattice); close() }}
						 >
							 {" "}
							 <Message>
								 <p>Connect Lattice</p>
								 <small>Sign in from metamask browser</small>
							 </Message>
							 <img
								 alt=""
								 src={"assets/images/walletconnect-logo.svg"}
								 width={24}
								 height={24}
							 />
						 </WrapperLink> */}

        {/* <WrapperLink
							 background={TotemsData[totem].color}
							 onClick={() => { activate(fortmatic); close() }}
						 >
							 {" "}
							 <Message>
								 <p>Connect Formatic</p>
								 <small>Sign in from metamask browser</small>
							 </Message>
							 <img
								 alt=""
								 src={"assets/images/walletconnect-logo.svg"}
								 width={24}
								 height={24}
							 />
						 </WrapperLink> */}

        {/* <div
          className="comp-wrapper-link"
          onClick={() => {
            activate(fortmatic);
            close();
          }}
        >
          {" "}
          <div className="comp-connect-button-message">
            <p>Fortmatic</p>
          </div>
          <img
            alt=""
            src={`${process.env.PUBLIC_URL}/assets/images/fortmatic.png`}
            width={24}
            height={24}
          />
        </div> */}

        {/* <div
          className="comp-wrapper-link"
          onClick={() => {
            activate(portis);
            close();
          }}
        >
          {" "}
          <div className="comp-connect-button-message">
            <p>Portis</p>
          </div>
          <img
            alt=""
            src={`${process.env.PUBLIC_URL}/assets/images/portis.png`}
            width={24}
            height={24}
          />
        </div> */}

        {/* <WrapperLink
              background={TotemsData[totem].color}
              onClick={() => {
                activate(torus);
                close();
              }}
            >
              {" "}
              <Message>
                <p>Connect Torus</p>
                <small>Sign in from metamask browser</small>
              </Message>
              <img
                alt=""
                src={"assets/images/torus.png"}
                width={50}
                height={50}
              />
            </WrapperLink> */}

        {!account ? null : (
          <div className="comp-connect-button-wrapper">
            <div
              className="comp-connect-button-button"
              style={buttonBgStyle}
              onClick={() => {
                deactivate();
                close();
                (walletconnect as any).close();
                connectorInjected.deactivate();
                localStorage.setItem("walletIsConnect","false");
              }}
            >
              Disconnect
            </div>
          </div>
        )}
      </div>
      <div className="order-footer"></div>
    </div>
  );
};
