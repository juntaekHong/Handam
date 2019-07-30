import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import colors from "../../configs/colors";
import { NBGText } from "./Text";
import FastImage from "react-native-fast-image";
import { UIActivityIndicator } from "react-native-indicators";
import Dialog, { SlideAnimation } from "react-native-popup-dialog";

const CustomModalView = styled.View`
  width: ${({ width }) => widthPercentageToDP(width)}
  height: ${({ height }) => widthPercentageToDP(height)}
  border-radius: ${widthPercentageToDP(14)}
  background-color: ${colors.white}
  align-self: center;
`;

const HeaderView = styled.View`
  width: 100%
  height: ${widthPercentageToDP(61)}
  padding-top: ${widthPercentageToDP(19)}
  padding-bottom: ${widthPercentageToDP(14)}
  padding-right: ${widthPercentageToDP(19)}
  align-items: flex-end
  justify-content: flex-end
`;
const CloseIcon = styled.TouchableOpacity`
  height: ${widthPercentageToDP(28)};
  width: ${widthPercentageToDP(28)};
  justify-content: center;
  align-items: center;
`;
const BodyView = styled.View`
  flex: 1
  justify-content: center
  align-items: center
`;
const FooterView = styled.TouchableOpacity`
  width: 100%
  height: ${widthPercentageToDP(64)}
  justify-content: center
  align-items: center
  border-bottom-left-radius: ${widthPercentageToDP(14)}
  border-bottom-right-radius: ${widthPercentageToDP(14)}
  background-color: ${({ disabled }) =>
    disabled ? colors.disable : colors.active}
`;

const LoadingView = styled.View`
  position: absolute
  width: ${({ loading }) => (loading ? "100%" : 0)}
  height:100%
  background-color: rgba(0,0,0,0.7)
  justify-content: center
  align-items: center
`;

export const CustomModal = ({
  animate = "fade",
  loading = false,
  children,
  visible = false,
  width = 295,
  height = 311,
  close = true,
  renderFooter,
  footerText = "확인",
  footerDisabled = false,
  footerHandler,
  closeHandler
}) => {
  return (
    <Modal style={{ margin: 0 }} animationType={animate} isVisible={visible}>
      <CustomModalView width={width} height={height}>
        <HeaderView>
          {close ? (
            <CloseIcon onPress={closeHandler}>
              <FastImage
                style={{
                  height: widthPercentageToDP(18),
                  width: widthPercentageToDP(18)
                }}
                source={require("HandamProject/assets/image/common/close.png")}
              />
            </CloseIcon>
          ) : null}
        </HeaderView>
        <BodyView>{children}</BodyView>
        {!renderFooter ? (
          <FooterView disabled={footerDisabled} onPress={footerHandler}>
            <NBGText color={colors.white}>{footerText}</NBGText>
          </FooterView>
        ) : (
          renderFooter()
        )}
      </CustomModalView>
      <LoadingView loading={loading}>
        {loading ? <UIActivityIndicator color={"gray"} /> : null}
      </LoadingView>
    </Modal>
  );
};

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
  if (props.who == "you") {
    return (
      <CancelButton
        onPress={() => {
          props.handler();
          props.reportHandler();
        }}
      >
        <BottomText>신고</BottomText>
      </CancelButton>
    );
  } else if (props.who == "me") {
    return (
      <View>
        <TopMenuButton
          onPress={() => {
            props.handler();
            props.updateHandler();
          }}
        >
          <BottomText>수정</BottomText>
        </TopMenuButton>
        <View
          style={{ backgroundColor: "#e0e0e0", height: widthPercentageToDP(1) }}
        />
        <BottomMenuButton
          onPress={() => {
            props.handler();
            props.deleteHandler();
          }}
        >
          <BottomText>삭제</BottomText>
        </BottomMenuButton>
      </View>
    );
  } else {
    return console.log("에러");
  }
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
