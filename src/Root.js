import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import { BreadProvider } from "material-bread";
console.disableYellowBox = true;
export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BreadProvider>
          <App />
        </BreadProvider>
      </Provider>
    );
  }
}
