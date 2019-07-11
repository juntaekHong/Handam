import React from "react";
import styled from "styled-components";
import { HomeNavigate } from "./View";
import { NBGBText } from "../common/Text";
import { Image } from "react-native";
import colors from "../../configs/colors";
import { widthPercentageToDP } from "../../utils/util";

export const HomeNavigateButton = props => {
  return (
    <HomeNavigate {...props}>
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
