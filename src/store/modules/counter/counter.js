/**
 * 액션 타입, 액션 생성자, redux-thunk, immer 예제
 */
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const INCREMENT = "counter/INCREMENT";
const DECREMENT = "counter/DECREMENT";

const incrementAction = createAction(INCREMENT);
const decrementAction = createAction(DECREMENT);

export const increment = () => dispatch => {
  dispatch(incrementAction);
};
export const decrement = () => dispatch => {
  dispatch(decrementAction);
};

const initState = {
  value: 0
};

export default handleActions(
  {
    [INCREMENT]: (state, action) =>
      produce(state, draft => {
        draft.value++;
      }),
    [DECREMENT]: (state, action) =>
      produce(state, draft => {
        draft.value--;
      })
  },
  initState
);
