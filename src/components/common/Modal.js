import React from "react";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import { widthPercentageToDP } from "../../utils/util";
import colors from "../../configs/colors";
import { NBGText } from "./Text";
import FastImage from "react-native-fast-image";
import { UIActivityIndicator } from "react-native-indicators";

const CustomModalView = styled.View`
  width: ${({ width }) => widthPercentageToDP(width)}
  height: ${({ height }) => widthPercentageToDP(height)}
  border-radius: ${widthPercentageToDP(14)}
  background-color: ${colors.white}
  align-self: center;
`;

const HeaderView = styled.View`
  width: 100%
  padding-top: ${widthPercentageToDP(15)}
  padding-bottom: ${widthPercentageToDP(10)}
  padding-right: ${widthPercentageToDP(15)}
  align-items: flex-end
  justify-content: flex-end
`;
const CloseIcon = styled.TouchableOpacity`
  height: ${widthPercentageToDP(36)};
  width: ${widthPercentageToDP(36)};
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
