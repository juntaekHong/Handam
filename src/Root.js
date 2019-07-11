import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import moment from "moment";
console.disableYellowBox = true;

moment.lang("ko", {
  weekdays: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일"
  ],
  weekdaysShort: ["일", "월", "화", "수", "목", "금", "토"]
});
export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
