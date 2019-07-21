import { createAction, handleActions } from "redux-actions";
import { getData } from "../../../utils/util";
import { produce } from "immer";

const LOCK_PASS = "lock/LOCK_PASS";
const LOCK_BIO = "lock/LOCK_BIO";
const LOCK_PASSWORD = "lock/LOCK_PASSWORD";

export const lockPassAction = createAction(LOCK_PASS);
export const lockBioAction = createAction(LOCK_BIO);
export const lockPasswordAction = createAction(LOCK_PASSWORD);

export const lockInit = () => async dispatch => {
  const pass_lock = await getData("pass_locking");
  const bio_lock = await getData("bio_locking");
  const lock_pass = await getData("lock_pass");

  dispatch(
    lockPassAction(pass_lock === null || pass_lock === "false" ? false : true)
  );
  dispatch(
    lockBioAction(bio_lock === null || bio_lock === "false" ? false : true)
  );
  dispatch(lockPasswordAction(lock_pass === null ? "" : lock_pass));
};

const initState = {
  passLock: false,
  bioLock: false,
  password: ""
};

export default handleActions(
  {
    [LOCK_PASS]: (state, { payload }) =>
      produce(state, draft => {
        draft.passLock = payload;
      }),
    [LOCK_BIO]: (state, { payload }) =>
      produce(state, draft => {
        draft.bioLock = payload;
      }),
    [LOCK_PASSWORD]: (state, { payload }) =>
      produce(state, draft => {
        draft.password = payload;
      })
  },
  initState
);
