import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from "../contexts/UserContext";

// import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { auth } = useContext(UserContext);
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            auth.isAuthenticated ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;