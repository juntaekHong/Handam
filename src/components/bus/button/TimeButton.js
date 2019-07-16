import React from "react";
import styled from "styled-components";
import { widthPercentageToDP } from "../../../utils/util";
import { NBGBText } from "../../common/Text";

const TimeButtonView = styled.TouchableOpacity`
  width: ${widthPercentageToDP(72)}
  height: ${widthPercentageToDP(22)}
  justify-content: center
  align-items: center
  border-width: 1
  border-color: #525252
  border-radius: ${widthPercentageToDP(12.5)}
`;

export const TimeButton = props => {
  return (
    <TimeButtonView {...props}>
      <NBGBText fontSize={12} color={"#525252"}>
        버스시간표
      </NBGBText>
    </TimeButtonView>
  );
};
