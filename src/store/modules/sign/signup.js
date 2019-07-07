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
const SIGNUP_USERID = "signup/SIGNUP_USERID";
const SIGNUP_USERPW = "signup/SIGNUP_USERPW";
const SIGNUP_USERNICKNAME = "signup/SIGNUP_USERNICKNAME";

const initAction = createAction(SIGNUP_INIT);
const firstTermAction = createAction(SIGNUP_FIRST_TERM);
const secondTermAction = createAction(SIGNUP_SECOND_TERM);
export const userIdAction = createAction(SIGNUP_USERID);
export const userPwAction = createAction(SIGNUP_USERPW);
export const userNickNameAction = createAction(SIGNUP_USERNICKNAME);

export const init = () => dispatch => {
  dispatch(initAction());
};
export const handleFirstTerm = value => dispatch => {
  dispatch(firstTermAction(value));
};
export const handleSecondTerm = value => dispatch => {
  dispatch(secondTermAction(value));
};

export const checkUserId = userId => async dispatch => {
  const jsonData = await api.get(`/userValidation/userId/${userId}`);
  if (jsonData.statusCode == 200) return true;
  else return false;
};

export const checkUserNickName = nickname => async dispatch => {
  const jsonData = await api.get(`/userValidation/userNickName/${nickname}`);
  if (jsonData.statusCode == 200) return true;
  else return false;
};

export const checkBlockUserNickName = nickname => async dispatch => {
  const jsonData = await api.get(
    `/userValidation/blockUserNickName/${nickname}`
  );
  if (jsonData.statusCode == 200) return true;
  else return false;
};

const initState = {
  first_term: false,
  second_term: false,
  userId: "",
  userPw: "",
  userNickName: ""
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
      }),
    [SIGNUP_USERID]: (state, { payload }) =>
      produce(state, draft => {
        draft.userId = payload;
      }),
    [SIGNUP_USERPW]: (state, { payload }) =>
      produce(state, draft => {
        draft.userPw = payload;
      }),
    [SIGNUP_USERNICKNAME]: (state, { payload }) =>
      produce(state, draft => {
        draft.userNickName = payload;
      })
  },
  initState
);
