/**
 * 액션 타입, 액션 생성자, redux-thunk, immer 예제
 */
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { getData, storeData, removeAllData } from "../../../utils/util";
import api from "../../../utils/api";

const SIGNIN_NAVIGATE = "signin/SIGNIN_NAVIGATE";
const SIGNIN_USERDATA = "singin/SIGNIN_USERDATA";

export const signInNavigateAction = createAction(SIGNIN_NAVIGATE);
export const userDataAction = createAction(SIGNIN_USERDATA);

const initState = {
  signin_navigate: null,
  user: {}
};

export const checkToken = appId => async dispatch => {
  try {
    const token = await getData("token");
    if (token === null || token === undefined) throw "not token";
    const userId = await getData("userId");
    let url = `/user/userId/${userId}/signIn?`;
    if (appId) url += `appId=${appId}`;
    const jsonData = await api.get(url, { token });
    if (jsonData.statusCode == 200) {
      const result = jsonData.result;
      storeData("userId", result.userId);
      dispatch(userDataAction(result));
      dispatch(signInNavigateAction("main"));
      return true;
    } else {
      throw "check err";
    }
  } catch (err) {
    removeAllData();
    dispatch(signInNavigateAction("signIn"));
    return false;
  }
};

export default handleActions(
  {
    [SIGNIN_NAVIGATE]: (state, { payload }) =>
      produce(state, draft => {
        draft.signin_navigate = payload;
      }),
    [SIGNIN_USERDATA]: (state, { payload }) =>
      produce(state, draft => {
        draft.user = payload;
      })
  },
  initState
);
