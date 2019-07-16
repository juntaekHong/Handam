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
import { TabView } from "../../components/navigation/TabView";

import HansungInfoTab from '../hansungInfo/HansungInfoTab';
import CertificationStack from "../certification/CertificationStack";

// 비교과, 성적표, 종정시 인증
const HansungInfoStack = createStackNavigator(
    {
        HansungInfo : { screen: HansungInfoTab },
        Certification: {screen: CertificationStack}
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

    if ( routeName == "Certification" ) {
        tabBarVisible = false
    }

    return {
        tabBarVisible
    }
}

const CommunityStack = createStackNavigator(
  {
    Community: { screen: CommunityTab },
    TalkAbout: { screen: TalkAboutScreen },
    TalkDetail: { screen: TalkDetailScreen },
    TalkWrite: { screen: TalkWriteScreen }
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
