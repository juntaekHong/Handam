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

const initState = {
    failmodal: false,
    password: '',
    userMajor: null,
    userDoubleMajor: null,
    userMinor: null,
    userConnectedMajor: null,
    userAdmissionYear: null,
};

export const failModalHandle = bool => dispatch => {
    dispatch(failModalHandleAction(bool));
};

// 회원탈퇴시 비밀번호 확인
export const passwordCheck = password => async dispatch => {
    const userId = await getData('userId');

    let userData = {
        userPw: password
    };

    const passData = await api.post(`/userValidation/userId/${userId}/userPw`,{body: userData});

    if(passData.statusCode == 200){
        return true;
    } else {
        return false;
    }
};

// 모든 정보 삭제
export const secessionDeleteHandle = () => async dispatch => {
    const token = await getData('token');
    const userId = await getData('userId');
    const jsonData = await api.delete( `/user/userId/${userId}`, {token: token});

    if(jsonData.statusCode == 200){
        await removeAllData();
        return true;
    } else {
        return false;
    }
};

// 이하 전공 및 입학년도 값 변경
export const changeMajorHandle = (major) => async dispatch => {
    const token = await getData('token');
    const userId = await getData('userId');

    const data = {
        major: major
    };
    const changeData = await api.put(`/user/userId/${userId}`,{token: token, body: data});

    if(changeData.statusCode == 200){
        dispatch(userMajorHandleAction(major));
    }
    if(changeData.statusCode == 403){
    }
};

export const changedoubleMajorHandle = (doublemajor) => async dispatch => {
    const token = await getData('token');
    const userId = await getData('userId');

    const data = {
        doubleMajor: doublemajor == null ? "해당없음" : doublemajor
    };
    const changeData = await api.put(`/user/userId/${userId}`,{token: token, body: data});

    if(changeData.statusCode == 200){
        dispatch(userDoubleMajorHandleAction(doublemajor));
    }
    if(changeData.statusCode == 403){
    }
};

export const changeMinorHandle = (minor) => async dispatch => {
    const token = await getData('token');
    const userId = await getData('userId');

    const data = {
        minor: minor == null ? "해당없음" : minor
    };
    const changeData = await api.put(`/user/userId/${userId}`,{token: token, body: data});

    if(changeData.statusCode == 200){
        dispatch(userMinorHandleAction(minor));
    }
    if(changeData.statusCode == 403){
    }
};

export const changeConnectedMajorHandle = (connectedMajor) => async dispatch => {
    const token = await getData('token');
    const userId = await getData('userId');

    const data = {
        connectedMajor: connectedMajor == null ? "해당없음" : connectedMajor
    };
    const changeData = await api.put(`/user/userId/${userId}`,{token: token, body: data});

    if(changeData.statusCode == 200){
        dispatch(userConnectedMajorHandleAction(connectedMajor));
    }
    if(changeData.statusCode == 403){
    }
};

export const changeAdmissionYearHandle = (admissionYear) => async dispatch => {
    const token = await getData('token');
    const userId = await getData('userId');

    const data = {
        admissionYear: admissionYear
    };
    const changeData = await api.put(`/user/userId/${userId}`,{token: token, body: data});

    if(changeData.statusCode == 200){
        dispatch(userAdmissionYearHandleAction(admissionYear));
    }
    if(changeData.statusCode == 403){
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
    },
    initState
);