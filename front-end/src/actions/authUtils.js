import axios from "axios";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, USER_LOADING, GET_ERRORS } from "./types";

export const setTokenAxios = token => {
  if (token) {
    axios.defaults.headers.common = { 'Authorization': token };
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const signupUser = async (userData, setError, history) => {
  try {
    await axios.post("/auth/signup", userData);
    history.push("/login");
  } catch (err) {
    setError({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
};

export const loginUser = async (userData, dispatch, setError) => {
  try {
    let res = await axios.post("/auth/login", userData);
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    setTokenAxios(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    setError({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = async (dispatch) => {
  try {
    let res = await axios.get("/auth/logout");
    const { msg } = res.data;
    console.log(msg);
  } catch (error) {
    console.log(error);
  }
  localStorage.removeItem("jwtToken");
  setTokenAxios(false);
  dispatch(setCurrentUser({}));
};