import React from "react";
import { View, TouchableOpacity, Image, Platform } from "react-native";
import Hyperlink from "react-native-hyperlink";
import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP, timeSince } from "../../utils/util";
import {
  WriterName,
  AnonymousWriterName,
  ReportModalText,
  C_CreatedAtText,
  C_ContentText,
  C_ReContentText,
  C_ReplyText,
  C_ReportText,
  C_LikeText
} from "./Text";
import { Image28, SelectedEmojiImage, C_LikeImage } from "./Image";
import { BackBtn, C_ReplyButton, C_LikeButton } from "./Button";
import ImageCapInset from "rn-imagecapinsets";
import { LikeBTN } from "../talk/Button";

const emojiList = [
  { index: 1, emoji: require("../../../assets/image/community/emoji/1.png") },
  { index: 2, emoji: require("../../../assets/image/community/emoji/2.png") },
  { index: 3, emoji: require("../../../assets/image/community/emoji/3.png") },
  { index: 4, emoji: require("../../../assets/image/community/emoji/4.png") },
  { index: 5, emoji: require("../../../assets/image/community/emoji/5.png") },
  { index: 6, emoji: require("../../../assets/image/community/emoji/6.png") },
  { index: 7, emoji: require("../../../assets/image/community/emoji/7.png") },
  { index: 8, emoji: require("../../../assets/image/community/emoji/8.png") }
];

const Title = styled.View`
  background-color: ${"#ffffff"};
  flex-direction: row;
  width: ${widthPercentageToDP(375)};
  height: ${widthPercentageToDP(60)};
  justify-content: space-between;
  align-items: center;
  padding-top: ${widthPercentageToDP(11)};
  padding-bottom: ${widthPercentageToDP(14)};
`;

const TitleText = styled.Text`
  position: absolute;
  color: ${"#000000"};
  font-size: ${widthPercentageToDP(18)};
  font-family: ${fonts.nanumBarunGothic};
  text-align: center;
  width: ${widthPercentageToDP(375)};
`;

export const TitleView = props => {
  return (
    <Title>
      <TitleText>{props.titleName}</TitleText>
      {props.leftChild ? <BackBtn handler={props.handler} /> : <View />}
      {props.rightChild ? props.rightChild : null}
    </Title>
  );
};

export const AlertModalView = styled.View`
  background-color: ${"#ffffff"};
  width: ${widthPercentageToDP(295)};
  height: ${widthPercentageToDP(70)};
  justify-content: center;
  align-items: center;
  border-color: ${"#ffffff"};
  border-radius: ${widthPercentageToDP(14)};
  border-width: ${widthPercentageToDP(1)};
`;

export const WriteContainer = styled.View`
  background-color: ${"#ffffff"};
  flex-direction: row;
  width: ${widthPercentageToDP(375)};
  max-height: ${widthPercentageToDP(101)};
  min-height: ${widthPercentageToDP(56)};
  align-items: center;
  padding-vertical: ${widthPercentageToDP(8)};
  border-color: ${"#dbdbdb"};
  border-top-width: ${widthPercentageToDP(0.5)};
  border-bottom-width: ${widthPercentageToDP(0.5)};
`;

export const TextInputContainer = styled.View`
  flex-direction: row;
  width: ${widthPercentageToDP(324)};
  max-height: ${widthPercentageToDP(85)};
  min-height: ${widthPercentageToDP(40)};
  align-items: center;
  padding-vertical: ${widthPercentageToDP(4.5)};
  margin-left: ${widthPercentageToDP(12)};
  border-radius: ${widthPercentageToDP(15)};
  border-width: ${widthPercentageToDP(1)};
  border-color: ${"#dbdbdb"};
`;

const SelectedEmojiContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  background-color: ${"#575757"};
  height: ${widthPercentageToDP(107.3)};
`;
// opacity: ${0.5};

export const SelectedEmojiView = props => {
  return (
    <SelectedEmojiContainer>
      <SelectedEmojiImage source={emojiList[props.selectedEmoji - 1].emoji} />
      <TouchableOpacity
        style={{
          marginTop: widthPercentageToDP(5),
          marginRight: widthPercentageToDP(8)
        }}
        onPress={() => props.handler()}
      >
        <Image28
          source={require("../../../assets/image/community/close_white.png")}
        />
      </TouchableOpacity>
    </SelectedEmojiContainer>
  );
};

const EmojiRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: ${widthPercentageToDP(20)};
`;

