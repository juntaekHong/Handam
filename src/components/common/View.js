import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";

export const LinkView = styled.TouchableOpacity`
  height: 100%;
  padding-left: ${props =>
    props.paddingLeft ? widthPercentageToDP(props.paddingLeft) : 0};
  padding-right: ${props =>
    props.paddingRight ? widthPercentageToDP(props.paddingRight) : 0};
  justify-content: center;
  align-items: center;
`;

export const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
