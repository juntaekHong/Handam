/*
 * 통신 모듈
 */
import config from "../configs/config";
import axios from "axios";
import { showMessage } from "./util";
import { removeAllData } from "./util";
import navigators from "./navigators";

const ROOT_URL = config.server;
const MESSAGE_URL = config.mailServer;

const server_type = {
  basic: ROOT_URL,
  mail: ROOT_URL
};

function rest(method) {
  return async (url, { body = {}, header = {}, token = "" } = {}) => {
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
      const { response } = err;
      // 403: token이 인증되지 않을경우 로그인 화면으로 네비게이팅
      if (response.status == 403) {
        removeAllData();
        navigators.navigate("signIn");
      } else {
        showMessage("알 수 없는 오류가 발생했습니다");
      }
      return response;
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
