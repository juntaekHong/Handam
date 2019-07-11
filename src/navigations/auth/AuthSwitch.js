import { createSwitchNavigator } from "react-navigation";
import Intro from "../../containers/intro/Intro";
import UpdateCheck from "../../containers/update/UpdateCheck";
import SignStack from "../sign/SignStack";
import MainTab from "../main/MainTab";

const AuthSwitch = createSwitchNavigator(
  {
    main: MainTab,
    intro: { screen: Intro },
    update: { screen: UpdateCheck },
    sign: { screen: SignStack }
  },
  {
    initialRouteName: "update"
  }
);

export default AuthSwitch;
