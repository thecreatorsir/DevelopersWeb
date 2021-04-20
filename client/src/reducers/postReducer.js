import {
  ADD_POST,
  DELETE_POST,
  GET_POSTS,
  POST_LOADING,
} from "../actions/Types";

const intialState = {
  post: {},
  posts: [],
  loading: false,
};

const postReducer = (state = intialState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};

export default postReducer;
