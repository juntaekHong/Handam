import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import { NBGBText } from "../common/Text";
import { TimeButton } from "./Button";

const TimeTableView = styled.View`
  position: absolute
  top: ${widthPercentageToDP(106)}
  width: 100%
  height: ${widthPercentageToDP(47.7)}
  padding-left: ${widthPercentageToDP(16)}
  padding-right: ${widthPercentageToDP(16)}
  flex-direction: row
  justify-content: space-between
  align-items: center
  z-index: 100
`;

export const TimeTable = props => {
  return (
    <TimeTableView>
      <NBGBText>타임테이블</NBGBText>
      <TimeButton {...props} />
    </TimeTableView>
  );
};
