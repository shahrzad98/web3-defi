/* eslint-disable react-hooks/exhaustive-deps */
/**
 *
 * UserData
 *
 */

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { WalletOptions } from "app/components/WalletOptions";
import { ReactGAM } from "app/google-analytics/google-analytics";
import usePrices from "app/hooks/prices";
import useStakes from "graphql/hooks/useStakes";
import { useTotemToken } from "services/token";
import * as React from "react";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "styles/scss/user-data.scss";
import { AccountRewardsAndPools } from "./components/AccountRewardsAndPools";
import { WalletInfo } from "./components/WalletInfo";
import { YourRewards } from "./components/YourRewards";
import useNotification from "../../hooks/useNotification";
import useTransactions from "../../hooks/useTransaction";
import { extractNumbers } from "utils/number";
import { getChainByChainId } from "utils/chain";
import "./modal.css";
import Web3 from "web3";
import { BigNumber } from "ethers";
import { networks } from "utils/networks";
interface Props {
  totem: string;
  isOpen: boolean;
  close: () => void;
}

export function UserData({ totem, isOpen, close }: Props) {
  const { account, error, chainId } = useWeb3React<Web3Provider>();
  const [activeBalance, setActiveBalance ] = React.useState(0);
  const [showDot, setShowDot] = React.useState(true);
  const [showWalletConnector, toggleWalletConnector] = React.useState(false);
  const notification = useNotification();
  const { state: transactionsState } = useTransactions();
  const { balance, getBalance } = useTotemToken(account);
  const [walletBalance, setWalletBalance] = React.useState(balance);
  const web3 = new Web3(Web3.givenProvider);

  React.useEffect(() => {
    account ? setShowDot(false) : setShowDot(true);
  }, [account]);

  React.useEffect(() => {
    const customError = { ...error };
    async function errorHandle(error) {
      if (error) {
        if (customError?.message?.includes("Unsupported chain id")) {
          const chainIds = extractNumbers(error + "");
          const userNetwork = await getChainByChainId(Number(chainIds[0]));
          const correctNetwork = await getChainByChainId(Number(chainIds[1]));

          notification.error(`You are connected to an incorrect network: ${userNetwork.name} </br>
                              Supported networks: ${correctNetwork.name}
                             `);
        } else if (!customError?.message?.includes("test")) {
          notification.error(customError?.message);
        }
      }
    }
    errorHandle(error);
  }, [error]);

  const callToggleWalletConnector = (status) => {
    toggleWalletConnector(status);

    if (status) {
      ReactGAM().trackModalView("connect wallet");
    }
  };

  const { stakes, refetch } = useStakes({
    user: account ? account.toLowerCase() : "0x0",
  });
  const { totmPrice } = usePrices();
  const refetchStakes = () => {
    refetch();
    getBalance();
    setActiveBalance(1);
  };
  React.useEffect(() => {
    if (
      transactionsState?.transactions?.filter((i) => i.status === "done")
        .length > 0 ||
      transactionsState?.transactions.length === 0
    ) {
      refetch();
    }
  }, [transactionsState, balance, account, totmPrice]);

  // const activeStakes = stakes.filter((stake) => !stake.pool.isLocked);
  async function getLastBalance() {
    const chainName = networks[chainId];
    if(chainName) {
    const networkAbi = await import(`contracts/abi/${chainName}.json`).then(
      (module) => module.default
    );

    const tokenABI = networkAbi.contracts.TotemToken.abi;
    const tokenAddress = networkAbi.contracts.TotemToken.address;
    const tokenInst = new web3.eth.Contract(tokenABI, tokenAddress);
    tokenInst.methods
      .balanceOf(account)
      .call()
      .then((bal) => {
        const bi = BigInt(bal);
        const b = BigNumber.from(bi);
        setWalletBalance(b);
      })
      .finally(() => {
        setActiveBalance(2);
      });
    }
  }
  React.useEffect(() => {

    async function updateWallet() {
      if(activeBalance > 0 && activeBalance < 2 ) {
        const chainName = networks[chainId];
        const networkAbi = await import(`contracts/abi/${chainName}.json`).then(
          (module) => module.default
        );
        const tokenAddress = networkAbi.contracts.TotemToken.address;
          var subscription = web3.eth.subscribe('logs', {
            address: tokenAddress
        }, async function  (error, result){
            if (!error) {
            }
                
        })
        .on("data", async function(log){
          await getLastBalance();
        })
        // unsubscribes the subscription
        return function cleanup(){
          subscription.unsubscribe(function(error, success){
            if(error) {
              console.error(error);
            }
            setActiveBalance(2);
          });
        }
      }
    }
    if(account) {
      updateWallet();
    }

  },[activeBalance])


  return (
    <>
      <div className="ud-userdata-main-div">
        {!account ? (
          <div
            className="no-wallet-connected"
            onClick={() => {
              callToggleWalletConnector(true);
            }}
          >
            <img
              width="120px"
              alt=""
              src={`${process.env.PUBLIC_URL}/assets/images/wallet-black.svg`}
            />
            <p>Please connect your wallet to continue</p>
            {showWalletConnector ? (
              <WalletOptions
                close={() => callToggleWalletConnector(false)}
                isOpen={isOpen}
                totem={totem}
              />
            ) : null}
          </div>
        ) : null}
        <YourRewards tokenPrice={totmPrice} stakes={stakes} />
        <WalletInfo balance={walletBalance} stakes={stakes} />
        <AccountRewardsAndPools
          stakes={stakes}
          onRefetchStakes={refetchStakes}
        />
        {/* <ActivePools stakes={activeStakes} /> */}
      </div>
    </>
  );
}
