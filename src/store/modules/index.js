/**
 * store에 들어갈 reducer 모음
 */
import { combineReducers } from "redux";
import counter from "./counter/counter";
import auth from "./auth/auth";
import signin from "./sign/signin";
import common from "./common/common";
import talk from "./common/talk";

export default combineReducers({
  counter,
  auth,
  signin,
  common,
  talk,
});
