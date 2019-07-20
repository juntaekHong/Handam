import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import colors from "../../configs/colors";

export const ProgressView = styled.View`
  width: 100%;
  height: ${widthPercentageToDP(142)};
  background-color: white;
  paddingHorizontal: ${widthPercentageToDP(20)};
  paddingTop: ${widthPercentageToDP(19.7)};
`;

export const DetailView = styled.View`
  flex: 1;
  paddingTop: ${widthPercentageToDP(16)};
  paddingHorizontal: ${widthPercentageToDP(20)};
  backgroundColor: white;
`;