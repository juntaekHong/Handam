import React, { Component } from "react";
import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";

import TestLeft from "../../containers/testleft/TestLeft";
import HomeStack from "../home/HomeStack";
import FastImage from "react-native-fast-image";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import colors from "../../configs/colors";

import CommunityTab from "../community/CommunityTab";
import TalkAbout from "../../containers/community/TalkAbout";
import TalkDetail from "../../containers/community/TalkDetail";
import TalkWrite from "../../containers/community/TalkWrite";
import TalkSearch from "../../containers/community/TalkSearch";

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

const HomeTab = createMaterialTopTabNavigator(
  {
    Left: {
      screen: TestLeft,
      navigationOptions: {
        tabBarLabel: "성적표",
        tabBarIcon: ({ focused }) =>
          focused ? (
            <FastImage
              source={require("HandamProject/assets/image/navigation/gradecardblue.png")}
              style={{
                height: widthPercentageToDP(28),
                width: widthPercentageToDP(28)
              }}
            />
          ) : (
            <FastImage
              source={require("HandamProject/assets/image/navigation/gradecardgrey.png")}
              style={{
                height: widthPercentageToDP(28),
                width: widthPercentageToDP(28)
              }}
            />
          )
      }
    },
    HomeStack: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: "홈",
        tabBarIcon: ({ focused }) =>
          focused ? (
            <FastImage
              source={require("HandamProject/assets/image/navigation/homeblue.png")}
              style={{
                height: widthPercentageToDP(28),
                width: widthPercentageToDP(28)
              }}
            />
          ) : (
            <FastImage
              source={require("HandamProject/assets/image/navigation/homegrey.png")}
              style={{
                height: widthPercentageToDP(28),
                width: widthPercentageToDP(28)
              }}
            />
          )
      }
    },
    Community: {
      screen: CommunityStack,
      navigationOptions: {
        tabBarLabel: "커뮤니티",
        tabBarIcon: ({ focused }) =>
          focused ? (
            <FastImage
              source={require("HandamProject/assets/image/navigation/communityblue.png")}
              style={{
                height: widthPercentageToDP(28),
                width: widthPercentageToDP(28)
              }}
            />
          ) : (
            <FastImage
              source={require("HandamProject/assets/image/navigation/communitygrey.png")}
              style={{
                height: widthPercentageToDP(28),
                width: widthPercentageToDP(28)
              }}
            />
          )
      }
    }
  },
  {
    initialRouteName: "HomeStack",
    tabBarPosition: "bottom",
    swipeEnabled: true,
    tabBarOptions: {
      indicatorStyle: {
        opacity: 0,
        backgroundColor: "#fff"
      },
      showIcon: true,
      activeTintColor: colors.active,
      inactiveTintColor: "#9e9e9e",
      tabStyle: {
        height: widthPercentageToDP(49),
        justifyContent: "center",
        alignItems: "center",
        bottom: 0,
        top: 0,
        backgroundColor: "transparent"
      },
      labelStyle: {
        fontFamily: fonts.nanumBarunGothicB,
        fontSize: widthPercentageToDP(10),
        margin: 0
      },
      style: {
        height: widthPercentageToDP(49),
        paddingTop: 0,
        backgroundColor: colors.white
      }
    }
  }
);

export default HomeTab;
