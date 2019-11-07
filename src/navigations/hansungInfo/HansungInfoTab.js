import { createMaterialTopTabNavigator } from "react-navigation";
import HansungInfoPoint from "../../containers/hansungInfo/HansungPoint";
import Grades from "../../containers/hansungInfo/Grades";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";

export default createMaterialTopTabNavigator(
  {
    Point: {
      screen: HansungInfoPoint,
      navigationOptions: { tabBarLabel: "비교과포인트" }
    },
    Grade: { screen: Grades, navigationOptions: { tabBarLabel: "성적표" } }
  },
  {
    initialRouteName: "Grade", // 처음 보여질 탭
    tabBarPosition: "top", // 탭 위치
    swipeEnabled: true, // Swipe 기능
    lazy: true, // Default 값 true, 활성화 된 탭만 렌더링 할 것인지 여부.
    tabBarOptions: {
      showIcon: false,
      activeTintColor: "rgb(96, 169, 243)",
      inactiveTintColor: "rgb(157, 157, 157)",
      labelStyle: {
        backgroundColor: "white",
        width: widthPercentageToDP(90),
        height: widthPercentageToDP(18),
        fontSize: widthPercentageToDP(16),
        fontFamily: fonts.nanumBarunGothicB
      },
      indicatorStyle: {
        backgroundColor: "rgb(96, 169, 243)"
        // marginLeft: widthPercentageToDP(16),
      },
      tabStyle: {
        backgroundColor: "transparent",
        width: widthPercentageToDP(187.5)
        // marginRight: widthPercentageToDP(8)
      },
      style: {
        backgroundColor: "white",
        textAlign: "center",
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0 // remove shadow on iOS
      }
    }
  }
);
