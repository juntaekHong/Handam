import { createStackNavigator } from "react-navigation";
import MyInfo from "../../containers/myInfo/MyInfo";
import SecessionScreen from "../../containers/myInfo/SecessionScreen";

const MyInfoStack = createStackNavigator(
    {
        MyInfo: { screen: MyInfo },
        Secession: {screen: SecessionScreen}
    },
    {
        initialRouteName: null,
        defaultNavigationOptions: {
            header: null
        }
    }
);

export default MyInfoStack;
