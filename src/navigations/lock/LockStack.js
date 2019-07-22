import { createStackNavigator } from "react-navigation";
import LockSetting from "../../containers/lock/LockSetting";
import PassSetting from "../../containers/lock/PassSetting";
import NewPassSetting from "../../containers/lock/NewPassSetting";

const LockStack = createStackNavigator(
  {
    locksetting: { screen: LockSetting },
    passsetting: { screen: PassSetting },
    newpasssetting: { screen: NewPassSetting }
  },
  {
    initialRouteName: "locksetting",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default LockStack;
