import styled from "styled-components";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

export const SearchTI = styled.TextInput`
  margin-left: ${widthPercentageToDP(6)};
  width: ${widthPercentageToDP(280)};
  font-size: ${widthPercentageToDP(14)};
  font-family: ${fonts.nanumBarunGothic};
  color: #000000;
`;
