/**
 * 폰트 적용된 Text Component
 * 기본 폰트 크기 14
 * 기본 색      #000
 */
import React from "react";
import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";
import colors from "../../configs/colors";

export const SignInput = styled.TextInput`
  height: ${props => (props.height ? props.height : widthPercentageToDP(44))};
  font-size: ${props => (props.fontSize ? props.fontSize : 14)};
  font-family: ${fonts.nanumBarunGothic};
  padding-top: 0;
  padding-bottom: 0;
  color: ${props => (props.color ? props.color : "#000")};
`;

export const SignInInput = props => {
  return (
    <SignInput
      placeholderTextColor="black"
      autoCapitalize="none"
      underlineColorAndroid="transparent"
      autoCorrect={false}
      multiline={false}
      selectionColor={colors.rightBlue}
      {...props}
    />
  );
};

export const SignInInputView = styled.View`
  width: ${props => (props.width ? props.width : widthPercentageToDP(279))};
  height: ${props => (props.height ? props.height : widthPercentageToDP(44))};
  padding-left: ${widthPercentageToDP(13)};
  margin-bottom: ${props =>
    props.marginBottom ? widthPercentageToDP(props.marginBottom) : 0};
  background-color: #fff;
  justify-content: center;
  border-radius: ${widthPercentageToDP(8)};
  border-color: ${colors.border};
  border-width: 1;
`;
