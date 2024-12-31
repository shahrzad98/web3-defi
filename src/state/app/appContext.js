import React, { createContext, useReducer } from "react";

import reducer from "./reducer";
import initialState from "./initialState";

//hooks

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppProvider, AppContext };
