import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";

export const DefaultImage = styled.Image`
  width: ${widthPercentageToDP(28)};
  height: ${widthPercentageToDP(28)};
`;

export const SelectedEmojiImage = styled.Image`
  width: ${widthPercentageToDP(49)};
  height: ${widthPercentageToDP(76)};
  margin-top: ${widthPercentageToDP(20)};
  margin-right: ${widthPercentageToDP(13)};
`;

export const C_LikeImage = styled(DefaultImage)`
  width: ${widthPercentageToDP(8.5)};
  height: ${widthPercentageToDP(10.2)};
`;