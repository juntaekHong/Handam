import { createAction, handleActions } from "redux-actions";
import { getData } from "../../../utils/util";
import api from "../../../utils/api";
import { produce } from "immer";

const HOME_NOTICE_LIST = "home/HOME_NOTICE_LIST";

const noticeAction = createAction(HOME_NOTICE_LIST);

const initState = {
  noticeList: []
};

export const getNoticeList = () => async dispatch => {
  try {
    const token = await getData("token");
    const jsonData = await api.get(`/notice`, { token });
    if (jsonData.statusCode == 200) {
      dispatch(noticeAction(jsonData.result));
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export default handleActions(
  {
    [HOME_NOTICE_LIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.noticeList = [];
        payload.map(item => {
          if (
            item.noticeImg.indexOf("https") >= 0 ||
            item.noticeImg.indexOf("http") >= 0
          ) {
            draft.noticeList.push(item);
          }
        });
        // draft.noticeList = draft.noticeList.concat(payload);
      })
  },
  initState
);
