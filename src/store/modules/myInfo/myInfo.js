/**
 * 액션 타입, 액션 생성자, redux-thunk, immer 예제
 */
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { getData } from "../../../utils/util";
import api from "../../../utils/api";
import { removeAllData } from "../../../utils/util";

// 회원탈퇴 실패 모달
const FAIL_MODAL_HANDLE = "myInfo/FAIL_MODAL_HANDLE";

export const failModalHandleAction = createAction(FAIL_MODAL_HANDLE);

// 이하 전공 및 입학년도 값 변경
const USER_MAJOR_HANDLE = "myInfo/USER_MAJOR_HANDLE";
export const userMajorHandleAction = createAction(USER_MAJOR_HANDLE);

const USER_DOUBLEMAJOR_HANDLE = "myInfo/USER_DOUBLEMAJOR_HANDLE";
export const userDoubleMajorHandleAction = createAction(USER_DOUBLEMAJOR_HANDLE);

const USER_MINOR_HANDLE = "myInfo/USER_MINOR_HANDLE";
export const userMinorHandleAction = createAction(USER_MINOR_HANDLE);

const USER_CONNECTEDMAJOR_HANDLE = "myInfo/USER_CONNECTEDMAJOR_HANDLE";
export const userConnectedMajorHandleAction = createAction(USER_CONNECTEDMAJOR_HANDLE);

const USER_ADMISSION_YEAR_HANDLE = "myInfo/USER_ADMISSION_YEAR_HANDLE";
export const userAdmissionYearHandleAction = createAction(USER_ADMISSION_YEAR_HANDLE);

// 비밀번호 변경
const USER_PASS_HANDLE = "myInfo/USER_PASS_HANDLE";
export const userPassHandleAction = createAction(USER_PASS_HANDLE);

// 계정 사진 업로드
const AVATAR = "myInfo/AVATAR";
export const avatarHandleAction = createAction(AVATAR);

// 계정 사진 업로드
const AVATARDELETE = "myInfo/AVATARDELTE";
export const avatarDeleteHandleAction = createAction(AVATARDELETE);

export const avatarDeleteHandle = bool => dispatch => {
  dispatch(avatarDeleteHandleAction(bool));
};

// 내가 쓴 글
const READ_MY_POSTS = "myInfo/READ_MY_POSTS";
const READ_SCRAP_POSTS = "myInfo/READ_SCRAP_POSTS";
const ORDERBY_HANDLE = "myInfo/ORDERBY_HANDLE";

const POSTS_LOADING = "myInfo/POSTS_LOADING";
export const postsLoadingAction = createAction(POSTS_LOADING);

const POSTS_LIST_INIT = "myInfo/POSTS_LIST_INIT";
export const postsListInitAction = createAction(POSTS_LIST_INIT);

const SCRAPS_LIST_INIT = "myInfo/SCRAPS_LIST_INIT";
export const scrapsListInitAction = createAction(SCRAPS_LIST_INIT);

const POSTS_TOTAL = "myInfo/POSTS_TOTAL";
export const postsTotalAction = createAction(POSTS_TOTAL);

//
const SCRAPS_TOTAL = "myInfo/SCRAPS_TOTAL";
export const scrapsTotalAction = createAction(SCRAPS_TOTAL);

export const orderByHandle = orderby => dispatch => {
  dispatch({ type: ORDERBY_HANDLE, payload: orderby });
};

//게시물리스트 초기화
export const initPostsList = () => dispatch => {
  dispatch(postsTotalAction(0));
  dispatch(postsListInitAction());
};

export const initScrapsList = () => dispatch => {
  dispatch(scrapsTotalAction(0));
  dispatch(scrapsListInitAction());
};

export const postLoadingHandle = bool => dispatch => {
  dispatch(postsLoadingAction(bool));
};

export const postsTotalHandle = number => dispatch => {
  dispatch(postsTotalAction(number));
};

const initState = {
  failmodal: false,
  password: "",
  userMajor: null,
  userDoubleMajor: null,
  userMinor: null,
  userConnectedMajor: null,
  userAdmissionYear: null,
  userPass: "",
  userAvatar: null,
  avatarDelete: false,

  // 내가 쓴 글
  postsList: [],
  scrapsList: [],
  myPost_loading: false,
  whatposts: null,
  total: null,
  scrapstotal: null,
  orderby: `createdAt DESC`
};

export const failModalHandle = bool => dispatch => {
  dispatch(failModalHandleAction(bool));
};

// 회원탈퇴시 비밀번호 확인
export const passwordCheck = password => async dispatch => {
  const userId = await getData("userId");

  let userData = {
    userPw: password
  };

  const passData = await api.post(`/userValidation/userId/${userId}/userPw`, {
    body: userData
  });

  if (passData.statusCode == 200) {
    return true;
  } else {
    return false;
  }
};

// 모든 정보 삭제
export const secessionDeleteHandle = () => async dispatch => {
  const token = await getData("token");
  const userId = await getData("userId");
  const jsonData = await api.delete(`/user/userId/${userId}`, { token: token });

  if (jsonData.statusCode == 200) {
    await removeAllData();
    return true;
  } else {
    return false;
  }
};

// 이하 전공 및 입학년도 값 변경
export const changeMajorHandle = major => async dispatch => {
  const token = await getData("token");
  const userId = await getData("userId");

  const data = {
    major: major
  };
  const changeData = await api.put(`/user/userId/${userId}`, {
    token: token,
    body: data
  });

  if (changeData.statusCode == 200) {
    dispatch(userMajorHandleAction(major));
  }
  if (changeData.statusCode == 403) {
  }
};

