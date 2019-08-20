import React, { useCallback } from "react";
import styled from "styled-components";
import { widthPercentageToDP } from "../../utils/util";
import { NBGText, NBGBText } from "../common/Text";
import colors from "../../configs/colors";
import navigators from "../../utils/navigators";
import { Platform } from "react-native";

const shadow = {
  ...Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84
    },
    android: {
      elevation: 5
    }
  })
};
const TabBarButton = styled.TouchableOpacity`
  width: ${widthPercentageToDP(49)}
  height: ${widthPercentageToDP(49)}
  justify-content: center
  align-items: center
`;
const TabBarIcon = styled.Image`
  height: ${widthPercentageToDP(28)}
  width: ${widthPercentageToDP(28)}
  align-items: center
  justify-content: center
`;

const TabBarView = styled.View`
  flex-direction: row
  width: 100%
  height: ${widthPercentageToDP(49)}
  align-items: center
  justify-content: center
  background-color: white
`;

const TabBar = ({ active, onPress, source, label = "", style }) => (
  <TabBarButton onPress={onPress} style={style}>
    <TabBarIcon source={source} style={{ marginBottom: 0.2 }} />
    {active ? (
      <NBGBText color={colors.active} fontSize={10}>
        {label}
      </NBGBText>
    ) : (
      <NBGText color={"#9e9e9e"} fontSize={10}>
        {label}
      </NBGText>
    )}
  </TabBarButton>
);
export const TabView = ({ navigationState }) => {
  const navigateGrade = useCallback(() => {
    navigators.navigate("Left");
  }, []);
  const navigateHome = useCallback(() => {
    navigators.navigate("HomeStack");
  }, []);
  const navigateCommunity = useCallback(() => {
    navigators.navigate("Community");
  }, []);
  return (
    <TabBarView style={shadow}>
      <TabBar
        onPress={navigateGrade}
        source={
          navigationState.index === 0
            ? require("HandamProject/assets/image/navigation/gradecardblue.png")
            : require("HandamProject/assets/image/navigation/gradecardgrey.png")
        }
        label={"마이페이지"}
        active={navigationState.index === 0}
      />
      <TabBar
        onPress={navigateHome}
        style={{
          marginLeft: widthPercentageToDP(51),
          marginRight: widthPercentageToDP(51)
        }}
        source={
          navigationState.index === 1
            ? require("HandamProject/assets/image/navigation/homeblue.png")
            : require("HandamProject/assets/image/navigation/homegrey.png")
        }
        label={"홈"}
        active={navigationState.index === 1}
      />
      <TabBar
        onPress={navigateCommunity}
        source={
          navigationState.index === 2
            ? require("HandamProject/assets/image/navigation/communityblue.png")
            : require("HandamProject/assets/image/navigation/communitygrey.png")
        }
        label={"커뮤니티"}
        active={navigationState.index === 2}
      />
    </TabBarView>
  );
};
