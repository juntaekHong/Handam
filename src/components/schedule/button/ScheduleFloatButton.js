import React from "react";
import styled from "styled-components";
import { widthPercentageToDP } from "../../../utils/util";

const FloatButton = styled.TouchableOpacity`
  position: absolute
  width: ${widthPercentageToDP(57)}
  height: ${widthPercentageToDP(57)}
  bottom: ${widthPercentageToDP(23)}
  right: ${widthPercentageToDP(23)}
  border-radius: ${widthPercentageToDP(28.5)}
  background-color: #4a4a4a
  justify-content: center
  align-items: center
`;

const FloatImage = styled.Image.attrs(props => ({
  source: require("HandamProject/assets/image/schedule/loading.png")
}))`
  width: ${widthPercentageToDP(31)}
  height: ${widthPercentageToDP(40)}
  margin-left: ${widthPercentageToDP(2)}
`;
export const ScheduleFloatButton = props => {
  return (
    <FloatButton {...props}>
      <FloatImage />
    </FloatButton>
  );
};
