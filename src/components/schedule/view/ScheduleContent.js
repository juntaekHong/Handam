import React from "react";
import styled from "styled-components";
import {
  widthPercentageToDP,
  scheduleContent,
  scheduleTime
} from "../../../utils/util";
import { NBGBText } from "../../common/Text";

const ContentView = styled.View`
  position: absolute
  width: ${widthPercentageToDP(60)}
  paddingHorizontal: ${widthPercentageToDP(5)}
  paddingVertical: ${widthPercentageToDP(5)}
  
`;
export const ScheduleContent = props => {
  const content = scheduleContent(props.content);
  const time = scheduleTime(props.time);
  return (
    <ContentView
      style={{
        left: widthPercentageToDP(props.left * 62),
        height: widthPercentageToDP(
          (parseInt(time[2]) - parseInt(time[0])) * 60 +
            parseInt(parseInt(time[3]) - parseInt(time[1]))
        ),
        top:
          (parseInt(time[0]) - 9) * widthPercentageToDP(60) +
          widthPercentageToDP(time[1]),
        backgroundColor: props.color[`${content[0]}${content[1]}`]
          ? props.color[`${content[0]}${content[1]}`]
          : "#dbdbdb"
      }}
    >
      <NBGBText fontSize={10} marginBottom={5}>
        {content[0]}
      </NBGBText>
      <NBGBText fontSize={10}>{content[1]}</NBGBText>
      <NBGBText fontSize={10}>{content[2]}</NBGBText>
    </ContentView>
  );
};
