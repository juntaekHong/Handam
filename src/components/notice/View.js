import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";

export const NoticeFooterView = styled.View`
  height: ${widthPercentageToDP(50)}
  flex-direction: row
  justify-content: space-between
  background-color: rgb(241,243,244)
`;
