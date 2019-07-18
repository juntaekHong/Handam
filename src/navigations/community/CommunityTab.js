import { createMaterialTopTabNavigator } from "react-navigation";
import Talk from "../../containers/community/Talk";
import Vote from "../../containers/community/Vote";
import Restaurant from "../../containers/community/Restaurant";
import Knowledge from "../../containers/community/Knowledge";
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
    Knowledge: {
      screen: Knowledge,
      navigationOptions: { tabBarLabel: "알쓸신한" }
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
      indicatorStyle: {
        backgroundColor: "rgb(96, 169, 243)",
        marginLeft: widthPercentageToDP(16)
      },
      tabStyle: {
        // backgroundColor: 'red',
        backgroundColor: "transparent",
        width: widthPercentageToDP(79),
        marginRight: widthPercentageToDP(8)
      },
      style: {
        backgroundColor: "white",
        paddingHorizontal: widthPercentageToDP(16),
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0 // remove shadow on iOS
      }
    }
  }
);
