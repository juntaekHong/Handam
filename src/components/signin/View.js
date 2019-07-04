import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";

export const SignInMainView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const SignInLinkView = styled.View`
  width: 100%;
  height: ${props =>
    props.height ? widthPercentageToDP(props.height) : widthPercentageToDP(16)}
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
