import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

//기본
export const DefaultText = styled.Text`
  font-size: ${widthPercentageToDP(16)};
  font-family: ${fonts.nanumBarunGothicB};
  color: ${"#000000"};
`;
//
export const PostTitleText = styled(DefaultText)`
  height: ${widthPercentageToDP(18)};
  color: ${"#101010"};
  margin-vertical: ${widthPercentageToDP(8)};
`;
