import React from "react";
import styled from "styled-components";
import { widthPercentageToDP } from "../../../utils/util";
import colors from "../../../configs/colors";

const PaginationView = styled.View`
  width: 100%
  flex-direction: row
  align-items: center
  justify-content: center
`;
const Dot = styled.View`
  width: ${({ dotWidth = 7 }) => widthPercentageToDP(dotWidth)}
  height: ${({ dotHeight = 7 }) => widthPercentageToDP(dotHeight)}
  border-radius: ${({ dotWidth = 7 }) => widthPercentageToDP(dotWidth / 2)}
  background-color: ${({ activeIndex }) =>
    activeIndex ? colors.active : "#b7b7b7"}
`;
export const TeamPagination = props => {
  return (
    <PaginationView {...props}>
      {props.data.map((item, index) => {
        return (
          <Dot
            key={index}
            activeIndex={index === props.index}
            style={[
              index < props.data.length - 1
                ? { marginRight: widthPercentageToDP(5) }
                : {},
              props.dotStyle
            ]}
          />
        );
      })}
    </PaginationView>
  );
};
