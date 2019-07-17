import { createStackNavigator } from "react-navigation";
import TalkDetail from "../../containers/Community/TalkDetail";
import TalkWrite from "../../containers/Community/TalkWrite";

const TalkStack = createStackNavigator(
  {
    TalkDetail: { screen: TalkDetail },
    TalkWrite: { screen: TalkWrite }
  },
  {
    // initialRouteName: "TalkWrite",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default TalkStack;
