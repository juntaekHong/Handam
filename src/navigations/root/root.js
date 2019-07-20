import { createStackNavigator } from "react-navigation";
import MainTab from "../main/MainTab";
import Notice from "../../containers/notice/Notice";
import BusStack from "../bus/BusStack";
import Alarm from "../../containers/alarm/Alarm";
import CertificationStack from "../certification/CertificationStack";
import SettingStack from "../setting/SettingStack";

const RootStack = createStackNavigator(
  {
    main: { screen: MainTab },
    notice: { screen: Notice },
    busstack: { screen: BusStack },
    alarm: { screen: Alarm },
    Certification: { screen: CertificationStack },
    settingstack: { screen: SettingStack }
  },
  {
    initialRouteName: "main",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default RootStack;