const EmojiItem = props => {
  return (
    <TouchableOpacity
      style={{
        marginTop: widthPercentageToDP(5),
        marginRight: widthPercentageToDP(8)
      }}
      onPress={() => props.handler(emojiList[props.emoji].index)}
    >
      <Image
        style={{
          width: widthPercentageToDP(30),
          height: widthPercentageToDP(45)
        }}
        source={emojiList[props.emoji].emoji}
      />
    </TouchableOpacity>
  );
};

export const EmojiListView = props => {
  return (
    <View
      style={{
        backgroundColor: "white",
        height: widthPercentageToDP(214)
      }}
    >
      <EmojiRow>
        <EmojiItem {...props} emoji={0} />
        <EmojiItem {...props} emoji={1} />
        <EmojiItem {...props} emoji={2} />
        <EmojiItem {...props} emoji={3} />
      </EmojiRow>
      <EmojiRow>
        <EmojiItem {...props} emoji={4} />
        <EmojiItem {...props} emoji={5} />
        <EmojiItem {...props} emoji={6} />
        <EmojiItem {...props} emoji={7} />
      </EmojiRow>
    </View>
  );
};

const ReplyContainer = styled.View`
  flex-direction: row;
  height: ${widthPercentageToDP(12)};
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${widthPercentageToDP(12)};
`;

const ButtonView = styled.View`
  flex-direction: row;
  height: ${widthPercentageToDP(22)};
  justify-content: flex-end;
`;

renderWriterName = props => {
  if (props.writerName && props.data.userNickName == props.writerName) {
    return <WriterName>글쓴이</WriterName>;
  } else if (props.data.displayName == undefined) {
    return <AnonymousWriterName>{props.data.userNickName}</AnonymousWriterName>;
  } else {
    return <AnonymousWriterName>{props.data.displayName}</AnonymousWriterName>;
  }
};

// 준택 교수평가 button 수정.
// renderGoodButton = props => {
//   if (props.isGoodButton == true) {
//     return (
//       <C_LikeButton onPress={() => props.isGoodHandler()}>
//         <C_LikeImage
//           source={require("../../../assets/image/community/likes.png")}
//         />
//         <C_LikeText>{props.isGoodCount}</C_LikeText>
//       </C_LikeButton>
//     );
//   }
// };

// 준택 교수평가 button 수정.
renderGoodButton = props => {
  if (props.isGoodButton == true) {
    return (
      <View>
        <LikeBTN
          handler={props.handleLike}
          isGood={props.isGood}
          goodCount={props.goodCount}
          disabled={props.noClick}
        />
      </View>
    );
  }
};

renderReplyButton = props => {
  if (props.isReplyButton == true) {
    return (
      <C_ReplyButton onPress={() => props.re_replyHandler()}>
        <C_ReplyText>답글</C_ReplyText>
      </C_ReplyButton>
    );
  }
};

renderDotButton = props => {
  if (props.isdotsButton == true) {
    return (
      <TouchableOpacity onPress={() => props.handler()}>
        <Image28 source={require("../../../assets/image/community/dots.png")} />
      </TouchableOpacity>
    );
  }
};

// 내가 쓴 교수평가 교수 정보 추가 - 준택 작업.
professorInfo = props => {
  if (typeof props.data.professorName == "undefined") {
    return;
  } else
    return (
      <C_ContentText style={{ fontFamily: fonts.nanumBarunGothicB }}>
        {props.data.professorName + ` 교수님\n트랙:`}
        {props.data.track.length != 1
          ? props.data.track[0] + "/ " + props.data.track[1]
          : props.data.track}
      </C_ContentText>
    );
};

