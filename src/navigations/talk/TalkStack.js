import { createStackNavigator } from "react-navigation";
import TalkDetail from "../../containers/talk/TalkDetail";
import TalkWrite from "../../containers/talk/TalkWrite";
import TalkSearch from "../../containers/talk/TalkSearch";

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
