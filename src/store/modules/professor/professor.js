import api from "../../../utils/api";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { getData } from "../../../utils/util";

const PROFESSOR_FILTER_LIST = "professor/PROFESSOR_FILTER_LIST";
const PROFESSOR_LIST = "professor/PROFESSOR_LIST";
const PROFESSOR_DETAIL_LIST = "professor/PROFESSOR_DETAIL_LIST";
const PROFESSOR_LIST_TOTAL = "professor/PROFESSOR_LIST_TOTAL";
export const professorListTotalAction = createAction(PROFESSOR_LIST_TOTAL);

const professorFilterListAction = createAction(PROFESSOR_FILTER_LIST);
const professorListAction = createAction(PROFESSOR_LIST);
const professorDetailListAction = createAction(PROFESSOR_DETAIL_LIST);

// 교수 리스트 초기화
const PROFESSOR_LIST_INIT = "professor/PROFESSOR_LIST_INIT";
const professorListInitAction = createAction(PROFESSOR_LIST_INIT);

// 리스트 개수 초기화
const PROFESSOR_LIST_TOTAL_INIT = "professor/PROFESSOR_LIST_TOTAL_INIT";
export const professorListTotalInitAction = createAction(
  PROFESSOR_LIST_TOTAL_INIT
);

// 필터 교수명 리스트 초기화
const PROFESSOR_FILTER_LIST_INIT = "professor/PROFESSOR_FILTER_LIST_INIT";
const professorFilterListInitAction = createAction(PROFESSOR_FILTER_LIST_INIT);

// 교수 상세정보 초기화
const PROFESSOR_DETAIL_LIST_INIT = "professor/PROFESSOR_DETAIL_LIST_INIT";
const professorDetailListInitAction = createAction(PROFESSOR_DETAIL_LIST_INIT);

// 댓글
const PROFESSOR_REPLYLIST = "professor/PROFESSOR_REPLYLIST";
const pageListProfessorReplyAction = createAction(PROFESSOR_REPLYLIST);

// 댓글 초기화
const PROFESSOR_REPLY_LIST_INIT = "professor/PROFESSOR_REPLY_LIST_INIT";
const professorReplyListInitAction = createAction(PROFESSOR_REPLY_LIST_INIT);

// 로딩
const PROFESSOR_LOADING = "professor/PROFESSOR_LOADING";
const professorLoadingAction = createAction(PROFESSOR_LOADING);

// 각 항목 평가
// const PROFESSOR_LECTURE_POWER = "professor/PROFESSOR_LECTURE_POWER";
// const professorLecturePowerAction = createAction(PROFESSOR_LECTURE_POWER);
//
// const PROFESSOR_HOMEWORK = "professor/PROFESSOR_HOMEWORK";
// const professorHomeworkAction = createAction(PROFESSOR_HOMEWORK);
//
// const PROFESSOR_ELASTICITY = "professor/PROFESSOR_ELASTICITY";
// const professorElasticityAction = createAction(PROFESSOR_ELASTICITY);
//
// const PROFESSOR_COMMUNICATION = "professor/PROFESSOR_COMMUNICATION";
// const professorCommunicationAction = createAction(PROFESSOR_COMMUNICATION);
//
// const PROFESSOR_GRADE = "professor/PROFESSOR_GRADE";
// const professorGradeAction = createAction(PROFESSOR_GRADE);
//
// const PROFESSOR_REPLY = "professor/PROFESSOR_REPLY";
// const professorReplyAction = createAction(PROFESSOR_REPLY);

// 내가 쓴 교수평가 리스트 초기화
const MY_WRITE_PROFESSOR_LIST_INIT = "professor/MY_WRITE_PROFESSOR_LIST_INIT";
const myWriteProfessorListInitAction = createAction(
  MY_WRITE_PROFESSOR_LIST_INIT
);

// 내가 쓴 교수평가 리스트
const MY_WRITE_PROFESSOR_LIST = "professor/MY_WRITE_PROFESSOR_LIST";
const myWriteProfessorListAction = createAction(MY_WRITE_PROFESSOR_LIST);

