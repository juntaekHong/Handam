import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../../utils/api";
import { getData } from "../../../utils/util";

//핸들러
const FILTER_HANDLE = "restaurant/FILTER_HANDLE";
const TOTAL_HANDLE = "restaurant/TOTAL_HANDLE";
const BOTTOMMODAL_HANDLE = "restaurant/BOTTOMMODAL_HANDLE";
const IMAGEMODAL_HANDLE = "restaurant/IMAGEMODAL_HANDLE";
const IMAGEINDEX_HANDLE = "restaurant/IMAGEINDEX_HANDLE";
const ALERTMODAL_HANDLE = "restaurant/ALERTMODAL_HANDLE";
const ALERTTEXT_HANDLE = "restaurant/ALERTTEXT_HANDLE";
const LOADING_HANDLE = "restaurant/LOADING_HANDLE";
const DETAILLOADING_HANDLE = "restaurant/DETAILLOADING_HANDLE";

const filterHandleAction = createAction(FILTER_HANDLE);
const totalHandleAction = createAction(TOTAL_HANDLE);
const bottomModalHandleAction = createAction(BOTTOMMODAL_HANDLE);
const imageModalHandleAction = createAction(IMAGEMODAL_HANDLE);
const imageIndexHandleAction = createAction(IMAGEINDEX_HANDLE);
const alertModalHandleAction = createAction(ALERTMODAL_HANDLE);
const alertTextHandleAction = createAction(ALERTTEXT_HANDLE);
const loadingHandleAction = createAction(LOADING_HANDLE);
const detailloadingHandleAction = createAction(DETAILLOADING_HANDLE);

//식당
const RESTAURANTCATEGORY = "restaurant/RESTAURANTCATEGORY";
const INIT_RESTAURANTLIST = "restaurant/INIT_RESTAURANTLIST";
const RESTAURANTLIST = "restaurant/RESTAURANTLIST";
const GETRESTAURANT = "restaurant/GETRESTAURANT";
const PUTSUBSCRIBER = "restaurant/PUTSUBSCRIBER";

const restaurantCategoryAction = createAction(RESTAURANTCATEGORY);
const init_restaurantlistAction = createAction(INIT_RESTAURANTLIST);
const restaurantListAction = createAction(RESTAURANTLIST);
const getRestaurantAction = createAction(GETRESTAURANT);
const putSubscriberAction = createAction(PUTSUBSCRIBER);

//식당 댓글
const RESTAURANT_REPLYLIST = "restaurant/RESTAURANT_REPLYLIST";
const GET_RESTAURANT_REPLY = "restaurant/GET_RESTAURANT_REPLY";

const pageListRestaurantReplyAction = createAction(RESTAURANT_REPLYLIST);
const getRestaurantReplyAction = createAction(GET_RESTAURANT_REPLY);

const initState = {
  //핸들러
  filter: null,
  orderBy: `name ASC`,
  total: 0,

  bottomModal: false,
  imageModal: false,
  imageIndex: 0,
  alertModal: false,
  alertText: "호로록 칼국수",
  loading: false,
  detailloading: false,

  //삭당
  categoryList: [{ restaurantCategoryName: "전체 맛집", order: 0 }],
  restaurantList: [],
  getRestaurant: null,

  //식당 댓글
  restaurantReplyList: [],
  getRestaurantReply: []
};

//핸들러
export const handleFilter = categoryName => async dispatch => {
  dispatch(filterHandleAction(categoryName));
};

export const handleBottomModal = bool => dispatch => {
  dispatch(bottomModalHandleAction(bool));
};

export const handleImageModal = bool => dispatch => {
  dispatch(imageModalHandleAction(bool));
};

export const handleImageIndex = index => dispatch => {
  dispatch(imageIndexHandleAction(index));
};

export const handleAlertModal = bool => dispatch => {
  dispatch(alertModalHandleAction(bool));
};

export const handleAlertText = text => dispatch => {
  dispatch(alertTextHandleAction(text));
};

export const handleLoading = bool => dispatch => {
  dispatch(loadingHandleAction(bool));
};

export const handleDetailLoading = bool => dispatch => {
  dispatch(detailloadingHandleAction(bool));
};

//식당
export const listRestaurantCategory = () => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.get(`/restaurantCategory`, { token: token });

  if (jsonData.statusCode == 200) {
    dispatch(restaurantCategoryAction(jsonData.result));
    return true;
  } else {
    throw "error";
  }
};

