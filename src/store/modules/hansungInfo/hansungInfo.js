import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../../utils/api";
import { getData } from "../../../utils/util";

// 한성정보
const CREATE_HANSUNGINFO = 'hansungInfo/CREATE_HANSUNGINFO';
const DELETE_HANSUNGINFO = 'hansungInfo/DELETE_HANSUNGINFO';
const GET_HANSUNGINFO = 'hansungInfo/GET_HANSUNGINFO';

const createHansungInfoAction = createAction(CREATE_HANSUNGINFO);
const deleteHansungInfoAction = createAction(DELETE_HANSUNGINFO);
const getHansungInfoAction = createAction(GET_HANSUNGINFO);

// 비교과
const NONSUBJECTPOINT_HANDLE = 'hansungInfo/NONSUBJECTPOINT_HANDLE';
const NONSUBJECTPOINT_LOADING_HANDLE = 'hansungInfo/NONSUBJECTPOINT_LOADING_HANDLE';

const nonSubjectPointHandleAction = createAction(NONSUBJECTPOINT_HANDLE);
const nonSubjectPointLoadingHandleAction = createAction(NONSUBJECTPOINT_LOADING_HANDLE);

// 성적표
const GRADES_HANDLE = 'hansungInfo/GRADES_HANDLE';
const GRADES_LOADING_HANDLE = 'hansungInfo/GRADES_LOADING_HANDLE';

const gradesHandleAction = createAction(GRADES_HANDLE);
const gradesLoadingHandleAction = createAction(GRADES_LOADING_HANDLE);

// 값 들어올 동안 로딩
const VALUE_LOADING_HANDLE = 'hansunginfo/VALUE_LOADING_HANDLE';

const valueLoadingHandleAction = createAction(VALUE_LOADING_HANDLE);

const initState = {
    hansunginfo: null,

    nonSubjectPoint_status: false,
    grades_status: false,

    nonSubjectPoint_loading: false,
    grades_loading: false,

    value_loading: false,
};

export const nonSubjectPointHandle = (bool) => dispatch => {
    dispatch(nonSubjectPointHandleAction(bool));
};

export const nonSubjectPointLoadingHandle = (bool) => dispatch => {
    dispatch(nonSubjectPointLoadingHandleAction(bool));
};

export const gradesHandle = (bool) => dispatch => {
    dispatch(gradesHandleAction(bool));
};

export const gradesLoadingHandle = (bool) => dispatch => {
    dispatch(gradesLoadingHandleAction(bool));
};

export const valueLoadingHandle = (bool) => dispatch => {
    dispatch(valueLoadingHandleAction(bool));
};

export const createHansungInfo = (hansunginfo) => async dispatch => {
    const token = await getData('token');

    //서버로 전송
    const jsonData = await api.post(`/hansungInfo`, {body: hansunginfo, token: token});

    if(jsonData.statusCode == 200){
        await dispatch(createHansungInfoAction(jsonData.result));

        //1번 더 요청
        await api.post(`/hansungInfo`, {body: hansunginfo, token: token});

    } else if (jsonData.statusCode == 403){
        //
    }
};

export const deleteHansungInfo = () => async dispatch => {
    const token = await getData('token');

    //서버로 전송
    const jsonData = await api.delete(`/hansungInfo`,{token: token});

    if(jsonData.statusCode == 200){
        await dispatch(deleteHansungInfoAction(jsonData.result));
    } else if (jsonData.statusCode == 403){
        //
    }
};

export const getHansungInfo = () => async dispatch => {
    const token = await getData('token');

    //서버로 전송
    const jsonData = await api.get(`/hansungInfo`,{token: token});

    if(jsonData.statusCode == 200){
        await dispatch(getHansungInfoAction(jsonData.result));
    } else if (jsonData.statusCode == 403){
        //
    }
};

export const createHansungInfoNonSubjectPoint = () => async dispatch => {
    const token = await getData('token');

    //서버로 전송
    const jsonData = await api.post(`/hansungInfo/nonSubjectPoint`, {token: token});

    if(jsonData.statusCode == 200){
        await dispatch(createHansungInfoAction(jsonData.result));

        //1번 더 요청
        await api.post(`/hansungInfo/nonSubjectPoint`, {token: token});

    } else if (jsonData.statusCode == 403){
        // 마이페이지로가서 재인증.
    }
};

export const createHansungInfoGrades = () => async dispatch => {
    const token = await getData('token');

    //서버로 전송
    const jsonData = await api.post(`/hansungInfo/grades`, {token: token});

    if(jsonData.statusCode == 200){
        await dispatch(createHansungInfoAction(jsonData.result));

        //1번 더 요청
        await api.post(`/hansungInfo/grades`, {token: token});

    } else if (jsonData.statusCode == 403){
        // 마이페이지로가서 재인증.
    }
};

export default handleActions(
    {
        [CREATE_HANSUNGINFO]: (state, {payload}) =>
            produce(state, draft => {
                draft.hansunginfo = payload;
            }),
        [DELETE_HANSUNGINFO]: (state, {payload}) =>
            produce(state, draft => {
                draft.hansunginfo = payload;
            }),

        [GET_HANSUNGINFO]: (state, {payload}) =>
            produce(state, draft => {
                draft.hansunginfo = payload;
            }),
        [NONSUBJECTPOINT_HANDLE]: (state, {payload}) =>
            produce(state, draft => {
                draft.nonSubjectPoint_status = payload;
            }),
        [GRADES_HANDLE]: (state, {payload}) =>
            produce(state, draft => {
                draft.grades_status = payload;
            }),
        [NONSUBJECTPOINT_LOADING_HANDLE]: (state, {payload}) =>
            produce(state, draft => {
                draft.nonSubjectPoint_loading = payload;
            }),
        [GRADES_LOADING_HANDLE]: (state, {payload}) =>
            produce(state, draft => {
                draft.grades_loading = payload;
            }),
        [VALUE_LOADING_HANDLE]: (state,{payload}) =>
            produce(state, draft => {
                draft.value_loading = payload;
            }),
    },
    initState
);