import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import { timeSince } from "../../utils/util";
import MapView, { Marker } from "react-native-maps";
import {
  Image21,
  Image28,
  RestaurantImg,
  SmalltalkImg,
  DotImg,
  D_PhoneImg,
  D_ClockImg,
  D_ReviewImg,
  D_BigtalkImg
} from "./Image";
import {
  Name,
  Tag,
  ReplyCount,
  MenuName,
  D_ReviewTitle,
  D_ReviewContent,
  D_ReviewCreatedAt,
  D_PhoneClock,
  D_Name2,
  D_Name3,
  D_Oneline,
  D_Reviewcount,
  D_Goodcount,
  D_MenuName,
  D_MenuPrice,
  D_Represent,
  D_Pagenation
} from "./Text";
import { ReviewDotBtn, ScrapBtn, WriteBtn } from "./Button";

//common

const RowView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LineView = styled.View`
  background-color: ${"#dbdbdb"};
  width: ${widthPercentageToDP(375)};
  height: ${widthPercentageToDP(1)};
`;

//restaurant

const CategoryItemView = styled.TouchableOpacity`
  height: ${widthPercentageToDP(46)};
  justify-content: center;
  align-items: center;
  padding-left: ${widthPercentageToDP(13)};
  padding-right: ${widthPercentageToDP(13)};
`;

export const CategoryItem = props => {
  return (
    <CategoryItemView
      disabled={props.selected == true ? true : false}
      onPress={() => {
        props.handler();
      }}
    >
      <Text
        style={{
          color: props.textcolor,
          fontSize: widthPercentageToDP(14),
          fontFamily: fonts.nanumBarunGothicB
        }}
      >
        {props.data.restaurantCategoryName}
      </Text>
    </CategoryItemView>
  );
};

const RestaurantItemView = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  height: ${widthPercentageToDP(123)};
  padding-horizontal: ${widthPercentageToDP(13)};
  padding-vertical: ${widthPercentageToDP(12)};
  border-bottom-color: ${"#dbdbdb"};
  border-bottom-width: ${widthPercentageToDP(0.5)};
`;

const InfoContainer = styled.View`
  width: ${widthPercentageToDP(220)};
  padding-top: ${widthPercentageToDP(13)};
  padding-left: ${widthPercentageToDP(12)};
`;

export const TagView = styled.View`
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

const BottomContainer = styled.View`
  height: ${widthPercentageToDP(21)}
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const RestaurantItem = props => {
  const [state, setState] = useState({ isGood: props.data.isGood });
  let menuStr = "";

  props.data.restaurantPriorityMenus.map((item, index) => {
    menuStr += item.name + " ";
  });

  return (
    <RestaurantItemView
      onPress={async () => {
        props.loadingHandler(true);
        props.navigation.navigate("RestaurantDetail", {
          restaurantIndex: props.data.restaurantIndex, //식당 인덱스
          likeHandler: setState
        });
      }}
    >
      <RestaurantImg source={{ uri: props.data.restaurantImage }} />
      <InfoContainer>
        <Name>{props.data.name}</Name>
        <MenuName ellipsizeMode={"tail"} numberOfLines={1}>
          {menuStr}
        </MenuName>

        <RowView>
          {props.data.restaurantTag.map((item, index) => {
            return (
              <TagView key={`view${index}`}>
                <Tag key={`tag${index}`}>{item.tag}</Tag>
              </TagView>
            );
          })}
        </RowView>
        <BottomContainer>
          <RowView>
            <SmalltalkImg
              source={require("../../../assets/image/community/smalltalk.png")}
            />
            <DotImg
              source={require("../../../assets/image/community/dot.png")}
            />
            <ReplyCount>{props.data.restaurantReplyCount}</ReplyCount>
          </RowView>

          <TouchableOpacity
            onPress={() => {
              setState({ isGood: state.isGood == 1 ? 0 : 1 });
              const good = new Object();
              good.isGood = state.isGood == 1 ? 0 : 1;
              console.log(state.isGood)
              good.restaurantIndex = props.data.restaurantIndex;
              props.likeHandler(good);
            }}
          >
            <Image21
              source={
                state.isGood == 1
                  ? require("../../../assets/image/community/heart_color.png")
                  : require("../../../assets/image/community/heart.png")
              }
            />
          </TouchableOpacity>
        </BottomContainer>
      </InfoContainer>
    </RestaurantItemView>
  );
};

//restaurantdetail

const RestaurantNameView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${widthPercentageToDP(16)};
  padding-horizontal: ${widthPercentageToDP(22)};
`;

