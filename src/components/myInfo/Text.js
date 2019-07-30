/**
 * 폰트 적용된 Text Component
 * 기본 폰트 크기 14
 * 기본 색      #000
 */
import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

// 기본 텍스트
export const StandText = styled.Text`
  font-size: ${widthPercentageToDP(14)};
  fontFamily: ${fonts.nanumBarunGothic};
  color: ${"black"};
`;

export const AccountDetailText = styled.Text`
  font-size: ${widthPercentageToDP(16)};
  fontFamily: ${fonts.nanumBarunGothic};
  color: ${"black"};
`;

