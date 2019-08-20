import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import Dialog, { SlideAnimation } from "react-native-popup-dialog";

const BottomView = styled.View`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
`;

const SpaceView = styled.View`
  height: ${widthPercentageToDP(6)};
`;

const TopMenuButton = styled.TouchableOpacity`
  background-color: white;
  width: ${widthPercentageToDP(359)};
  height: ${widthPercentageToDP(58)};
  justify-content: center;
  align-items: center;
  border-width: ${widthPercentageToDP(1)};
  border-color: white;
  border-top-right-radius: ${widthPercentageToDP(14)};
  border-top-left-radius: ${widthPercentageToDP(14)};
`;

const MiddleMenuButton = styled.TouchableOpacity`
  background-color: white;
  width: ${widthPercentageToDP(359)};
  height: ${widthPercentageToDP(58)};
  justify-content: center;
  align-items: center;
  border-width: ${widthPercentageToDP(1)};
  border-color: white;
  border-top-right-radius: ${widthPercentageToDP(0)};
  border-top-left-radius: ${widthPercentageToDP(0)};
`;

const BottomMenuButton = styled.TouchableOpacity`
  background-color: white;
  width: ${widthPercentageToDP(359)};
  height: ${widthPercentageToDP(58)};
  justify-content: center;
  align-items: center;
  border-width: ${widthPercentageToDP(1)};
  border-color: white;
  border-bottom-right-radius: ${widthPercentageToDP(14)};
  border-bottom-left-radius: ${widthPercentageToDP(14)};
`;

const CancelButton = styled.TouchableOpacity`
  background-color: white;
  width: ${widthPercentageToDP(359)};
  height: ${widthPercentageToDP(58)};
  justify-content: center;
  align-items: center;
  border-width: ${widthPercentageToDP(1)};
  border-color: white;
  border-radius: ${widthPercentageToDP(14)};
`;

const BottomText = styled.Text`
  color: #000000;
  font-size: ${widthPercentageToDP(18)};
  font-family: ${fonts.nanumBarunGothic};
`;

export const Menu = props => {
        return (
            <View>
                <TopMenuButton
                    activeOpacity={0.8}
                    onPress={() => {
                        props.handler();
                        props.takeHandler();
                    }}
                >
                    <BottomText>사진 찍기</BottomText>
                </TopMenuButton>
                <View
                    style={{ backgroundColor: "#e0e0e0", height: widthPercentageToDP(1) }}
                />
                <MiddleMenuButton
                    activeOpacity={0.8}
                    onPress={() => {
                        props.handler();
                        props.uploadHandler();
                    }}
                >
                    <BottomText>앨범에서 사진 선택</BottomText>
                </MiddleMenuButton>
                <View
                    style={{ backgroundColor: "#e0e0e0", height: widthPercentageToDP(1) }}
                />
                <BottomMenuButton
                    activeOpacity={0.8}
                    onPress={() => {
                        props.handler();
                        props.deleteHandler();
                    }}
                >
                    <BottomText>기본 이미지로로 변경</BottomText>
                </BottomMenuButton>
            </View>
        )
};

export const BottomMenuModal = props => {
    return (
        <Dialog
            visible={props.visible}
            dialogAnimation={
                new SlideAnimation({
                    slideFrom: "bottom"
                })
            }
            dialogStyle={{
                backgroundColor: "transparent"
            }}
            overlayOpacity={0.5}
        >
            <BottomView>
                <Menu {...props} />
                <SpaceView />
                <CancelButton onPress={() => props.handler()}>
                    <BottomText>취소</BottomText>
                </CancelButton>
                <SpaceView />
            </BottomView>
        </Dialog>
    );
};
