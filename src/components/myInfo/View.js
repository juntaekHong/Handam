import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import colors from "../../configs/colors";

export const TitleView = styled.View`
  flexDirection: row;
  alignItems: center;
  width: 100%;
  height: ${widthPercentageToDP(60)};
  background-color: white;
  marginLeft: ${widthPercentageToDP(14)};
`;

export const AccountInfoView = styled.View`
  flexDirection: row;
  justifyContent: center;
  width: 100%;
  height: ${widthPercentageToDP(115.5)};
  background-color: white;
`;

export const SubTitleView = styled.View`
  flexDirection: row;
  width: 100%;
  height: ${widthPercentageToDP(51)};
  paddingLeft: ${widthPercentageToDP(29)}
  paddingTop: ${widthPercentageToDP(29)}
  background-color: ${'#f8f8f8'};
`;

export const CertificationView = styled.View`
  flexDirection: row;
  height: ${widthPercentageToDP(157)};
  background-color: white;
`;

export const AccountDetailView = styled.View`
  background-color: white;
  paddingTop: ${widthPercentageToDP(21)};
  paddingLeft: ${widthPercentageToDP(29)};
  paddingRight: ${widthPercentageToDP(18)};
  marginBottom: ${widthPercentageToDP(51)};
`;

// 계정정보 페이지 뷰
export const AccountView = styled.View`
  flexDirection: row;
  justifyContent: space-between;
  background-color: white;
  marginTop: ${widthPercentageToDP(17.5)};
  marginHorizontal: ${widthPercentageToDP(29)};
`;