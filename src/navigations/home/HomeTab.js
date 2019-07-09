import React, { Component } from "react";
import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import TestLeft from "../../containers/testleft/TestLeft";
import TestHome from "../../containers/testhome/TestHome";
import TestRight from "../../containers/testright/TestRight";

const HomeTab = createMaterialTopTabNavigator(
  {
    Left: { screen: TestLeft, navigationOptions: { tabBarLabel: "성적표" } },
    Home: { screen: TestHome, navigationOptions: { tabBarLabel: "홈" } },
    Right: { screen: TestRight, navigationOptions: { tabBarLabel: "커뮤니티" } }
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

export default HomeTab;
