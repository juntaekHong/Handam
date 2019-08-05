import Modal from "react-native-modal";
import FastImage from "react-native-fast-image";
import {widthPercentageToDP} from "../../utils/util";
import {NBGText} from "../common/Text";
import colors from "../../configs/colors";
import {UIActivityIndicator} from "react-native-indicators";
import React from "react";

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