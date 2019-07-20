/**
 * 폰트 적용된 Text Component
 * 기본 폰트 크기 14
 * 기본 색      #000
 */
import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

// 비교과 타이틀 텍스트
export const BTText = styled.Text`
  font-size: ${widthPercentageToDP(16)};
  fontFamily: ${fonts.nanumBarunGothicB};
  color: ${"black"};
`;

// 비교과 소제목 텍스트
export const SUBTText = styled.Text`
  font-size: ${widthPercentageToDP(14)};
  fontFamily: ${fonts.nanumBarunGothicB};
  color: ${"black"};
`;

// 비교과 소제목 값 텍스트
export const VALText = styled.Text`
  marginTop: ${widthPercentageToDP(10)};
  font-size: ${widthPercentageToDP(15)};
  fontFamily: ${fonts.nanumBarunGothicB};
  textAlign: center;
  color: ${"#259ffa"};
`;

