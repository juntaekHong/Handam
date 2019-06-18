import styled from "styled-components/native";
import fonts from "../../configs/fonts";

export const NRText = styled.Text`
  font-size: ${props => (props.fontSize ? props.fontSize : 14)};
  font-family: ${fonts.nanumSquareR};
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
