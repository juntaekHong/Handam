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
  fontFamily: ${fonts.nanumBarunGothicB};
  color: ${"black"};
`;

// 비교과, 성적표 소제목 텍스트
export const SUBTText = styled.Text`
  font-size: ${widthPercentageToDP(14)};
  fontFamily: ${fonts.nanumBarunGothicB};
  color: ${"black"};
`;

// 비교과, 성적표 소제목 값 텍스트
export const VALText = styled.Text`
  marginTop: ${widthPercentageToDP(10)};
  font-size: ${widthPercentageToDP(15)};
  fontFamily: ${fonts.nanumBarunGothicB};
  textAlign: center;
  color: ${"#259ffa"};
`;

// 학기별 성적표 기본 텍스트
export const BYSEMESText = styled.Text`
  font-size: ${widthPercentageToDP(14)};
  fontFamily: ${fonts.nanumBarunGothicB};
  color: ${"black"};
  textAlign: center;
`;

// 학기별 성적표 값 텍스트
export const SEMESVALText = styled.Text`
  marginTop: ${widthPercentageToDP(8)};
  font-size: ${widthPercentageToDP(14)};
  fontFamily: ${fonts.nanumBarunGothic};
  color: ${"black"};
  textAlign: center;
`;

// 비교과 리스트 목록 기본 텍스트
export const PointListText = styled.Text`
  font-size: ${widthPercentageToDP(10)};
  fontFamily: ${fonts.nanumBarunGothicB};
  color: ${"black"};
  marginHorizontal: ${widthPercentageToDP(22)};
`;

