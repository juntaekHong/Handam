import { createStackNavigator } from "react-navigation";
import SignUp1 from "../../containers/sign/SignUp1";
import SignIn from "../../containers/sign/SignIn";

const SignStack = createStackNavigator(
  {
    signIn: { screen: SignIn },
    signUp1: { screen: SignUp1 }
  },
  {
    initialRouteName: "signIn",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default SignStack;
