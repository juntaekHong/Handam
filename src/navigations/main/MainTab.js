import React, { Component } from "react";
import { createMaterialTopTabNavigator } from "react-navigation";

import HomeStack from "../home/HomeStack";

import CommunityStack from "../community/CommunityStack";
import { TabView } from "../../components/navigation/TabView";

import HansungInfoStack from "../hansungInfo/HansungInfoStack";

const MainTab = createMaterialTopTabNavigator(
  {
    Left: {
      screen: HansungInfoStack
    },
    HomeStack: {
      screen: HomeStack
    },
    Community: {
      screen: CommunityStack
    }
  },
  {
    initialRouteName: "HomeStack",
    tabBarPosition: "bottom",
    swipeEnabled: true,
    tabBarComponent: TabView
  }
);

export default MainTab;
