import { createSwitchNavigator } from "react-navigation";
import Intro from "../../containers/intro/Intro";
import UpdateCheck from "../../containers/update/UpdateCheck";
import SignStack from "../sign/SignStack";
import HomeTab from "../home/HomeTab";

const AuthSwitch = createSwitchNavigator(
  {
    main: HomeTab,
    intro: { screen: Intro },
    update: { screen: UpdateCheck },
    sign: { screen: SignStack }
  },
  {
    initialRouteName: "update"
  }
);

export default AuthSwitch;
