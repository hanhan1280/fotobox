import React from "react";
import { GET_ERRORS } from "../actions/types";

const initialState = {};

export const ErrorContext = React.createContext();

export const ErrorContextProvider = ({ children }) => {
    const [error, setError] = React.useReducer((state, action) => {
        switch (action.type) {
            case GET_ERRORS:
                return action.payload;
            default:
                return state;
        }
    }, initialState);

    return (
        <ErrorContext.Provider value={{ error, setError }}>{children}</ErrorContext.Provider>
    );
};