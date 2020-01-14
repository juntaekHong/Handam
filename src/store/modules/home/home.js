import { createAction, handleActions } from "redux-actions";
import { getData, storeData } from "../../../utils/util";
import api from "../../../utils/api";
import { produce } from "immer";
import config from "../../../configs/config";
import values from "../../../configs/values";

const HOME_NOTICE_LIST = "home/HOME_NOTICE_LIST";
const SET_HOME_MENU = "home/SET_HOME_MENU";

const noticeAction = createAction(HOME_NOTICE_LIST);
export const homeMenuAction = createAction(SET_HOME_MENU);

const initState = {
  noticeList: [],
  homeMenu: []
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

export const initHomeMenu = () => async dispatch => {
  try {
    const custom = await getData(values.storeName.HOME_MENU);
    const arr = [];
    if (custom === null) {
      for (let i = 0; i < config.homeMenu.length; i++) {
        // if (i > 6) break;
        if (config.homeMenu[i].enabled) arr.push(config.homeMenu[i]);
      }
      dispatch(homeMenuAction(arr));
    } else {
      // dispatch(homeMenuAction(JSON.parse(custom)));
      const menu = JSON.parse(custom);
      for (let i = 0; i < menu.length; i++) {
        for (let j = 0; j < config.homeMenu.length; j++) {
          if (menu[i].title === config.homeMenu[j].title) {
            if (config.homeMenu[j].enabled) arr.push(config.homeMenu[j]);
            break;
          }
        }
      }
      dispatch(homeMenuAction(arr));
    }
    return true;
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
          if (item.noticeImg.indexOf("https") >= 0 || item.noticeImg.indexOf("http") >= 0) {
            draft.noticeList.push(item);
          }
        });
      }),
    [SET_HOME_MENU]: (state, { payload }) =>
      produce(state, draft => {
        draft.homeMenu = payload;
      })
  },
  initState
);
