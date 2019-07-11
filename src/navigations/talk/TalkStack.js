import { createStackNavigator } from "react-navigation";
import TalkDetailScreen from "../../containers/Community/TalkDetailScreen";
import TalkWriteScreen from "../../containers/Community/TalkWriteScreen";

const TalkStack = createStackNavigator(
  {
    TalkDetail: { screen: TalkDetailScreen },
    TalkWrite: { screen: TalkWriteScreen },
  },
  {
    // initialRouteName: "TalkWrite",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default TalkStack;
