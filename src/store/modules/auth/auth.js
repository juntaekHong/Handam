/**
 * 액션 타입, 액션 생성자, redux-thunk, immer 예제
 */
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { getData, storeData } from "../../../utils/util";

export const checkIntro = () => async dispatch => {
  const result = await getData("intro");
  return result;
};
export const storeIntro = value => async dispatch => {
  await storeData("intro", value);
};

const initState = {};

export default handleActions({}, initState);
