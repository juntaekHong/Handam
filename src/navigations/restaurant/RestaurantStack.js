import { createStackNavigator } from "react-navigation";
import RestaurantDetail from "../../containers/restaurant/RestaurantDetail";

const RestaurantStack = createStackNavigator(
  {
    RestaurantDetail: { screen: RestaurantDetail }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default RestaurantStack;
