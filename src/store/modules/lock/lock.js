import { createAction, handleActions } from "redux-actions";
import { getData, storeData } from "../../../utils/util";
import { produce } from "immer";
import TouchID from "react-native-touch-id";

const LOCK_PASS = "lock/LOCK_PASS";
const LOCK_BIO = "lock/LOCK_BIO";
const LOCK_PASSWORD = "lock/LOCK_PASSWORD";
const LOCK_BIO_OPTION = "lock/LOCK_BIO_OPTION";

const lockPassAction = createAction(LOCK_PASS);
const lockBioAction = createAction(LOCK_BIO);
const lockPasswordAction = createAction(LOCK_PASSWORD);
const lockBioOptionAction = createAction(LOCK_BIO_OPTION);

const initState = {
  passLock: false,
  bioLock: false,
  password: "",
  bioOption: ""
};

const optionalConfigObject = {
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
};

export const lockInit = () => async dispatch => {
  try {
    const pass_lock = await getData("pass_locking");
    const bio_lock = await getData("bio_locking");
    const lock_pass = await getData("lock_pass");

    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        if (biometryType === "FaceID") dispatch(lockBioOptionAction("FaceId"));
        else dispatch(lockBioOptionAction("TouchId"));
      })
      .catch(error => {
        dispatch(lockBioOptionAction(""));
      });

    await dispatch(
      lockPassAction(pass_lock === null || pass_lock === "false" ? false : true)
    );
    await dispatch(
      lockBioAction(bio_lock === null || bio_lock === "false" ? false : true)
    );
    await dispatch(lockPasswordAction(lock_pass === null ? "" : lock_pass));
  } catch (e) {}
};

export const handlePassLock = value => async dispatch => {
  await dispatch(lockPassAction(value));
  await storeData("pass_locking", value + "");
};

export const handleBioLock = value => async dispatch => {
  await dispatch(lockBioAction(value));
  await storeData("bio_locking", value + "");
};

export const handlePassword = value => async dispatch => {
  await dispatch(lockPasswordAction(value));
  await storeData("lock_pass", value + "");
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
      }),
    [LOCK_BIO_OPTION]: (state, { payload }) =>
      produce(state, draft => {
        draft.bioOption = payload;
      })
  },
  initState
);