// 댓글( 평가 및 댓글 수정시) 초기화
const MY_WRITE_PROFESSOR_REPLY_INIT = "professor/MY_WRITE_PROFESSOR_REPLY_INIT";
const myWriteProfessorReplyInitAction = createAction(
  MY_WRITE_PROFESSOR_REPLY_INIT
);

// 댓글( 평가 및 댓글 수정시)
const MY_WRITE_PROFESSOR_REPLY = "professor/MY_WRITE_PROFESSOR_REPLY";
const myWriteProfessorReplyAction = createAction(MY_WRITE_PROFESSOR_REPLY);

// from
const FROM = "professor/FROM";
const fromAction = createAction(FROM);

//from init
const FROM_INIT = "professor/FROM_INIT";
const fromInitAction = createAction(FROM_INIT);

const initState = {
  professor_loading: false,

  filter: "",
  professor_filter_list: ["해당없음"],
  professor_list: [],
  professor_list_check: [],
  professor_detail_list: [],
  professor_list_total: null,

  //댓글
  professor_reply_list: [],

  // 각 항목 평가하기.
  // lecturePower: null,
  // homework: null,
  // elasticity: null,
  // communication: null,
  // grade: null,
  reply: [],

  // 내가 쓴 교수평가 리스트
  my_write_professor_list: [],

  // 평가 수정 후, 이동될 페이지
  from: false
};

export const professorLoadingHandle = bool => dispatch => {
  dispatch(professorLoadingAction(bool));
};

export const professorListInitHandle = () => dispatch => {
  dispatch(professorListInitAction());
};

export const professorListTotalInitHandle = () => dispatch => {
  dispatch(professorListTotalInitAction());
};

export const professorFilterListInitHandle = () => dispatch => {
  dispatch(professorFilterListInitAction());
};

export const professorDetailListInitHandle = () => dispatch => {
  dispatch(professorDetailListInitAction());
};

export const professorReplyListInitHandle = () => dispatch => {
  dispatch(professorReplyListInitAction());
};

// 각 항목 값
// export const professorLecturePowerHandle = number => dispatch => {
//     dispatch(professorLecturePowerAction(number));
// };
//
// export const professorHomeworkHandle = number => dispatch => {
//     dispatch(professorHomeworkAction(number));
// };
//
// export const professorElasticityHandle = number => dispatch => {
//     dispatch(professorElasticityAction(number));
// };
//
// export const professorCommunicationHandle = number => dispatch => {
//     dispatch(professorCommunicationAction(number));
// };
//
// export const professorGradeHandle = number => dispatch => {
//     dispatch(professorGradeAction(number));
// };
//
// export const professorReplyHandle = array => dispatch => {
//     dispatch(professorReplyAction(array));
// };

export const myWriteProfessorListInitHandle = () => dispatch => {
  dispatch(myWriteProfessorListInitAction());
};

export const myWriteProfessorReplyInitHandle = () => dispatch => {
  dispatch(myWriteProfessorReplyInitAction());
};

export const fromHandle = bool => dispatch => {
  dispatch(fromAction(bool));
};

export const fromInitHandle = () => dispatch => {
  dispatch(fromInitAction(false));
};

// 필터링 검색 시, 교수명 필터
export const FilterProfessorList = (page, count, filter1) => async dispatch => {
  try {
    const token = await getData("token");
    let Keyword = filter1 === undefined || filter1 === "" ? "" : filter1;

    if (Keyword.indexOf("트랙") != -1 || Keyword.indexOf("전공") != -1) {
      Keyword = Keyword.substring(0, Keyword.length - 2);
    }

    let url = `/professorInfo/?page=${page}&count=${count}&filter=trackName like ${Keyword}`;
    const jsonData = await api.get(url, {
      token: token
    });

    if (jsonData.statusCode == 200) {
      const data = jsonData.result;
      dispatch(professorFilterListAction(data));
    } else {
      dispatch({ type: PROFESSOR_FILTER_LIST, payload: [] });
    }
  } catch (e) {}
};

