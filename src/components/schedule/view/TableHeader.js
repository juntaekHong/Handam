import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../../configs/colors";
import { widthPercentageToDP } from "../../../utils/util";
import { NBGBText } from "../../common/Text";

const HeaderView = styled.View`
  width: 100%
  height: ${widthPercentageToDP(50)}
  flex-direction: row
  align-items: center
  border-bottom-width: 1
  border-color: ${colors.border}
`;

const Header = styled.View`
  width: ${({ width = 60 }) => widthPercentageToDP(width)}
  margin-right: ${widthPercentageToDP(2)}
  height: 100%
  justify-content: center
  align-items: center
`;

export const TableHeader = props => {
  const [header, setHeader] = useState(["", "월", "화", "수", "목", "금"]);
  return (
    <HeaderView>
      {header.map((item, index) => {
        return (
          <Header key={item} width={index == 0 ? 62 : 60}>
            <NBGBText fontSize={15}>{item}</NBGBText>
          </Header>
        );
      })}
    </HeaderView>
  );
};
