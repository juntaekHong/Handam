import { createStackNavigator } from "react-navigation";
import TalkAbout from "../../containers/talk/TalkAbout";
import TalkDetail from "../../containers/talk/TalkDetail";
import TalkWrite from "../../containers/talk/TalkWrite";
import TalkSearch from "../../containers/talk/TalkSearch";

const TalkStack = createStackNavigator(
  {
    // TalkAbout: { screen: TalkAbout },
    TalkDetail: { screen: TalkDetail },
    TalkWrite: { screen: TalkWrite },
    TalkSearch: { screen: TalkSearch }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default TalkStack;
