import { createStackNavigator } from "react-navigation";
import Setting from "../../containers/setting/Setting";

const SettingStack = createStackNavigator(
  {
    setting: { screen: Setting }
  },
  {
    initialRouteName: "setting",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default SettingStack;
