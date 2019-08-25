import { createSwitchNavigator } from "react-navigation";
import Intro from "../../containers/intro/Intro";
import UpdateCheck from "../../containers/update/UpdateCheck";
import SignStack from "../sign/SignStack";
import RootStack from "../root/root";
import LockSolve from "../../containers/lock/LockSolve";
import LibraryUpdate from "../../containers/update/LibraryUpdate";
import LiveUpdate from "../../containers/update/LiveUpdate";
import TestContainer from "../../containers/test/TestContainer";
import TeamInfo from "../../containers/setting/TeamInfo";

const AuthSwitch = createSwitchNavigator(
  {
    root: RootStack,
    intro: { screen: Intro },
    update: { screen: UpdateCheck },
    sign: { screen: SignStack },
    locksolve: { screen: LockSolve },
    library: { screen: LibraryUpdate },
    liveupdate: { screen: LiveUpdate },
    test: TeamInfo
  },
  {
    initialRouteName: "liveupdate"
  }
);

export default AuthSwitch;
