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

//Button
export const NumText = styled(DefaultText)`
  color: ${"#0c81ff"};
  width: ${widthPercentageToDP(35)};
  height: ${widthPercentageToDP(81)};
  text-align: center;
  text-align-vertical: center;
`;

export const HotText = styled(DefaultText)`
  color: ${"#ffffff"};
  font-size: ${widthPercentageToDP(10)};
  line-height: ${widthPercentageToDP(12)};
`;

export const TitleText = styled(DefaultText)`
  font-size: ${widthPercentageToDP(13)};
`;

export const ContentText = styled(DefaultText)`
  font-size: ${widthPercentageToDP(11)};
  font-family: ${fonts.nanumBarunGothic};
  margin-top: ${widthPercentageToDP(8)};
`;

export const CreatedAtText = styled(DefaultText)`
  color: ${"#646464"};
  font-size: ${widthPercentageToDP(11)};
`;

export const ImageCountText = styled(DefaultText)`
  color: ${"#171717"};
  font-size: ${widthPercentageToDP(11)};
  font-family: ${fonts.nanumBarunGothic};
  margin-left: ${widthPercentageToDP(5)};
`;

export const ReportText = styled(DefaultText)`
  color: ${"#101010"};
  font-size: ${widthPercentageToDP(11)};
`;

export const WriteText = styled(DefaultText)`
  position: absolute;
  color: ${"#ffffff"};
  font-size: ${widthPercentageToDP(15)};
  font-family: ${fonts.nanumBarunGothicB};
`;

//카테고리
export const PostTitleText = styled(DefaultText)`
  color: ${"#101010"};
  height: ${widthPercentageToDP(18)};
  margin-vertical: ${widthPercentageToDP(8)};
`;

//Modal
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

export const ImageModalText = styled.Text`
  position: absolute;
  color: ${"#ffffff"};
  width: ${widthPercentageToDP(375)};
  height: ${widthPercentageToDP(17)};
  text-align: center;
  font-size: ${widthPercentageToDP(15)};
`;

//익명
export const AnonymousOFFText = styled.Text`
  color: ${"#c3c3c3"};
  font-size: ${widthPercentageToDP(13)};
  font-family: ${fonts.nanumBarunGothicB};
`;

export const AnonymousONText = styled(AnonymousOFFText)`
  color: ${"#24a0fa"};
`;

//Alert
export const AlertText = styled.Text`
  color: ${"#000000"};
  font-size: ${widthPercentageToDP(18)};
  font-family: ${fonts.nanumBarunGothic};
`;
