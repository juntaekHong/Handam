import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import FastImage from "react-native-fast-image";

export const SignInMainView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const SignInLinkView = styled.View`
  width: 100%;
  height: ${props =>
    props.height ? widthPercentageToDP(props.height) : widthPercentageToDP(16)}
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SignInImage = () => {
  return (
    <FastImage
      style={{
        width: widthPercentageToDP(235),
        height: widthPercentageToDP(164),
        marginBottom: widthPercentageToDP(8)
      }}
      source={require("HandamProject/assets/image/sign/loginimage.png")}
    />
  );
};
