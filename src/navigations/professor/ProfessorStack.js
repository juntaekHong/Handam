import { createStackNavigator } from "react-navigation";
import Professor from "../../containers/community/Professor";

const ProfessorStack = createStackNavigator(
  {
    Professor: { screen: Professor }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default ProfessorStack;
