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
const SIGNUP_MAJOR = "signup/SIGNUP_MAJOR";
const SIGNUP_DOUBLE_MAJOR = "signup/SIGNUP_DOUBLE_MAJOR";
const SIGNUP_MINOR = "signup/SIGNUP_MINOR";
const SIGNUP_CONNECTED_MAJOR = "signup/SIGNUP_CONNECTED_MAJOR";
const SIGNUP_ADMISSION_YEAR = "signup/SIGNUP_ADMISSION_YEAR";

const initAction = createAction(SIGNUP_INIT);
const firstTermAction = createAction(SIGNUP_FIRST_TERM);
const secondTermAction = createAction(SIGNUP_SECOND_TERM);
export const userIdAction = createAction(SIGNUP_USERID);
export const userPwAction = createAction(SIGNUP_USERPW);
export const userNickNameAction = createAction(SIGNUP_USERNICKNAME);
export const majorAction = createAction(SIGNUP_MAJOR);
export const doubleMajorAction = createAction(SIGNUP_DOUBLE_MAJOR);
export const minorAction = createAction(SIGNUP_MINOR);
export const connectedMajorAction = createAction(SIGNUP_CONNECTED_MAJOR);
export const admissionYearAction = createAction(SIGNUP_ADMISSION_YEAR);

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

export const postSignUp = userData => async dispatch => {
  try {
    const jsonData = await api.post(`/signUp`, { body: userData });
    if (jsonData.statusCode == 200) return true;
    else return false;
  } catch (e) {
    return false;
  }
};

const initState = {
  first_term: false,
  second_term: false,
  userId: "",
  userPw: "",
  userNickName: "",
  major: null,
  doubleMajor: null,
  minor: null,
  connectedMajor: null,
  admissionYear: null
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
      }),
    [SIGNUP_MAJOR]: (state, { payload }) =>
      produce(state, draft => {
        draft.major = payload;
      }),
    [SIGNUP_DOUBLE_MAJOR]: (state, { payload }) =>
      produce(state, draft => {
        draft.doubleMajor = payload;
      }),
    [SIGNUP_MINOR]: (state, { payload }) =>
      produce(state, draft => {
        draft.minor = payload;
      }),
    [SIGNUP_CONNECTED_MAJOR]: (state, { payload }) =>
      produce(state, draft => {
        draft.connectedMajor = payload;
      }),
    [SIGNUP_ADMISSION_YEAR]: (state, { payload }) =>
      produce(state, draft => {
        draft.admissionYear = payload;
      })
  },
  initState
);
