import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../../utils/util";
import { NBGBText } from "../../common/Text";
import { TimeButton } from "../button/TimeButton";

const TimeTableView = styled.View`
  width: 100%
  height: ${widthPercentageToDP(47.7)}
  padding-left: ${widthPercentageToDP(16)}
  padding-right: ${widthPercentageToDP(16)}
  flex-direction: row
  justify-content: space-between
  align-items: center
`;

export const TimeTable = props => {
  return (
    <TimeTableView>
      <NBGBText fontSize={12}>{props.time}</NBGBText>
      <TimeButton {...props} />
    </TimeTableView>
  );
};
