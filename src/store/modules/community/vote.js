import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../../utils/api";
import { getData } from "../../../utils/util";

//핸들러
const BOTTOMMODAL_HANDLE = "vote/BOTTOMMODAL_HANDLE";
const ALERTMODAL_HANDLE = "vote/ALERTMODAL_HANDLE";
const ALERTTEXT_HANDLE = "vote/ALERTTEXT_HANDLE";
const LOADING_HANDLE = "vote/LOADING_HANDLE";

const bottomModalHandleAction = createAction(BOTTOMMODAL_HANDLE);
const alertModalHandleAction = createAction(ALERTMODAL_HANDLE);
const alertTextHandleAction = createAction(ALERTTEXT_HANDLE);
const loadingHandleAction = createAction(LOADING_HANDLE);

//투표
const GETVOTE = "vote/GETVOTE";
const PASTVOTELIST = "vote/PASTVOTELIST";
const GETPASTVOTE = "vote/GETPASTVOTE";
const C_CHECKVOTE = "vote/C_CHECKVOTE";
const P_CHECKVOTE = "vote/P_CHECKVOTE";
const ENABLE = "vote/ENABLE";
const DUE_DATE_TIME = "vote/DUEDATETIME";

const getVoteAction = createAction(GETVOTE);
const pageListPastVoteAction = createAction(PASTVOTELIST);
const getPastVoteAction = createAction(GETPASTVOTE);
const C_checkVoteAction = createAction(C_CHECKVOTE);
const P_checkVoteAction = createAction(P_CHECKVOTE);
const enbaleAction = createAction(ENABLE);
const dueDateTimeAction = createAction(DUE_DATE_TIME);

//투표 댓글
const C_VOTE_REPLYLIST = "vote/C_VOTE_REPLYLIST";
const P_VOTE_REPLYLIST = "vote/P_VOTE_REPLYLIST";

const pageListVoteReplyAction = createAction(C_VOTE_REPLYLIST);
const pageListVoteReplyAction2 = createAction(P_VOTE_REPLYLIST);

const initState = {
  //핸들러
  bottomModal: false,
  alertModal: false,
  alertText: "호로록 칼국수",
  c_checkVote: [],
  p_checkVote: [],
  enable: true,
  loading: false,

  //투표
  getVote: [],
  pastVoteList: [],
  getPastVote: [],
  dueDate: null,
  //투표 댓글
  voteReplyList: [],
  pastVoteReplyList: []
};

//핸들러

export const handleBottomModal = bool => dispatch => {
  dispatch(bottomModalHandleAction(bool));
};

export const handleAlertModal = bool => dispatch => {
  dispatch(alertModalHandleAction(bool));
};

export const handleAlertText = text => dispatch => {
  dispatch(alertTextHandleAction(text));
};

export const handleEnable = bool => dispatch => {
  dispatch(enbaleAction(bool));
};

export const handleLoading = bool => dispatch => {
  dispatch(loadingHandleAction(bool));
};

//투표

export const handleDueDateTime = value => dispatch => {
  dispatch(dueDateTimeAction(value));
};

export const createVote = vote => async dispatch => {
  const token = await getData("token");
  const userId = await getData("userId");
  vote.userId = userId;
  const jsonData = await api.post(`/vote`, { body: vote, token: token });
  if (jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
};

export const getVote = () => async dispatch => {
  try {
    const token = await getData("token");
    const jsonData = await api.get(`/vote`, {
      token: token
    });
    if (jsonData.statusCode == 200) {
      //종료기한
      const dueDate = jsonData.result.voteTopic.dueDate
        .replace(/-/gi, "")
        .replace(/:/gi, "")
        .replace("T", "")
        .slice(0, 14);
      dispatch(dueDateTimeAction(dueDate));
      dispatch(getVoteAction(jsonData.result));
      return true;
    } else {
      throw "error";
    }
  } catch (error) {}
};

export const pageListPastVote = () => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.get(`/pastVote?page=1&count=100`, {
    token: token
  });
  if (jsonData.statusCode == 200) {
    dispatch(pageListPastVoteAction(jsonData.result));
    return true;
  } else {
    throw "error";
  }
};

export const getPastVote = (pastVoteTopicIndex, form) => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.get(
    `/pastVote/pastVoteTopicIndex/${pastVoteTopicIndex}`,
    {
      token: token
    }
  );
  if (jsonData.statusCode == 200) {
    if (form == 0) {
      //현재
      dispatch(getVoteAction(jsonData.result));
    } else {
      dispatch(getPastVoteAction(jsonData.result));
    }
    return true;
  } else {
    throw "error";
  }
};

export const checkVote = (voteTopicIndex, form) => async dispatch => {
  const token = await getData("token");
  const userId = await getData("userId");

  const jsonData = await api.get(
    `/checkVote/voteTopicIndex/${voteTopicIndex}/voteUserId/${userId}`,
    { token: token }
  );
  if (jsonData.statusCode == 200) {
    if (form == 0) {
      dispatch(C_checkVoteAction(jsonData.result));
      dispatch(enbaleAction(false));
    } else {
      dispatch(P_checkVoteAction(jsonData.result));
    }
    return true;
  } else if (jsonData.statusCode == 404) {
    if (form == 0) {
      dispatch(enbaleAction(true));
    }
  }
};

//투표 댓글
export const createVoteReply = reply => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.post(
    `/voteReply/voteTopicIndex/${reply.voteTopicIndex}`,
    {
      body: reply,
      token: token
    }
  );
  if (jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
};

export const pageListVoteReply = (voteTopicIndex, form) => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.get(
    `/voteReply/voteTopicIndex/${voteTopicIndex}?page=1&count=100`,
    { token: token }
  );
  if (jsonData.statusCode == 200) {
    if (form == 0) {
      //현재
      dispatch(pageListVoteReplyAction(jsonData.result));
    } else {
      //과거
      dispatch(pageListVoteReplyAction2(jsonData.result));
    }
    return true;
  } else {
    throw "error";
  }
};

export const updateVoteReply = reply => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.put(
    `/voteReply/voteReplyIndex/${reply.voteReplyIndex}`,
    { body: reply, token: token }
  );
  if (jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
};

export const deleteVoteReply = voteReplyIndex => async dispatch => {
  const token = await getData("token");
  const jsonData = await api.delete(
    `/voteReply/voteReplyIndex/${voteReplyIndex}`,
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
    [BOTTOMMODAL_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.bottomModal = payload;
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
    //투표
    [GETVOTE]: (state, { payload }) =>
      produce(state, draft => {
        draft.getVote = payload;
      }),
    [PASTVOTELIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.pastVoteList = payload;
      }),
    [GETPASTVOTE]: (state, { payload }) =>
      produce(state, draft => {
        draft.getPastVote = payload;
      }),
    [C_CHECKVOTE]: (state, { payload }) =>
      produce(state, draft => {
        draft.c_checkVote = payload;
      }),
    [P_CHECKVOTE]: (state, { payload }) =>
      produce(state, draft => {
        draft.p_checkVote = payload;
      }),
    [ENABLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.enable = payload;
      }),
    [DUE_DATE_TIME]: (state, { payload }) =>
      produce(state, draft => {
        draft.dueDate = payload;
      }),
    //투표 댓글
    [C_VOTE_REPLYLIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.voteReplyList = payload;
      }),
    [P_VOTE_REPLYLIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.pastVoteReplyList = payload;
      })
  },
  initState
);
