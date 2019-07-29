import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

export const PastVoteItem = styled.TouchableOpacity`
  background-color: ${"#ffffff"};
  width: ${widthPercentageToDP(343)};
  height: ${widthPercentageToDP(73)};
  justify-content: center;
  align-items: center;
  margin-bottom: ${widthPercentageToDP(12)};
  border-color: ${"#ffffff"};
  border-width: ${widthPercentageToDP(1)};
  border-radius: ${widthPercentageToDP(6)};
`;
