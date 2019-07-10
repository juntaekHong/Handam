import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import colors from "../../configs/colors";

export const ButtonStyle = styled.TouchableOpacity`
  flex-direction: row;
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
  padding-left: ${({ paddingLeft }) =>
    paddingLeft ? widthPercentageToDP(paddingLeft) : 0};
  padding-right: ${({ paddingRight }) =>
    paddingRight ? widthPercentageToDP(paddingRight) : 0};
  border-radius: ${props =>
    props.borderRadius
      ? widthPercentageToDP(props.borderRadius)
      : widthPercentageToDP(8)};
  border-width: ${({ borderWidth }) =>
    borderWidth ? widthPercentageToDP(borderWidth) : 0};
  border-color: ${props =>
    props.borderColor ? props.borderColor : colors.border};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : colors.active};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "center"}
  align-items: ${({ alignItems }) => (alignItems ? alignItems : "center")};
`;

export const Button = props => {
  return <ButtonStyle {...props} />;
};
