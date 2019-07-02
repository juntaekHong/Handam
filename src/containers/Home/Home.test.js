import React from "react";
import Home from "./Home";
import { Provider } from "react-redux";
import store from "../../store";
import { render } from "@testing-library/react-native";

describe("<Home/>", () => {
  const setup = () => {
    const utils = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    return {
      ...utils
    };
  };
  it("render text", async () => {
    const { findByText } = setup();
    findByText("Home Screen");
    findByText("hi");
  });
});
