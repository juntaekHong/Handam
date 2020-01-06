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
const DETAILLOADING_HANDLE = "talk/DETAILLOADING_HANDLE";
const ABOUTLOADING_HANDLE = "talk/ABOUTLOADING_HANDLE";
const REPLYMODAL_HANDLE = "talk/REPLYMODAL_HANDLE";

const filterHandleAction = createAction(FILTER_HANDLE);
const categoryIndexHandleAcation = createAction(CATEGORYINDEX_HANDLE);
const bottomModalHandleAction = createAction(BOTTOMMODAL_HANDLE);
const imageModalHandleAction = createAction(IMAGEMODAL_HANDLE);
const imageIndexHandleAction = createAction(IMAGEINDEX_HANDLE);
const alertModalHandleAction = createAction(ALERTMODAL_HANDLE);
const alertTextHandleAction = createAction(ALERTTEXT_HANDLE);
const detailloadingHandleAction = createAction(DETAILLOADING_HANDLE);
const aboutloadingHandleAction = createAction(ABOUTLOADING_HANDLE);
const replyModalHandleAction = createAction(REPLYMODAL_HANDLE);

//카테고리
const CATEGORYLIST = "talk/CATEGORYLIST";

const getCategoryAction = createAction(CATEGORYLIST);

//게시물
const INIT_POSTSLIST = "talk/INIT_POSTSLIST";
const POSTS_TOTAL = "talk/POSTS_TOTAL";
const POSTSLIST = "talk/POSTSLIST";
const HOTPOSTSLIST = "talk/HOTPOSTSLIST";
const INIT_GETPOSTS = "talk/INIT_GETPOSTS";
const GETPOSTS = "talk/GETPOSTS";
const INIT_SEARCHPOSTSLIST = "talk/INIT_SEARCHPOSTSLIST";
const SEARCH_POSTS_TOTAL = "talk/SEARCH_POSTS_TOTAL";
const SEARCHPOSTS = "talk/SEARCHPOSTS";

const initPostsListAction = createAction(INIT_POSTSLIST);
const postsTotalAction = createAction(POSTS_TOTAL);
const postsListAction = createAction(POSTSLIST);
const hostpostsListAction = createAction(HOTPOSTSLIST);
const initGetPostsAction = createAction(INIT_GETPOSTS);
const getPostsAction = createAction(GETPOSTS);
const searchPostsTotalAction = createAction(SEARCH_POSTS_TOTAL);
const searchPostsAction = createAction(SEARCHPOSTS);
const initSearchPostsListAction = createAction(INIT_SEARCHPOSTSLIST);

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
  categoryList: [],
  categoryIndex: 1,
  filter: `postsCategoryIndex eq 1`,
  orderby: `createdAt DESC`,

  bottomModal: false,
  imageModal: false,
  imageIndex: 0,
  alertModal: false,
  alertText: "호로록 칼국수",
  detailloading: false,
  aboutloading: false,
  replyModal: false,

  //게시물
  total: 0,
  postsList: [],
  hotpostsList: [],
  searchTotal: 0,
  searchpostsList: [],
  getPosts: { imagePath: [] },

  //댓글
  replysList: [],

  //대댓글
  re_replyList: []
};

export const listPostsCategory = () => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.get(`/postsCategory`, { token: token });

  dispatch(getCategoryAction(jsonData.result));
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

export const handleDetailloading = bool => dispatch => {
  dispatch(detailloadingHandleAction(bool));
};

export const handleAboutloading = bool => dispatch => {
  dispatch(aboutloadingHandleAction(bool));
};

export const handleReplyModal = bool => dispatch => {
  dispatch(replyModalHandleAction(bool));
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
    } else if (orderby == "goodCount DESC") {
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
  } else if (jsonData.statusCode == 404) {
    //삭제된 게시물인 경우
    return "deleted";
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

export const initpageListPostsforSearch = () => dispatch => {
  dispatch(searchPostsTotalAction(0));
  dispatch(initSearchPostsListAction());
}

export const pageListPostsForSearch = (
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
    dispatch(searchPostsTotalAction(jsonData.resultCount));
    dispatch(searchPostsAction(jsonData.result));
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
  try {
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
  } catch (e) {
    return false;
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
    [DETAILLOADING_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.detailloading = payload;
      }),
    [ABOUTLOADING_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.aboutloading = payload;
      }),
    [REPLYMODAL_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.replyModal = payload;
      }),
    //카테고리
    [CATEGORYLIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.categoryList = payload;
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
    [SEARCH_POSTS_TOTAL]: (state, { payload }) =>
      produce(state, draft => {
        draft.searchTotal = payload;
      }),
    [SEARCHPOSTS]: (state, action) => {
      return {
        ...state,
        searchpostsList: [...state.searchpostsList, ...action.payload]
      };
    },
    [INIT_SEARCHPOSTSLIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.searchpostsList = [];
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
