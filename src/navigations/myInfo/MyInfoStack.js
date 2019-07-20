import { createStackNavigator } from "react-navigation";
import MyInfo from "../../containers/myInfo/MyInfo";

const MyInfoStack = createStackNavigator(
    {
        MyInfo: { screen: MyInfo },
    },
    {
        initialRouteName: null,
        defaultNavigationOptions: {
            header: null
        }
    }
);

export default MyInfoStack;
