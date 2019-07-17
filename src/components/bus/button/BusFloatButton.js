import React from "react";
import styled from "styled-components";
import { widthPercentageToDP } from "../../../utils/util";
import { Image } from "react-native";

const BusFloatView = styled.TouchableOpacity`
  position: absolute
  right: ${widthPercentageToDP(19)}
  bottom: ${widthPercentageToDP(40)}
  width: ${widthPercentageToDP(65)}
  height: ${widthPercentageToDP(65)}
  justifyContent: center
  alignItems: center
`;

export const BusFloatButton = props => {
  return (
    <BusFloatView onPress={props.onPress}>
      <Image
        source={require("HandamProject/assets/image/bus/bus-float-btn.png")}
      />
    </BusFloatView>
  );
};
