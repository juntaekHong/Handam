import { createStackNavigator } from "react-navigation";
import VotePast from "../../containers/community/VotePast";
import VotePastResult from "../../containers/community/VotePastResult";

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
