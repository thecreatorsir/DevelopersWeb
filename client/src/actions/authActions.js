import { TEST_DISPATCH } from "./Types";

//register user action creator
export const registerUser = (userData) => {
  return {
    type: TEST_DISPATCH,
    payload: userData,
  };
};
