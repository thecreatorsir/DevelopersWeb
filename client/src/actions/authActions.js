import { GET_ERRORS } from "./Types";
import axios from "axios";
//register user action creator
//  here the dispatch is used for running the middleware
export const registerUser = (userData, history) => (dispatch) => {
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
