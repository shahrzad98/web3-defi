import React from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";

const Web3Container = ({ children }) => {
  const getLibrary = (provider: any, _connector: any) => {
    return new Web3Provider(provider, "any");
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
  );
};

export default Web3Container;
