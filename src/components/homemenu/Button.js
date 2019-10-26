import React from "react";
import { View, Image } from "react-native";
import { HomeNavigateButton } from "../home/Button";
import styled from "styled-components";
import { widthPercentageToDP } from "../../utils/util";
import colors from "../../configs/colors";
import { NBGBText } from "../common/Text";

const OptBtn = styled.TouchableOpacity`
  position: absolute
  width: ${widthPercentageToDP(24)}
  height: ${widthPercentageToDP(24)}
  right: ${widthPercentageToDP(6)}
  top: -${widthPercentageToDP(11)}
  justify-content: center
  align-items: center
`;

const OptImg = styled.Image`
  width: ${widthPercentageToDP(24)}
  height: ${widthPercentageToDP(24)}
`;
export const MenuNavBtn = ({ title, image, type = "minus", onPress }) => {
  return (
    <View style={{ height: widthPercentageToDP(90), justifyContent: "flex-end" }}>
      <View style={{ width: widthPercentageToDP(78), height: widthPercentageToDP(78) }}>
        <HomeNavigateButton title={title} image={image} disabled={true} />
        {type === "minus" ? (
          <OptBtn onPress={onPress}>
            <OptImg source={require("HandamProject/assets/image/home/minus.png")} />
          </OptBtn>
        ) : type === "plus" ? (
          <OptBtn onPress={onPress}>
            <OptImg source={require("HandamProject/assets/image/home/plus.png")} />
          </OptBtn>
        ) : null}
      </View>
    </View>
  );
};

const BottomButton = styled.TouchableOpacity`
  width: ${widthPercentageToDP(149)}
  height: ${widthPercentageToDP(42)}
  border-radius: ${widthPercentageToDP(8)}
  justify-content: center
  align-items: center
`;

export const CancelBtn = props => (
  <BottomButton {...props} style={{ backgroundColor: "#e3e3e3", marginRight: widthPercentageToDP(11) }}>
    <NBGBText fontSize={16} color={"#fff"}>
      취소
    </NBGBText>
  </BottomButton>
);

export const SaveBtn = props => (
  <BottomButton {...props} style={{ backgroundColor: colors.active }}>
    <NBGBText fontSize={16} color={"#fff"}>
      저장하기
    </NBGBText>
  </BottomButton>
);
