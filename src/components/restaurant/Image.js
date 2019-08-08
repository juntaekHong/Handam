import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";

export const DefaultImage = styled.Image`
  width: ${widthPercentageToDP(21)};
  height: ${widthPercentageToDP(21)};
`;

export const RestaurantImage = styled.Image`
  width: ${widthPercentageToDP(129)};
  height: ${widthPercentageToDP(99)};
  border-color: ${"#ffffff"};
  border-width: ${widthPercentageToDP(1)};
  border-radius: ${widthPercentageToDP(5)};
`;

export const SmalltalkImage = styled.Image`
  width: ${widthPercentageToDP(9.1)};
  height: ${widthPercentageToDP(8.8)};
`;

export const DotImage = styled.Image`
  width: ${widthPercentageToDP(2)};
  height: ${widthPercentageToDP(2)};
  margin-horizontal: ${widthPercentageToDP(7)};
`;
