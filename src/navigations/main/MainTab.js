import React from "react";
import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";
import Home from "../../containers/Home/Home";
import Left from "../../containers/Left/Left";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import CommunityTab from "../CommunityTab/CommunityTab";
import TalkAboutScreen from "../../containers/Community/TalkAboutScreen";
import TalkDetailScreen from "../../containers/Community/TalkDetailScreen";
import TalkWriteScreen from "../../containers/Community/TalkWriteScreen";

const HomeStack = createStackNavigator(
  {
    Home: { screen: Home }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const RightStack = createStackNavigator(
  {
    Community: { screen: CommunityTab },
    TalkAbout: { screen: TalkAboutScreen },
    TalkDetail: { screen: TalkDetailScreen },
    TalkWrite: { screen: TalkWriteScreen },
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
)

const MainTab = createMaterialTopTabNavigator(
  {
    Left: { screen: Left, navigationOptions: { tabBarLabel: "성적표" } },
    Home: { screen: HomeStack, navigationOptions: { tabBarLabel: "홈" } },
    Right: { screen: RightStack, navigationOptions: { tabBarLabel: "커뮤니티" } }
  },
  {
    initialRouteName: "Home",
    tabBarPosition: "bottom",
    swipeEnabled: true,
    tabBarOptions: {
      indicatorStyle: {
        opacity: 0,
        backgroundColor: "#fff"
      },
      showIcon: true,
      activeTintColor: "rgb(96, 169, 243)",
      inactiveTintColor: "rgb(157, 157, 157)",
      tabStyle: {
        backgroundColor: "transparent"
      },
      style: {
        backgroundColor: "white"
      }
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = "home";
        } else if (routeName === "Left") {
          iconName = "person";
        } else if (routeName === "Right") {
          iconName = "chat";
        }
        return <MaterialIcon name={iconName} size={25} color={tintColor} />;
      }
    })
  }
);

export default MainTab;
