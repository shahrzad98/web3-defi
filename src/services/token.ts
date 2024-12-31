import { Web3Provider } from "@ethersproject/providers";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import {
  BigNumber,
  BigNumberish,
  ContractReceipt,
  ContractTransaction,
} from "ethers";
import { useEffect, useState } from "react";
import { networks } from "utils/networks";
import Web3 from "web3";
import useNotification from "../app/hooks/useNotification";
import useTransactions from "../app/hooks/useTransaction";
import { useTotemTokenContract } from "./contracts";
import { useTransaction } from "./transaction";

export const useTotemToken = (
  account: string = null,
  spender: string = null,
  blockNumber = 0,
  stakingPool: any = null,
  predictValue: any = null
) => {
  const token = useTotemTokenContract();
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));
  const [balanceLoading, setBalanceLoading] = useState<boolean>(true);
  const [allowance, setAllowance] = useState<BigNumber>(BigNumber.from(0));
  const [contractTransaction, setContractTransaction] = useState(null);
  const [contractReceipt, setContractReceipt] = useState(null);
  const { chainId } = useWeb3React<Web3Provider>();

  const transactions = useTransactions();
  const notification = useNotification();

  const web3 = new Web3(Web3.givenProvider);
  const [activeGetBalance, setActiveGetBalance] = useState(0);
  const onAllowed = async (error: any) => {
    let ct: ContractTransaction;
    let cr: ContractReceipt;

    if (error != null) {
      alert(error);
      return;
    }
    // second transaction
    try {
      if (stakingPool) {
        ct = await stakingPool
          .stake(predictValue.stakeValue, predictValue.bitcoinPrice)
          .catch((err) => {
            const code =
              err?.data?.message?.toLowerCase() ===
              "execution reverted: amount can't be less than the minimum"
                ? 4
                : err?.data?.code;
            transactions.update(1, "rejected", code);
            if (error.data) notification.error(error.data.message);
            notification.error(error.message);
            return err;
          });

        setContractTransaction(ct);
        cr = await ct
          .wait()
          .then((res) => {
            transactions.update(1, "done");
            return res;
          })
          .catch((err) => {
            const code =
              err?.data?.message?.toLowerCase() ===
              "execution reverted: amount can't be less than the minimum"
                ? 4
                : err?.data?.code;
            transactions.update(1, "rejected", code);
            if (error.data) notification.error(error.data.message);
            notification.error(error.message);
            return err;
          });
        setContractReceipt(cr);
      }
    } catch (error) {
      // transactions.update(1, "rejected", err?.data?.code);
      // if (error.data) notification.error(error.data.message);
      // notification.error(error.message);
    }
  };

  const { waiting, error, setError, setTransaction } = useTransaction(
    onAllowed
  );

  // balances
  useEffect(() => {
    async function loadContract() {
      setBalanceLoading(true);

      const chainName = networks[chainId];
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
          setBalance(b);
        })
        .finally(() => {
          setBalanceLoading(false);
        });
    }
    if (token && account) {
      if (spender) {
        token.allowance(account, spender).then(setAllowance);
      }
    }
    if (account) {
      loadContract();
    }
  }, [token, account, spender, blockNumber, activeGetBalance]);

  const getBalance = () => {
    setActiveGetBalance(1);
  };

  useEffect(() => {
    if (contractReceipt) {
      transactions.update(1, "done");
    }
  }, [contractReceipt]);

  const approve = async (spender: string, amount: BigNumberish) => {
    if (token) {
      transactions.add(1, "processing");
      try {
        // send transaction

        let ct = token.approve(spender, amount);
        // transactions.updateId(id, ct);
        setTransaction(ct);
      } catch (e) {
        setError(e.message);
        if (e.data) notification.error(e.data.message);
        notification.error(e.message);
        const code =
          e?.data?.message?.toLowerCase() ===
          "execution reverted: amount can't be less than the minimum"
            ? 4
            : e?.data?.code;
        transactions.update(1, "rejected", code);
      }
    }
  };

  const parseTOTM = (amount: BigNumberish): BigNumber => {
    return parseUnits(amount.toString(), 18);
  };

  const toTOTMString = (amount: BigNumber): string => {
    return formatUnits(amount, 5);
  };

  const toTOTM = (amount: BigNumberish): number => {
    return parseFloat(formatUnits(amount, 15)) / 1000;
  };

  const toBigTOTM = (amount: BigNumberish): BigNumber => {
    return BigNumber.from(toTOTM(amount));
  };

  const toBTC = (amount: BigNumberish): number => {
    return parseFloat(formatUnits(amount, 6)) / 100;
  };

  return {
    allowance,
    balance,
    error,
    waiting,
    balanceLoading,
    contractTransaction,
    contractReceipt,
    setContractTransaction,
    setContractReceipt,
    approve,
    parseTOTM,
    toTOTM,
    toTOTMString,
    toBigTOTM,
    toBTC,
    getBalance,
  };
};
