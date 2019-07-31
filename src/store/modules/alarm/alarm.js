import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { getData } from "../../../utils/util";
import api from "../../../utils/api";
import moment from "moment";

const ALARM_INIT = "alarm/ALARM_INIT";
const ALARM_COUNT = "alarm/ALARM_COUNT";
const ALARM_READ_LIST = "alarm/ALARM_READ_LIST";
const ALARM_UNREAD_LIST = "alarm/ALARM_UNREAD_LIST";
const ALARM_READ = "alarm/ALARM_READ";
const ALARM_ALL = "alarm/ALARM_ALL";
const ALARM_IS_POSTS = "alarm/ALARM_IS_POSTS";

export const alarmInit = createAction(ALARM_INIT);
const alarmCountAction = createAction(ALARM_COUNT);
const alarmReadListAction = createAction(ALARM_READ_LIST);
const alarmUnreadAction = createAction(ALARM_UNREAD_LIST);
const alarmReadAction = createAction(ALARM_READ);
export const alarmIsPostsAction = createAction(ALARM_IS_POSTS);
export const alarmAllAction = createAction(ALARM_ALL);

const initState = {
  count: 0,
  readList: [],
  unreadList: [],
  alarmSet: {
    all: false,
    isPostsAlarm: false
  }
};

export const getAlarmList = (isRead, page) => async dispatch => {
  try {
    const token = await getData("token");
    let count = 50;
    page = page / count + 1;
    let url = `/alarm/isRead?isRead=${
      isRead ? 1 : 0
    }&page=${page}&count=${count}`;
    const jsonData = await api.get(url, { token });
    if (jsonData.statusCode == 200) {
      const { result, resultCount } = jsonData;
      if (!isRead) dispatch(alarmCountAction(resultCount));
      if (!isRead) dispatch(alarmUnreadAction(result));
      else dispatch(alarmReadListAction(result));
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const putUpdateAlarm = alarmIndex => async dispatch => {
  try {
    const token = await getData("token");
    const jsonData = await api.put(`/alarm/alarmIndex/${alarmIndex}`, {
      token,
      body: {
        isRead: 1,
        readAt: moment().format()
      }
    });
    if (jsonData.statusCode == 200) {
      await dispatch(alarmReadAction(alarmIndex));
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
};

export const putUpdateUser = type => async dispatch => {
  try {
    const userId = await getData("userId");
    const token = await getData("token");
    let body = {};
    if (type === "all_off") {
      body.isPostsAlarm = 0;
    } else if (type === "all") {
      body.isPostsAlarm = 1;
    } else if (type === "posts") {
      body.isPostsAlarm = 1;
    } else if (type === "posts_off") {
      body.isPostsAlarm = 0;
    }
    const jsonData = await api.put(`/user/userId/${userId}`, {
      token,
      body
    });
    if (jsonData.statusCode == 200) {
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
};

export default handleActions(
  {
    [ALARM_INIT]: (undefined, action) => {},
    [ALARM_COUNT]: (state, { payload }) =>
      produce(state, draft => {
        draft.count = payload;
      }),
    [ALARM_READ_LIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.readList = payload;
      }),
    [ALARM_UNREAD_LIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.unreadList = payload;
      }),
    [ALARM_READ]: (state, { payload }) =>
      produce(state, draft => {
        draft.unreadList = draft.unreadList.filter(
          item => item.alarmIndex !== payload
        );
        draft.count--;
      }),
    [ALARM_ALL]: (state, { payload }) =>
      produce(state, draft => {
        draft.alarmSet.all = payload;
      }),
    [ALARM_IS_POSTS]: (state, { payload }) =>
      produce(state, draft => {
        draft.alarmSet.isPostsAlarm = payload;
      })
  },
  initState
);
