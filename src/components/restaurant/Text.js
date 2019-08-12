import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

export const Name = styled.Text`
  color: ${"#0b0b0b"};
  font-size: ${widthPercentageToDP(15)};
  font-family: ${fonts.nanumBarunGothicB};
`;

export const Tag = styled.Text`
  color: ${"#404040"};
  font-size: ${widthPercentageToDP(8)};
  font-family: ${fonts.nanumBarunGothicB};
`;

export const ReplyCount = styled.Text`
  color: ${"#b1b1b1"};
  font-size: ${widthPercentageToDP(11)};
  font-family: ${fonts.nanumBarunGothic};
`;

export const MenuName = styled.Text`
  color: ${"#404040"};
  font-size: ${widthPercentageToDP(11)};
  font-family: ${fonts.nanumBarunGothic};
  margin-top: ${widthPercentageToDP(5)};
  margin-bottom: ${widthPercentageToDP(16)};
  margin-right: ${widthPercentageToDP(5)};
`;
