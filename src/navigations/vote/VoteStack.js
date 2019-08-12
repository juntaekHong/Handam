import { createStackNavigator } from "react-navigation";
import VotePast from "../../containers/vote/VotePast";
import VotePastResult from "../../containers/vote/VotePastResult";

const VoteStack = createStackNavigator(
  {
    VotePast: { screen: VotePast },
    VotePastResult: { screen: VotePastResult }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default VoteStack;
