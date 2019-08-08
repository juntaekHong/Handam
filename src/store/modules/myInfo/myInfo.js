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

const initState = {
    failmodal: false,
    password: '',
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

export default handleActions(
    {
        [FAIL_MODAL_HANDLE]: (state, { payload }) =>
            produce(state, draft => {
                draft.failmodal = payload;
            }),
    },
    initState
);
