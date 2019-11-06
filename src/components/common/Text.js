/**
 * 폰트 적용된 Text Component
 * 기본 폰트 크기 14
 * 기본 색      #000
 */
import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

export const NBGText = styled.Text`
  font-size: ${props => (props.fontSize ? props.fontSize : 14)};
  font-family: ${fonts.nanumBarunGothic};
  color: ${props => (props.color ? props.color : "#000")};
  margin-top: ${({ marginTop }) => (marginTop ? widthPercentageToDP(marginTop) : 0)};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? widthPercentageToDP(marginBottom) : 0)};
  margin-right: ${({ marginRight }) => (marginRight ? widthPercentageToDP(marginRight) : 0)};
  margin-left: ${({ marginLeft }) => (marginLeft ? widthPercentageToDP(marginLeft) : 0)};
  text-align: ${({ align }) => (align ? align : "auto")};
  text-align-vertical: ${({ alignVertical }) => (alignVertical ? alignVertical : "center")};
`;

export const NBGLText = styled(NBGText)`
  font-family: ${fonts.nanumBarunGothicL};
`;

export const NBGBText = styled(NBGText)`
  font-family: ${fonts.nanumBarunGothicB};
`;

export const NBGULText = styled(NBGText)`
  font-family: ${fonts.nanumBarunGothicUL};
`;