// 교수평가 메인(첫) 페이지 교수 평가 리스트 목록
export const ProfessorPageList = (
  page,
  count,
  keyword,
  keyword2
) => async dispatch => {
  try {
    const token = await getData("token");

    let url = `/professorInfo/?page=${page}&count=${count}`;

    if (keyword.indexOf("트랙") != -1 || keyword.indexOf("전공") != -1) {
      keyword = keyword.substring(0, keyword.length - 3);
    }

    if (keyword != "") url += `&filter=trackName like ${keyword}`;
    if (keyword != "" && keyword2 === "")
      url += ` or professorName like ${keyword}`;
    if (keyword2 != "") url += ` and professorName like ${keyword2}`;

    const jsonData = await api.get(url, {
      token: token
    });

    if (jsonData.statusCode == 200) {
      const data = jsonData.result;
      dispatch(professorListAction(data));
      dispatch(professorListTotalAction(jsonData.resultCount));
    } else {
      dispatch({ type: PROFESSOR_LIST, payload: [] });
    }
  } catch (e) {}
};

// 교수평가 세부지표
export const getProfessorInfo = Index => async dispatch => {
  try {
    const token = await getData("token");

    const jsonData = await api.get(`/professorInfo/professorIndex/${Index}`, {
      token: token
    });
    if (jsonData.statusCode == 200) {
      const data = jsonData.result;
      dispatch(professorDetailListAction(data));
    } else {
      dispatch({ type: PROFESSOR_DETAIL_LIST, payload: [] });
    }
  } catch (e) {}
};

// 댓글 리스트
export const pageListProfessorReply = professorInfoIndex => async dispatch => {
  const token = await getData("token");

  const jsonData = await api.get(
    `/professorReply/professorInfoIndex/${professorInfoIndex}?page=1&count=100`,
    { token: token }
  );

  if (jsonData.statusCode == 200) {
    dispatch(pageListProfessorReplyAction(jsonData.result));
    return true;
  } else {
    throw "error";
  }
};

