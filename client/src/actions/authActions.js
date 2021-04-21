import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./Types";
import axios from "axios";
import { clearErrors } from "./postActions";
//register user action creator
//  here the dispatch is used for running the middleware
export const registerUser = (userData, history) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login get user info

export const loginUser = (userData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      const { token } = res.data;
      //set token to local storage
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);
      //decode the token to get the user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//logout user

export const logoutUser = () => (dispatch) => {
  //remove token from local storage
  localStorage.removeItem("jwtToken");
  //remove token from header
  setAuthToken(false);
  //set current user to {}
  dispatch(setCurrentUser({}));
};

//set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
