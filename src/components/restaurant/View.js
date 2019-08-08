import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import api from "../../utils/api";
import { getData } from "../../utils/util";

import {
  DefaultImage,
  RestaurantImage,
  SmalltalkImage,
  DotImage
} from "./Image";
import { Name, Tag, ReplyCount, MenuName } from "./Text";

const RestaurantItemView = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  height: ${widthPercentageToDP(123)};
  padding-horizontal: ${widthPercentageToDP(13)};
  padding-vertical: ${widthPercentageToDP(12)};
  border-bottom-color: ${"#dbdbdb"};
  border-bottom-width: ${widthPercentageToDP(0.5)};
`;

const RowView = styled.View`
  flex-direction: row;
`;

const TagView = styled.View`
  background-color: ${"#f5f5f5"};
  justify-content: center;
  align-items: center;
  padding-horizontal: ${widthPercentageToDP(6)};
  padding-vertical: ${widthPercentageToDP(3)};
  margin-right: ${widthPercentageToDP(6)};
  border-color: ${"#dbdbdb"};
  border-width: ${widthPercentageToDP(0.5)};
  border-radius: ${widthPercentageToDP(10)};
`;

export const RestaurantItem = props => {
  const [state, setState] = useState({ isGood: props.data.isGood });
  return (
    <RestaurantItemView
      onPress={async () => {
        props.handler(props.data.restaurantIndex, setState);
      }}
    >
      <RestaurantImage source={{ uri: props.data.restaurantImage }} />
      <View
        style={{
          width: widthPercentageToDP(220),
          paddingTop: widthPercentageToDP(13),
          paddingLeft: widthPercentageToDP(12)
        }}
      >
        <Name>{props.data.name}</Name>

        <RowView>
          {props.data.restaurantPriorityMenus.map((item2, index2) => {
            return <MenuName>{item2.name}</MenuName>;
          })}
        </RowView>

        <RowView>
          {props.data.restaurantTag.map((item2, index2) => {
            return (
              <TagView>
                <Tag>{item2.tag}</Tag>
              </TagView>
            );
          })}
        </RowView>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SmalltalkImage
              source={require("../../../assets/image/community/smalltalk.png")}
            />
            <DotImage
              source={require("../../../assets/image/community/dot.png")}
            />
            <ReplyCount>{"댓글수"}</ReplyCount>
          </View>

          <TouchableOpacity
            onPress={() => {
              props.putlike(props.data.restaurantIndex, state.isGood);
              setState({ isGood: !state.isGood });
            }}
          >
            <DefaultImage
              source={
                state.isGood == 1
                  ? require("../../../assets/image/community/heart_color.png")
                  : require("../../../assets/image/community/heart.png")
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </RestaurantItemView>
  );
};
