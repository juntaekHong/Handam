/**
 * 폰트 적용된 Text Component
 * 기본 폰트 크기 14
 * 기본 색      #000
 */
import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";
import {View} from "react-native";
import React from "react";

// 기본 텍스트
export const StandText = styled.Text`
  font-size: ${widthPercentageToDP(14)};
  fontFamily: ${fonts.nanumBarunGothic};
  color: ${"black"};
`;

export const AccountDetailText = styled.Text`
  font-size: ${widthPercentageToDP(16)};
  fontFamily: ${fonts.nanumBarunGothic};
  color: ${"black"};
`;

export const CustomModalBlackText = styled.Text`
  color: ${"#000000"};
  font-size: ${widthPercentageToDP(20)};
  font-family: ${fonts.nanumBarunGothic};
`;

export const CustomModalBlackSmallText = styled.Text`
  color: ${"#000000"};
  font-size: ${widthPercentageToDP(14)};
  textAlign: center;
  font-family: ${fonts.nanumBarunGothic};
`;

export const CustomModalText = props => {
    return (
        <View style={{ flexDirection: "row" }}>
            <CustomModalBlackText>{props.black}</CustomModalBlackText>
        </View>
    );
};

export const CustomModalSmallText = props => {
    return (
        <View style={{ flexDirection: "row" }}>
            <CustomModalBlackSmallText>{props.black}</CustomModalBlackSmallText>
        </View>
    );
};

// 회원탈퇴 페이지 기본 텍스트
export const SECText = styled.Text`
  font-size: ${widthPercentageToDP(18)};
  fontFamily: ${fonts.nanumBarunGothic};
  color: ${"black"};
`;

