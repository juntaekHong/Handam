import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../../utils/api";
import {
    getData,
    scheduleContent,
    makeColor,
    storeData
} from "../../../utils/util";

// 한성정보
const CREATE_HANSUNGINFO = "hansungInfo/CREATE_HANSUNGINFO";
const DELETE_HANSUNGINFO = "hansungInfo/DELETE_HANSUNGINFO";
const GET_HANSUNGINFO = "hansungInfo/GET_HANSUNGINFO";

const createHansungInfoAction = createAction(CREATE_HANSUNGINFO);
const deleteHansungInfoAction = createAction(DELETE_HANSUNGINFO);
const getHansungInfoAction = createAction(GET_HANSUNGINFO);

// 비교과
const NONSUBJECTPOINT_HANDLE = "hansungInfo/NONSUBJECTPOINT_HANDLE";
const NONSUBJECTPOINT_LOADING_HANDLE =
    "hansungInfo/NONSUBJECTPOINT_LOADING_HANDLE";

const nonSubjectPointHandleAction = createAction(NONSUBJECTPOINT_HANDLE);
const nonSubjectPointLoadingHandleAction = createAction(
    NONSUBJECTPOINT_LOADING_HANDLE
);

// 성적표
const GRADES_HANDLE = "hansungInfo/GRADES_HANDLE";
const GRADES_LOADING_HANDLE = "hansungInfo/GRADES_LOADING_HANDLE";

const gradesHandleAction = createAction(GRADES_HANDLE);
const gradesLoadingHandleAction = createAction(GRADES_LOADING_HANDLE);

// 비교과 값 들어올 동안
const NONSUBJECTPOINT_VALUE_LOADING_HANDLE =
    "hansunginfo/NONSUBJECTPOINT_VALUE_LOADING_HANDLE";

const nonSubjectPointValueLoadingHandleAction = createAction(
    NONSUBJECTPOINT_VALUE_LOADING_HANDLE
);

// 성적표 값 들어올 동안
const GRADES_VALUE_LOADING_HANDLE = "hansunginfo/GRADES_VALUE_LOADING_HANDLE";

const gradesValueLoadingHandleAction = createAction(
    GRADES_VALUE_LOADING_HANDLE
);

// 시간표
const SCEDULE_CALL = "hansungInfo/SCEDULE_CALL";
const SCEDULE_LOADING = "hansungInfo/SCEDULE_LOADING";
const SCEDULE_COLOR = "hansungInfo/SCEDULE_COLOR";

export const scheduleCallAction = createAction(SCEDULE_CALL);
export const scheduleLoadingAction = createAction(SCEDULE_LOADING);
const scheduleColorAction = createAction(SCEDULE_COLOR);

// 마이페이지 종정시 인증 부분 로딩
const MYINFO_LOADING_HANDLE = "hansungInfo/MYINFO_LOADING_HANDLE";

const myInfoLoadingHandleAction = createAction(MYINFO_LOADING_HANDLE);

// 인증 후 성적표 페이지 교수평가 텍스트 보이게
const PROFESSOR_TEXT_HANDLE = "hansungInfo/PROFESSOR_TEXT_HANDLE";

const professorTextHandleAction = createAction(PROFESSOR_TEXT_HANDLE);

const initState = {
    hansunginfo: null,

    schedule_call: false,
    schedule_loading: false,
    schedule_color: {},

    nonSubjectPoint_status: false,
    grades_status: false,

    nonSubjectPoint_value_loading: false,
    grades_value_loading: false,

    // 마이페이지 종정시 인증 부분 로딩
    myInfo_loading: false,

    professor_text: false,
};

export const nonSubjectPointHandle = bool => dispatch => {
    dispatch(nonSubjectPointHandleAction(bool));
};

export const nonSubjectPointLoadingHandle = bool => dispatch => {
    dispatch(nonSubjectPointLoadingHandleAction(bool));
};

export const gradesHandle = bool => dispatch => {
    dispatch(gradesHandleAction(bool));
};

export const gradesLoadingHandle = bool => dispatch => {
    dispatch(gradesLoadingHandleAction(bool));
};

export const nonSubjectPointValueLoadingHandle = bool => dispatch => {
    dispatch(nonSubjectPointValueLoadingHandleAction(bool));
};

export const gradesValueLoadingHandle = bool => dispatch => {
    dispatch(gradesValueLoadingHandleAction(bool));
};

export const myInfoLoadingHandle = bool => dispatch => {
    dispatch(myInfoLoadingHandleAction(bool));
};

export const professorTextHandle = bool => dispatch => {
    dispatch(professorTextHandleAction(bool));
};

export const createHansungInfo = hansunginfo => async dispatch => {
    const token = await getData("token");

    //서버로 전송
    const jsonData = await api.post(`/hansungInfo`, {
        body: hansunginfo,
        token: token
    });

    if (jsonData.statusCode == 200) {
        await dispatch(createHansungInfoAction(jsonData.result));

        //1번 더 요청
        await api.post(`/hansungInfo`, { body: hansunginfo, token: token });
    } else if (jsonData.statusCode == 403) {
        //
    }
};

