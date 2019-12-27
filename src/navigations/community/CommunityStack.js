import { createStackNavigator } from "react-navigation";
import CommunityTab from "../community/CommunityTab";
import TalkAbout from "../../containers/talk/TalkAbout";
import VoteStack from "../vote/VoteStack";
import RestaurantStack from "../restaurant/RestaurantStack";
import ProfessorStack from "../professor/ProfessorStack";

const CommunityStack = createStackNavigator(
  {
    Community: { screen: CommunityTab },
    TalkAbout: { screen: TalkAbout },
    VoteStack: { screen: VoteStack },
    RestaurantStack: { screen: RestaurantStack },
    ProfessorStack: { screen: ProfessorStack }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default CommunityStack;
