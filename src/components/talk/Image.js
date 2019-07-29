import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

export const DefaultImage = styled.Image`
  width: ${widthPercentageToDP(28)};
  height: ${widthPercentageToDP(28)};
`;

export const ImageImage = styled(DefaultImage)`
  width: ${widthPercentageToDP(11)};
  height: ${widthPercentageToDP(11)};
`;

export const LikeImage = styled(DefaultImage)`
  width: ${widthPercentageToDP(8.5)};
  height: ${widthPercentageToDP(10.2)};
  margin-left: ${widthPercentageToDP(10.5)};
`;

export const ReplyImage = styled(DefaultImage)`
  width: ${widthPercentageToDP(10.2)};
  height: ${widthPercentageToDP(9.9)};
  margin-left: ${widthPercentageToDP(10.5)};
`;

export const WriteImage = styled(DefaultImage)`
  width: ${widthPercentageToDP(87)};
  height: ${widthPercentageToDP(37)};
`;