export const deleteHansungInfo = () => async dispatch => {
    const token = await getData("token");

    //서버로 전송
    const jsonData = await api.delete(`/hansungInfo`, { token: token });

    if (jsonData.statusCode == 200) {
        await dispatch(deleteHansungInfoAction(jsonData.result));
    } else if (jsonData.statusCode == 403) {
        //
    }
};

export const getHansungInfo = () => async dispatch => {
    const token = await getData("token");

    //서버로 전송
    const jsonData = await api.get(`/hansungInfo`, { token: token });

    if (jsonData.statusCode == 200) {
        await dispatch(getHansungInfoAction(jsonData.result));
        // 시간표 색 설정
        const result = await getData("schedule_color");
        let color = {};
        if (result !== null) {
            color = JSON.parse(result);
        }
        if (jsonData.result !== null) {
            const schedule = jsonData.result.schedule;
            if (schedule !== undefined && schedule.monday !== undefined) {
                for (let i in schedule) {
                    for (let item of schedule[i]) {
                        const content = scheduleContent(item.content);
                        if (color[`${content[0]}${content[1]}`] === undefined) {
                            color[`${content[0]}${content[1]}`] = makeColor();
                        }
                    }
                }
            }
        }
        await storeData("schedule_color", JSON.stringify(color));
        await dispatch(scheduleColorAction(color));
    } else if (jsonData.statusCode == 403) {
        //
    }
};

export const createHansungInfoNonSubjectPoint = () => async dispatch => {
    const token = await getData("token");

    //서버로 전송
    const jsonData = await api.post(`/hansungInfo/nonSubjectPoint`, {
        token: token
    });

    if (jsonData.statusCode == 200) {
        await dispatch(createHansungInfoAction(jsonData.result));

        //1번 더 요청
        await api.post(`/hansungInfo/nonSubjectPoint`, { token: token });
    } else if (jsonData.statusCode == 403) {
        // 마이페이지로가서 재인증.
    }
};

export const createHansungInfoGrades = () => async dispatch => {
    const token = await getData("token");

    //서버로 전송
    const jsonData = await api.post(`/hansungInfo/grades`, { token: token });

    if (jsonData.statusCode == 200) {
        await dispatch(createHansungInfoAction(jsonData.result));

        //1번 더 요청
        await api.post(`/hansungInfo/grades`, { token: token });
    } else if (jsonData.statusCode == 403) {
        // 마이페이지로가서 재인증.
    }
};

export const createHansungInfoSchedule = () => async dispatch => {
    try {
        const token = await getData("token");
        const jsonData = await api.post("/hansungInfo/schedule", { token });
        if (jsonData.statusCode == 200) {
            await dispatch(createHansungInfoAction(jsonData.result));
            api.post("/hansungInfo/schedule", { token });
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
};

export default handleActions(
    {
        [CREATE_HANSUNGINFO]: (state, { payload }) =>
            produce(state, draft => {
                draft.hansunginfo = payload;
            }),
        [DELETE_HANSUNGINFO]: (state, { payload }) =>
            produce(state, draft => {
                draft.hansunginfo = null;
            }),

        [GET_HANSUNGINFO]: (state, { payload }) =>
            produce(state, draft => {
                draft.hansunginfo = payload;
            }),
        [NONSUBJECTPOINT_HANDLE]: (state, { payload }) =>
            produce(state, draft => {
                draft.nonSubjectPoint_status = payload;
            }),
        [GRADES_HANDLE]: (state, { payload }) =>
            produce(state, draft => {
                draft.grades_status = payload;
            }),
        [NONSUBJECTPOINT_LOADING_HANDLE]: (state, { payload }) =>
            produce(state, draft => {
                draft.nonSubjectPoint_loading = payload;
            }),
        [GRADES_LOADING_HANDLE]: (state, { payload }) =>
            produce(state, draft => {
                draft.grades_loading = payload;
            }),
        [NONSUBJECTPOINT_VALUE_LOADING_HANDLE]: (state, { payload }) =>
            produce(state, draft => {
                draft.nonSubjectPoint_value_loading = payload;
            }),
        [GRADES_VALUE_LOADING_HANDLE]: (state, { payload }) =>
            produce(state, draft => {
                draft.grades_value_loading = payload;
            }),
        [SCEDULE_LOADING]: (state, { payload }) =>
            produce(state, draft => {
                draft.schedule_loading = payload;
            }),
        [SCEDULE_COLOR]: (state, { payload }) =>
            produce(state, draft => {
                draft.schedule_color = payload;
            }),
        [SCEDULE_CALL]: (state, { payload }) =>
            produce(state, draft => {
                draft.schedule_call = payload;
            }),
        [MYINFO_LOADING_HANDLE]: (state, { payload }) =>
            produce(state, draft => {
                draft.myInfo_loading = payload;
            }),
        [PROFESSOR_TEXT_HANDLE]: (state, {payload}) =>
            produce(state, draft => {
                draft.professor_text = payload;
            })
    },
    initState
);
