import { createStackNavigator } from "react-navigation";
import Setting from "../../containers/setting/Setting";
import TeamInfo from "../../containers/setting/TeamInfo";
import TermInfo from "../../containers/setting/TermInfo";
import LockStack from "../lock/LockStack";

const SettingStack = createStackNavigator(
  {
    setting: { screen: Setting },
    teaminfo: { screen: TeamInfo },
    terminfo: { screen: TermInfo },
    lockstack: { screen: LockStack }
  },
  {
    initialRouteName: "setting",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default SettingStack;
