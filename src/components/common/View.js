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

export const BaseView = styled.View`
  flex: 1;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : "white"};
`;

export const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TitleView = styled.View`
  width: 100%;
  height: ${widthPercentageToDP(55)};
`;
