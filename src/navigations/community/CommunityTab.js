import { createMaterialTopTabNavigator } from "react-navigation";
import Talk from "../../containers/community/Talk";
import Vote from "../../containers/community/Vote";
import Restaurant from "../../containers/community/Restaurant";
import Professor from "../../containers/community/Professor";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";

export default createMaterialTopTabNavigator(
  {
    Talk: { screen: Talk, navigationOptions: { tabBarLabel: "한담 톡" } },
    Vote: { screen: Vote, navigationOptions: { tabBarLabel: "투표" } },
    Restaurant: {
      screen: Restaurant,
      navigationOptions: { tabBarLabel: "한슐랭" }
    },
    Professor: {
      screen: Professor,
      navigationOptions: { tabBarLabel: "교수평가" }
    }
  },
  {
    initialRouteName: "Talk", // 처음 보여질 탭
    tabBarPosition: "top", // 탭 위치
    swipeEnabled: true, // Swipe 기능
    lazy: true, // Default 값 true, 활성화 된 탭만 렌더링 할 것인지 여부.
    tabBarOptions: {
      showIcon: false,
      activeTintColor: "rgb(96, 169, 243)",
      inactiveTintColor: "rgb(157, 157, 157)",
      labelStyle: {
        backgroundColor: "white",
        width: widthPercentageToDP(79),
        height: widthPercentageToDP(18),
        fontSize: widthPercentageToDP(16),
        fontFamily: fonts.nanumBarunGothicB
      },
      tabStyle: {
        backgroundColor: "transparent"
      },
      indicatorStyle: {
        backgroundColor: "rgb(96, 169, 243)",
        height: widthPercentageToDP(2)
      },
      style: {
        backgroundColor: "white",
        height: widthPercentageToDP(60),
        justifyContent: "flex-end",
        borderBottomColor: "#dbdbdb",
        borderBottomWidth: widthPercentageToDP(1),
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0 // remove shadow on iOS
      }
    }
  }
);
