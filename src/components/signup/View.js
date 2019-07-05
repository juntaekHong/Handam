import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import { useCallback } from "react";
import colors from "../../configs/colors";

const StepContainer = styled.View`
  width: 100%;
  height: ${widthPercentageToDP(5)};
  margin-top: ${widthPercentageToDP(102.5)};
  margin-bottom: ${widthPercentageToDP(55)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StepItem = styled.View`
  height: 100%;
  width: ${widthPercentageToDP(46)};
  margin-right: ${props =>
    props.right ? widthPercentageToDP(props.right) : widthPercentageToDP(5)};
  background-color: ${props => (props.value ? colors.active : colors.disable)};
`;

export const Step = ({ number }) => {
  return (
    <StepContainer>
      <StepItem value={number == 1} />
      <StepItem value={number == 2} />
      <StepItem value={number == 3} right={0} />
    </StepContainer>
  );
};