export const initRestaurantList = () => async dispatch => {
  dispatch(init_restaurantlistAction());
};

export const pageListRestaurant = (filter, page) => async dispatch => {
  const token = await getData("token");
  let url = `/restaurant?`;

  if (filter != null) url += `filter=restaurantCategoryName eq ${filter}&`;

  const jsonData = await api.get(
    (url += `orderBy=${initState.orderBy}&page=${page}&count=4`),
    { token: token }
  );

  if (jsonData.statusCode == 200) {
    dispatch(restaurantListAction(jsonData.result));
    dispatch(totalHandleAction(jsonData.resultCount));
    return true;
  } else {
    throw "error";
  }
};

export const getRestaurant = restaurantIndex => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.get(
    `/restaurant/restaurantIndex/${restaurantIndex}`,
    { token: token }
  );

  console.log("식당 정보")
  console.log(jsonData.result)

  if (jsonData.statusCode == 200) {
    dispatch(getRestaurantAction(jsonData.result));
    return true;
  } else {
    throw "error";
  }
};

export const putRestaurantSubscriber = good => async dispatch => {
  console.log(good)
  const token = await getData("token");
  const jsonData = await api.put(
    `/restaurantSubscriber/restaurantIndex/${good.restaurantIndex}`,
    { body: good, token: token }
  );
  console.log("식당 좋아요")
  console.log(jsonData);
  if (jsonData.statusCode == 200) {
    dispatch(putSubscriberAction(jsonData.result));
    return true;
  } else {
    throw "error";
  }
};

//식당 댓글
export const createRestaurantReply = (
  restaurantReply,
  restaurantIndex
) => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.post(
    `/restaurantReply/restaurantIndex/${restaurantIndex}`,
    { body: restaurantReply, token: token }
  );

  if (jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
};

export const pageListRestaurantReply = restaurantIndex => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.get(
    `/restaurantReply/restaurantIndex/${restaurantIndex}?page=1&count=100`,
    { token: token }
  );

  if (jsonData.statusCode == 200) {
    dispatch(pageListRestaurantReplyAction(jsonData.result));
    return true;
  } else {
    throw "error";
  }
};

export const getRestaurantReply = restaurantReplyIndex => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.get(
    `/restaurantReply/restaurantReplyIndex/${restaurantReplyIndex}`,
    { token: token }
  );

  if (jsonData.statusCode == 200) {
    dispatch(getRestaurantReplyAction(jsonData.result));
    return true;
  } else {
    throw "error";
  }
};

export const updateRestaurantReply = (
  restaurantReply,
  restaurantReplyIndex
) => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.put(
    `/restaurantReply/restaurantReplyIndex/${restaurantReplyIndex}`,
    { body: restaurantReply, token: token }
  );

  if (jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
};

export const deleteRestaurantReply = restaurantReplyIndex => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.delete(
    `/restaurantReply/restaurantReplyIndex/${restaurantReplyIndex}`,
    { token: token }
  );

  if (jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
};

export default handleActions(
  {
    //핸들러
    [FILTER_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.filter = payload;
      }),
    [TOTAL_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.total = payload;
      }),
    [BOTTOMMODAL_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.bottomModal = payload;
      }),
    [IMAGEMODAL_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.imageModal = payload;
      }),
    [IMAGEINDEX_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.imageIndex = payload;
      }),
    [ALERTMODAL_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.alertModal = payload;
      }),
    [ALERTTEXT_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.alertText = payload;
      }),
    [LOADING_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.loading = payload;
      }),
    [DETAILLOADING_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.detailloading = payload;
      }),

    //식당
    [RESTAURANTCATEGORY]: (state, { payload }) =>
      produce(state, draft => {
        draft.categoryList = [...state.categoryList, ...payload];
      }),
    [INIT_RESTAURANTLIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.restaurantList = [];
      }),
    [RESTAURANTLIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.restaurantList = [...state.restaurantList, ...payload];
      }),
    [GETRESTAURANT]: (state, { payload }) =>
      produce(state, draft => {
        draft.getRestaurant = payload;
      }),
    [PUTSUBSCRIBER]: (state, { payload }) =>
      produce(state, draft => {
        draft.isGood = payload.isGood;
      }),

    //식당 댓글
    [RESTAURANT_REPLYLIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.restaurantReplyList = payload;
      }),
    [GET_RESTAURANT_REPLY]: (state, { payload }) =>
      produce(state, draft => {
        draft.getRestaurantReply = payload;
      })
  },
  initState
);
