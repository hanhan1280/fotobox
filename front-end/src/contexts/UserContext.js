import React from 'react';
import { SET_CURRENT_USER, USER_LOADING } from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
    const [auth, dispatch] = React.useReducer((state, action) => {
        switch (action.type) {
            case SET_CURRENT_USER:
                return {
                    ...state,
                    isAuthenticated: !isEmpty(action.payload),
                    user: action.payload
                };
            case USER_LOADING:
                return {
                    ...state,
                    loading: true
                };
            default:
                return state;
        }
    }, initialState);

    return (
        <UserContext.Provider value={{ auth, dispatch }}>{children}</UserContext.Provider>
    );
};