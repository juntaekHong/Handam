import React from "react";
import styled from "styled-components";
import { widthPercentageToDP } from "../../../utils/util";
import colors from "../../../configs/colors";
import { NBGBText } from "../../common/Text";

const BodyView = styled.View`
  width: 100%
  height: ${widthPercentageToDP(60)}
  border-bottom-width: ${widthPercentageToDP(1)}
  border-color: ${colors.border}
  flex-direction: row
  align-items: center
`;

const ContentView = styled.View`
  width: ${widthPercentageToDP(62)}
  height: 100%
  justify-content: center
  align-items: center
`;

export const TableBody = ({ index, content }) => {
  return (
    <BodyView>
      <ContentView>
        <NBGBText fontSize={12}>{index}</NBGBText>
        <NBGBText fontSize={12} marginTop={5}>
          {content}
        </NBGBText>
      </ContentView>
    </BodyView>
  );
};
