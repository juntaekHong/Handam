import React, { useRef, useEffect } from "react";
import { ImageBackground, TouchableOpacity, Image } from "react-native";
import { widthPercentageToDP as wp } from "../../utils/util";
import { NBGBText, NBGText } from "../common/Text";
import ScrollView, { ScrollViewChild } from "react-native-directed-scrollview";
import colors from "../../configs/colors";
import styled from "styled-components/native";

export const SchoolMapContainer = props => {
  return (
    <ScrollView
      ref={props.mapRef}
      bounces={false}
      bouncesZoom={false}
      maximumZoomScale={2}
      minimumZoomScale={0.5}
      contentContainerStyle={{ width: wp(900), height: wp(900) }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      <ScrollViewChild scrollDirection={"both"}>
        <ImageBackground
          style={{ width: wp(900), height: wp(900) }}
          source={require("HandamProject/assets/image/map/map.png")}
        >
          {props.children}
        </ImageBackground>
      </ScrollViewChild>
    </ScrollView>
  );
};

export const SchoolMapItem = ({ data, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <ImageBackground
      style={{
        position: "absolute",
        width: wp(data.width),
        height: wp(data.height),
        top: wp(data.top),
        left: wp(data.left)
      }}
      source={
        data.index === 1
          ? data.enabled
            ? require("HandamProject/assets/image/map/building-blue-1.png")
            : require("HandamProject/assets/image/map/building-white-1.png")
          : data.index === 2
          ? data.enabled
            ? require("HandamProject/assets/image/map/building-blue-2.png")
            : require("HandamProject/assets/image/map/building-white-2.png")
          : data.index === 3
          ? data.enabled
            ? require("HandamProject/assets/image/map/building-blue-3.png")
            : require("HandamProject/assets/image/map/building-white-3.png")
          : data.index === 4
          ? data.enabled
            ? require("HandamProject/assets/image/map/building-blue-4.png")
            : require("HandamProject/assets/image/map/building-white-4.png")
          : data.index === 5
          ? data.enabled
            ? require("HandamProject/assets/image/map/building-blue-5.png")
            : require("HandamProject/assets/image/map/building-white-5.png")
          : data.index === 6
          ? data.enabled
            ? require("HandamProject/assets/image/map/building-blue-6.png")
            : require("HandamProject/assets/image/map/building-white-6.png")
          : data.index === 7
          ? data.enabled
            ? require("HandamProject/assets/image/map/building-blue-7.png")
            : require("HandamProject/assets/image/map/building-white-7.png")
          : data.index === 8
          ? data.enabled
            ? require("HandamProject/assets/image/map/building-blue-8.png")
            : require("HandamProject/assets/image/map/building-white-8.png")
          : data.index === 9
          ? data.enabled
            ? require("HandamProject/assets/image/map/building-blue-9.png")
            : require("HandamProject/assets/image/map/building-white-9.png")
          : data.index === 10
          ? data.enabled
            ? require("HandamProject/assets/image/map/building-blue-10.png")
            : require("HandamProject/assets/image/map/building-white-10.png")
          : data.index === 11
          ? data.enabled
            ? require("HandamProject/assets/image/map/building-blue-11.png")
            : require("HandamProject/assets/image/map/building-white-11.png")
          : data.index === 12
          ? data.enabled
            ? require("HandamProject/assets/image/map/building-blue-12.png")
            : require("HandamProject/assets/image/map/building-white-12.png")
          : data.index === 13
          ? data.enabled
            ? require("HandamProject/assets/image/map/building-blue-13.png")
            : require("HandamProject/assets/image/map/building-white-13.png")
          : data.index === 14
          ? data.enabled
            ? require("HandamProject/assets/image/map/building-blue-14.png")
            : require("HandamProject/assets/image/map/building-white-14.png")
          : data.index === 15
          ? data.enabled
            ? require("HandamProject/assets/image/map/building-blue-15.png")
            : require("HandamProject/assets/image/map/building-white-15.png")
          : data.enabled
          ? require("HandamProject/assets/image/map/building-blue-16.png")
          : require("HandamProject/assets/image/map/building-white-16.png")
      }
    >
      <Image
        style={{ position: "absolute", top: wp(data.btnStyle.top), left: wp(data.btnStyle.left) }}
        source={
          data.enabled
            ? require("HandamProject/assets/image/map/white-dot.png")
            : require("HandamProject/assets/image/map/blue-dot.png")
        }
      />
      <NBGBText
        fontSize={9}
        color={data.enabled ? colors.white : colors.active}
        style={{ position: "absolute", top: wp(data.nameStyle.top), left: wp(data.nameStyle.left) }}
      >
        {data.name}
      </NBGBText>
    </ImageBackground>
  </TouchableOpacity>
);
