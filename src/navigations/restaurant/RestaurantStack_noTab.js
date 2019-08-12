import { createStackNavigator } from "react-navigation";
import RestaurantWrite from "../../containers/restaurant/RestaurantWrite";

const RestaurantStack_noTab = createStackNavigator(
  {
    RestaurantWrite: { screen: RestaurantWrite }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default RestaurantStack_noTab;
