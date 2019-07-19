import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

//기본
export const DefaultText = styled.Text`
  color: ${"#000000"};
  font-size: ${widthPercentageToDP(16)};
  font-family: ${fonts.nanumBarunGothicB};
`;
//
export const PostTitleText = styled(DefaultText)`
  color: ${"#101010"};
  height: ${widthPercentageToDP(18)};
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

export const AnonymousOFFText = styled.Text`
  color: ${"#c3c3c3"};
  font-size: ${widthPercentageToDP(13)};
  font-family: ${fonts.nanumBarunGothicB};
`;

export const AnonymousONText = styled(AnonymousOFFText)`
  color: ${"#24a0fa"};
`;

export const WriterName = styled.Text`
  color: ${"#0c81ff"};
  font-size: ${widthPercentageToDP(10)};
  font-family: ${fonts.nanumBarunGothicB};
  margin-left: ${widthPercentageToDP(4)};
`;

export const AnonymousWriterName = styled(WriterName)`
  color: ${"#171717"};
`;
