/**
 * store에 들어갈 reducer 모음
 */
import { combineReducers } from "redux";
import counter from "./counter/counter";
import talk from "./community/talk";

export default combineReducers({
  counter,
  talk
});
