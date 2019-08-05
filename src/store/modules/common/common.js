/**
 * 액션 타입, 액션 생성자, redux-thunk, immer 예제
 */
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../../utils/api";
import axios from "axios";
import config from "../../../configs/config";
import { Platform } from "react-native";

const COMMON_INIT = "common/COMMON_INIT";
const COMMON_LOADING = "common/COMMON_LOADING";
const TERM_1 = "common/TERM_1";
const TERM_2 = "common/TERM_2";
const COMMON_MAJOR_LIST = "common/COMMON_MAJOR_LIST";
const COMMON_TRACK_LIST = "common/COMMON_TRACK_LIST";
const COMMON_ADMISSION_LIST = "common/COMMON_ADMISSION_LIST";
const COMMON_SEMESTER_LIST = "common/COMMON_SEMESTER_LIST";
const COMMON_APP_VERSION = "common/COMMON_APP_VERSION";

export const commonInit = createAction(COMMON_INIT);
const loadingAction = createAction(COMMON_LOADING);
const term1Action = createAction(TERM_1);
const term2Action = createAction(TERM_2);
const majorListAction = createAction(COMMON_MAJOR_LIST);
const trackListAction = createAction(COMMON_TRACK_LIST);
const admissionYearAction = createAction(COMMON_ADMISSION_LIST);
const semesterAction = createAction(COMMON_SEMESTER_LIST);
const appVersionAction = createAction(COMMON_APP_VERSION);

const initState = {
  loading: false,
  term1: "",
  term2: "",
  major_list: [],
  track_list: ["해당없음"],
  admission_list: [],
  semester_list: [],
  appVersion: {}
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

export const getTrack = () => async dispatch => {
  try {
    const jsonData = await api.get(`/track`);
    if (jsonData.statusCode == 200) {
      const data = jsonData.result;
      dispatch(majorListAction(data));
      dispatch(trackListAction(data));
    } else {
      dispatch({ type: TRACK_LIST, payload: [] });
    }
  } catch (e) {}
};

export const getAdmissionYear = () => async dispatch => {
  try {
    const jsonData = await api.get(`/admissionYear`);
    if (jsonData.statusCode == 200) {
      const data = jsonData.result;
      dispatch(admissionYearAction(data));
      const reverse = data.reverse();
      dispatch(semesterAction(reverse));
    } else {
      dispatch(admissionYearAction([]));
      dispatch(semesterAction([]));
    }
  } catch (e) {}
};

export const getAppVersion = () => async dispatch => {
  try {
    const jsonData = await api.get(`/version`);
    if (jsonData.statusCode == 200) {
      const { result } = jsonData;
      dispatch(appVersionAction(result));
    } else {
    }
  } catch (e) {}
};

export default handleActions(
  {
    [COMMON_INIT]: (undefined, {}) => {},
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
      }),
    [COMMON_MAJOR_LIST]: (state, { payload }) =>
      produce(state, draft => {
        payload.map(item => {
          draft.major_list.push(item.trackName);
        });
      }),
    [COMMON_TRACK_LIST]: (state, { payload }) =>
      produce(state, draft => {
        payload.map(item => {
          draft.track_list.push(item.trackName);
        });
      }),
    [COMMON_ADMISSION_LIST]: (state, { payload }) =>
      produce(state, draft => {
        payload.map(item => {
          draft.admission_list.push(item.admissionYear + "");
        });
      }),
    [COMMON_SEMESTER_LIST]: (state, { payload }) =>
      produce(state, draft => {
        payload.map(item => {
          draft.semester_list.push(item.admissionYear + "년 2학기");
          draft.semester_list.push(item.admissionYear + "년 1학기");
        });
      }),
    [COMMON_APP_VERSION]: (state, { payload }) =>
      produce(state, draft => {
        draft.appVersion = payload;
      })
  },
  initState
);
