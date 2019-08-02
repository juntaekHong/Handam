import React, { Fragment } from "react";
import styled from "styled-components/native";
import { UIActivityIndicator } from "react-native-indicators";
import { View } from "react-native";
import { widthPercentageToDP } from "../../utils/util";

const LoadingView = styled.View`
  height: ${widthPercentageToDP(40)} 
  margin-bottom: ${widthPercentageToDP(10)}
`;
export const LoadingUpdate = props => {
  return (
    <Fragment>
      <LoadingView>
        <UIActivityIndicator color={"grey"} />
      </LoadingView>
      {props.children}
    </Fragment>
  );
};
