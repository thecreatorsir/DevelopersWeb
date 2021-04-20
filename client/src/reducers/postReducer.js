import { ADD_POST } from "../actions/Types";

const intialState = {
  post: {},
  posts: [],
  loading: false,
};

const postReducer = (state = intialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    default:
      return state;
  }
};

export default postReducer;
