/**
 * 액션 타입, 액션 생성자, redux-thunk, immer 예제
 */
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const COMMON_LOADING = "common/COMMON_LOADING";

const loadingAction = createAction(COMMON_LOADING);

export const handleLoading = value => dispatch => {
  dispatch(loadingAction(value));
};

const initState = {
  loading: false
};

export default handleActions(
  {
    [COMMON_LOADING]: (state, { payload }) =>
      produce(state, draft => {
        draft.loading = payload;
      })
  },
  initState
);
