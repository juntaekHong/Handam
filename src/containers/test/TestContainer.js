import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Image, ImageBackground, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp } from "../../utils/util";
import ScrollView, { ScrollViewChild } from "react-native-directed-scrollview";
import { BaseView, Title } from "../../components/common/View";
import { connect } from "react-redux";
import { NBGBText } from "../../components/common/Text";
import colors from "../../configs/colors";

const Body = styled.View`
  width: 100%
  height: 100%
`;

const backImageSelector = (index, enabled) => {
  switch (index) {
    case 4:
      if (enabled) return "HandamProject/assets/image/map/building-blue-4.png";
      else return "HandamProject/assets/image/map/building-white-4.png";
  }
};
const TestContainer = props => {
  return (
    <BaseView>
      <Title title={"학교 위치"} rightInVisible={true} />
      <ScrollView
        scrollEnabled={true}
        bounces={false}
        bouncesZoom={false}
        maximumZoomScale={2}
        minimumZoomScale={1}
        contentContainerStyle={{ width: wp(900), height: wp(900) }}
        style={{ flex: 1 }}
      >
        <ScrollViewChild scrollDirection={"both"}>
          <ImageBackground
            style={{ width: wp(900), height: wp(900) }}
            source={require("HandamProject/assets/image/map/map.png")}
          >
            {props.mapList.map((item, index) => (
              <TouchableOpacity>
                <ImageBackground
                  style={{
                    position: "absolute",
                    width: wp(item.width),
                    height: wp(item.height),
                    top: wp(item.top),
                    left: wp(item.left)
                  }}
                  source={
                    item.index === 4
                      ? item.enabled
                        ? require("HandamProject/assets/image/map/building-blue-4.png")
                        : require("HandamProject/assets/image/map/building-white-4.png")
                      : null
                  }
                >
                  <Image
                    style={{ position: "absolute", top: wp(item.btnStyle.top), left: wp(item.btnStyle.left) }}
                    source={require("HandamProject/assets/image/map/blue-dot.png")}
                  />
                  <NBGBText
                    fontSize={9}
                    color={item.enabled ? colors.white : colors.active}
                    style={{ position: "absolute", top: wp(item.nameStyle.top), left: wp(item.nameStyle.left) }}
                  >
                    {item.name}
                  </NBGBText>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ImageBackground>
        </ScrollViewChild>
      </ScrollView>
    </BaseView>
  );
};

export default connect(({ map }) => ({
  mapList: map.mapList
}))(TestContainer);
