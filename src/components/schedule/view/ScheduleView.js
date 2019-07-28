import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../../utils/util";

export const Absolute = styled.View`
  position: absolute
  width: 100%
  height: 100%
`;
export const ScheduleView = props => {
  return (
    <Absolute
      style={{
        flex: 1,
        position: "relative",
        marginLeft: widthPercentageToDP(64)
      }}
    >
      {props.children}
    </Absolute>
  );
};
