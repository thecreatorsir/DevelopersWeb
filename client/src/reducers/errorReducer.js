import { CLEAR_ERRORS, GET_ERRORS } from "../actions/Types";
const initialstate = {};

const errorReducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
};
export default errorReducer;
