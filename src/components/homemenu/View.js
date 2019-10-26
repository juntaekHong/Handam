import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";

export const MenuCenterView = styled.View`
  flex: 1
  width: 100%
  background-color: #f8f8f8
  padding-bottom: ${widthPercentageToDP(21)}
  padding-horizontal: ${widthPercentageToDP(37)}
`;
export const BottomView = styled.View`
  width: 100%
  height: ${widthPercentageToDP(192)}
  background-color: white
`;

export const ButtonView = styled.View`
  flex-direction: row
  justify-content: center
`;
