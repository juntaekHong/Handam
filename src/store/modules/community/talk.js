import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../../utils/api";
import { getData } from "../../../utils/util"

//핸들러
const FILTER_HANDLE = "talk/FILTER_HANDLE";

const filterHandleAction = createAction(FILTER_HANDLE);

//게시물
const INIT_POSTSLIST = "talk/INIT_POSTSLIST";
const POSTSLIST = "talk/POSTSLIST";
const HOTPOSTSLIST = "talk/HOTPOSTSLIST";
const CREATEPOSTS = "talk/CREATEPOSTS";
const GETPOSTS = "talk/GETPOSTS";

const initPostsListAction = createAction(INIT_POSTSLIST);
const postsListAction = createAction(POSTSLIST);
const hostpostsListAction = createAction(HOTPOSTSLIST);
const getPostsAction = createAction(GETPOSTS);
const createPostAction = createAction(CREATEPOSTS)

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
    {index:0, str:"한담", explain:"자유 주제 카테고리 입니다."},
    {index:1, str:"건의한담", explain:"건의사항 카테고리 입니다."},
    {index:2, str:"대자보", explain:"홍보 카테고리 입니다."},
    {index:3, str:"오픈마켓", explain:"상품 거래 카테고리 입니다."},
    {index:4, str:"분실물 센터", explain:"분실물 카테고리 입니다."},
  ],
  filter: `postsCategoryIndex eq 1`,
  orderby:`createdAt DESC`,

  //게시물
  postsList: [],
  hotpostsList: [],
  getPosts: {},

  //댓글
  replysList: [],

  //대댓글
  re_replyList: [],
};

//핸들러
export const handleFilter = (filter) => dispatch => {
  dispatch(filterHandleAction(filter));
};

//게시물
export const initPostList = () => dispatch => {
    dispatch(initPostsListAction());
};

export const pageListPosts = (filter, orderby, page, count) => async dispatch => {
  const token = await getData('token');
  const jsonData = await api.get(`/posts/?filter=${filter}&orderBy=${orderby}&page=${page}&count=${count}`,{token: token});
  if (jsonData.statusCode == 200) {
    if(orderby=='createdAt DESC'){
      dispatch(postsListAction(jsonData.result));
    } else if(orderby=='count DESC') {
      dispatch(hostpostsListAction(jsonData.result));
    }
    return true;
  } else {
    throw "error";
  }
};

export const createPosts = (posts) => async dispatch => {
  const token = await getData('token');
  try{
    const jsonData = await api.post(`/posts`, {body: posts, token: token});
    if (jsonData.statusCode == 200) {
      dispatch(createPostAction(jsonData.result));
      return true;
    } else {
      throw "error";
    }
  } catch(error) {
      console.log(error.message);
      return false;
  }
}

export const getPosts = (postsIndex) => async dispatch => {
  const token = await getData('token');
  const jsonData = await api.get(`/posts/postsIndex/${postsIndex}`,{token: token});
  if (jsonData.statusCode == 200) {
    dispatch(getPostsAction(jsonData.result));
    return true;
  } else {
    throw "error";
  }
};

export const updatePosts = (posts, postsIndex) => async dispatch => {
  const token = await getData('token');
  const jsonData = await api.put(`/posts/postsIndex/${postsIndex}`,{body: posts, token: token});
  if (jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
};

export const deletePosts = (postsindex) => async dispatch => {
  const token = await getData('token');
  const jsonData = await api.delete(`/posts/postsIndex/${postsindex}`,{token: token});
  if (jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
};

export const putPostsSubscriber = (posts) => async dispatch => {
  const token = await getData('token');
  const jsonData = await api.put(`/postsSubscriber/postsIndex/${posts['postsIndex']}`, {body: posts, token: token});
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
  const token = await getData('token');
  const jsonData = await api.get(`/postsReply/postsIndex/${postsIndex}?${condition}`,{token: token});
  if (jsonData.statusCode == 200) {
    dispatch(replyListAction(jsonData.result));
    return true;
  } else {
    throw "error";
  }
}

export const createPostsReply = (reply) => async dispatch => {
  const token = await getData('token');
  const jsonData = await api.post(`/postsReply/postsIndex/${reply['postsIndex']}`,{body: reply, token: token});
  if(jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
}

export const updatePostsReply = (reply) => async dispatch => {
  const token = await getData('token');
  const jsonData = await api.put(`/postsReply/postsReplyIndex/${reply['postsReplyIndex']}`,{body: reply, token: token});
  if(jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
}

export const deletePostsReply = (reply) => async dispatch => {
  const token = await getData('token');
  const jsonData = await api.delete(`/postsReply/postsReplyIndex/${postsReplyIndex}`,{body: reply, token: token});
  if(jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
}

export const putPostsReplySubscriber = (reply) => async dispatch => {
  const token = await getData('token');
  const jsonData = await api.put(`/postsReplySubscriber/postsReplyIndex/${reply['postsReplyIndex']}`, {body: reply, token: token});
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

export const pageChildPostsReply = (condition,parentsPostsReplyIndex) => async dispatch =>{
  const token = await AsyncStorage.getItem('token');
  try {
      const jsonData = await api.get(`/postsReply/parentsPostsReplyIndex/${parentsPostsReplyIndex}?${condition}`, {token: token});
      dispatch(re_replyListAction(jsonData.result));
  } catch (err) {
  }
};


export default handleActions(
  {
    //핸들러
    [FILTER_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.filter = payload;
    }),

    //게시물
    [INIT_POSTSLIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.postsList = [];
    }),
    [POSTSLIST]: (state, action) => {
      return {
        ...state,
        postsList: [
            ...state.postsList,
            ...action.payload,
        ],
      }
    },
    [HOTPOSTSLIST]: (state, {payload}) => 
      produce(state, draft => {
        draft.hotpostsList = payload;
    }),
    [GETPOSTS]: (state, { payload }) =>
      produce(state, draft => {
        draft.getPosts = payload;
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
    }),

  },
  initState
);
