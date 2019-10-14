import React from "react";
import styled from "styled-components/native";
import Hyperlink from "react-native-hyperlink";
import { UIActivityIndicator } from "react-native-indicators";
import { widthPercentageToDP, timeSince } from "../../utils/util";
import { CategoryName, CategoryExplain } from "./Text";
import {
  CategoryIMG,
  QuotationIMG,
  NewIMG,
  ImageIMG,
  LikeIMG,
  ReplyIMG,
  QuotationIMG2,
  ReplyIMG2,
  HandaMonIMG
} from "./Image";
import {
  HotNum,
  HotText,
  PostTitle,
  PostContent,
  PostCreatedAt,
  ImageCount,
  ReportText,
  PostUserName,
  UserName,
  CreatedAt,
  Title,
  Content,
  GoodCount,
  HandaMon,
  ImageAdd,
  AnonymousOFFText,
  AnonymousONText
} from "./Text";
import {
  ScrapBTN,
  DotsBTN,
  LikeBTN,
  ImageAddBTN,
  AnonymousBTN
} from "./Button";

//Common

export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LineView = styled.View`
  background-color: #dbdbdb;
  width: ${widthPercentageToDP(375)};
  height: ${widthPercentageToDP(1)};
`;

const LoadingView = styled.View`
  width: ${widthPercentageToDP(375)};
  height: ${widthPercentageToDP(122)};
  justify-content: center;
  align-items: center;
`;

export const BottomLoading = () => {
  return (
    <LoadingView>
      <UIActivityIndicator size={widthPercentageToDP(30)} color={"#727272"} />
    </LoadingView>
  );
};

//Talk.js

const CategoryCardView = styled.TouchableOpacity`
  width: ${widthPercentageToDP(343)};
  height: ${widthPercentageToDP(105)};
  margin-bottom: ${widthPercentageToDP(12)};
  padding-top: ${widthPercentageToDP(12)};
  padding-left: ${widthPercentageToDP(12)};
`;

export const CategoryCard = props => {
  return (
    <CategoryCardView
      onPress={() => {
        props.navigation();
      }}
    >
      <CategoryIMG
        source={require("../../../assets/image/community/category.png")}
      />
      <QuotationIMG
        source={require("../../../assets/image/community/quotation_color.png")}
      />
      <RowView>
        <CategoryName>{props.data.postsCategoryName}</CategoryName>
        {props.data.hasNewPost ? (
          <NewIMG source={require("../../../assets/image/community/new.png")} />
        ) : null}
      </RowView>
      <CategoryExplain>{props.data.description}</CategoryExplain>
    </CategoryCardView>
  );
};

//TalkAbout.js

const ImageContainer = styled.View`
  flex-direction: row;
  height: ${widthPercentageToDP(12)};
  align-items: center;
`;

const ImageView = props => {
  return (
    <ImageContainer>
      {props.data.imageCount > 0 ? (
        <RowView>
          <ImageIMG
            source={require("../../../assets/image/community/images.png")}
          />
          <ImageCount>{props.data.imageCount}</ImageCount>
        </RowView>
      ) : null}
      <LikeIMG source={require("../../../assets/image/community/likes.png")} />
      <ImageCount>{props.data.goodCount}</ImageCount>
      <ReplyIMG
        source={require("../../../assets/image/community/replys.png")}
      />
      <ImageCount>{props.data.postsReplyCount}</ImageCount>
    </ImageContainer>
  );
};

const HotContainer = styled.TouchableOpacity`
  flex-direction: row;
  width: ${widthPercentageToDP(375)};
  height: ${widthPercentageToDP(81)};
  border-bottom-width: ${widthPercentageToDP(1)};
  border-bottom-color: ${"#dbdbdb"};
`;

const PostContainer = styled(HotContainer)`
  flex-direction: column;
  padding-horizontal: ${widthPercentageToDP(16)};
  padding-vertical: ${widthPercentageToDP(13)};
`;

