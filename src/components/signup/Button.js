import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import colors from "../../configs/colors";

const SignUpButton = styled.TouchableOpacity`
  flex-direction: row;
  width: ${widthPercentageToDP(289)};
  height: ${widthPercentageToDP(53)};
  justify-content: center;
  align-items: center;
  border-radius: ${widthPercentageToDP(8)};
`;

export const AllTermTrue = styled(SignUpButton)`
  padding-left: ${widthPercentageToDP(29)};
  padding-right: ${widthPercentageToDP(40)};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-width: 1;
  border-color: ${colors.active};
  margin-bottom: ${widthPercentageToDP(37)};
  justify-content: space-between;
`;

export const SignUpNext = styled(SignUpButton)`
  margin-bottom: ${widthPercentageToDP(65)};
  background-color: ${props =>
    props.disabled ? colors.signUpNext : colors.active};
`;
