import React from "react";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import { widthPercentageToDP } from "../../utils/util";
import colors from "../../configs/colors";
import { NBGText } from "./Text";
import FastImage from "react-native-fast-image";

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
  background-color: ${colors.active}
`;

export const CustomModal = ({
  children,
  visible = false,
  width = 295,
  height = 311,
  close = true,
  footerText = "확인",
  footerHandler,
  closeHandler
}) => {
  return (
    <Modal isVisible={visible}>
      <CustomModalView animationType={"fade"} width={width} height={height}>
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
        <FooterView onPress={footerHandler}>
          <NBGText color={colors.white}>{footerText}</NBGText>
        </FooterView>
      </CustomModalView>
    </Modal>
  );
};