export const ReplyView = props => {
  if (props.data.status == "ACTIVE") {
    return (
      <ImageCapInset
        style={{
          width: widthPercentageToDP(343),
          paddingTop: widthPercentageToDP(16),
          paddingLeft: widthPercentageToDP(12),
          paddingRight: widthPercentageToDP(6),
          paddingBottom: widthPercentageToDP(21),
          marginBottom: widthPercentageToDP(10)
        }}
        source={
          Platform.OS === "ios"
            ? require("../../../assets/image/community/reply.png")
            : { uri: "reply" }
        }
        capInsets={{
          top: widthPercentageToDP(12),
          right: widthPercentageToDP(12),
          bottom: widthPercentageToDP(22),
          left: widthPercentageToDP(12)
        }}
      >
        <ReplyContainer>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                width: widthPercentageToDP(16.4),
                height: widthPercentageToDP(10.1)
              }}
              source={
                props.data.userNickName == props.writerName
                  ? require("../../../assets/image/community/quotation_color.png")
                  : require("../../../assets/image/community/quotation.png")
              }
            />
            {this.renderWriterName(props)}
            <C_CreatedAtText>{timeSince(props.data.createdAt)}</C_CreatedAtText>
          </View>
          {this.renderDotButton(props)}
        </ReplyContainer>
        <View>
          {/* 교수 정보 작업 */}
          {this.professorInfo(props)}
          <Hyperlink linkDefault={true} linkStyle={{ color: "#2980b9" }}>
            <C_ContentText>{props.data.content}</C_ContentText>
          </Hyperlink>
        </View>

        <ButtonView>
          {this.renderReplyButton(props)}
          {this.renderGoodButton(props)}
        </ButtonView>
      </ImageCapInset>
    );
  } else {
    return (
      <ImageCapInset
        style={{
          width: widthPercentageToDP(343),
          paddingTop: widthPercentageToDP(16),
          paddingLeft: widthPercentageToDP(12),
          paddingRight: widthPercentageToDP(6),
          paddingBottom: widthPercentageToDP(21),
          marginBottom: widthPercentageToDP(10)
        }}
        source={
          Platform.OS === "ios"
            ? require("../../../assets/image/community/reply.png")
            : { uri: "reply" }
        }
        capInsets={{
          top: widthPercentageToDP(12),
          right: widthPercentageToDP(12),
          bottom: widthPercentageToDP(22),
          left: widthPercentageToDP(12)
        }}
      >
        <ReplyContainer
          style={{
            opacity: 0.2
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                width: widthPercentageToDP(16.4),
                height: widthPercentageToDP(10.1)
              }}
              source={
                props.data.userNickName == props.writerName
                  ? require("../../../assets/image/community/quotation_color.png")
                  : require("../../../assets/image/community/quotation.png")
              }
            />
            {props.writerName && props.data.userNickName == props.writerName ? (
              <WriterName>글쓴이</WriterName>
            ) : (
              <AnonymousWriterName>
                {props.data.displayName}
              </AnonymousWriterName>
            )}
            <C_CreatedAtText>{timeSince(props.data.createdAt)}</C_CreatedAtText>
          </View>
          <TouchableOpacity>
            <Image
              style={{
                width: widthPercentageToDP(28),
                height: widthPercentageToDP(28)
              }}
              source={require("../../../assets/image/community/dots.png")}
            />
          </TouchableOpacity>
        </ReplyContainer>

        <C_ContentText
          style={{
            opacity: 0.2
          }}
        >
          {props.data.content}
        </C_ContentText>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: widthPercentageToDP(16)
          }}
        >
          <C_ReportText>* 신고된 댓글입니다.</C_ReportText>
          <View style={{ flexDirection: "row" }}>
            <C_ReplyButton
              style={{
                opacity: 0.2
              }}
            >
              <C_ReplyText>답글</C_ReplyText>
            </C_ReplyButton>
            {/* <C_LikeButton
              style={{
                opacity: 0.2
              }}
            >
              <C_LikeImage
                source={require("../../../assets/image/community/likes.png")}
              />
              <C_LikeText>0</C_LikeText>
            </C_LikeButton> */}
          </View>
        </View>
      </ImageCapInset>
    );
  }
};

const ReReplyContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Re_ReplyView = props => {
  if (props.data.status == "ACTIVE") {
    return (
      <View style={{ paddingLeft: widthPercentageToDP(60) }}>
        <Image
          style={{
            position: "absolute",
            width: widthPercentageToDP(14),
            height: widthPercentageToDP(17),
            marginBottom: widthPercentageToDP(8),
            marginLeft: widthPercentageToDP(39)
          }}
          source={require("../../../assets/image/community/reply_arrow.png")}
        />
        <ImageCapInset
          style={{
            width: widthPercentageToDP(283),
            paddingTop: widthPercentageToDP(4),
            paddingLeft: widthPercentageToDP(12),
            paddingRight: widthPercentageToDP(6),
            paddingBottom: widthPercentageToDP(21),
            marginBottom: widthPercentageToDP(10)
          }}
          source={
            Platform.OS === "ios"
              ? require("../../../assets/image/community/reply.png")
              : { uri: "reply" }
          }
          capInsets={{
            top: widthPercentageToDP(12),
            right: widthPercentageToDP(12),
            bottom: widthPercentageToDP(22),
            left: widthPercentageToDP(12)
          }}
        >
          <ReReplyContainer>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{
                  width: widthPercentageToDP(16.4),
                  height: widthPercentageToDP(10)
                }}
                source={
                  props.data.userNickName == props.writerName
                    ? require("../../../assets/image/community/quotation_color.png")
                    : require("../../../assets/image/community/quotation.png")
                }
              />

              {props.data.userNickName == props.writerName ? (
                <WriterName>글쓴이</WriterName>
              ) : (
                <AnonymousWriterName>
                  {props.data.displayName}
                </AnonymousWriterName>
              )}
              <C_CreatedAtText>
                {timeSince(props.data.createdAt)}
              </C_CreatedAtText>
            </View>
            <TouchableOpacity
              style={{ marginTop: widthPercentageToDP(5) }}
              onPress={() => props.handler()}
            >
              <Image28
                source={require("../../../assets/image/community/dots.png")}
              />
            </TouchableOpacity>
          </ReReplyContainer>
          <Hyperlink linkDefault={true} linkStyle={{ color: "#2980b9" }}>
            <C_ReContentText>{props.data.content}</C_ReContentText>
          </Hyperlink>

          <View
            style={{
              alignItems: "flex-end",
              height: widthPercentageToDP(22)
            }}
          >
            {/* <C_LikeButton>
              <C_LikeImage
                source={require("../../../assets/image/community/likes.png")}
              />
              <C_LikeText>0</C_LikeText>
            </C_LikeButton> */}
          </View>
        </ImageCapInset>
      </View>
    );
  } else {
    return (
      <View style={{ paddingLeft: widthPercentageToDP(60) }}>
        <Image
          style={{
            position: "absolute",
            width: widthPercentageToDP(14),
            height: widthPercentageToDP(17),
            marginBottom: widthPercentageToDP(8),
            marginLeft: widthPercentageToDP(39)
          }}
          source={require("../../../assets/image/community/reply_arrow.png")}
        />
        <ImageCapInset
          style={{
            width: widthPercentageToDP(283),
            paddingTop: widthPercentageToDP(4),
            paddingLeft: widthPercentageToDP(12),
            paddingRight: widthPercentageToDP(6),
            paddingBottom: widthPercentageToDP(21),
            marginBottom: widthPercentageToDP(10)
          }}
          source={
            Platform.OS === "ios"
              ? require("../../../assets/image/community/reply.png")
              : { uri: "reply" }
          }
          capInsets={{
            top: widthPercentageToDP(12),
            right: widthPercentageToDP(12),
            bottom: widthPercentageToDP(22),
            left: widthPercentageToDP(12)
          }}
        >
          <ReReplyContainer
            style={{
              opacity: 0.2
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{
                  width: widthPercentageToDP(16.4),
                  height: widthPercentageToDP(10)
                }}
                source={
                  props.data.userNickName == props.writerName
                    ? require("../../../assets/image/community/quotation_color.png")
                    : require("../../../assets/image/community/quotation.png")
                }
              />
              {props.data.userNickName == props.writerName ? (
                <WriterName>글쓴이</WriterName>
              ) : (
                <AnonymousWriterName>
                  {props.data.displayName}
                </AnonymousWriterName>
              )}
              <C_CreatedAtText>
                {timeSince(props.data.createdAt)}
              </C_CreatedAtText>
            </View>
            <TouchableOpacity>
              <Image28
                source={require("../../../assets/image/community/dots.png")}
              />
            </TouchableOpacity>
          </ReReplyContainer>

          <C_ReContentText
            style={{
              opacity: 0.2
            }}
          >
            {props.data.content}
          </C_ReContentText>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: widthPercentageToDP(22)
            }}
          >
            <C_ReportText>* 신고된 답글입니다.</C_ReportText>
            {/* <C_LikeButton
              style={{
                opacity: 0.2
              }}
            >
              <C_LikeImage
                source={require("../../../assets/image/community/likes.png")}
              />
              <C_LikeText>0</C_LikeText>
            </C_LikeButton> */}
          </View>
        </ImageCapInset>
      </View>
    );
  }
};

export const ReportDetailBody = props => {
  return (
    <View
      style={{
        width: widthPercentageToDP(295),
        height: widthPercentageToDP(256),
        paddingHorizontal: widthPercentageToDP(12)
      }}
    >
      {props.reportEU.map((item, index) => {
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: widthPercentageToDP(12)
            }}
          >
            <TouchableOpacity onPress={() => props.handler(index)}>
              <Image28
                source={
                  props.reportEUindex == index
                    ? require("../../../assets/image/community/check_on.png")
                    : require("../../../assets/image/community/check_off.png")
                }
              />
            </TouchableOpacity>
            <ReportModalText>{item.str}</ReportModalText>
          </View>
        );
      })}
    </View>
  );
};
