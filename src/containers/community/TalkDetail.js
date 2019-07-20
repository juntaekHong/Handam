import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  Keyboard,
  BackHandler
} from "react-native";
import Hyperlink from "react-native-hyperlink";
import { widthPercentageToDP, timeSince, getData } from "../../utils/util";
import fonts from "../../configs/fonts";
import { connect } from "react-redux";
import { TalkActions } from "../../store/actionCreator";
import {
  ReplyView,
  Re_ReplyView,
  ReportDetailBody
} from "../../components/talk/View";
import {
  CustomModalText,
  CustomModalBlackText,
  AnonymousOFFText,
  AnonymousONText
} from "../../components/talk/Text";
import { BottomMenuModal, CustomModal } from "../../components/common/Modal";
import { ImageModal, AlertModal } from "../../components/talk/Modal";

class TalkDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: "reply", //textinput 상태 : 댓글생성, 댓글수정, 답글생성 결정
      replyIndex: null,
      reply: "",
      temp_reply: "", //댓글내용 임시저장
      replyinfo: {}, //댓글정보 저장
      placholder: "댓글을 입력하세요.",
      goodCount: this.props.getPosts.goodCount,
      isGood: this.props.getPosts.isGood,
      isScrap: this.props.getPosts.isScrap,
      emoji: false,
      selected_emoji: null,
      imagemodal: false,
      who: "me",
      type: "posts",
      anonymous: 1,
      deletemodal: false,
      updatemodal: false,
      reportmodal: false,
      reportdetailmodal: false,
      scrapmodal: false,
      reportEU: [
        { str: "토픽(주제)에 부적절함" },
        { str: "욕설/비하" },
        { str: "음란성" },
        { str: "상업적 광고 및 판매" },
        { str: "게시글/댓글 도배" },
        { str: "기타" }
      ],
      reportEUindex: null
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      TalkActions.handleBottomModal(false);
      this.navigateTalkAbout();
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  navigateTalkAbout = () => {
    this.props.navigation.navigate("TalkAbout");
  };

  navigateTalkWrite = () => {
    this.props.navigation.navigate("TalkWrite", {
      form: "update"
    });
  };

  deletePost = async () => {
    await TalkActions.deletePosts(this.props.getPosts.postsIndex);
    await TalkActions.initPostList();
    await TalkActions.pageListPosts(
      this.props.filter,
      this.props.orderby,
      this.props.postsList.length / 6,
      6
    );
    await TalkActions.pageListPosts(this.props.filter, "count DESC", 1, 2);
    this.navigateTalkAbout();
  };

  reportPost = async () => {
    var posts = new Object();
    posts.postsIndex = this.props.getPosts.postsIndex;
    posts.content = this.props.getPosts.content;
    await TalkActions.createPostsReport(posts);
    await TalkActions.getPosts(this.props.getPosts.postsIndex);
  };

  deletePostsReply = async () => {
    await TalkActions.deletePostsReply(this.state.replyIndex);
    await TalkActions.pageListPostsReply(
      "page=1&count=100",
      this.props.getPosts.postsIndex
    );
  };

  updatePostsReply = async () => {
    await this.setState({
      form: "update",
      reply: this.state.temp_reply
    });
    this.TextInput.focus();
  };

  reportReply = async () => {
    const reply = new Object();
    reply.postsIndex = this.state.replyinfo.postsIndex;
    reply.postsReplyIndex = this.state.replyinfo.postsReplyIndex;
    reply.content = this.state.replyinfo.content;
    await TalkActions.createPostsReplyReport(reply);
    await TalkActions.pageListPostsReply(
      "page=1&count=100",
      this.props.getPosts.postsIndex
    );
  };

  handleReportEUindex = index => {
    this.setState({ reportEUindex: index });
  };
  //사용자가 글쓴이인지 판단
  checkUser = async () => {
    const userId = await getData("userId"); //유저닉네임으로 변경해야함
    if (this.props.getPosts.userNickName == userId) {
      this.setState({ who: "me" });
    } else {
      this.setState({ who: "you" });
    }
  };

  checkSpace = str => {
    if (str.replace(/(\s*)/g, "") == "") {
      return false;
    } else {
      return true;
    }
  };

  header = () => {
    return <View style={{ width: widthPercentageToDP(10) }} />;
  };

  footer = () => {
    return <View style={{ width: widthPercentageToDP(10) }} />;
  };

  renderImages = () => {
    const imageData =
      this.props.getPosts.imagePath.length > 0
        ? eval("(" + this.props.getPosts.imagePath[0].path + ")").image
        : [];
    if (imageData.length != 0) {
      return (
        <View>
          <FlatList
            style={
              imageData.length == 1
                ? styles.image_single_tle
                : styles.image_multi_tle
            }
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={imageData}
            ListHeaderComponent={imageData.length == 1 ? null : this.header}
            ListFooterComponent={imageData.length == 1 ? null : this.footer}
            renderItem={({ item, index }) => {
              const concept = item.substr(
                item.lastIndexOf(".") + 1,
                item.length - 1
              );
              if (concept == "gif") {
                item = item.toString().replace("gif", "png");
              }
              return (
                <TouchableOpacity
                  onPress={async () => {
                    await TalkActions.handleImageIndex(index);
                    await TalkActions.handleImageModal(true);
                  }}
                >
                  <Image
                    style={
                      imageData.length == 1
                        ? styles.image_single
                        : styles.image_multi
                    }
                    source={{ uri: `${item}` }}
                  />
                  {concept == "gif" ? (
                    <Text
                      style={
                        imageData.length == 1
                          ? styles.image_single_gif
                          : styles.image_multi_gif
                      }
                    >
                      GIF
                    </Text>
                  ) : null}
                </TouchableOpacity>
              );
            }}
          />
          <View
            style={{
              backgroundColor: "white",
              height: widthPercentageToDP(12)
            }}
          />
        </View>
      );
    } else return;
  };

  renderReplyList = () => {
    return this.props.replysList.length == 0 ? null : (
      <FlatList
        scrollEnabled={false}
        style={{
          flexGrow: 1,
          width: "100%",
          height: "100%",
          padding: widthPercentageToDP(16)
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={this.props.replysList}
        renderItem={({ item, index }) => {
          return (
            <View>
              {/* 댓글 */}
              <ReplyView
                key={index}
                handler={async () => {
                  this.checkUser();
                  await this.setState({
                    replyinfo: item,
                    temp_reply: item.content,
                    replyIndex: item.postsReplyIndex,
                    type: "reply"
                  });
                  TalkActions.handleBottomModal(true);
                }}
                re_replyHandler={async () => {
                  await this.setState({
                    form: "re_reply",
                    placholder: "답글을 입력하세요.",
                    replyIndex: item.postsReplyIndex
                  });
                  this.TextInput.focus();
                }}
                data={item}
                writerName={this.props.getPosts.userNickName}
              />
              {/* 대댓글 */}
              {item.childReplies.length != 0
                ? item.childReplies.map((item2, index) => {
                    return (
                      <Re_ReplyView
                        key={index}
                        handler={async () => {
                          this.checkUser();
                          await this.setState({
                            replyinfo: item2,
                            temp_reply: item2.content,
                            replyIndex: item2.postsReplyIndex,
                            type: "reply"
                          });
                          TalkActions.handleBottomModal(true);
                        }}
                        data={item2}
                        writerName={this.props.getPosts.userNickName}
                      />
                    );
                  })
                : null}
            </View>
          );
        }}
      />
    );
  };

  renderAlertModal = rendertext => {
    TalkActions.handleAlertModal(true);
    TalkActions.handleAlertText(rendertext);
    setTimeout(() => {
      TalkActions.handleAlertModal(false);
    }, 1000);
  };

  render() {
    const imageData =
      this.props.getPosts.imagePath.length > 0
        ? eval("(" + this.props.getPosts.imagePath[0].path + ")").image
        : [];
    return (
      <SafeAreaView
        style={[
          styles.container,
          this.props.replysList.length == 0
            ? { backgroundColor: "#ffffff" }
            : { backgroundColor: "#f2f2f2" }
        ]}
      >
        <ImageModal
          visible={this.props.imageModal}
          close={() => TalkActions.handleImageModal(false)}
          images={imageData}
          index={this.props.imageIndex}
          indexhandle={TalkActions.handleImageIndex}
        />
        <BottomMenuModal
          visible={this.props.bottomModal}
          handler={() => TalkActions.handleBottomModal(false)}
          updateHandler={
            this.state.type == "posts"
              ? this.navigateTalkWrite
              : this.updatePostsReply
          }
          deleteHandler={() => this.setState({ deletemodal: true })}
          reportHandler={() => this.setState({ reportmodal: true })}
          who={this.state.who}
        />
        <CustomModal
          height={widthPercentageToDP(201.9)}
          children={
            <CustomModalBlackText>
              해당 글을 삭제하겠습니까?
            </CustomModalBlackText>
          }
          visible={this.state.deletemodal}
          footerHandler={() => {
            this.state.type == "posts"
              ? this.deletePost()
              : this.deletePostsReply();
            this.setState({ deletemodal: false });
          }}
          closeHandler={() => this.setState({ deletemodal: false })}
        />
        <CustomModal
          height={widthPercentageToDP(201.9)}
          children={
            <CustomModalText
              black1={"이 글을 "}
              red={"신고"}
              black2={"하시겠습니까?"}
            />
          }
          visible={this.state.reportmodal}
          footerHandler={() => {
            this.setState({ reportdetailmodal: true, reportmodal: false });
          }}
          closeHandler={() => this.setState({ reportmodal: false })}
        />
        <CustomModal
          height={widthPercentageToDP(381)}
          children={
            <ReportDetailBody
              handler={this.handleReportEUindex}
              reportEUindex={this.state.reportEUindex}
              reportEU={this.state.reportEU}
            />
          }
          visible={this.state.reportdetailmodal}
          footerDisabled={this.state.reportEUindex == null ? true : false}
          footerHandler={() => {
            this.state.type == "posts" ? this.reportPost() : this.reportReply();
            this.setState({ reportdetailmodal: false, reportEUindex: null });
            this.renderAlertModal("신고가 완료되었습니다.");
          }}
          closeHandler={() => this.setState({ reportdetailmodal: false })}
        />
        <CustomModal
          height={widthPercentageToDP(201.9)}
          children={
            this.state.isScrap == true ? (
              <CustomModalText
                black1={"스크랩을 "}
                red={"취소"}
                black2={"하시겠습니까?"}
              />
            ) : (
              <CustomModalBlackText>
                이 글을 스크랩하시겠습니까?
              </CustomModalBlackText>
            )
          }
          visible={this.state.scrapmodal}
          footerHandler={async () => {
            var posts = new Object();
            posts.postsIndex = this.props.getPosts.postsIndex;
            posts.isScrap = this.state.isScrap == true ? 0 : 1; //스크랩:1 취소:0

            this.setState({ scrapmodal: false });

            await TalkActions.putPostsSubscriber(posts);

            this.state.isScrap == true
              ? [
                  this.setState({ isScrap: false }),
                  this.renderAlertModal("스크랩을 취소하였습니다.")
                ]
              : [
                  this.setState({ isScrap: true }),
                  this.renderAlertModal("이 글을 스크랩하였습니다.")
                ];
          }}
          closeHandler={() => this.setState({ scrapmodal: false })}
        />

        <AlertModal
          visible={this.props.alertModal}
          text={this.props.alertText}
        />

        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            width: widthPercentageToDP(375),
            height: widthPercentageToDP(60),
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: widthPercentageToDP(11),
            paddingBottom: widthPercentageToDP(14)
          }}
        >
          <Text
            style={{
              position: "absolute",
              width: widthPercentageToDP(375),
              color: "#000000",
              fontSize: widthPercentageToDP(17),
              fontFamily: fonts.nanumBarunGothicB,
              textAlign: "center"
            }}
          >
            {this.props.categoryList[this.props.categoryIndex - 1].str}
          </Text>
          <TouchableOpacity
            style={{ marginLeft: widthPercentageToDP(8) }}
            onPress={() => this.navigateTalkAbout()}
          >
            <Image
              style={{
                width: widthPercentageToDP(28),
                height: widthPercentageToDP(28)
              }}
              source={require("../../../assets/image/community/back.png")}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{ width: widthPercentageToDP(375) }}
          keyboardShouldPersistTaps="never"
        >
          <View
            style={{
              backgroundColor: "white",
              width: widthPercentageToDP(375),
              paddingLeft: widthPercentageToDP(16)
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{
                    width: widthPercentageToDP(19.3),
                    height: widthPercentageToDP(11.9)
                  }}
                  source={require("../../../assets/image/community/quotation_color.png")}
                />
                <Text
                  style={{
                    color: "#171717",
                    fontSize: widthPercentageToDP(12),
                    fontFamily: fonts.nanumBarunGothicB,
                    marginLeft: widthPercentageToDP(9)
                  }}
                >
                  {this.props.getPosts.displayName}
                </Text>
                <Text
                  style={{
                    color: "#929292",
                    fontSize: widthPercentageToDP(8),
                    fontFamily: fonts.nanumBarunGothic,
                    marginLeft: widthPercentageToDP(4)
                  }}
                >
                  {timeSince(this.props.getPosts.createdAt)}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    width: widthPercentageToDP(62.5),
                    height: widthPercentageToDP(22),
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: widthPercentageToDP(20),
                    borderColor: "#9e9e9e",
                    borderWidth: widthPercentageToDP(1)
                  }}
                  onPress={async () => {
                    this.setState({ scrapmodal: true });
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      style={{
                        width: widthPercentageToDP(10.3),
                        height: widthPercentageToDP(10.3)
                      }}
                      source={
                        this.state.isScrap == false
                          ? require("../../../assets/image/community/star.png")
                          : require("../../../assets/image/community/star_color.png")
                      }
                    />
                    <Text
                      style={{
                        color: "#171717",
                        fontSize: widthPercentageToDP(11),
                        fontFamily: fonts.nanumBarunGothic,
                        marginLeft: widthPercentageToDP(4)
                      }}
                    >
                      스크랩
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginHorizontal: widthPercentageToDP(4) }}
                  onPress={async () => {
                    this.checkUser();
                    this.setState({ type: "posts" });
                    TalkActions.handleBottomModal(true);
                  }}
                >
                  <Image
                    style={{
                      width: widthPercentageToDP(28),
                      height: widthPercentageToDP(28)
                    }}
                    source={require("../../../assets/image/community/dots.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={{
                color: "#000000",
                width: widthPercentageToDP(343),
                fontSize: widthPercentageToDP(16),
                fontFamily: fonts.nanumBarunGothicB,
                marginTop: widthPercentageToDP(15)
              }}
              numberOfLines={1}
              ellipsizeMode={"tail"}
            >
              {this.props.getPosts.title}
            </Text>
            <Hyperlink linkDefault={true} linkStyle={{ color: "#2980b9" }}>
              <Text
                style={{
                  color: "#000000",
                  width: widthPercentageToDP(343),
                  fontSize: widthPercentageToDP(13),
                  fontFamily: fonts.nanumBarunGothic,
                  marginTop: widthPercentageToDP(7)
                }}
              >
                {this.props.getPosts.content}
              </Text>
            </Hyperlink>
            <View
              style={{
                flexDirection: "row",
                marginTop: widthPercentageToDP(33),
                marginBottom: widthPercentageToDP(12)
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  width: widthPercentageToDP(40),
                  height: widthPercentageToDP(22),
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: widthPercentageToDP(20),
                  borderColor: "#9e9e9e",
                  borderWidth: widthPercentageToDP(1)
                }}
                onPress={async () => {
                  var posts = new Object();
                  posts.postsIndex = this.props.getPosts.postsIndex;
                  posts.isGood = this.state.isGood == true ? 0 : 1; //좋아요:1 취소:0

                  TalkActions.putPostsSubscriber(posts);
                  this.state.isGood == true
                    ? await this.setState({
                        isGood: false,
                        goodCount: this.state.goodCount - 1
                      })
                    : await this.setState({
                        isGood: true,
                        goodCount: this.state.goodCount + 1
                      });
                }}
              >
                <Image
                  style={{
                    width: widthPercentageToDP(8.5),
                    height: widthPercentageToDP(10.2)
                  }}
                  source={
                    this.state.isGood == true
                      ? require("../../../assets/image/community/likes_color.png")
                      : require("../../../assets/image/community/likes.png")
                  }
                />
                <Text
                  style={{
                    color: "#171717",
                    fontSize: widthPercentageToDP(11),
                    fontFamily: fonts.nanumBarunGothic,
                    marginLeft: widthPercentageToDP(4)
                  }}
                >
                  {this.state.goodCount}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  width: widthPercentageToDP(40),
                  height: widthPercentageToDP(22),
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: widthPercentageToDP(8),
                  borderRadius: widthPercentageToDP(20),
                  borderColor: "#9e9e9e",
                  borderWidth: widthPercentageToDP(1)
                }}
              >
                <Image
                  style={{
                    width: widthPercentageToDP(10.2),
                    height: widthPercentageToDP(10)
                  }}
                  source={require("../../../assets/image/community/replys.png")}
                />
                <Text
                  style={{
                    color: "#171717",
                    fontSize: widthPercentageToDP(11),
                    fontFamily: fonts.nanumBarunGothic,
                    marginLeft: widthPercentageToDP(4)
                  }}
                >
                  {this.props.getPosts.postsReplyCount}
                </Text>
              </View>
            </View>
          </View>

          {this.renderImages()}

          {this.renderReplyList()}
        </ScrollView>
        {this.state.selected_emoji != null ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              backgroundColor: "#575757",
              height: widthPercentageToDP(107.3),
              opacity: 0.5
            }}
          >
            <Image
              style={{
                width: widthPercentageToDP(49),
                height: widthPercentageToDP(76),
                marginTop: widthPercentageToDP(20),
                marginRight: widthPercentageToDP(13)
              }}
              source={require("../../../assets/image/community/handamon.png")}
            />
            <TouchableOpacity
              style={{
                marginTop: widthPercentageToDP(5),
                marginRight: widthPercentageToDP(8)
              }}
              onPress={() => this.setState({ selected_emoji: null })}
            >
              <Image
                style={{
                  width: widthPercentageToDP(28),
                  height: widthPercentageToDP(28)
                }}
                source={require("../../../assets/image/community/close_white.png")}
              />
            </TouchableOpacity>
          </View>
        ) : null}

        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            width: widthPercentageToDP(375),
            maxHeight: widthPercentageToDP(101),
            minHeight: widthPercentageToDP(56),
            alignItems: "center",
            paddingVertical: widthPercentageToDP(8),
            borderColor: "#dbdbdb",
            borderTopWidth: widthPercentageToDP(0.5),
            borderBottomWidth: widthPercentageToDP(0.5)
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: widthPercentageToDP(324),
              maxHeight: widthPercentageToDP(85),
              minHeight: widthPercentageToDP(40),
              alignItems: "center",
              paddingVertical: widthPercentageToDP(4.5),
              marginLeft: widthPercentageToDP(12),
              borderRadius: widthPercentageToDP(15),
              borderWidth: widthPercentageToDP(1),
              borderColor: "#dbdbdb"
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{ marginLeft: widthPercentageToDP(7) }}
                onPress={async () => {
                  this.state.anonymous == 0
                    ? await this.setState({ anonymous: 1 })
                    : await this.setState({ anonymous: 0 });
                }}
              >
                <Image
                  style={{
                    width: widthPercentageToDP(28),
                    height: widthPercentageToDP(28)
                  }}
                  source={
                    this.state.anonymous == 0
                      ? require("../../../assets/image/community/anonymous_off.png")
                      : require("../../../assets/image/community/anonymous_on.png")
                  }
                />
              </TouchableOpacity>
              {this.state.anonymous == 0 ? (
                <AnonymousOFFText>익명</AnonymousOFFText>
              ) : (
                <AnonymousONText>익명</AnonymousONText>
              )}
            </View>
            <TextInput
              ref={input => {
                this.TextInput = input;
              }}
              style={{
                color: "#000000",
                width: widthPercentageToDP(216),
                maxHeight: widthPercentageToDP(76),
                padding: widthPercentageToDP(0),
                margin: widthPercentageToDP(0),
                marginLeft: widthPercentageToDP(5),
                fontSize: widthPercentageToDP(14),
                fontFamily: fonts.nanumBarunGothic
              }}
              underlineColorAndroid="transparent"
              onChangeText={reply => this.setState({ reply })}
              onFocus={() => this.setState({ emoji: false })}
              placeholder={this.state.placholder}
              placeholderTextColor={"#929292"}
              value={this.state.reply}
              maxLength={1000}
              numberOfLines={1}
              autoCapitalize={"none"}
              multiline={true}
            />
            <TouchableOpacity
              onPress={async () => {
                await Keyboard.dismiss();
                this.state.emoji == false
                  ? this.setState({ emoji: true })
                  : this.setState({ emoji: false });
              }}
            >
              <Image
                style={{
                  width: widthPercentageToDP(21),
                  height: widthPercentageToDP(21),
                  marginLeft: widthPercentageToDP(9.5)
                }}
                source={
                  this.state.emoji == false
                    ? require("../../../assets/image/community/emoji.png")
                    : require("../../../assets/image/community/emoji_color.png")
                }
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={async () => {
              if (this.state.reply != "" && this.checkSpace(this.state.reply)) {
                var reply = new Object();
                reply.content = this.state.reply;
                reply.postsIndex = this.props.getPosts.postsIndex;
                reply.isAnonymous = this.state.anonymous;
                if (this.state.form == "reply") {
                  //댓글 작성
                  await TalkActions.createPostsReply(reply);
                } else if (this.state.form == "update") {
                  //댓글 수정
                  reply.postsReplyIndex = this.state.replyIndex;
                  await TalkActions.updatePostsReply(reply);
                  await this.setState({ form: "reply" });
                } else {
                  //대댓글 작성
                  reply.parentsPostsReplyIndex = this.state.replyIndex;
                  await TalkActions.createPostsReply(reply);
                  await this.setState({ form: "reply" });
                }
                Keyboard.dismiss();
                await this.setState({
                  reply: "",
                  emoji: false,
                  selected_emoji: null
                });
                await TalkActions.pageListPostsReply(
                  "page=1&count=100",
                  this.props.getPosts.postsIndex
                );
              }
            }}
          >
            <Image
              style={{
                width: widthPercentageToDP(28),
                height: widthPercentageToDP(28),
                marginLeft: widthPercentageToDP(5)
              }}
              source={require("../../../assets/image/community/reply_write.png")}
            />
          </TouchableOpacity>
        </View>
        {this.state.emoji == true ? (
          <View
            style={{
              backgroundColor: "white",
              height: widthPercentageToDP(214)
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: widthPercentageToDP(21),
                marginLeft: widthPercentageToDP(25)
              }}
              onPress={() => this.setState({ selected_emoji: 1 })}
            >
              <Image
                style={{
                  width: widthPercentageToDP(30),
                  height: widthPercentageToDP(45)
                }}
                source={require("../../../assets/image/community/handamon.png")}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image_single: {
    width: widthPercentageToDP(375),
    height: widthPercentageToDP(235),
    // borderRadius: widthPercentageToDP(4),
    resizeMode: "cover",
    overlayColor: "white"
  },
  image_multi: {
    width: widthPercentageToDP(130),
    height: widthPercentageToDP(130),
    borderRadius: widthPercentageToDP(4),
    resizeMode: "cover",
    overlayColor: "white",
    marginHorizontal: widthPercentageToDP(6)
  },
  image_single_tle: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    // width: '100%',
    height: widthPercentageToDP(235)
  },
  image_multi_tle: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    // width: '100%',
    height: widthPercentageToDP(130)
  },
  image_single_gif: {
    position: "absolute",
    width: widthPercentageToDP(45),
    height: widthPercentageToDP(22),
    fontSize: widthPercentageToDP(14),
    borderRadius: widthPercentageToDP(4),
    textAlign: "center",
    backgroundColor: "#4a4a4a",
    color: "white"
  },
  image_multi_gif: {
    position: "absolute",
    width: widthPercentageToDP(31),
    height: widthPercentageToDP(15),
    fontSize: widthPercentageToDP(10),
    borderRadius: widthPercentageToDP(4),
    textAlign: "center",
    backgroundColor: "#4a4a4a",
    color: "white"
  }
});

export default connect(state => ({
  categoryList: state.talk.categoryList,
  categoryIndex: state.talk.categoryIndex,
  postsList: state.talk.postsList,
  getPosts: state.talk.getPosts,

  replysList: state.talk.replysList,

  filter: state.talk.filter,
  orderby: state.talk.orderby,

  bottomModal: state.talk.bottomModal,
  imageModal: state.talk.imageModal,
  imageIndex: state.talk.imageIndex,
  alertModal: state.talk.alertModal,
  alertText: state.talk.alertText
}))(TalkDetail);