import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";

//common

export const Image21 = styled.Image`
  width: ${widthPercentageToDP(21)};
  height: ${widthPercentageToDP(21)};
`;

export const Image28 = styled.Image`
  width: ${widthPercentageToDP(28)};
  height: ${widthPercentageToDP(28)};
`;

//restaurant

export const RestaurantImg = styled.Image`
  width: ${widthPercentageToDP(129)};
  height: ${widthPercentageToDP(99)};
  border-color: ${"#ffffff"};
  border-width: ${widthPercentageToDP(1)};
  border-radius: ${widthPercentageToDP(5)};
`;

export const SmalltalkImg = styled.Image`
  width: ${widthPercentageToDP(9.1)};
  height: ${widthPercentageToDP(8.8)};
`;

export const DotImg = styled.Image`
  width: ${widthPercentageToDP(2)};
  height: ${widthPercentageToDP(2)};
  margin-horizontal: ${widthPercentageToDP(7)};
`;

//restaurantDetail

export const D_PhoneImg = styled.Image`
  width: ${widthPercentageToDP(18)};
  height: ${widthPercentageToDP(18)};
  margin-right: ${widthPercentageToDP(16)};
`;

export const D_ClockImg = styled.Image`
  width: ${widthPercentageToDP(20)};
  height: ${widthPercentageToDP(20)};
  margin-right: ${widthPercentageToDP(14)};
`;

export const D_BigtalkImg = styled.Image`
  width: ${widthPercentageToDP(17)};
  height: ${widthPercentageToDP(17)};
  margin-right: ${widthPercentageToDP(8)};
`;

export const D_ReviewImg = styled.Image`
  width: ${widthPercentageToDP(33.6)};
  height: ${widthPercentageToDP(16.8)};
  margin-right: ${widthPercentageToDP(12)};
`;
