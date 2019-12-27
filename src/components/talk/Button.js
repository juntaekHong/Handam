import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import { WriteText, ScrapText, GoodCount, SearchCancel } from "./Text";
import { WriteIMG, SearchIMG, ScrapIMG, LikeIMG2, AddedImage } from "./Image";
import { RowView } from "./View";
import { Image28 } from "../community/Image";

//Common

const BTN = styled.TouchableOpacity``;

//TalkAbout.js

export const WritePostView = styled.View`
  position: absolute;
  width: ${widthPercentageToDP(87)};
  height: ${widthPercentageToDP(50)};
  padding-bottom: ${widthPercentageToDP(15)};
`;

export const WritePost = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const WritePostBTN = props => {
  return (
    <WritePostView>
      <WritePost
        onPress={() => {
          props.handler();
        }}
      >
        <WriteIMG
          source={require("../../../assets/image/community/write.png")}
        />
        <WriteText>글쓰기</WriteText>
      </WritePost>
    </WritePostView>
  );
};

export const SearchBTN = props => {
  return (
    <BTN
      onPress={() => {
        props.navigation();
      }}
    >
      <SearchIMG
        source={require("../../../assets/image/community/search.png")}
      />
    </BTN>
  );
};

//TalkDetail.js

const ScrapView = styled.TouchableOpacity`
  width: ${widthPercentageToDP(62.5)};
  height: ${widthPercentageToDP(22)};
  justify-content: center;
  align-items: center;
  border-radius: ${widthPercentageToDP(20)};
  border-color: ${"#9e9e9e"};
  border-width: ${widthPercentageToDP(1)};
`;

export const ScrapBTN = props => {
  return (
    <ScrapView
      onPress={() => {
        props.handler();
      }}
    >
      <RowView>
        <ScrapIMG
          source={
            props.isScrap == false
              ? require("../../../assets/image/community/star.png")
              : require("../../../assets/image/community/star_color.png")
          }
        />
        <ScrapText>스크랩</ScrapText>
      </RowView>
    </ScrapView>
  );
};

const DotsView = styled.TouchableOpacity`
  margin-horizontal: ${widthPercentageToDP(4)};
`;

export const DotsBTN = props => {
  return (
    <DotsView
      onPress={() => {
        props.handler();
      }}
    >
      <Image28 source={require("../../../assets/image/community/dots.png")} />
    </DotsView>
  );
};

const LikeView = styled.TouchableOpacity`
  flex-direction: row;
  width: ${widthPercentageToDP(40)};
  height: ${widthPercentageToDP(22)};
  justify-content: center;
  align-items: center;
  border-radius: ${widthPercentageToDP(20)};
  border-color: ${"#9e9e9e"};
  border-width: ${widthPercentageToDP(1)};
`;

export const LikeBTN = props => {
  return (
    <LikeView
      onPress={() => {
        props.handler();
      }}
      disabled={props.disabled}
    >
      <LikeIMG2
        source={
          props.isGood == true
            ? require("../../../assets/image/community/likes_color.png")
            : require("../../../assets/image/community/likes.png")
        }
      />
      <GoodCount>{props.goodCount}</GoodCount>
    </LikeView>
  );
};

//TalkSearch.js

export const SearchCancelBTN = props => {
  return (
    <BTN onPress={() => props.handler()}>
      <SearchCancel>취소</SearchCancel>
    </BTN>
  );
};

//TalkWrite.js

const ImageAdd = styled.TouchableOpacity`
  margin-left: ${widthPercentageToDP(16)};
  margin-right: ${widthPercentageToDP(10)};
`;

export const ImageAddBTN = props => {
  return (
    <ImageAdd onPress={() => props.handler()}>
      <Image28 source={require("../../../assets/image/community/image.png")} />
    </ImageAdd>
  );
};

export const AnonymousBTN = props => {
  return (
    <BTN
      onPress={async () => {
        if (props.anonymous == 0) {
          await props.handleAnonymousOn();
        } else {
          await props.handleAnonymousOff();
        }
      }}
    >
      <Image28
        source={
          props.anonymous == 0
            ? require("../../../assets/image/community/anonymous_off.png")
            : require("../../../assets/image/community/anonymous_on.png")
        }
      />
    </BTN>
  );
};

export const ImageBTN = props => {
  return (
    <BTN
      onPress={() => {
        props.handler();
      }}
    >
      <AddedImage
        resizeMode={"cover"}
        source={
          typeof props.data == "string"
            ? { uri: `${props.data}` }
            : {
                uri: `data:${props.data.mime};base64,${props.data.data}`
              }
        }
      />
    </BTN>
  );
};
