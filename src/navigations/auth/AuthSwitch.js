import React from "react";
import { createSwitchNavigator } from "react-navigation";
import MainTab from "../main/MainTab";
import Intro from "../../containers/intro/Intro";
import UpdateCheck from "../../containers/update/UpdateCheck";
import SignIn from "../../containers/sign/SignIn";

const AuthSwitch = createSwitchNavigator(
  {
    main: MainTab,
    intro: { screen: Intro },
    update: { screen: UpdateCheck },
    signIn: { screen: SignIn }
  },
  {
    initialRouteName: "update"
  }
);

export default AuthSwitch;
