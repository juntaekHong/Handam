import React from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { widthPercentageToDP as wp } from "../../utils/util";
import { NBGBText, NBGText } from "../common/Text";
import ScrollView, { ScrollViewChild } from "react-native-directed-scrollview";
import colors from "../../configs/colors";
import styled from "styled-components/native";
import fonts from "../../configs/fonts";

const shadow = {
  ...Platform.select({
    ios: {
      shadowColor: "rgb(213, 213, 213)",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.16,
      shadowRadius: 3.84
    },
    android: {
      elevation: 2
    }
  })
};

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
  <TouchableOpacity
    style={{
      position: "absolute",
      width: wp(data.width),
      height: wp(data.height),
      top: wp(data.top),
      left: wp(data.left)
    }}
    onPress={onPress}
  >
    <ImageBackground
      style={{
        width: wp(data.width),
        height: wp(data.height)
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
          : data.index === 16
          ? data.enabled
            ? require("HandamProject/assets/image/map/building-blue-16.png")
            : require("HandamProject/assets/image/map/building-white-16.png")
          : undefined
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

const SearchContainer = styled.KeyboardAvoidingView`
  width: ${wp(328)}
  height: ${wp(46)}
  padding-left: ${wp(12)}
  padding-right: ${wp(12)}
  background-color: ${colors.white}
  border-radius: ${wp(23)}
  flex-direction: row
  align-items: center
`;
const SearchInput = styled.TextInput`
  width: ${wp(268)}
  height: ${wp(46)}
  font-size: ${wp(16)}
  font-family: ${fonts.nanumBarunGothic}
`;
export const SearchBar = props => (
  <KeyboardAvoidingView
    style={{ position: "absolute", top: wp(16), width: "100%", alignItems: "center" }}
    behavior={Platform.OS === "ios" ? "padding" : ""}
    keyboardVerticalOffset={wp(30)}
  >
    <SearchContainer>
      <Image
        style={{ width: wp(21), height: wp(21), marginRight: wp(15) }}
        source={require("HandamProject/assets/image/common/search.png")}
      />
      <SearchInput placeholder={"Search"} onSubmitEditing={props.search} />
    </SearchContainer>
  </KeyboardAvoidingView>
);

export const InfoList = styled.ScrollView.attrs(props => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false
}))`
  position: absolute
  bottom: ${wp(29)}
  width: 100%
  background-color: transparent
`;
const InfoContainer = styled.View`
  width: ${wp(309)}
  height: ${wp(126)}
  margin-right: ${wp(10)}
  padding-left: ${wp(19)}
  padding-right: ${wp(16)}
  padding-top: ${wp(21)}
  padding-bottom: ${wp(14)}
  background-color: ${colors.white}
  border-radius: ${wp(26)}
  justify-content: space-between
  ${shadow}
`;
const HorizontalView = styled.View`
  flex-direction: row;
`;
const DetailButton = styled.TouchableOpacity`
  width: ${wp(57)}
  height: ${wp(25)}
  border-radius: ${wp(13)}
  justify-content: center
  align-items: center
  background-color: ${colors.blue}
`;
export const InfoItem = props => {
  const { item, close, detail } = props;
  return (
    <InfoContainer>
      <HorizontalView style={{ justifyContent: "space-between" }}>
        <HorizontalView style={{ alignItems: "flex-end" }}>
          <NBGBText fontSize={wp(22)} color={colors.blue}>
            {item.title}
          </NBGBText>
          <NBGText fontSize={wp(14)} color={"#8d8d8d"} style={{ marginLeft: wp(7) }}>
            {item.subTitle}
          </NBGText>
        </HorizontalView>
        <TouchableOpacity onPress={close}>
          <Image
            style={{ width: wp(19), height: wp(19) }}
            source={require("HandamProject/assets/image/common/close.png")}
          />
        </TouchableOpacity>
      </HorizontalView>
      <HorizontalView style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
        <View>
          <NBGText fontSize={wp(12)} color={"#8d8d8d"} style={{ marginBottom: wp(4) }}>
            주요시설
          </NBGText>
          <NBGBText fontSize={wp(14)} color={"#6f6f6f"}>
            {item.mainInfo.join(", ")}
          </NBGBText>
        </View>
        {item.detailEnable ? (
          <DetailButton onPress={detail}>
            <NBGBText fontSize={wp(10)} color={colors.white}>
              자세히
            </NBGBText>
          </DetailButton>
        ) : null}
      </HorizontalView>
    </InfoContainer>
  );
};

const DetailContainer = styled.View`
  width: 100%
  padding-top: ${wp(21)}
  padding-bottom: ${wp(14)}
  padding-left: ${wp(22)}
  flex-direction: row
`;
const Floor = styled(DetailButton).attrs(props => ({
  disabled: true
}))`
  width: ${wp(39)}
  height: ${wp(24)}
  border-radius: ${wp(7)}
  margin-right: ${wp(12)}
`;
export const DetailListItem = props => {
  const { info } = props;
  return (
    <DetailContainer>
      <Floor>
        <NBGBText fontSize={wp(14)} color={colors.white}>
          {info.floor}
        </NBGBText>
      </Floor>
      <View>
        {info.info.map((row, index) => (
          <HorizontalView key={`p${index}`} style={{ marginBottom: wp(7) }}>
            {row.map((item, index2) => (
              <NBGText marginRight={wp(10)} key={`c${index}${index2}`} fontSize={wp(14)} color={"#6a6a6a"}>
                {item}
              </NBGText>
            ))}
          </HorizontalView>
        ))}
      </View>
    </DetailContainer>
  );
};
