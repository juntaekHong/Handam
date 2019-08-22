import React from "react";
import styled from "styled-components";
import { widthPercentageToDP } from "../../../utils/util";

const FloatButton = styled.TouchableOpacity`
  position: absolute
  width: ${widthPercentageToDP(74)}
  height: ${widthPercentageToDP(74)}
  bottom: ${widthPercentageToDP(18)}
  right: ${widthPercentageToDP(25)}
  background-color: transparent
  justify-content: center
  align-items: center
`;

const FloatImage = styled.Image.attrs(props => ({
  source: require("HandamProject/assets/image/schedule/loading.png")
}))`
  width: ${widthPercentageToDP(74)}
  height: ${widthPercentageToDP(74)}
`;
export const ScheduleFloatButton = props => {
  return (
    <FloatButton {...props}>
      <FloatImage />
    </FloatButton>
  );
};
