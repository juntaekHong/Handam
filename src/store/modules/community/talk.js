import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../../utils/api";
import { getData } from "../../../utils/util";

//핸들러
const FILTER_HANDLE = "talk/FILTER_HANDLE";
const CATEGORYINDEX_HANDLE = "talk/CATEGORYINDEX_HANDLE";
const BOTTOMMODAL_HANDLE = "talk/BOTTOMMODAL_HANDLE";
const IMAGEMODAL_HANDLE = "talk/IMAGEMODAL_HANDLE";
const IMAGEINDEX_HANDLE = "talk/IMAGEINDEX_HANDLE";
const ALERTMODAL_HANDLE = "talk/ALERTMODAL_HANDLE";
const ALERTTEXT_HANDLE = "talk/ALERTTEXT_HANDLE";

const filterHandleAction = createAction(FILTER_HANDLE);
const categoryIndexHandleAcation = createAction(CATEGORYINDEX_HANDLE);
const bottomModalHandleAction = createAction(BOTTOMMODAL_HANDLE);
const imageModalHandleAction = createAction(IMAGEMODAL_HANDLE);
const imageIndexHandleAction = createAction(IMAGEINDEX_HANDLE);
const alertModalHandleAction = createAction(ALERTMODAL_HANDLE);
const alertTextHandleAction = createAction(ALERTTEXT_HANDLE);

//게시물
const INIT_POSTSLIST = "talk/INIT_POSTSLIST";
const POSTS_TOTAL = "talk/POSTS_TOTAL";
const POSTSLIST = "talk/POSTSLIST";
const HOTPOSTSLIST = "talk/HOTPOSTSLIST";
const INIT_GETPOSTS = "talk/INIT_GETPOSTS";
const GETPOSTS = "talk/GETPOSTS";

const initPostsListAction = createAction(INIT_POSTSLIST);
const postsTotalAction = createAction(POSTS_TOTAL);
const postsListAction = createAction(POSTSLIST);
const hostpostsListAction = createAction(HOTPOSTSLIST);
const initGetPostsAction = createAction(INIT_GETPOSTS);
const getPostsAction = createAction(GETPOSTS);

//댓글
const INIT_REPLYSLIST = "talk/INIT_REPLYSLIST";
const REPLYSLIST = "talk/REPLYSLIST";

const initReplysListAction = createAction(INIT_REPLYSLIST);
const replyListAction = createAction(REPLYSLIST);

//대댓글
const INIT_RE_REPLYSLIST = "talk/INIT_RE_REPLYSLIST";
const RE_REPLYSLIST = "talk/RE_REPLYSLIST";

const initRe_ReplysListAction = createAction(INIT_RE_REPLYSLIST);
const re_replyListAction = createAction(RE_REPLYSLIST);

//state
const initState = {
  categoryList: [
    { str: "한담", explain: "자유 주제 카테고리 입니다." },
    { str: "건의한담", explain: "건의사항 카테고리 입니다." },
    { str: "대자보", explain: "홍보 카테고리 입니다." },
    { str: "오픈마켓", explain: "상품 거래 카테고리 입니다." },
    { str: "분실물 센터", explain: "분실물 카테고리 입니다." }
  ],
  categoryIndex: 1,
  filter: `postsCategoryIndex eq 1`,
  orderby: `createdAt DESC`,

  bottomModal: false,
  imageModal: false,
  imageIndex: 0,
  alertModal: false,
  alertText: "호로록 칼국수",

  //게시물
  total: 0,
  postsList: [],
  hotpostsList: [],
  getPosts: { imagePath: [] },

  //댓글
  replysList: [],

  //대댓글
  re_replyList: []
};

//핸들러
export const handleFilter = filter => dispatch => {
  dispatch(filterHandleAction(filter));
};

export const handleCategoryIndex = index => dispatch => {
  dispatch(categoryIndexHandleAcation(index));
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

//게시물
export const initPostList = () => dispatch => {
  dispatch(postsTotalAction(0));
  dispatch(initPostsListAction());
};

export const pageListPosts = (
  filter,
  orderby,
  page,
  count
) => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.get(
    `/posts/?filter=${filter}&orderBy=${orderby}&page=${page}&count=${count}`,
    { token: token }
  );
  if (jsonData.statusCode == 200) {
    if (orderby == "createdAt DESC") {
      dispatch(postsTotalAction(jsonData.resultCount));
      dispatch(postsListAction(jsonData.result));
    } else if (orderby == "count DESC") {
      dispatch(hostpostsListAction(jsonData.result));
    }
    return true;
  } else {
    throw "error";
  }
};

