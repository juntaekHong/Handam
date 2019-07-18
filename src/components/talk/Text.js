import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

//기본
export const DefaultText = styled.Text`
  font-size: ${widthPercentageToDP(16)};
  font-family: ${fonts.nanumBarunGothicB};
  color: ${"#000000"};
`;
//
export const PostTitleText = styled(DefaultText)`
  height: ${widthPercentageToDP(18)};
  color: ${"#101010"};
  margin-vertical: ${widthPercentageToDP(8)};
`;

export const CustomModalBlackText = styled.Text`
  color: ${"#000000"};
  font-size: ${widthPercentageToDP(20)};
  font-family: ${fonts.nanumBarunGothic};
`;

export const CustomModalRedText = styled(CustomModalBlackText)`
  color: ${"#ea0000"};
`;

export const CustomModalText = props => {
  return (
    <View style={{ flexDirection: "row" }}>
      <CustomModalBlackText>{props.black1}</CustomModalBlackText>
      <CustomModalRedText>{props.red}</CustomModalRedText>
      <CustomModalBlackText>{props.black2}</CustomModalBlackText>
    </View>
  );
};
