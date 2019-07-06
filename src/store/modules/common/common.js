/**
 * 액션 타입, 액션 생성자, redux-thunk, immer 예제
 */
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../../utils/api";
import axios from "axios";
import config from "../../../configs/config";

const COMMON_LOADING = "common/COMMON_LOADING";
const TERM_1 = "common/TERM_1";
const TERM_2 = "common/TERM_2";

const loadingAction = createAction(COMMON_LOADING);
const term1Action = createAction(TERM_1);
const term2Action = createAction(TERM_2);

const initState = {
  loading: false,
  term1: "",
  term2: ""
};

export const handleLoading = value => dispatch => {
  dispatch(loadingAction(value));
};

export const getTerm1 = () => async dispatch => {
  try {
    const { data } = await axios.get(`${config.server}/terms/service`);
    if (data.statusCode == 200) dispatch(term1Action(data.result));
    else throw err;
  } catch (e) {
    dispatch(term1Action(""));
  }
};

export const getTerm2 = () => async dispatch => {
  try {
    const { data } = await axios.get(`${config.server}/terms/privacyPolicy`);
    if (data.statusCode == 200) dispatch(term2Action(data.result));
    else throw err;
  } catch (e) {
    dispatch(term2Action(""));
  }
};

export default handleActions(
  {
    [COMMON_LOADING]: (state, { payload }) =>
      produce(state, draft => {
        draft.loading = payload;
      }),
    [TERM_1]: (state, { payload }) =>
      produce(state, draft => {
        draft.term1 = payload;
      }),
    [TERM_2]: (state, { payload }) =>
      produce(state, draft => {
        draft.term2 = payload;
      })
  },
  initState
);
