import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

//기본
export const CText = styled.Text`
  font-size: ${widthPercentageToDP(16)};
  font-family: ${fonts.nanumBarunGothicB};
  height: ${widthPercentageToDP(18)};
  color: ${props => (props.selected == true ? "#259ffa" : "#dbdbdb")};
`;
//카테고리 제목
export const CTText = styled(CText)`
  height: ${widthPercentageToDP(18)};
  color: ${"#101010"};
  margin-vertical: ${widthPercentageToDP(8)};
`;
//카테고리 설명
export const CEText = styled(CText)`
  font-size: ${widthPercentageToDP(12)};
  width: ${widthPercentageToDP(200)};
  height: ${widthPercentageToDP(13)};
  color: ${"#646464"};
`;