const HotTextView = styled.View`
  background-color: ${"#259ffa"};
  width: ${widthPercentageToDP(32)};
  height: ${widthPercentageToDP(14)};
  justify-content: center;
  align-items: center;
  margin-bottom: ${widthPercentageToDP(5)}
  border-radius: ${widthPercentageToDP(10)};
  border-width: ${widthPercentageToDP(1)};
  border-color: ${"#259ffa"};
`;

const HotNumber = styled.View`
  width: ${widthPercentageToDP(35)};
  height: ${widthPercentageToDP(81)};
  justify-content: center;
  align-items: center;
`;

const HotView = styled.View`
  width: ${widthPercentageToDP(340)};
  padding-right: ${widthPercentageToDP(16)};
`;

const TitleView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${widthPercentageToDP(13)};
`;

const WriterTimeView = styled.View`
  flex-direction: row;
  height: ${widthPercentageToDP(12)};
  justify-content: space-between;
  align-items: center;
`;

const WriterTime = props => {
  return (
    <WriterTimeView>
      <RowView>
        <PostUserName>{props.data.displayName}</PostUserName>
        <PostCreatedAt>{timeSince(props.data.createdAt)}</PostCreatedAt>
      </RowView>
      <ImageView {...props} />
    </WriterTimeView>
  );
};

export const HotPostsListItem = props => {
  return (
    <HotContainer onPress={() => props.handler()}>
      <HotNumber>
        <HotNum>{props.index + 1}</HotNum>
      </HotNumber>
      <HotView>
        <TitleView>
          <PostTitle ellipsizeMode={"tail"} numberOfLines={1}>
            {props.data.title}
          </PostTitle>
          <HotTextView>
            <HotText>HOT</HotText>
          </HotTextView>
        </TitleView>
        <PostContent ellipsizeMode={"tail"} numberOfLines={1}>
          {props.data.content}
        </PostContent>
        <WriterTime {...props} />
      </HotView>
    </HotContainer>
  );
};

export const PostsListItem = props => {
  return (
    <PostContainer onPress={() => props.handler()}>
      <PostTitle ellipsizeMode={"tail"} numberOfLines={1}>
        {props.data.title}
      </PostTitle>
      <PostContent ellipsizeMode={"tail"} numberOfLines={1}>
        {props.data.content}
      </PostContent>
      <WriterTime {...props} />
    </PostContainer>
  );
};

export const ReportedPostsListItem = props => {
  return (
    <PostContainer onPress={() => props.handler()}>
      <PostTitle
        style={{
          opacity: 0.2
        }}
        ellipsizeMode={"tail"}
        numberOfLines={1}
      >
        {props.data.title}
      </PostTitle>
      <PostContent
        style={{
          opacity: 0.2
        }}
        ellipsizeMode={"tail"}
        numberOfLines={1}
      >
        {props.data.content}
      </PostContent>
      <WriterTimeView>
        <ReportText>* 신고된 게시글입니다.</ReportText>
        <ImageView {...props} />
      </WriterTimeView>
    </PostContainer>
  );
};

//TalkDetail.js

const TopView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Top = props => {
  return (
    <TopView>
      <RowView>
        <QuotationIMG2
          source={require("../../../assets/image/community/quotation_color.png")}
        />
        <UserName>{props.data.displayName}</UserName>
        <CreatedAt>{timeSince(props.data.createdAt)}</CreatedAt>
      </RowView>
      <RowView>
        <ScrapBTN handler={props.handleScrap} isScrap={props.isScrap} />
        <DotsBTN handler={props.handleDots} />
      </RowView>
    </TopView>
  );
};

const CenterView = styled.View``;

export const Center = props => {
  return (
    <CenterView>
      <Title numberOfLines={1} ellipsizeMode={"tail"}>
        {props.data.title}
      </Title>
      <Hyperlink linkDefault={true} linkStyle={{ color: "#2980b9" }}>
        <Content>{props.data.content}</Content>
      </Hyperlink>
    </CenterView>
  );
};

const BottomView = styled.View`
  flex-direction: row;
  margin-top: ${widthPercentageToDP(33)};
  margin-bottom: ${widthPercentageToDP(12)};
