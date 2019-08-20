import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP, timeSince } from "../../utils/util";
import { HotView, HotPostView, BottomContainer, ImageContainer } from "./View";
import {
  NumText,
  HotText,
  TitleText,
  ContentText,
  CreatedAtText,
  ImageCountText,
  ReportText,
  WriteText
} from "./Text";
import { ImageImage, LikeImage, ReplyImage, WriteImage } from "./Image";

const HotPost = styled.TouchableOpacity`
  flex-direction: row;
  width: ${widthPercentageToDP(375)};
  height: ${widthPercentageToDP(81)};
  border-bottom-width: ${widthPercentageToDP(1)};
  border-bottom-color: ${"#dbdbdb"};
`;

const Post = styled(HotPost)`
  flex-direction: column;
  padding-horizontal: ${widthPercentageToDP(16)};
  padding-vertical: ${widthPercentageToDP(13)};
`;

const WritePost = styled.TouchableOpacity`
  width: ${widthPercentageToDP(87)};
  height: ${widthPercentageToDP(37)};
  justify-content: center;
  align-items: center;
`;

export const HotPostsListItem = props => {
  return (
    <HotPost onPress={() => props.handler()}>
      <View
        style={{
          width: widthPercentageToDP(35),
          height: widthPercentageToDP(81),
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <NumText>{props.index + 1}</NumText>
      </View>
      <View
        style={{
          width: widthPercentageToDP(340),
          paddingRight: widthPercentageToDP(16)
        }}
      >
        <HotPostView>
          <TitleText ellipsizeMode={"tail"} numberOfLines={1}>
            {props.data.title}
          </TitleText>
          <HotView>
            <HotText>HOT</HotText>
          </HotView>
        </HotPostView>
        <ContentText ellipsizeMode={"tail"} numberOfLines={1}>
          {props.data.content}
        </ContentText>
        <BottomContainer>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#646464",
                fontSize: widthPercentageToDP(11),
                fontFamily: fonts.nanumBarunGothicB,
                marginRight: widthPercentageToDP(4)
              }}
            >
              {props.data.userNickName}
            </Text>
            <CreatedAtText>{timeSince(props.data.createdAt)}</CreatedAtText>
          </View>
          <ImageContainer>
            <ImageImage
              source={require("../../../assets/image/community/images.png")}
            />
            <ImageCountText>{props.data.imageCount}</ImageCountText>
            <LikeImage
              source={require("../../../assets/image/community/likes.png")}
            />
            <ImageCountText>{props.data.goodCount}</ImageCountText>
            <ReplyImage
              source={require("../../../assets/image/community/replys.png")}
            />
            <ImageCountText>{props.data.postsReplyCount}</ImageCountText>
          </ImageContainer>
        </BottomContainer>
      </View>
    </HotPost>
  );
};

export const PostsListItem = props => {
  return (
    <Post onPress={() => props.handler()}>
      <TitleText ellipsizeMode={"tail"} numberOfLines={1}>
        {props.data.title}
      </TitleText>
      <ContentText ellipsizeMode={"tail"} numberOfLines={1}>
        {props.data.content}
      </ContentText>
      <BottomContainer>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: "#646464",
              fontSize: widthPercentageToDP(11),
              fontFamily: fonts.nanumBarunGothicB,
              marginRight: widthPercentageToDP(4)
            }}
          >
            {props.data.userNickName}
          </Text>
          <CreatedAtText>{timeSince(props.data.createdAt)}</CreatedAtText>
        </View>
        <ImageContainer>
          <ImageImage
            source={require("../../../assets/image/community/images.png")}
          />
          <ImageCountText>{props.data.imageCount}</ImageCountText>
          <LikeImage
            source={require("../../../assets/image/community/likes.png")}
          />
          <ImageCountText>{props.data.goodCount}</ImageCountText>
          <ReplyImage
            source={require("../../../assets/image/community/replys.png")}
          />
          <ImageCountText>{props.data.postsReplyCount}</ImageCountText>
        </ImageContainer>
      </BottomContainer>
    </Post>
  );
};

export const ReportedPostsListItem = props => {
  return (
    <Post onPress={() => props.handler()}>
      <TitleText
        style={{
          opacity: 0.2
        }}
        ellipsizeMode={"tail"}
        numberOfLines={1}
      >
        {props.data.title}
      </TitleText>
      <ContentText
        style={{
          opacity: 0.2
        }}
        ellipsizeMode={"tail"}
        numberOfLines={1}
      >
        {props.data.content}
      </ContentText>
      <BottomContainer>
        <ReportText>* 신고된 게시글입니다.</ReportText>
        <ImageContainer>
          <ImageImage
            style={{
              opacity: 0.3
            }}
            source={require("../../../assets/image/community/images.png")}
          />
          <ImageCountText
            style={{
              opacity: 0.2
            }}
          >
            {props.data.imageCount}
          </ImageCountText>
          <LikeImage
            style={{
              opacity: 0.3
            }}
            source={require("../../../assets/image/community/likes.png")}
          />
          <ImageCountText
            style={{
              opacity: 0.2
            }}
          >
            {props.data.goodCount}
          </ImageCountText>
          <ReplyImage
            style={{
              opacity: 0.3
            }}
            source={require("../../../assets/image/community/replys.png")}
          />
          <ImageCountText
            style={{
              opacity: 0.2
            }}
          >
            {props.data.postsReplyCount}
          </ImageCountText>
        </ImageContainer>
      </BottomContainer>
    </Post>
  );
};

export const WritePostBtn = props => {
  return (
    <WritePost
      onPress={() => {
        props.handler();
      }}
    >
      <WriteImage
        source={require("../../../assets/image/community/write.png")}
      />
      <WriteText>글쓰기</WriteText>
    </WritePost>
  );
};
