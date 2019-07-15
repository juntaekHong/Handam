import { createStackNavigator } from "react-navigation";
import Bus from "../../containers/bus/Bus";
import BusTime from "../../containers/bus/BusTime";

const BusStack = createStackNavigator(
  {
    bus: { screen: Bus },
    bustime: { screen: BusTime }
  },
  {
    initialRouteName: "bus",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default BusStack;
