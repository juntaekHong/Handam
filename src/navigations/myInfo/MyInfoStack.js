import { createStackNavigator } from "react-navigation";
import MyInfo from "../../containers/myInfo/MyInfo";
import Secession from "../../containers/myInfo/Secession";
import AccountInfo from "../../containers/myInfo/AccountInfo";
import MyPostList from "../../containers/myInfo/MyPostList";
import MyScrapList from "../../containers/myInfo/MyScrapList";
import ChangePassword from "../../containers/myInfo/ChangePassword";
import Calculation from "../../containers/myInfo/Calculation";

const MyInfoStack = createStackNavigator(
  {
    MyInfo: { screen: MyInfo },
    Secession: { screen: Secession },
    AccountInfo: { screen: AccountInfo },
    MyPost: { screen: MyPostList },
    MyScrap: { screen: MyScrapList },
    ChangePass: { screen: ChangePassword },
    Calculation: { screen: Calculation }
  },
  {
    initialRouteName: null,
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default MyInfoStack;
