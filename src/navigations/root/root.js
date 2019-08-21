import { createStackNavigator } from "react-navigation";
import MainTab from "../main/MainTab";
import Notice from "../../containers/notice/Notice";
import BusStack from "../bus/BusStack";
import Alarm from "../../containers/alarm/Alarm";
import CertificationStack from "../certification/CertificationStack";
import SettingStack from "../setting/SettingStack";
import TalkStack from "../talk/TalkStack";
import Schedule from "../../containers/schedule/Schedule";
import RestaurantStack_noTab from "../restaurant/RestaurantStack_noTab";
import Cis from "../../containers/notice/Cis";

const RootStack = createStackNavigator(
  {
    main: { screen: MainTab },
    notice: { screen: Notice },
    cis: { screen: Cis },
    busstack: { screen: BusStack },
    alarm: { screen: Alarm },
    Certification: { screen: CertificationStack },
    settingstack: { screen: SettingStack },
    talk: { screen: TalkStack },
    schedule: { screen: Schedule },
    RestaurantStack_noTab: { screen: RestaurantStack_noTab }
  },
  {
    initialRouteName: "main",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default RootStack;