const RestaurnatPhoneClockView = styled.View`
  margin-horizontal: ${widthPercentageToDP(19)};
`;

const Phone_ClockView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${widthPercentageToDP(13)};
`;

export const RestaurantInfo = props => {
  return (
    <View>
      <RestaurantNameView>
        <RowView>
          <D_Name2>{props.restaurantInfo.name}</D_Name2>
          <RowView>
            {props.restaurantInfo.resultRestaurantTag.map((item, index) => {
              return (
                <TagView key={`view${index}`}>
                  <Tag key={`tag${index}`}>{item.tag}</Tag>
                </TagView>
              );
            })}
          </RowView>
        </RowView>
        <ScrapBtn
          handler={() => {
            props.scrapHandler();
          }}
          isGood={props.isGood}
        />
      </RestaurantNameView>

      <RestaurnatPhoneClockView>
        <Phone_ClockView>
          <TouchableOpacity
            onPress={() => {
              props.phoneHandler();
            }}
          >
            <D_PhoneImg
              source={require("../../../assets/image/community/phone.png")}
            />
          </TouchableOpacity>
          <D_PhoneClock>{props.restaurantInfo.tel}</D_PhoneClock>
        </Phone_ClockView>

        <Phone_ClockView>
          <D_ClockImg
            source={require("../../../assets/image/community/clock.png")}
          />
          <D_PhoneClock>{props.restaurantInfo.openingHours}</D_PhoneClock>
        </Phone_ClockView>
      </RestaurnatPhoneClockView>
    </View>
  );
};

const OneLineContainer = styled.View`
  padding-horizontal: ${widthPercentageToDP(22)};
  margin-bottom: ${widthPercentageToDP(10)};
`;

const PaddingHorizontal22View = styled.View`
  padding-horizontal: ${widthPercentageToDP(22)};
`;

export const OneLineReview = props => {
  return (
    <View>
      <OneLineContainer>
        <D_Name2>한줄평</D_Name2>
        <D_Oneline>{props.review}</D_Oneline>
      </OneLineContainer>

      <PaddingHorizontal22View>
        <D_Name2>대표메뉴</D_Name2>
        <RepresentativeMenu restaurantMenuList={props.restaurantMenuList} />
      </PaddingHorizontal22View>
    </View>
  );
};

const LocationTextView = styled.View`
  padding-horizontal: ${widthPercentageToDP(22)};
  margin-bottom: ${widthPercentageToDP(16)};
`;

export const LocationInfo = props => {
  return (
    <View>
      <LocationTextView>
        <D_Name2>위치정보</D_Name2>
      </LocationTextView>

      <MapView
        style={{
          width: widthPercentageToDP(375),
          height: widthPercentageToDP(207)
        }}
        initialRegion={{
          latitude: parseFloat(props.latitude),
          longitude: parseFloat(props.longitude),
          latitudeDelta: 0.0121,
          longitudeDelta: 0.0121
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(props.latitude),
            longitude: parseFloat(props.longitude)
          }}
        />
      </MapView>
    </View>
  );
};

const ReviewContainer = styled.View`
  align-items: center;
  margin-top: ${widthPercentageToDP(27)};
`;

const ReviewContainer2 = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${widthPercentageToDP(16)};
`;

