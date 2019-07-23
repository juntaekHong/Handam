import { createSwitchNavigator } from "react-navigation";
import Intro from "../../containers/intro/Intro";
import UpdateCheck from "../../containers/update/UpdateCheck";
import SignStack from "../sign/SignStack";
import RootStack from "../root/root";
import LockSolve from "../../containers/lock/LockSolve";

const AuthSwitch = createSwitchNavigator(
  {
    root: RootStack,
    intro: { screen: Intro },
    update: { screen: UpdateCheck },
    sign: { screen: SignStack },
    locksolve: { screen: LockSolve }
  },
  {
    initialRouteName: "update"
  }
);

export default AuthSwitch;
