import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import colors from "../../configs/colors";

export const SignInButtonStyle = styled.TouchableOpacity`
  width: ${props =>
    props.width ? widthPercentageToDP(props.width) : widthPercentageToDP(279)};
  height: ${props =>
    props.height ? widthPercentageToDP(props.height) : widthPercentageToDP(44)};
  margin-bottom: ${props =>
    props.marginBottom ? widthPercentageToDP(props.marginBottom) : 0};
  margin-left: ${props =>
    props.marginLeft ? widthPercentageToDP(props.marginLeft) : 0};
  margin-right: ${props =>
    props.marginRight ? widthPercentageToDP(props.marginRight) : 0};
  border-radius: ${props =>
    props.borderRadius
      ? widthPercentageToDP(props.borderRadius)
      : widthPercentageToDP(8)};
  border-color: ${props =>
    props.borderColor ? props.borderColor : colors.border};
  background-color: ${props =>
    props.disabled ? colors.disable : colors.active};
  justify-content: center;
  align-items: center;
`;

export const SignInButton = props => {
  return <SignInButtonStyle disabled={true} {...props} />;
};
