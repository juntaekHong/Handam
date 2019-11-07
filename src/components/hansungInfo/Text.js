/**
 * 폰트 적용된 Text Component
 * 기본 폰트 크기 14
 * 기본 색      #000
 */
import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

// 비교과, 성적표 타이틀 텍스트
export const BTText = styled.Text`
  font-size: ${widthPercentageToDP(16)};
  font-family: ${fonts.nanumBarunGothicB};
  color: ${"black"};
`;

// 학기별 성적표 기본 텍스트
export const BYSEMESText = styled.Text`
  font-size: ${widthPercentageToDP(14)};
  font-family: ${fonts.nanumBarunGothicB};
  color: ${"black"};
  text-align: center;
`;

// 학기별 성적표 값 텍스트
export const SEMESVALText = styled.Text`
  margin-top: ${widthPercentageToDP(8)};
  font-size: ${widthPercentageToDP(14)};
  font-family: ${fonts.nanumBarunGothic};
  color: ${"black"};
  text-align: center;
`;

// 비교과 리스트 목록 기본 텍스트
export const PointListText = styled.Text`
  font-size: ${widthPercentageToDP(10)};
  font-family: ${fonts.nanumBarunGothicB};
  color: ${"black"};
  margin-horizontal: ${widthPercentageToDP(22)};
`;
