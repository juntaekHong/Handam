import { createStackNavigator } from "react-navigation";
import SignUp1 from "../../containers/sign/SignUp1";
import SignIn from "../../containers/sign/SignIn";
import SignUp2 from "../../containers/sign/SignUp2";
import SignUp3 from "../../containers/sign/SignUp3";

const SignStack = createStackNavigator(
  {
    signIn: { screen: SignIn },
    signUp1: { screen: SignUp1 },
    signUp2: { screen: SignUp2 },
    signUp3: { screen: SignUp3 }
  },
  {
    initialRouteName: "signIn",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default SignStack;
