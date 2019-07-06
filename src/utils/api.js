/*
 * 통신 모듈
 */
import config from "../configs/config";
import axios from "axios";
import { showMessage } from "./util";

const ROOT_URL = config.server;

function rest(method) {
  return async (url, { params = {}, body = {}, header = {}, token = "" }) => {
    try {
      let response;
      if (method === "GET") {
        response = await axios.get(`${ROOT_URL}${url}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": token,
            ...header
          }
        });
      } else {
        response = await axios({
          method: method,
          url: `${ROOT_URL}${url}`,
          params: params,
          data: body,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": token,
            ...header
          }
        });
      }
      const { data } = response;
      if (data.statusCode == 200) {
        return data;
      } else {
        return data;
      }
    } catch (err) {
      console.log("err", err);
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
  get: rest("GET"),
  post: rest("POST"),
  put: rest("PUT"),
  delete: rest("DELETE")
};

export default api;
