import { createStackNavigator } from "react-navigation";
import MainTab from "../main/MainTab";
import Notice from "../../containers/notice/Notice";
import BusStack from "../bus/BusStack";
const RootStack = createStackNavigator(
  {
    main: { screen: MainTab },
    notice: { screen: Notice },
    busstack: { screen: BusStack }
  },
  {
    initialRouteName: "main",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default RootStack;
