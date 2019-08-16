import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import { Image21, Image28 } from "./Image";

//common

const Btn = styled.TouchableOpacity``;

//restaurantdetail
export const ReviewDotBtn = styled.TouchableOpacity`
  position: absolute;
  margin-top: ${widthPercentageToDP(12)};
  margin-left: ${widthPercentageToDP(332)};
`;

export const ScrapBtn = props => {
  return (
    <Btn
      onPress={() => {
        props.handler();
      }}
    >
      <Image21
        source={
          props.isGood == 1
            ? require("../../../assets/image/community/heart_color.png")
            : require("../../../assets/image/community/heart.png")
        }
      />
    </Btn>
  );
};

export const WriteBtn = props => {
  return (
    <Btn
      onPress={() => {
        props.handler();
      }}
    >
      <Image28
        source={require("../../../assets/image/community/writeicon.png")}
      />
    </Btn>
  );
};
