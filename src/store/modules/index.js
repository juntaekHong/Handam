/**
 * store에 들어갈 reducer 모음
 */
import { combineReducers } from "redux";
import counter from "./counter/counter";
import auth from "./auth/auth";
import signin from "./sign/signin";
import common from "./common/common";
import talk from "./community/talk";
import vote from "./community/vote";
import signup from "./sign/signup";
import home from "./home/home";
import bus from "./bus/bus";
import hansung from "./hansungInfo/hansungInfo";
import alarm from "./alarm/alarm";
import lock from "./lock/lock";
export default combineReducers({
  counter,
  auth,
  signin,
  common,
  talk,
  vote,
  signup,
  home,
  bus,
  hansung,
  alarm,
  lock
});
