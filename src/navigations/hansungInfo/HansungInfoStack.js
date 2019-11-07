import { createStackNavigator } from "react-navigation";
import HansungInfoTab from "../hansungInfo/HansungInfoTab";
import MyInfoStack from "../myInfo/MyInfoStack";

// 비교과, 성적표, 종정시 인증
const HansungInfoStack = createStackNavigator(
  {
    HansungInfo: { screen: HansungInfoTab },
    MyInfo: { screen: MyInfoStack }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

// 종정시 인증 페이지 탭바 숨기기
HansungInfoStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == "MyInfo") {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default HansungInfoStack;
