import { createStackNavigator } from "react-navigation";
import SchoolMap from "../../containers/map/SchoolMap";
import SchoolBuilding from "../../containers/map/SchoolBuilding";

const MapStack = createStackNavigator(
  {
    schoolmap: { screen: SchoolMap },
    schoolbuilding: { screen: SchoolBuilding }
  },
  {
    initialRouteName: "schoolmap",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default MapStack;
