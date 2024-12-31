import React, { createContext, useReducer } from "react";

import reducer from "./reducer";
import initialState from "./initialState";

//hooks

const TransactionContext = createContext();

const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TransactionContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export { TransactionProvider, TransactionContext };
