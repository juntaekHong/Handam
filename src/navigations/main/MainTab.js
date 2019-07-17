import React, { Component } from "react";
import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";

import TestLeft from "../../containers/testleft/TestLeft";
import HomeStack from "../home/HomeStack";
import FastImage from "react-native-fast-image";
import { widthPercentageToDP } from "../../utils/util";

import CommunityTab from "../community/CommunityTab";
import TalkAboutScreen from "../../containers/Community/TalkAboutScreen";
import TalkDetailScreen from "../../containers/Community/TalkDetailScreen";
import TalkWriteScreen from "../../containers/Community/TalkWriteScreen";
import TalkSearch from "../../containers/community/TalkSearch";
import { TabView } from "../../components/navigation/TabView";

import HansungInfoStack from '../hansungInfo/HansungInfoStack';

const CommunityStack = createStackNavigator(
  {
    Community: { screen: CommunityTab },
    TalkAbout: { screen: TalkAbout },
    TalkDetail: { screen: TalkDetail },
    TalkWrite: { screen: TalkWrite },
    TalkSearch: { screen: TalkSearch }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

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
