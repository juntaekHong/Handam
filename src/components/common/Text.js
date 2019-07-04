/**
 * 폰트 적용된 Text Component
 * 기본 폰트 크기 14
 * 기본 색      #000
 */
import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util"

export const NRText = styled.Text`
  font-size: ${props => (props.fontSize ? props.fontSize : 14)};
  font-family: ${fonts.nanumSquareR};
  color: ${props => (props.color ? props.color : "#000")};
`;

export const NBText = styled(NRText)`
  font-family: ${fonts.nanumSquareB};
`;

export const NEBText = styled(NRText)`
  font-family: ${fonts.nanumSquareEB};
`;

export const NLText = styled(NRText)`
  font-family: ${fonts.nanumSquareL};
`;

//커뮤니티
//기본
export const CText = styled.Text`
  font-size: ${widthPercentageToDP(16)};
  font-family: ${fonts.nanumSquareB};
  textAlign: center;
  height: ${widthPercentageToDP(18)};
  color: ${props => (props.selected==true? "#259ffa":"#dbdbdb")};
`;
//카테고리 제목
export const CTText = styled(CText)`
  textAlign: left;
  height: ${widthPercentageToDP(18)};
  color: ${"#101010"};
  margin-vertical: ${widthPercentageToDP(8)};
`;
//카테고리 설명
export const CEText = styled(CText)`
  font-size: ${widthPercentageToDP(12)};
  textAlign: left;
  width: ${widthPercentageToDP(200)};
  height: ${widthPercentageToDP(13)};
  color: ${"#646464"};
`;