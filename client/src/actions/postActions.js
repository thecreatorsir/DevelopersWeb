import axios from "axios";
import { GET_ERRORS, ADD_POST, POST_LOADING, GET_POSTS } from "./Types";

//add post
export const addPost = (postData) => (dispatch) => {
  axios
    .post("/api/posts", postData)
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//get posts
export const getPosts = () => (dispatch) => {
  dispatch(setPostLoding());
  axios
    .get("/api/posts")
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null,
      })
    );
};

//set loading state

export const setPostLoding = () => {
  return {
    type: POST_LOADING,
  };
};
