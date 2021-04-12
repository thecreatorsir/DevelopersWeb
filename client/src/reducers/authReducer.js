import { TEST_DISPATCH } from "../actions/Types";
const initialstate = {
  isAuthenticated: false,
  user: {},
};

const authReducer = (state = initialstate, action) => {
  switch (action.type) {
    case TEST_DISPATCH:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
export default authReducer;