export const changedoubleMajorHandle = doublemajor => async dispatch => {
  const token = await getData("token");
  const userId = await getData("userId");

  const data = {
    doubleMajor: doublemajor == null ? "해당없음" : doublemajor
  };
  const changeData = await api.put(`/user/userId/${userId}`, {
    token: token,
    body: data
  });

  if (changeData.statusCode == 200) {
    dispatch(userDoubleMajorHandleAction(doublemajor));
  }
  if (changeData.statusCode == 403) {
  }
};

export const changeMinorHandle = minor => async dispatch => {
  const token = await getData("token");
  const userId = await getData("userId");

  const data = {
    minor: minor == null ? "해당없음" : minor
  };
  const changeData = await api.put(`/user/userId/${userId}`, {
    token: token,
    body: data
  });

  if (changeData.statusCode == 200) {
    dispatch(userMinorHandleAction(minor));
  }
  if (changeData.statusCode == 403) {
  }
};

export const changeConnectedMajorHandle = connectedMajor => async dispatch => {
  const token = await getData("token");
  const userId = await getData("userId");

  const data = {
    connectedMajor: connectedMajor == null ? "해당없음" : connectedMajor
  };
  const changeData = await api.put(`/user/userId/${userId}`, {
    token: token,
    body: data
  });

  if (changeData.statusCode == 200) {
    dispatch(userConnectedMajorHandleAction(connectedMajor));
  }
  if (changeData.statusCode == 403) {
  }
};

export const changeAdmissionYearHandle = admissionYear => async dispatch => {
  const token = await getData("token");
  const userId = await getData("userId");

  const data = {
    admissionYear: admissionYear
  };
  const changeData = await api.put(`/user/userId/${userId}`, {
    token: token,
    body: data
  });

  if (changeData.statusCode == 200) {
    dispatch(userAdmissionYearHandleAction(admissionYear));
  }
  if (changeData.statusCode == 403) {
  }
};

export const changePassHandle = (pass, newPass) => async dispatch => {
  const token = await getData("token");
  const userId = await getData("userId");

  const data = {
    userPw: pass,
    userNewPw: newPass
  };
  const changeData = await api.put(`/user/userId/${userId}/password`, {
    token: token,
    body: data
  });

  if (changeData.statusCode == 200) {
    dispatch(userPassHandleAction(pass));
  }
  if (changeData.statusCode == 403) {
  }
};

// 사진 업로드
export const uploadAvatar = image => async dispatch => {
  const token = await getData("token");
  const userId = await getData("userId");
  try {
    const jsonData = await api.post(`/user/userId/${userId}/uploadAvatar`, {
      token: token,
      body: image
    });

    await dispatch(avatarHandleAction(jsonData.result));
  } catch (err) {}
};

export const deleteAvatar = () => async dispatch => {
  const token = await getData("token");
  const userId = await getData("userId");
  try {
    const jsonData = await api.delete(`/user/userId/${userId}/deleteAvatar`, {
      token: token
    });

    await dispatch(avatarHandleAction(null));
  } catch (err) {}
};

// 내가 쓴 글
export const pageListPostsByUserIndex = (order, page, count) => async dispatch => {
  const token = await getData("token");

  const jsonData = await api.get(`/posts/publisher/?orderBy=${order}&page=${page}&count=${count}`, { token: token });

  if (jsonData.statusCode == 200) {
    dispatch({ type: READ_MY_POSTS, payload: jsonData.result });
    dispatch(postsTotalAction(jsonData.resultCount));
  } else {
  }
};

// 내가 스크랩한 글
export const pageListPostsByIsScrap = (order, page, count) => async dispatch => {
  const token = await getData("token");

  const jsonData = await api.get(`/posts/scrap/?orderBy=${order}&page=${page}&count=${count}`, { token: token });

  if (jsonData.statusCode == 200) {
    dispatch({ type: READ_SCRAP_POSTS, payload: jsonData.result });
    dispatch(scrapsTotalAction(jsonData.resultCount));
  } else {
  }
};

export default handleActions(
  {
    [FAIL_MODAL_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.failmodal = payload;
      }),
    [USER_MAJOR_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.userMajor = payload;
      }),
    [USER_DOUBLEMAJOR_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.userDoubleMajor = payload;
      }),
    [USER_MINOR_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.userMinor = payload;
      }),
    [USER_CONNECTEDMAJOR_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.userConnectedMajor = payload;
      }),
    [USER_ADMISSION_YEAR_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.userAdmissionYear = payload;
      }),
    [USER_PASS_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.userPass = payload;
      }),
    [AVATAR]: (state, { payload }) =>
      produce(state, draft => {
        draft.userAvatar = payload;
      }),
    [AVATARDELETE]: (state, { payload }) =>
      produce(state, draft => {
        draft.avatarDelete = payload;
      }),
    // 내가 쓴 글
    [POSTS_LOADING]: (state, { payload }) =>
      produce(state, draft => {
        draft.myPost_loading = payload;
      }),
    [READ_MY_POSTS]: (state, action) => {
      return {
        ...state,
        postsList: [...state.postsList, ...action.payload]
      };
    },
    [READ_SCRAP_POSTS]: (state, action) => {
      return {
        ...state,
        scrapsList: [...state.scrapsList, ...action.payload]
      };
    },
    [POSTS_TOTAL]: (state, { payload }) =>
      produce(state, draft => {
        draft.total = payload;
      }),
    [SCRAPS_TOTAL]: (state, { payload }) =>
      produce(state, draft => {
        draft.scrapstotal = payload;
      }),
    [ORDERBY_HANDLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.orderby = payload;
      }),
    [POSTS_LIST_INIT]: (state, { payload }) =>
      produce(state, draft => {
        draft.postsList = [];
      }),
    [SCRAPS_LIST_INIT]: (state, { payload }) =>
      produce(state, draft => {
        draft.scrapsList = [];
      })
  },
  initState
);
