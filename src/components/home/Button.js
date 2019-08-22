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
  width: ${widthPercentageToDP(84)}
  height: ${widthPercentageToDP(130)}
  align-items: center
`;

export const HomeNavigateButton = props => {
  return (
    <HomeNavigate {...props}>
      <Image
        style={{
          width: widthPercentageToDP(84),
          height: widthPercentageToDP(130)
        }}
        source={props.image}
      />
    </HomeNavigate>
  );
};

export const ScheduleButton = props => (
  <HomeNavigateButton
    {...props}
    image={require("HandamProject/assets/image/home/schedule.png")}
  />
);

export const BusButton = props => (
  <HomeNavigateButton
    {...props}
    image={require("HandamProject/assets/image/home/bus.png")}
  />
);

export const NoticeButton = props => (
  <HomeNavigateButton
    {...props}
    image={require("HandamProject/assets/image/home/notice.png")}
  />
);

export const CisButton = props => (
  <HomeNavigateButton
    {...props}
    image={require("HandamProject/assets/image/home/cis.png")}
  />
);
