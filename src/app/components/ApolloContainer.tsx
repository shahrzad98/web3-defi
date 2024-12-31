import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";
import { useApollo } from "services/apollo";

const ApolloContainer = ({ children }) => {
  const { chainId } = useWeb3React();
  const apolloClient = useApollo(chainId);
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloContainer;
