import React from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import Swiper from "react-native-swiper";
import { widthPercentageToDP } from "../../utils/util";
import { AlertText } from "./Text";

const ImageModalClose = props => {
  if (props.close) {
    return (
      <View
        style={{
          flexDirection: "row",
          width: widthPercentageToDP(375),
          height: widthPercentageToDP(28),
          justifyContent: "flex-end",
          marginTop: widthPercentageToDP(20),
          paddingRight: widthPercentageToDP(18)
        }}
      >
        <TouchableOpacity onPress={() => props.close()}>
          <Image
            style={{
              width: widthPercentageToDP(28),
              height: widthPercentageToDP(28)
            }}
            source={require("../../../assets/image/community/close_white.png")}
          />
        </TouchableOpacity>
      </View>
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
      height={widthPercentageToDP(207)}
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
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#1c1c1c",
        opacity: 0.86,
        width: widthPercentageToDP(375),
        height: widthPercentageToDP(49),
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {/* <Image style={{ width: widthPercentageToDP(19), 
        height: widthPercentageToDP(20),
        marginLeft: widthPercentageToDP(30)}} source={{uri:'https://colinbendell.cloudinary.com/image/upload/c_crop,f_auto,g_auto,h_350,w_400/v1512090971/Wizard-Clap-by-Markus-Magnusson.gif'}}/> */}
      <Text
        style={{
          position: "absolute",
          color: "#ffffff",
          width: widthPercentageToDP(375),
          height: widthPercentageToDP(17),
          textAlign: "center",
          fontSize: widthPercentageToDP(15)
        }}
      >{`${props.index + 1}/${props.images.length}`}</Text>
    </View>
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

export const AlertModal = props => {
  return (
    <Modal
      style={{ margin: 0 }}
      animationType={"fade"}
      isVisible={props.visible}
      // visible={props.visible}
      // transparent={true}
    >
      <SafeAreaView
        // needsOffscreenAlphaCompositing //child에 opacity 적용하는거 방지
        style={{
          flex: 1,
          // backgroundColor: "#000000",
          // opacity: 0.5,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: widthPercentageToDP(295),
            height: widthPercentageToDP(70),
            justifyContent: "center",
            alignItems: "center",
            borderColor: "white",
            borderRadius: widthPercentageToDP(14),
            borderWidth: widthPercentageToDP(1)
          }}
        >
          <AlertText>{props.text}</AlertText>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
