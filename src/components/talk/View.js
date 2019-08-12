import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";

export const LineView = styled.View`
  background-color: #dbdbdb;
  width: ${widthPercentageToDP(375)};
  height: ${widthPercentageToDP(1)};
`;

export const WritePostView = styled.View`
  position: absolute;
  width: ${widthPercentageToDP(87)};
  height: ${widthPercentageToDP(50)};
  padding-bottom: ${widthPercentageToDP(15)};
`;

export const HotView = styled.View`
  background-color: ${"#259ffa"};
  width: ${widthPercentageToDP(32)};
  height: ${widthPercentageToDP(14)};
  justify-content: center;
  align-items: center;
  padding-top: ${widthPercentageToDP(1)};
  border-radius: ${widthPercentageToDP(10)};
  border-width: ${widthPercentageToDP(1)};
  border-color: ${"#259ffa"};
`;

export const HotPostView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${widthPercentageToDP(13)};
`;

export const BottomContainer = styled.View`
  flex-direction: row;
  height: ${widthPercentageToDP(12)};
  justify-content: space-between;
  align-items: center;
  margin-top: ${widthPercentageToDP(10)};
`;

export const ImageContainer = styled.View`
  flex-direction: row;
  height: ${widthPercentageToDP(12)};
  align-items: center;
`;

//Modal

export const ImageModalFooterView = styled.View`
  flex-direction: row;
  background-color: ${"#1c1c1c"};
  opacity: 0.86;
  width: ${widthPercentageToDP(375)};
  height: ${widthPercentageToDP(49)};
  justify-content: center;
  align-items: center;
`;

export const ImageModalCloseView = styled.View`
  flex-direction: row;
  width: ${widthPercentageToDP(375)};
  height: ${widthPercentageToDP(28)};
  justify-content: flex-end;
  margin-top: ${widthPercentageToDP(20)};
  padding-right: ${widthPercentageToDP(18)};
`;
