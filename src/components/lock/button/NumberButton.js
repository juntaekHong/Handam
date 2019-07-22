import React from "react";
import { widthPercentageToDP } from "../../../utils/util";
import { NBGText } from "../../common/Text";
import styled from "styled-components";

const NumberView = styled.TouchableOpacity`
  width: ${widthPercentageToDP(95)}
  height: ${widthPercentageToDP(47)}
  justify-content: center
  align-items: center
`;
export const NumberButton = props => {
  return (
    <NumberView {...props} onPress={() => props.onPress(props.number)}>
      <NBGText fontSize={31}>{props.number}</NBGText>
    </NumberView>
  );
};
