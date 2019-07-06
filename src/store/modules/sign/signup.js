/**
 * 액션 타입, 액션 생성자, redux-thunk, immer 예제
 */
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { getData, storeData, removeAllData } from "../../../utils/util";
import api from "../../../utils/api";
import config from "../../../configs/config";

const SIGNUP_INIT = "signup/SIGNUP_INIT";
const SIGNUP_FIRST_TERM = "signup/SIGNUP_FIRST_TERM";
const SIGNUP_SECOND_TERM = "singup/SIGNUP_SECOND_TERM";

const initAction = createAction(SIGNUP_INIT);
const firstTermAction = createAction(SIGNUP_FIRST_TERM);
const secondTermAction = createAction(SIGNUP_SECOND_TERM);

export const init = () => dispatch => {
  dispatch(initAction());
};
export const handleFirstTerm = value => dispatch => {
  dispatch(firstTermAction(value));
};
export const handleSecondTerm = value => dispatch => {
  dispatch(secondTermAction(value));
};

const initState = {
  first_term: false,
  second_term: false
};

export default handleActions(
  {
    [SIGNUP_INIT]: (undefined, action) => {},
    [SIGNUP_FIRST_TERM]: (state, { payload }) =>
      produce(state, draft => {
        draft.first_term = payload;
      }),
    [SIGNUP_SECOND_TERM]: (state, { payload }) =>
      produce(state, draft => {
        draft.second_term = payload;
      })
  },
  initState
);
