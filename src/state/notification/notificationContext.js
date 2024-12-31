import React, { createContext, useReducer } from "react";

import reducer from "./reducer";
import initialState from "./initialState";

//hooks

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <NotificationContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export { NotificationProvider, NotificationContext };
