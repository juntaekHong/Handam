import { createStackNavigator } from "react-navigation";
import Setting from "../../containers/setting/Setting";
import TeamInfo from "../../containers/setting/TeamInfo";
import TermInfo from "../../containers/setting/TermInfo";

const SettingStack = createStackNavigator(
  {
    setting: { screen: Setting },
    teaminfo: { screen: TeamInfo },
    terminfo: { screen: TermInfo }
  },
  {
    initialRouteName: "setting",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default SettingStack;
