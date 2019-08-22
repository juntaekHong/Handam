import React from "react";
import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

export const NoticeText = styled.Text`
  color: ${"#9e9e9e"}
  font-size: ${widthPercentageToDP(11)}
  font-family: ${fonts.nanumBarunGothicB}
  text-align: center;
  line-height: ${widthPercentageToDP(16)};
  height: ${widthPercentageToDP(34)}
  margin-top: ${widthPercentageToDP(31)};
  `;

export const SubjectText = styled.Text`
  color: ${"#000000"};
  font-size: ${widthPercentageToDP(19)};
  font-family: ${fonts.nanumBarunGothic};
  text-align: center;
  line-height: ${widthPercentageToDP(26)};
  width: ${widthPercentageToDP(255)};
  height: ${widthPercentageToDP(55)};
  margin-top: ${widthPercentageToDP(19.5)};
`;

export const DaText = styled.Text`
  color: ${"#000000"};
  font-size: ${widthPercentageToDP(10)};
  font-family: ${fonts.nanumBarunGothicB};
  margin-top: ${widthPercentageToDP(13.5)};
`;

export const PushedDaText = styled(DaText)`
  color: ${"#ffffff"};
`;

export const OText = styled.Text`
  color: ${"#259ffa"};
  font-size: ${widthPercentageToDP(70)};
  font-family: ${fonts.nanumBarunGothicB};
  margin-top: ${widthPercentageToDP(3)};
`;

export const PushedText = styled(OText)`
  color: ${"#ffffff"};
`;

export const XText = styled(OText)`
  color: ${"#e30101"};
`;

export const MySelectText = styled.Text`
  color: ${"#ffffff"};
  font-size: ${widthPercentageToDP(10)};
  font-family: ${fonts.nanumBarunGothicB};
`;

export const PersonText = styled.Text`
  color: ${"#000000"};
  font-size: ${widthPercentageToDP(10)};
  font-family: ${fonts.nanumBarunGothic};
  margin-top: ${widthPercentageToDP(35)};
`;

export const PercentText = styled.Text`
  color: ${"#000000"};
  font-size: ${widthPercentageToDP(13)};
  font-family: ${fonts.nanumBarunGothic};
  text-align: center;
  width: ${widthPercentageToDP(35)};
`;

export const PreVoteText = styled.Text`
  color: ${"#000000"};
  font-size: ${widthPercentageToDP(13)}
  font-family: ${fonts.nanumBarunGothicB}
`;

export const TotalReText = styled.Text`
  color: ${"#000000"}
  font-size: ${widthPercentageToDP(15)}
  font-family: ${fonts.nanumBarunGothicB};
  margin-right: ${widthPercentageToDP(8.5)}
  `;

export const TotalReplyText = styled.Text`
  color: ${"#171717"};
  font-size: ${widthPercentageToDP(11)};
  font-family: ${fonts.nanumBarunGothicB};
  margin-left: ${widthPercentageToDP(4.5)};
`;

export const PastVoteName = styled.Text`
  color: ${"#101010"};
  font-size: ${widthPercentageToDP(16)};
  font-family: ${fonts.nanumBarunGothic};
`;

export const PastVote = styled.Text`
  position: absolute;
  color: ${"#000000"};
  font-size: ${widthPercentageToDP(18)};
  font-family: ${fonts.nanumBarunGothic};
  width: ${widthPercentageToDP(375)};
  text-align: center;
`;
