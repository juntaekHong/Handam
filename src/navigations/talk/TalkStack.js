import { createStackNavigator } from "react-navigation";
import TalkDetail from "../../containers/community/TalkDetail";
import TalkWrite from "../../containers/community/TalkWrite";
import TalkSearch from "../../containers/community/TalkSearch";

const TalkStack = createStackNavigator(
  {
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
