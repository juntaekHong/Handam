import { createStackNavigator } from "react-navigation";
import LockSetting from "../../containers/lock/LockSetting";
import PassSetting from "../../containers/lock/PassSetting";

const LockStack = createStackNavigator(
  {
    locksetting: { screen: LockSetting },
    passsetting: { screen: PassSetting }
  },
  {
    initialRouteName: "locksetting",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default LockStack;
