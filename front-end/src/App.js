import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import jwt_decode from "jwt-decode";
import Landing from "./components/Layout/Landing";
import Dashboard from "./components/Layout/Dashboard";
import FriendDashboard from "./components/Layout/FriendDashboard";
import Friends from "./components/Layout/Friends";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import PrivateRoute from "./components/PrivateRoute";

import { setCurrentUser, setTokenAxios, logoutUser } from "./actions/authUtils";
import { UserContext } from "./contexts/UserContext";


function App() {


  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setTokenAxios(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        logoutUser(dispatch);
        window.location.href = "./login";
      }
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />        
        <PrivateRoute exact path="/dashboard/:userId" component={FriendDashboard} />
        <PrivateRoute exact path="/friends" component={Friends} />
      </div>
    </Router>
  );
}

export default App;