`;

const ReplyCountView = styled.View`
  flex-direction: row;
  width: ${widthPercentageToDP(40)};
  height: ${widthPercentageToDP(22)};
  justify-content: center;
  align-items: center;
  margin-left: ${widthPercentageToDP(8)};
  border-radius: ${widthPercentageToDP(20)};
  border-color: ${"#9e9e9e"};
  border-width: ${widthPercentageToDP(1)};
`;

const ReplyCount = props => {
  return (
    <ReplyCountView>
      <ReplyIMG2
        source={require("../../../assets/image/community/replys.png")}
      />
      <GoodCount>{props.data.postsReplyCount}</GoodCount>
    </ReplyCountView>
  );
};
export const Bottom = props => {
  return (
    <BottomView>
      <LikeBTN
        handler={props.handleLike}
        isGood={props.isGood}
        goodCount={props.goodCount}
      />
      <ReplyCount {...props} />
    </BottomView>
  );
};

//TalkSearch.js

const SearchNoneView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SearchNone = () => {
  return (
    <SearchNoneView>
      <HandaMonIMG
        source={require("../../../assets/image/community/handamon.png")}
      />
      <HandaMon>게시판 글을 검색해보세요</HandaMon>
    </SearchNoneView>
  );
};

export const TextInputContainer = styled.View`
  flex-direction: row;
  width: ${widthPercentageToDP(375)};
  height: ${widthPercentageToDP(60)};
  justify-content: center;
  align-items: center;
  border-bottom-color: ${"#dbdbdb"};
  border-bottom-width: ${widthPercentageToDP(1)};
`;

export const TextInputView = styled.View`
  flex-direction: row;
  width: ${widthPercentageToDP(299)};
  height: ${widthPercentageToDP(40)};
  align-items: center;
  border-color: ${"#dbdbdb"};
  border-width: ${widthPercentageToDP(1)};
  border-radius: ${widthPercentageToDP(20)};
`;

//TalkWrite.js

const WriteBottomView = styled.View`
  flex-direction: row;
  width: ${widthPercentageToDP(375)};
  height: ${widthPercentageToDP(58)};
  justify-content: space-between;
  align-items: center;
`;

export const WriteBottom = props => {
  return (
    <WriteBottomView>
      <RowView>
        <ImageAddBTN handler={props.addImage} />
        <ImageAdd>사진추가 {props.imageNum}/5 최대 10MB</ImageAdd>
      </RowView>
      <RowView>
        <AnonymousBTN {...props} />
        {props.anonymous == 0 ? (
          <AnonymousOFFText
            style={{
              marginRight: widthPercentageToDP(18),
              marginLeft: widthPercentageToDP(2)
            }}
          >
            익명
          </AnonymousOFFText>
        ) : (
          <AnonymousONText
            style={{
              marginRight: widthPercentageToDP(18),
              marginLeft: widthPercentageToDP(2)
            }}
          >
            익명
          </AnonymousONText>
        )}
      </RowView>
    </WriteBottomView>
  );
};

//Modal

export const ImageModalFooterView = styled.View`
  flex-direction: row;
  background-color: ${"#1c1c1c"};
  opacity: 0.86;
  width: ${widthPercentageToDP(375)};
  height: ${widthPercentageToDP(49)};
  justify-content: center;
  align-items: center;
`;

export const ImageModalCloseView = styled.View`
  flex-direction: row;
  width: ${widthPercentageToDP(375)};
  height: ${widthPercentageToDP(28)};
  justify-content: flex-end;
  margin-top: ${widthPercentageToDP(20)};
  padding-right: ${widthPercentageToDP(18)};
`;
