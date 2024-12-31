import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { subgraph } from "utils/networks";
const uris = {
  // 1: 'https://api.thegraph.com/subgraphs/name/totemfi/staking-goerli',
  5: "https://api.thegraph.com/subgraphs/name/totemfi/staking-bsc-testnet",
  56: subgraph
};

export const createApollo = (chainId: number): ApolloClient<any> => {
  const uri =
    uris[chainId] ||
    subgraph;
  const ssrMode = typeof window === "undefined";

  return new ApolloClient({
    ssrMode,
    link: new HttpLink({
      uri,
    }),
    cache: new InMemoryCache(),
  });
};

export const useApollo = (chainId: number): ApolloClient<any> => {
  return useMemo(() => createApollo(chainId), [chainId]);
};
