import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import colors from "../../configs/colors";

// 비교과, 성적표 프로그레스 영역
export const ProgressView = styled.View`
  width: 100%;
  height: ${widthPercentageToDP(142)};
  background-color: white;
  paddingHorizontal: ${widthPercentageToDP(20)};
  paddingTop: ${widthPercentageToDP(19.7)};
`;

// 비교과, 성적표 주요 목록 값 영역
export const DetailView = styled.View`
  flex: 1;
  paddingTop: ${widthPercentageToDP(16)};
  paddingHorizontal: ${widthPercentageToDP(20)};
  backgroundColor: white;
`;

// 학기별 성적표 영역
export const GradesDetailView = styled.View`
  flexDirection: row;
  marginTop: ${widthPercentageToDP(22)};
`;