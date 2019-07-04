/**
 * 폰트 적용된 Text Component
 * 기본 폰트 크기 14
 * 기본 색      #000
 */
import styled from "styled-components/native";
import fonts from "../../configs/fonts";

export const NRText = styled.Text`
  font-size: ${props => (props.fontSize ? props.fontSize : 14)};
  font-family: ${fonts.nanumSquareR};
  include-font-padding: false;
  color: ${props => (props.color ? props.color : "#000")};
`;

export const NBText = styled(NRText)`
  font-family: ${fonts.nanumSquareB};
`;

export const NEBText = styled(NRText)`
  font-family: ${fonts.nanumSquareEB};
`;

export const NLText = styled(NRText)`
  font-family: ${fonts.nanumSquareL};
`;

export const NBGText = styled.Text`
  font-size: ${props => (props.fontSize ? props.fontSize : 14)};
  font-family: ${fonts.nanumBarunGothic};
  color: ${props => (props.color ? props.color : "#000")};
`;

export const NBGLText = styled(NRText)`
  font-family: ${fonts.nanumBarunGothicL};
`;

export const NBGBText = styled(NRText)`
  font-family: ${fonts.nanumBarunGothicB};
`;

export const NBGULText = styled(NRText)`
  font-family: ${fonts.nanumBarunGothicUL};
`;
