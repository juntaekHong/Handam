import React from "react";
import { Platform } from "react-native";
import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

//Common

//Talk.js

export const CategoryName = styled.Text`
  color: ${"#101010"};
  font-size: ${widthPercentageToDP(16)};
  font-family: ${fonts.nanumBarunGothicB};
  height: ${widthPercentageToDP(17)};
  margin-top: ${widthPercentageToDP(8)};
  margin-bottom: ${widthPercentageToDP(6)};
`;
export const CategoryExplain = styled.Text`
  color: ${"#000000"};
  font-size: ${widthPercentageToDP(12)};
  font-family: ${fonts.nanumBarunGothic};
  width: ${widthPercentageToDP(200)};
  height: ${widthPercentageToDP(13)};
`;

//TalkAbout.js

export const HotNum = styled.Text`
  color: ${"#0c81ff"};
  font-size: ${widthPercentageToDP(16)};
  font-family: ${fonts.nanumBarunGothicB};
`;

export const HotText = styled.Text`
  color: ${"#ffffff"};
  font-size: ${widthPercentageToDP(10)};
  font-family: ${fonts.nanumBarunGothicB};
  line-height: ${widthPercentageToDP(12)};
`;

export const PostTitle = styled.Text`
  color: ${"#101010"};
  font-size: ${widthPercentageToDP(14)};
  font-family: ${fonts.nanumBarunGothicB};
  width: ${widthPercentageToDP(288)};
  margin-bottom: ${widthPercentageToDP(5)};
  line-height: ${widthPercentageToDP(18)};
`;

export const PostContent = styled(PostTitle)`
  color: ${"#454545"};
  font-size: ${widthPercentageToDP(11)};
  font-family: ${fonts.nanumBarunGothic};
  margin-bottom: ${widthPercentageToDP(8)};
  line-height: ${widthPercentageToDP(15)};
  height: ${widthPercentageToDP(15)};
`;

export const PostUserName = styled.Text`
  color: ${"#646464"};
  font-size: ${widthPercentageToDP(9)};
  font-family: ${fonts.nanumBarunGothic};
  margin-right: ${widthPercentageToDP(4)};
`;

export const PostCreatedAt = styled.Text`
  color: ${"#646464"};
  font-size: ${widthPercentageToDP(9)};
  font-family: ${fonts.nanumBarunGothic};
`;

export const ImageCount = styled.Text`
  color: ${"#171717"};
  font-size: ${widthPercentageToDP(11)};
  font-family: ${fonts.nanumBarunGothic};
  margin-left: ${widthPercentageToDP(5)};
`;

export const ReportText = styled.Text`
  color: ${"#101010"};
  font-size: ${widthPercentageToDP(11)};
  font-family: ${fonts.nanumBarunGothicB};
`;

export const WriteText = styled.Text`
  position: absolute;
  color: ${"#ffffff"};
  font-size: ${widthPercentageToDP(15)};
  font-family: ${fonts.nanumBarunGothicB};
`;

//TalkDetail.js

export const UserName = styled.Text`
  color: ${"#171717"};
  font-size: ${widthPercentageToDP(12)};
  font-family: ${fonts.nanumBarunGothicB};
  margin-left: ${widthPercentageToDP(6)};
  padding-bottom: ${0};
  margin-bottom: ${0};
`;

export const CreatedAt = styled.Text`
  color: ${"#929292"};
  font-size: ${widthPercentageToDP(8)};
  font-family: ${fonts.nanumBarunGothic};
  margin-left: ${widthPercentageToDP(4)};
  margin-top: ${Platform.OS == "ios"
    ? widthPercentageToDP(4)
    : widthPercentageToDP(3)};
`;

export const ScrapText = styled.Text`
  color: ${"#171717"};
  font-size: ${widthPercentageToDP(11)};
  font-family: ${fonts.nanumBarunGothic};
  margin-left: ${widthPercentageToDP(4)};
  margin-top: ${widthPercentageToDP(2)};
`;

export const Title = styled.Text`
  color: ${"#000000"};
  width: ${widthPercentageToDP(343)};
  font-size: ${widthPercentageToDP(16)};
  font-family: ${fonts.nanumBarunGothicB};
  margin-top: ${widthPercentageToDP(15)};
`;

export const Content = styled.Text`
  color: ${"#000000"};
  width: ${widthPercentageToDP(343)};
  font-size: ${widthPercentageToDP(13)};
  font-family: ${fonts.nanumBarunGothic};
  margin-top: ${widthPercentageToDP(7)};
  line-height: ${widthPercentageToDP(19)};
`;

export const GoodCount = styled.Text`
  color: ${"#171717"};
  font-size: ${widthPercentageToDP(11)};
  font-family: ${fonts.nanumBarunGothic};
  margin-left: ${widthPercentageToDP(4)};
`;

//TalkSearch.js

export const HandaMon = styled.Text`
  color: ${"#c3c3c3"};
  font-size: ${widthPercentageToDP(18)};
  font-family: ${fonts.nanumBarunGothicB};
`;

//TalkSearch.js

export const SearchCancel = styled.Text`
  color: ${"#000000"};
  font-size: ${widthPercentageToDP(18)};
  font-family: ${fonts.nanumBarunGothic};
  margin-left: ${widthPercentageToDP(16)};
`;

//TalkWrite.js

export const ImageAdd = styled.Text`
  color: ${"#c3c3c3"};
  font-size: ${widthPercentageToDP(13)};
  font-family: ${fonts.nanumBarunGothic};
`;

//Modal
export const CustomModalBlackText = styled.Text`
  color: ${"#000000"};
  font-size: ${widthPercentageToDP(20)};
  font-family: ${fonts.nanumBarunGothic};
  margin-bottom: ${widthPercentageToDP(29)};
`;

export const CustomModalRedText = styled(CustomModalBlackText)`
  color: ${"#ea0000"};
`;

const CustomModalTextView = styled.View`
  flex-direction: row;
`;

export const CustomModalText = props => {
  return (
    <CustomModalTextView>
      <CustomModalBlackText>{props.black1}</CustomModalBlackText>
      <CustomModalRedText>{props.red}</CustomModalRedText>
      <CustomModalBlackText>{props.black2}</CustomModalBlackText>
    </CustomModalTextView>
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
