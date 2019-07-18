import { createStackNavigator } from "react-navigation";
import MainTab from "../main/MainTab";
import Notice from "../../containers/notice/Notice";
import BusStack from "../bus/BusStack";
import Alarm from "../../containers/alarm/Alarm";
import TalkStack from "../talk/TalkStack";

const RootStack = createStackNavigator(
  {
    main: { screen: MainTab },
    notice: { screen: Notice },
    busstack: { screen: BusStack },
    alarm: { screen: Alarm },
    talk: { screen: TalkStack }
  },
  {
    initialRouteName: "main",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default RootStack;
