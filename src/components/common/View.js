import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import { NBGText } from "./Text";
import FastImage from "react-native-fast-image";
import navigations from "../../utils/navigators";
import colors from "../../configs/colors";

export const LinkView = styled.TouchableOpacity`
  height: 100%;
  padding-left: ${props =>
    props.paddingLeft ? widthPercentageToDP(props.paddingLeft) : 0};
  padding-right: ${props =>
    props.paddingRight ? widthPercentageToDP(props.paddingRight) : 0};
  justify-content: center;
  align-items: center;
`;

export const BaseView = styled.View`
  flex: 1;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : "white"};
  padding-top: ${({ paddingTop }) =>
    paddingTop ? widthPercentageToDP(paddingTop) : 0};
  padding-bottom: ${({ paddingBottom }) =>
    paddingBottom ? widthPercentageToDP(paddingBottom) : 0};
`;

export const HCenterView = styled(BaseView)`
  align-items: center;
`;

export const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : colors.white};
`;

const TitleView = styled.View`
  width: 100%;
  height: ${({ width = 55 }) => widthPercentageToDP(width)};
  flex-direction: row;
  align-items: center;
  padding-left: ${widthPercentageToDP(10)};
  padding-right: ${widthPercentageToDP(10)};
  justify-content: space-between;
`;

const TitleText = styled(NBGText)`
  font-size: ${widthPercentageToDP(18)};
  height: ${widthPercentageToDP(19)};
  align-self: center;
  include-font-padding: false;
  text-align-vertical: center;
`;

const TitleIcon = styled.TouchableOpacity`
  height: ${widthPercentageToDP(36)};
  width: ${widthPercentageToDP(36)};
  justify-content: center;
  align-items: center;
`;

export const Title = ({
  width,
  leftRender,
  leftInVisible,
  leftHandler,
  title,
  rightRender,
  rightHandler,
  rightInVisible
}) => {
  return (
    <TitleView width={width}>
      {leftRender ? (
        leftRender()
      ) : !leftInVisible ? (
        <TitleIcon
          onPress={leftHandler ? leftHandler : navigations.navigateBack}
        >
          <FastImage
            style={{
              height: widthPercentageToDP(20),
              width: widthPercentageToDP(12)
            }}
            source={require("HandamProject/assets/image/common/previous.png")}
          />
        </TitleIcon>
      ) : (
        <TitleIcon />
      )}
      <TitleText>{title}</TitleText>
      {rightRender ? (
        rightRender()
      ) : !rightInVisible ? (
        <TitleIcon
          onPress={rightHandler ? rightHandler : navigations.navigateBack}
        >
          <FastImage
            style={{
              height: widthPercentageToDP(18),
              width: widthPercentageToDP(18)
            }}
            source={require("HandamProject/assets/image/common/close.png")}
          />
        </TitleIcon>
      ) : (
        <TitleIcon />
      )}
    </TitleView>
  );
};
