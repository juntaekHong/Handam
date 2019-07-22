import React from "react";
import { widthPercentageToDP } from "../../../utils/util";
import { NBGText } from "../../common/Text";
import styled from "styled-components";
import { Image } from "react-native";

const NumberView = styled.TouchableOpacity`
  width: ${widthPercentageToDP(95)}
  height: ${widthPercentageToDP(47)}
  justify-content: center
  align-items: center
`;
export const NumberButton = props => {
  return (
    <NumberView {...props} onPress={() => props.onPress(props.number)}>
      {props.delete ? (
        <Image source={require("HandamProject/assets/image/lock/delete.png")} />
      ) : (
        <NBGText fontSize={31}>{props.number}</NBGText>
      )}
    </NumberView>
  );
};
