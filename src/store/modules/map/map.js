import { createAction, handleActions } from "redux-actions";
import { getData, storeData, widthPercentageToDP as wp } from "../../../utils/util";
import { produce } from "immer";

const initState = {
  mapList: [
    {
      name: "낙성관",
      index: 1,
      top: 382.2,
      left: 266.4,
      width: 65.2,
      height: 93.9,
      btnStyle: {
        top: 40,
        left: 25.6
      },
      nameStyle: {
        top: 61.8,
        left: 19.6
      },
      mainInfo: ["학술정보관", "출력센터", "카페", "열람실"],
      enabled: false,
      // detail 높은층부터
      detail: [
        {
          floor: "",
          info: [""]
        }
      ]
    },
    {
      name: "인성관",
      index: 2,
      top: 387.5,
      left: 358.6,
      width: 81.5,
      height: 39.4,
      btnStyle: {
        top: 1.8,
        left: 34.9
      },
      nameStyle: {
        top: 4.5,
        left: 5.4
      },
      mainInfo: ["학술정보관", "출력센터", "카페", "열람실"],
      enabled: false,
      // detail 높은층부터
      detail: [
        {
          floor: "",
          info: [""]
        }
      ]
    },
    {
      name: "창의관",
      index: 3,
      top: 417.4,
      left: 354.6,
      width: 89.1,
      height: 50.3,
      btnStyle: {
        top: 13.7,
        left: 38.6
      },
      nameStyle: {
        top: 31.6,
        left: 33.4
      },
      mainInfo: ["학술정보관", "출력센터", "카페", "열람실"],
      enabled: false,
      // detail 높은층부터
      detail: [
        {
          floor: "",
          info: [""]
        }
      ]
    },
    {
      name: "미래관",
      index: 4,
      top: 507.3,
      left: 348.6,
      width: 120,
      height: 75.1,
      btnStyle: {
        top: 17.2,
        left: 53.4
      },
      nameStyle: {
        top: 35.7,
        left: 48.4
      },
      mainInfo: ["학술정보관", "출력센터", "카페", "열람실"],
      enabled: false,
      // detail 높은층부터
      detail: [
        {
          floor: "",
          info: [""]
        }
      ]
    },
    {
      name: "상상관",
      index: 5,
      top: 514.3,
      left: 469,
      width: 60.3,
      height: 92.8,
      btnStyle: {
        top: 39.4,
        left: 23.2
      },
      nameStyle: {
        top: 20.7,
        left: 18
      },
      mainInfo: ["학술정보관", "출력센터", "카페", "열람실"],
      enabled: false,
      // detail 높은층부터
      detail: [
        {
          floor: "",
          info: [""]
        }
      ]
    },
    {
      name: "우촌관",
      index: 6,
      top: 622,
      left: 350.2,
      width: 167.7,
      height: 36.5,
      btnStyle: {
        top: 11.2,
        left: 76.1
      },
      nameStyle: {
        top: 13,
        left: 98.8
      },
      mainInfo: ["학술정보관", "출력센터", "카페", "열람실"],
      enabled: false,
      // detail 높은층부터
      detail: [
        {
          floor: "",
          info: [""]
        }
      ]
    },
    {
      name: "진리관",
      index: 7,
      top: 616.1,
      left: 544.4,
      width: 142.8,
      height: 45,
      btnStyle: {
        top: 17.2,
        left: 64.4
      },
      nameStyle: {
        top: 19.9,
        left: 31.6
      },
      mainInfo: ["학술정보관", "출력센터", "카페", "열람실"],
      enabled: false,
      // detail 높은층부터
      detail: [
        {
          floor: "",
          info: [""]
        }
      ]
    },
    {
      name: "",
      index: 8,
      top: 699,
      left: 573.2,
      width: 16.1,
      height: 35.3,
      btnStyle: {
        top: 10.3,
        left: 1.4
      },
      nameStyle: {
        top: 0,
        left: 0
      },
      mainInfo: ["흡연구역"],
      enabled: false,
      // detail 높은층부터
      detail: [
        {
          floor: "",
          info: [""]
        }
      ]
    },
    {
      name: "학송관",
      index: 9,
      top: 671.2,
      left: 598.9,
      width: 39.9,
      height: 91.5,
      btnStyle: {
        top: 29.8,
        left: 13
      },
      nameStyle: {
        top: 48.8,
        left: 8.1
      },
      mainInfo: ["학술정보관", "출력센터", "카페", "열람실"],
      enabled: false,
      // detail 높은층부터
      detail: [
        {
          floor: "",
          info: [""]
        }
      ]
    },
    {
      name: "탐구관",
      index: 10,
      top: 740.8,
      left: 657.5,
      width: 79,
      height: 26.9,
      btnStyle: {
        top: 6.4,
        left: 32.3
      },
      nameStyle: {
        top: 8.2,
        left: 4.5
      },
      mainInfo: ["학술정보관", "출력센터", "카페", "열람실"],
      enabled: false,
      // detail 높은층부터
      detail: [
        {
          floor: "",
          info: [""]
        }
      ]
    },
    {
      name: "학군단",
      index: 11,
      top: 654.2,
      left: 697,
      width: 64.6,
      height: 73.9,
      btnStyle: {
        top: 30,
        left: 24.8
      },
      nameStyle: {
        top: 47.8,
        left: 20
      },
      mainInfo: ["학술정보관", "출력센터", "카페", "열람실"],
      enabled: false,
      // detail 높은층부터
      detail: [
        {
          floor: "",
          info: [""]
        }
      ]
    },
    {
      name: "연구관",
      index: 12,
      top: 455.4,
      left: 512.1,
      width: 124,
      height: 45.2,
      btnStyle: {
        top: 15.6,
        left: 55
      },
      nameStyle: {
        top: 31.6,
        left: 49.9
      },
      mainInfo: ["학술정보관", "출력센터", "카페", "열람실"],
      enabled: false,
      // detail 높은층부터
      detail: [
        {
          floor: "",
          info: [""]
        }
      ]
    },
    {
      name: "지선관",
      index: 13,
      top: 395.4,
      left: 531.8,
      width: 101.6,
      height: 47.2,
      btnStyle: {
        top: 9.6,
        left: 42.3
      },
      nameStyle: {
        top: 13.6,
        left: 9.2
      },
      mainInfo: ["학술정보관", "출력센터", "카페", "열람실"],
      enabled: false,
      // detail 높은층부터
      detail: [
        {
          floor: "",
          info: [""]
        }
      ]
    },
    {
      name: "공학관A",
      index: 14,
      top: 353.4,
      left: 504.1,
      width: 121.3,
      height: 33,
      btnStyle: {
        top: 9.5,
        left: 50.9
      },
      nameStyle: {
        top: 11.6,
        left: 69.9
      },
      mainInfo: ["학술정보관", "출력센터", "카페", "열람실"],
      enabled: false,
      // detail 높은층부터
      detail: [
        {
          floor: "",
          info: [""]
        }
      ]
    },
    {
      name: "상상빌리지",
      index: 15,
      top: 244.9,
      left: 535.3,
      width: 46.7,
      height: 99,
      btnStyle: {
        top: 48.3,
        left: 15.6
      },
      nameStyle: {
        top: 68.1,
        left: 5.7
      },
      mainInfo: ["학술정보관", "출력센터", "카페", "열람실"],
      enabled: false,
      // detail 높은층부터
      detail: [
        {
          floor: "",
          info: [""]
        }
      ]
    },
    {
      name: "공학관B",
      index: 16,
      top: 268.4,
      left: 598.7,
      width: 32.4,
      height: 67.7,
      btnStyle: {
        top: 30.5,
        left: 8.3
      },
      nameStyle: {
        top: 48.6,
        left: 2.3
      },
      mainInfo: ["학술정보관", "출력센터", "카페", "열람실"],
      enabled: false,
      // detail 높은층부터
      detail: [
        {
          floor: "",
          info: [""]
        }
      ]
    }
  ]
};

const INIT_STATE = "map/INIT_STATE";
const ITEM_ENABLE = "map/ITEM_ENABLE";

export const initItem = createAction(INIT_STATE);
export const enableItem = createAction(ITEM_ENABLE);

export default handleActions(
  {
    [INIT_STATE]: (undefined, {}) => {},
    [ITEM_ENABLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.mapList.map(item => {
          if (payload === item.index) item.enabled = true;
          else item.enabled = false;
        });
      })
  },
  initState
);
