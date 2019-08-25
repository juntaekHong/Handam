import React from "react";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";

const Body = styled.View`
  flex: 1
  justify-content: center
  align-items: center
  background-color: blue
`;
const TestContainer = props => {
  return (
    <Body>
      <LottieView
        style={{ width: 40, height: 40 }}
        source={require("HandamProject/assets/animation/loading.json")}
        autoPlay
        loop
      />
    </Body>
  );
};

export default TestContainer;