export const LeaveReview = props => {
  return (
    <View>
      <ReviewContainer>
        <D_Name3>리뷰를 남겨보세요!</D_Name3>
      </ReviewContainer>
      <View style={{ alignItems: "flex-end" }}>
        <D_ReviewImg
          source={require("../../../assets/image/community/review.png")}
        />
      </View>
      <ReviewContainer2>
        <RowView>
          <Image21
            source={require("../../../assets/image/community/heart.png")}
          />
          <D_Goodcount>{props.goodCount}</D_Goodcount>
          <D_BigtalkImg
            source={require("../../../assets/image/community/bigtalk.png")}
          />
          <D_Reviewcount>{props.restaurantReplyListCount}</D_Reviewcount>
        </RowView>
        <WriteBtn handler={props.writeHandler} />
      </ReviewContainer2>
    </View>
  );
};

const ReviewView = styled.View`
  padding-left: ${widthPercentageToDP(16)};
  padding-vertical: ${widthPercentageToDP(12)};
  border-top-width: ${widthPercentageToDP(1)};
  border-top-color: ${"#dbdbdb"};
`;

export const RestaurantReviewItem = props => {
  return (
    <ReviewView>
      <D_ReviewTitle>
        {props.data.title != undefined ? props.data.title : "제목"}
      </D_ReviewTitle>
      <D_ReviewContent>{props.data.content}</D_ReviewContent>
      <RowView>
        <Text
          style={{
            color: "#646464",
            fontSize: widthPercentageToDP(11),
            fontFamily: fonts.nanumBarunGothicB,
            marginRight: widthPercentageToDP(5)
          }}
        >
          {props.data.userNickName}
        </Text>
        <D_ReviewCreatedAt>{timeSince(props.data.createdAt)}</D_ReviewCreatedAt>
      </RowView>
      {props.isDots == true ? (
        <ReviewDotBtn
          onPress={() => {
            props.handler();
          }}
        >
          <Image28
            source={require("../../../assets/image/community/dots.png")}
          />
        </ReviewDotBtn>
      ) : null}
    </ReviewView>
  );
};

const MenuContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${widthPercentageToDP(10)};
`;

const MenuLine = styled.View`
  background-color: ${"#dbdbdb"};
  width: ${widthPercentageToDP(101)};
  height: ${widthPercentageToDP(0.5)};
  margin-left: ${widthPercentageToDP(8)};
`;

const RepresentView = styled.View`
  background-color: ${"#ff000d"};
  width: ${widthPercentageToDP(32)};
  height: ${widthPercentageToDP(12)};
  justify-content: center;
  align-items: center;
  border-width: ${widthPercentageToDP(1)};
  border-radius: ${widthPercentageToDP(10)};
  border-color: ${"#ff000d"};
`;

export const RepresentativeMenu = props => {
  return props.restaurantMenuList.map((item, index) => {
    return (
      <MenuContainer key={`con${index}`}>
        <RowView key={`1row${index}`}>
          <D_MenuName key={`menu${index}`}>{item.name}</D_MenuName>
          <MenuLine key={`line${index}`} />
        </RowView>
        <RowView key={`2row${index}`}>
          {item.priority != null ? (
            <RepresentView key={`re${index}`}>
              <D_Represent key={`retext${index}`}>추천</D_Represent>
            </RepresentView>
          ) : null}

          <D_MenuPrice key={`price${index}`}>{item.price}</D_MenuPrice>
        </RowView>
      </MenuContainer>
    );
  });
};

const PageView = styled.View`
  position: absolute;
  margin-left: ${widthPercentageToDP(170)};
  margin-top: ${widthPercentageToDP(177)};
`;

const PageBackground = styled.View`
  background-color: ${"#000000"};
  width: ${widthPercentageToDP(35)};
  height: ${widthPercentageToDP(20)};
  opacity: ${0.5};
`;

export const Pagenation = props => {
  return (
    <PageView>
      <PageBackground />
      <D_Pagenation>{`${props.index}/${props.total}`}</D_Pagenation>
    </PageView>
  );
};
