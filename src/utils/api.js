/*
 * 통신 모듈
 */
import config from "../configs/config";
import axios from "axios";

const ROOT_URL = config.server;

function rest(method) {
  return async (url, { body = {}, header = {}, token = "" } = {}) => {
    try {
      const { data } = await axios[`${method}`](`${ROOT_URL}${url}`, body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": token,
          ...header
        }
      });
      console.log(`${method} success`, data);
      if (data.statusCode == 200) {
        return data;
      } else {
        return data;
      }
    } catch (err) {
      const { response } = err;
      // 403: token이 인증되지 않을경우 로그인 화면으로 네비게이팅
      if (response.status == 403) {
        console.log("err token");
      } else {
        throw err;
      }
    }
  };
}

const api = {
  get: rest("get"),
  post: rest("post"),
  put: rest("put"),
  delete: rest("delete")
};

export default api;
