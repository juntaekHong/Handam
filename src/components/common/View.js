import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import { NBGText } from "./Text";
import FastImage from "react-native-fast-image";
import navigations from "../../utils/navigators";

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
`;

export const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TitleView = styled.View`
  width: 100%;
  height: ${widthPercentageToDP(55)};
  flex-direction: row;
  align-items: center;
  padding-left: ${widthPercentageToDP(10)};
  padding-right: ${widthPercentageToDP(10)};
  justify-content: space-between;
`;

const TitleText = styled(NBGText)`
  font-size: ${widthPercentageToDP(18)};
  align-self: center;
`;

const TitleIcon = styled.TouchableOpacity`
  height: ${widthPercentageToDP(36)};
  width: ${widthPercentageToDP(36)};
  justify-content: center;
  align-items: center;
`;

export const Title = props => {
  return (
    <TitleView>
      {props.leftRender ? (
        props.leftRender()
      ) : (
        <TitleIcon
          onPress={
            props.leftHandler ? props.leftHandler : navigations.navigateBack
          }
        >
          <FastImage
            style={{
              height: widthPercentageToDP(20),
              width: widthPercentageToDP(12)
            }}
            source={require("HandamProject/assets/image/common/previous.png")}
          />
        </TitleIcon>
      )}
      <TitleText>{props.title}</TitleText>
      {props.rightRender ? (
        props.rightRender()
      ) : (
        <TitleIcon onPress={props.rightHandler}>
          <FastImage
            style={{
              height: widthPercentageToDP(18),
              width: widthPercentageToDP(18)
            }}
            source={require("HandamProject/assets/image/common/close.png")}
          />
        </TitleIcon>
      )}
    </TitleView>
  );
};
