import React from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import Swiper from "react-native-swiper";
import { widthPercentageToDP } from "../../utils/util";
import { ImageModalFooterView, ImageModalCloseView } from "./View";
import { ImageModalText } from "./Text";
import { Image28 } from "../../components/community/Image";

const ImageModalClose = props => {
  if (props.close) {
    return (
      <ImageModalCloseView>
        <TouchableOpacity onPress={() => props.close()}>
          <Image28
            source={require("../../../assets/image/community/close_white.png")}
          />
        </TouchableOpacity>
      </ImageModalCloseView>
    );
  } else {
    return null;
  }
};

const ImageModalBody = props => {
  if (props.images === undefined) return null;
  if (props.images.length == 0) return null;
  return (
    <Swiper
      horizontal={true}
      removeClippedSubviews={false}
      width={widthPercentageToDP(375)}
      // height={widthPercentageToDP(207)}
      loop={false}
      autoplay={false}
      containerStyle={{
        position: "absolute",
        width: widthPercentageToDP(375),
        height: widthPercentageToDP(667)
      }}
      index={props.index}
      onIndexChanged={index => props.indexhandle(index)}
      showsPagination={false}
      scrollEnabled={true}
    >
      {props.images.map((item, index) => {
        return (
          <TouchableWithoutFeedback key={index}>
            <Image
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              source={{ uri: item }}
            />
          </TouchableWithoutFeedback>
        );
      })}
    </Swiper>
  );
};

const ImageModalFooter = props => {
  return (
    <ImageModalFooterView>
      <ImageModalText>{`${props.index + 1}/${
        props.images.length
      }`}</ImageModalText>
    </ImageModalFooterView>
  );
};

export const ImageModal = props => {
  return (
    <Modal
      style={{ margin: 0 }}
      animationType={"fade"}
      visible={props.visible}
      transparent={true}
      onRequestClose={() => {
        if (props.close) props.close();
      }}
    >
      <StatusBar backgroundColor="#3b3b3b" barStyle="light-content" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#3b3b3b",
          justifyContent: "space-between"
        }}
      >
        <View>
          <ImageModalBody {...props} />
          <ImageModalClose {...props} />
        </View>
        <ImageModalFooter {...props} />
      </SafeAreaView>
    </Modal>
  );
};
