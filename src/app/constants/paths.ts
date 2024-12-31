import { compile } from "path-to-regexp";

export const Paths = {
  foxPool: "/pools/fox",
  owlPool: "/pools/owl",
  wolfPool: "/pools/wolf",
  allPool: "/pools/all",
  user: "/user",
  uniswap: "/uniswap",
  home: "/",
  gate: "/gate",
  pancakeSwap: "/pancake-swap",
  duckBridge: "/duckbridge",
  faqs: "/faqs",
  support: "/support",
  pools: (id: string) => `/pools/${id}`,
};

export const Links = {
  // Admin Paths
  foxPool: compile(Paths.foxPool),
  owlPool: compile(Paths.owlPool),
  allPool: compile(Paths.allPool),
  user: compile(Paths.user),
  uniswap: compile(Paths.uniswap),
  gate: compile(Paths.gate),
  pancakeSwap: compile(Paths.pancakeSwap),
  duckBridge: compile(Paths.duckBridge),
};
