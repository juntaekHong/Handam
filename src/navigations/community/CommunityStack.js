import { createStackNavigator } from "react-navigation";
import CommunityTab from "../community/CommunityTab";
import TalkAbout from "../../containers/community/TalkAbout";
import TalkDetail from "../../containers/community/TalkDetail";
import TalkWrite from "../../containers/community/TalkWrite";
import TalkSearch from "../../containers/community/TalkSearch";

const CommunityStack = createStackNavigator(
  {
    Community: { screen: CommunityTab },
    TalkAbout: { screen: TalkAbout }
    // TalkDetail: { screen: TalkDetail },
    // TalkWrite: { screen: TalkWrite },
    // TalkSearch: { screen: TalkSearch }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default CommunityStack;
