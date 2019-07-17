import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { getData } from "../../../utils/util";
import api from "../../../utils/api";

const ALARM_COUNT = "alarm/ALARM_COUNT";
const ALARM_READ_LIST = "alarm/ALARM_READ_LIST";
const ALARM_UNREAD_LIST = "alarm/ALARM_UNREAD_LIST";

const alarmCountAction = createAction(ALARM_COUNT);
const alarmReadListAction = createAction(ALARM_READ_LIST);
const alarmUnreadAction = createAction(ALARM_UNREAD_LIST);

const initState = {
  count: 0,
  readList: [],
  unreadList: []
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
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default handleActions(
  {
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
      })
  },
  initState
);
