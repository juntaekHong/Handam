import React from "react";
import { StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { widthPercentageToDP } from "../../utils/util";
import Modal from "react-native-modal";
import ImageViewer from "react-native-image-zoom-viewer";
import { Image28 } from "./Image";
import { ModalIndicator } from "./Text";

const IndicatorView = styled.View`
  position: absolute;
  flex-direction: row;
  width: ${widthPercentageToDP(375)};
  height: ${widthPercentageToDP(28)};
  justify-content: flex-end;
  align-items: center;
  margin-top: ${widthPercentageToDP(20)};
`;

export const ZoomImageModal = props => {
  return (
    <Modal
      style={{ margin: 0 }}
      animationType={"fade"}
      visible={props.visible}
      transparent={false}
      onRequestClose={() => props.close()}
    >
      <StatusBar backgroundColor="#6b6b6b" barStyle="light-content" />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#3b3b3b"
        }}
      >
        <ImageViewer
          imageUrls={props.image}
          index={props.index}
          backgroundColor={"#3b3b3b"}
          enableSwipeDown={false}
          renderIndicator={currentIndex => {
            return (
              <IndicatorView>
                <ModalIndicator>
                  {`${currentIndex}/${props.image.length}`}
                </ModalIndicator>
                <TouchableOpacity
                  style={{ marginRight: widthPercentageToDP(24) }}
                  onPress={() => {
                    props.close();
                  }}
                >
                  <Image28
                    source={require("../../../assets/image/community/close_white.png")}
                  />
                </TouchableOpacity>
              </IndicatorView>
            );
          }}
        />
      </SafeAreaView>
    </Modal>
  );
};
