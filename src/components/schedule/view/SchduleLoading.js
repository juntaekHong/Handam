import React from "react";
import styled from "styled-components";
import { UIActivityIndicator } from "react-native-indicators";

const LoadingView = styled.View`
  width: 100%
  height: 100%
  background-color: rgba(0,0,0,0.7)
  justify-content: center
  align-items: center
`;
export const ScheduleLoading = props => {
  return (
    <LoadingView>
      <UIActivityIndicator color={"gray"} />
    </LoadingView>
  );
};
