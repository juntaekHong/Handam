import { createSwitchNavigator } from "react-navigation";
import Intro from "../../containers/intro/Intro";
import UpdateCheck from "../../containers/update/UpdateCheck";
import SignStack from "../sign/SignStack";
import MainTab from "../main/MainTab";
// import TalkStack from "../talk/TalkStack";

const AuthSwitch = createSwitchNavigator(
  {
    main: MainTab,
    intro: { screen: Intro },
    update: { screen: UpdateCheck },
    sign: { screen: SignStack },
    // talk: { screen: TalkStack }
  },
  {
    initialRouteName: "update"
  }
);

export default AuthSwitch;
