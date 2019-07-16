import { createAction, handleActions } from "redux-actions";
import moment from "moment";
import axios from "axios";
import config from "../../../configs/config";
import { parseString } from "xml2js";
import { produce } from "immer";
import { getArrMsg } from "../../../utils/util";

const BUS_JONGRO_LIST = "bus/BUS_JONGRO_LIST";
const BUS_JONGRO_TIME_TEXT = "bus/BUS_JONGRO_TIME_TEXT";
const BUS_SEONGBUK_LIST = "bus/BUS_SEONGBUK_LIST";
const BUS_SEONGBUK_TIME_TEXT = "bus/BUS_SEONGBUK_TIME_TEXT";
const BUS_SHUTTLE_TEXT = "bus/BUS_SHUTTLE_TEXT";

const jongroListAction = createAction(BUS_JONGRO_LIST);
const jongroTextAction = createAction(BUS_JONGRO_TIME_TEXT);
const seongbukListAction = createAction(BUS_SEONGBUK_LIST);
const seongbukTextAction = createAction(BUS_SEONGBUK_TIME_TEXT);
export const shuttleTextAction = createAction(BUS_SHUTTLE_TEXT);

const initState = {
  jongro_list: [],
  jongro_text: "",
  seongbuk_list: [],
  seongbuk_text: "",
  shuttle_text: ""
};

export const getBusList = type => async dispatch => {
  try {
    const resultJson = await axios.get(
      `${config.bus_url}?serviceKey=${config.bus_key}&busRouteId=${
        type === "jongro" ? config.jongro : config.seongbuk
      }`
    );
    let result = await parseXml(resultJson.data);
    let ServiceResult = result.ServiceResult;

    let count = 0;
    let date = moment().format("HH:mm");
    ServiceResult.msgBody[0].itemList.map((item, index) => {
      if (getArrMsg(item.arrmsg1) == "곧 도착") count++;
    });

    let time = `${date} 기준 ${count}대 운행중`;

    if (type === "jongro") {
      await dispatch(jongroListAction(ServiceResult.msgBody[0].itemList));
      await dispatch(jongroTextAction(time));
    } else {
      await dispatch(seongbukListAction(ServiceResult.msgBody[0].itemList));
      await dispatch(seongbukTextAction(time));
    }
    return true;
  } catch (err) {
    return false;
  }
};
const parseXml = data => {
  return new Promise((resolve, reject) => {
    parseString(data, async (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
export default handleActions(
  {
    [BUS_JONGRO_LIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.jongro_list = payload;
      }),
    [BUS_JONGRO_TIME_TEXT]: (state, { payload }) =>
      produce(state, draft => {
        draft.jongro_text = payload;
      }),
    [BUS_SEONGBUK_LIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.seongbuk_list = payload;
      }),
    [BUS_SEONGBUK_TIME_TEXT]: (state, { payload }) =>
      produce(state, draft => {
        draft.seongbuk_text = payload;
      }),
    [BUS_SHUTTLE_TEXT]: (state, { payload }) =>
      produce(state, draft => {
        draft.shuttle_text = payload;
      })
  },
  initState
);
