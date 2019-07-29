import { createStackNavigator } from "react-navigation";
import CommunityTab from "../community/CommunityTab";
import TalkAbout from "../../containers/community/TalkAbout";
import VoteStack from "../vote/VoteStack";

const CommunityStack = createStackNavigator(
  {
    Community: { screen: CommunityTab },
    TalkAbout: { screen: TalkAbout },
    VoteStack: { screen: VoteStack }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default CommunityStack;
