import { createStackNavigator } from "react-navigation";
import MyInfo from "../../containers/myInfo/MyInfo";
import SecessionScreen from "../../containers/myInfo/SecessionScreen";
import AccountInfoScreen from "../../containers/myInfo/AccountInfoScreen";
import MyPostListScreen from "../../containers/myInfo/MyPostListScreen";
import MyScrapListScreen from "../../containers/myInfo/MyScrapListScreen";

const MyInfoStack = createStackNavigator(
    {
        MyInfo: { screen: MyInfo },
        Secession: {screen: SecessionScreen},
        AccountInfo: {screen: AccountInfoScreen},
        MyPost: {screen: MyPostListScreen},
        MyScrap: {screen: MyScrapListScreen}
    },
    {
        initialRouteName: null,
        defaultNavigationOptions: {
            header: null
        }
    }
);

export default MyInfoStack;