export const createPosts = posts => async dispatch => {
  const token = await getData("token");
  try {
    const jsonData = await api.post(`/posts`, { body: posts, token: token });
    if (jsonData.statusCode == 200) {
      return true;
    } else {
      throw "error";
    }
  } catch (error) {
    return false;
  }
};

export const initGetPosts = () => async dispatch => {
  dispatch(initGetPostsAction());
};

export const getPosts = postsIndex => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.get(`/posts/postsIndex/${postsIndex}`, {
    token: token
  });
  if (jsonData.statusCode == 200) {
    dispatch(getPostsAction(jsonData.result));
    return true;
  } else {
    throw "error";
  }
};

export const updatePosts = (posts, postsIndex) => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.put(`/posts/postsIndex/${postsIndex}`, {
    body: posts,
    token: token
  });
  if (jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
};

export const deletePosts = postsindex => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.delete(`/posts/postsIndex/${postsindex}`, {
    token: token
  });
  if (jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
};

export const createPostsReport = posts => async dispatch => {
  const token = await getData("token");
  const userId = await getData("userId");
  posts.userId = userId;
  try {
    const jsonData = await api.post(`/postsReport`, {
      body: posts,
      token: token
    });
    if (jsonData.statusCode == 200) {
      return true;
    } else {
      throw "error";
    }
  } catch (err) {}
};

export const putPostsSubscriber = posts => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.put(
    `/postsSubscriber/postsIndex/${posts["postsIndex"]}`,
    { body: posts, token: token }
  );
  if (jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
};

//댓글
export const initReplysList = () => dispatch => {
  dispatch(initReplysListAction());
};

export const pageListPostsReply = (condition, postsIndex) => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.get(
    `/postsReply/postsIndex/${postsIndex}?${condition}`,
    { token: token }
  );
  if (jsonData.statusCode == 200) {
    dispatch(replyListAction(jsonData.result));
    return true;
  } else {
    throw "error";
  }
};

export const createPostsReply = reply => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.post(
    `/postsReply/postsIndex/${reply["postsIndex"]}`,
    { body: reply, token: token }
  );
  if (jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
};

export const updatePostsReply = reply => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.put(
    `/postsReply/postsReplyIndex/${reply["postsReplyIndex"]}`,
    { body: reply, token: token }
  );
  if (jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
};

export const deletePostsReply = postsReplyIndex => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.delete(
    `/postsReply/postsReplyIndex/${postsReplyIndex}`,
    { token: token }
  );
  if (jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
};

export const createPostsReplyReport = reply => async dispatch => {
  const token = await getData("token");
  const userId = await getData("userId");
  reply.userId = userId;
  try {
    const jsonData = await api.post(`/postsReplyReport`, {
      body: reply,
      token: token
    });
    if (jsonData.statusCode == 200) {
      return true;
    } else {
      throw "error";
    }
  } catch (err) {}
};

export const putPostsReplySubscriber = reply => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.put(
    `/postsReplySubscriber/postsReplyIndex/${reply["postsReplyIndex"]}`,
    { body: reply, token: token }
  );
  if (jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
};

//대댓글
export const initRE_ReplyList = () => dispatch => {
  dispatch(initRe_ReplysListAction());
};

export const pageChildPostsReply = (
  condition,
  parentsPostsReplyIndex
) => async dispatch => {
  const token = await AsyncStorage.getItem("token");
  try {
    const jsonData = await api.get(
      `/postsReply/parentsPostsReplyIndex/${parentsPostsReplyIndex}?${condition}`,
      { token: token }
    );
    dispatch(re_replyListAction(jsonData.result));
  } catch (err) {}
};

export default handleActions(
  {
    //핸들러
    [FILTER_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.filter = payload;
      }),
    [CATEGORYINDEX_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.categoryIndex = payload;
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

    //게시물
    [INIT_POSTSLIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.postsList = [];
      }),
    [POSTS_TOTAL]: (state, { payload }) =>
      produce(state, draft => {
        draft.total = payload;
      }),
    [POSTSLIST]: (state, action) => {
      return {
        ...state,
        postsList: [...state.postsList, ...action.payload]
      };
    },
    [HOTPOSTSLIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.hotpostsList = payload;
      }),
    [GETPOSTS]: (state, { payload }) =>
      produce(state, draft => {
        draft.getPosts = payload;
      }),
    [INIT_GETPOSTS]: (state, { payload }) =>
      produce(state, draft => {
        draft.getPosts = { imagePath: [] };
      }),

    //댓글
    [INIT_REPLYSLIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.replysList = [];
      }),
    [REPLYSLIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.replysList = payload;
      }),

    //대댓글
    [INIT_RE_REPLYSLIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.re_replyList = [];
      }),
    [RE_REPLYSLIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.re_replyList = payload;
      })
  },
  initState
);