// 댓글 생성
export const createProfessorReply = (
  professorInfoIndex,
  professorReplyData
) => async dispatch => {
  const token = await getData("token");

  const jsonData = await api.post(
    `/professorReply/professorInfoIndex/${professorInfoIndex}`,
    { token: token, body: professorReplyData }
  );

  if (jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
};

// 댓글 가져오기? 테스트..
export const getProfessorReply = professorReplyIndex => async dispatch => {
  const token = await getData("token");

  const jsonData = await api.get(
    `/professorReply/getProfessorReply/${professorReplyIndex}`,
    { token: token }
  );

  if (jsonData.statusCode == 200) {
    dispatch(myWriteProfessorReplyAction(jsonData.result));
    return jsonData.result;
  } else {
    throw "error";
  }
};

// 댓글 좋아요
export const putProfessorReplySubscriber = replyData => async dispatch => {
  const token = await getData("token");

  const jsonData = await api.put(
    `/professorReplySubscriber/professorReply/${replyData.professorReplyIndex}`,
    { token: token, body: replyData }
  );

  if (jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
};

// 내가 쓴 교수평가 리스트
export const myProfessorReplyPostList = () => async dispatch => {
  const token = await getData("token");

  const jsonData = await api.get(`/professorReply/myProfessorReplyPostList/`, {
    token: token
  });

  if (jsonData.statusCode == 200) {
    dispatch(myWriteProfessorListAction(jsonData.result));
    return true;
  } else {
    throw "error";
  }
};

// 내가 쓴 댓글 삭제
export const deleteProfessorReply = professorReplyIndex => async dispatch => {
  const token = await getData("token");

  const jsonData = await api.delete(
    `/professorReply/professorReplyIndex/${professorReplyIndex}`,
    { token: token }
  );

  if (jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
};

// 평가(댓글) 수정
export const updateProfessorReply = (
  professorReplyIndex,
  professorReplyData
) => async dispatch => {
  const token = await getData("token");

  const jsonData = await api.put(
    `/professorReply/professorReplyIndex/${professorReplyIndex}`,
    { token: token, body: professorReplyData }
  );

  if (jsonData.statusCode == 200) {
    return true;
  } else {
    throw "error";
  }
};

export default handleActions(
  {
    [PROFESSOR_LOADING]: (state, { payload }) =>
      produce(state, draft => {
        draft.professor_loading = payload;
      }),
    [PROFESSOR_FILTER_LIST_INIT]: (state, { payload }) =>
      produce(state, draft => {
        draft.professor_filter_list = ["해당없음"];
      }),
    [PROFESSOR_FILTER_LIST]: (state, { payload }) =>
      produce(state, draft => {
        payload.map(item => {
          draft.professor_filter_list.push(item.professorName + " 교수님");
        });
      }),
    [PROFESSOR_LIST_INIT]: (state, { payload }) =>
      produce(state, draft => {
        draft.professor_list = [];
      }),
    [PROFESSOR_LIST]: (state, { payload }) =>
      produce(state, draft => {
        payload.map(item => {
          draft.professor_list.push(item);
        });
      }),
    [PROFESSOR_DETAIL_LIST_INIT]: (state, { payload }) =>
      produce(state, draft => {
        draft.professor_detail_list = [];
      }),
    [PROFESSOR_DETAIL_LIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.professor_detail_list = payload;
      }),
    [PROFESSOR_LIST_TOTAL_INIT]: (state, { payload }) =>
      produce(state, draft => {
        draft.professor_list_total = null;
      }),
    [PROFESSOR_LIST_TOTAL]: (state, { payload }) =>
      produce(state, draft => {
        draft.professor_list_total = payload;
      }),
    // 댓글
    [PROFESSOR_REPLYLIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.professor_reply_list = payload;
      }),
    [PROFESSOR_REPLY_LIST_INIT]: (state, { payload }) =>
      produce(state, draft => {
        draft.professor_reply_list = [];
      }),
    // 각 항목 초기화

    // 각 항목 평가
    // [PROFESSOR_LECTURE_POWER]: (state, { payload }) =>
    //     produce(state, draft => {
    //         draft.lecturePower = payload;
    //     }),
    // [PROFESSOR_HOMEWORK]: (state, { payload }) =>
    //     produce(state, draft => {
    //         draft.homework = payload;
    //     }),
    // [PROFESSOR_ELASTICITY]: (state, { payload }) =>
    //     produce(state, draft => {
    //         draft.elasticity = payload;
    //     }),
    // [PROFESSOR_COMMUNICATION]: (state, { payload }) =>
    //     produce(state, draft => {
    //         draft.communication = payload;
    //     }),
    // [PROFESSOR_GRADE]: (state, { payload }) =>
    //     produce(state, draft => {
    //         draft.grade = payload;
    //     }),
    // [PROFESSOR_REPLY]: (state, { payload }) =>
    //     produce(state, draft => {
    //         draft.reply = payload;
    //     }),
    [MY_WRITE_PROFESSOR_LIST_INIT]: (state, { payload }) =>
      produce(state, draft => {
        draft.my_write_professor_list = [];
      }),
    [MY_WRITE_PROFESSOR_LIST]: (state, { payload }) =>
      produce(state, draft => {
        draft.my_write_professor_list = payload;
        draft.my_write_professor_list.reverse();
      }),
    [MY_WRITE_PROFESSOR_REPLY]: (state, { payload }) =>
      produce(state, draft => {
        draft.reply = payload;
      }),
    [MY_WRITE_PROFESSOR_REPLY_INIT]: (state, { payload }) =>
      produce(state, draft => {
        draft.reply = [];
      }),
    [FROM]: (state, { payload }) =>
      produce(state, draft => {
        draft.from = payload;
      }),
    [FROM_INIT]: (state, { payload }) =>
      produce(state, draft => {
        draft.from = false;
      })
  },
  initState
);
