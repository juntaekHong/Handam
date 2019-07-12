import { createStackNavigator } from "react-navigation";
import Home from "../../containers/home/Home";
import Bus from "../../containers/bus/Bus";

const HomeStack = createStackNavigator(
  {
    home: { screen: Home },
    bus: { screen: Bus }
  },
  {
    initialRouteName: "home",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default HomeStack;
