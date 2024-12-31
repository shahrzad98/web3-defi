import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import {
  StakingPool__factory,
  StakingPool,
  TotemToken__factory,
  TotemToken,
} from "../contracts/types";

import { networks } from "utils/networks";

import useNotification from "../app/hooks/useNotification";

export interface ContractAbi {
  address: string;
  abi: any[];
}

export interface ContractMap {
  [name: string]: ContractAbi;
}

export interface ChainAbi {
  name: string;
  chainId: string;
  contracts: ContractMap;
}

export interface ChainMap {
  [chainId: number]: ChainAbi;
}

export const getAddress = (
  chainId: number,
  chain: ChainAbi,
  name: string
): string => {
  if (!chain) {
    console.log(`Unsupported chain '${chainId}' for contract ${name}`);
    return;
  }

  const contract = chain.contracts[name];
  if (!contract) {
    console.log(`No ${name} deployed at network ${chain.name} (${chainId})`);
    return;
  }

  const address = contract.address;
  console.log(
    `${name} resolved to address ${address} at network ${chain.name} (${chainId})`
  );
  return address;
};

export function useContract<C>(
  connector: (address: string, signerOrProvider: Signer | Provider) => C,
  name: string
): C {
  const { library, chainId } = useWeb3React<Web3Provider>();

  // contract is a state variable, because it's async
  const [contract, setContract] = useState<C>();

  // use an effect because it's async
  useEffect(() => {
    if (!library || !chainId) {
      // library or chainId not set, reset to undefined
      setContract(undefined);
      return;
    }

    async function loadContract() {
      // use provider signer
      const signer = library.getSigner();

      const chainName = networks[chainId];
      let chain, address;
      if (chainName) {
        chain = await import(`contracts/abi/${chainName}.json`).then(
          (module) => module.default
        );

        // try to resolve address
        address = getAddress(chainId, chain, name);
      }

      if (address && chainName) {
        // call the factory connector
        setContract(connector(address, signer));
      } else {
        setContract(undefined);
      }
    }
    loadContract();
  }, [library, chainId]);

  return contract;
}

export function useContractFromAddress<C>(
  connector: (address: string, signerOrProvider: Signer | Provider) => C,
  address: string
): C {
  const { library, chainId, error } = useWeb3React<Web3Provider>();
  const notification = useNotification();
  // contract is a state variable, because it's async
  const [contract, setContract] = useState<C>();

  // use an effect because it's async
  useEffect(() => {
    if (error) {
      const customError = { ...error };
      // notification.error(customError?.message);
    } else {
      if (!address || !library || !chainId) {
        // library or chainId not set, reset to undefined
        setContract(undefined);
        return;
      } else {
        // use provider signer
        const signer = library.getSigner();

        // call the factory connector
        setContract(connector(address, signer));
      }
    }
  }, [address, library, chainId]);

  return contract;
}

export const useTotemTokenContract = (): TotemToken => {
  return useContract(TotemToken__factory.connect, "TotemToken");
};

export const useStakingPool = (pool: string): StakingPool => {
  return useContractFromAddress(StakingPool__factory.connect, pool);
};
