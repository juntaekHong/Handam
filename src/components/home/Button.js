import React from "react";
import styled from "styled-components";
import { NBGBText } from "../common/Text";
import { Image, Platform, View } from "react-native";
import colors from "../../configs/colors";
import { widthPercentageToDP } from "../../utils/util";
import { ButtonStyle } from "../common/Button";

const shadow = {
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
};

export const HomeNavigate = styled.TouchableOpacity`
  width: ${widthPercentageToDP(80)}
  height: ${widthPercentageToDP(100)}
  background-color: ${({ backgroundColor }) => backgroundColor}
  border-radius: ${widthPercentageToDP(8)}
  padding-top :${widthPercentageToDP(20)}
  align-items: center
`;

export const HomeNavigateButton = props => {
  return (
    <HomeNavigate {...props} style={shadow[Platform.OS]}>
      {props.children}
      <NBGBText marginTop={7} fontSize={12} color={colors.white}>
        {props.title}
      </NBGBText>
    </HomeNavigate>
  );
};

export const ScheduleButton = props => (
  <HomeNavigateButton {...props} backgroundColor={"#5accff"} title={"시간표"}>
    <Image
      style={{
        width: widthPercentageToDP(47),
        height: widthPercentageToDP(48)
      }}
      source={require("HandamProject/assets/image/home/schedule.png")}
    />
  </HomeNavigateButton>
);

export const BusButton = props => (
  <HomeNavigateButton {...props} backgroundColor={"#259ffa"} title={"스쿨버스"}>
    <Image
      style={{
        width: widthPercentageToDP(47),
        height: widthPercentageToDP(48)
      }}
      source={require("HandamProject/assets/image/home/bus.png")}
    />
  </HomeNavigateButton>
);

export const NoticeButton = props => (
  <HomeNavigateButton {...props} backgroundColor={"#0dcfe0"} title={"한성공지"}>
    <Image
      style={{
        width: widthPercentageToDP(47),
        height: widthPercentageToDP(48)
      }}
      source={require("HandamProject/assets/image/home/notice.png")}
    />
  </HomeNavigateButton>
);
