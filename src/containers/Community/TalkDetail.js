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
import { ReplyView, Re_ReplyView } from "../../components/talk/View";
import { BottomMenuModal } from "../../components/common/Modal";

class TalkDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: "reply", //textinput 상태 : 댓글생성, 댓글수정, 답글생성 결정
      replyIndex: null,
      reply: "",
      content: "",
      placholder: "댓글을 입력하세요.",
      goodCount: this.props.getPosts.goodCount,
      isGood: this.props.getPosts.isGood,
      isScrap: this.props.getPosts.isScrap,
      emoji: false,
      who: "me",
      type: "posts"
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      TalkActions.handleBottomModal(false);
      this.navigateBack();
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  navigateBack = () => {
    this.props.navigation.goBack();
  };

  navigateTalkWrite = () => {
    this.props.navigation.navigate("TalkWrite", {
      category: this.props.navigation.state.params.category,
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
    this.navigateBack();
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
      reply: this.state.content
    });
    this.TextInput.focus();
  };

  //사용자가 글쓴이인지 판단
  checkUser = async () => {
    // const userId = await getData("userId"); //유저닉네임으로 변경해야함
    // if (this.props.getPosts.userNickName == userId) {
    //   this.setState({ who: "me" });
    // } else {
    //   this.setState({ who: "you" });
    // }
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
                    await this.imageIndexHandle(index);
                    await this.setState({ imagemodal: true });
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
                handler={async () => {
                  this.checkUser();
                  await this.setState({
                    content: item.content,
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
              />
              {/* 대댓글 */}
              {item.childReplies.length != 0
                ? item.childReplies.map((item2, index) => {
                    return (
                      <Re_ReplyView
                        handler={async () => {
                          this.checkUser();
                          await this.setState({
                            content: item2.content,
                            replyIndex: item2.postsReplyIndex,
                            type: "reply"
                          });
                          TalkActions.handleBottomModal(true);
                        }}
                        data={item2}
                      />
                    );
                  })
                : console.log("reply don't have re_reply")}
            </View>
          );
        }}
      />
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <BottomMenuModal
          visible={this.props.bottomModal}
          handler={() => TalkActions.handleBottomModal(false)}
          updateHandler={
            this.state.type == "posts"
              ? this.navigateTalkWrite
              : this.updatePostsReply
          }
          deleteHandler={
            this.state.type == "posts" ? this.deletePost : this.deletePostsReply
          }
          reportHandler={() => console.log("")}
          who={this.state.who}
        />
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            width: widthPercentageToDP(375),
            height: widthPercentageToDP(53),
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
            {
              this.props.categoryList[
                this.props.navigation.state.params.category
              ].str
            }
          </Text>
          <TouchableOpacity
            style={{ marginLeft: widthPercentageToDP(8) }}
            onPress={() => this.navigateBack()}
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
                  {this.props.getPosts.userNickName}
                </Text>
                <Text
                  style={{
                    color: "#929292",
                    fontSize: widthPercentageToDP(8),
                    fontFamily: fonts.nanumBarunGothicR,
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
                    var posts = new Object();
                    posts.postsIndex = this.props.getPosts.postsIndex;
                    posts.isScrap = this.state.isScrap == true ? 0 : 1; //스크랩:1 취소:0

                    TalkActions.putPostsSubscriber(posts);
                    this.state.isScrap == true
                      ? await this.setState({ isScrap: false })
                      : await this.setState({ isScrap: true });
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
                        fontFamily: fonts.nanumBarunGothicR,
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
                fontSize: widthPercentageToDP(16),
                fontFamily: fonts.nanumBarunGothicB,
                marginTop: widthPercentageToDP(15)
              }}
            >
              {this.props.getPosts.title}
            </Text>
            <Hyperlink linkDefault={true} linkStyle={{ color: "#2980b9" }}>
              <Text
                style={{
                  color: "#000000",
                  fontSize: widthPercentageToDP(13),
                  fontFamily: fonts.nanumBarunGothicR,
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
                    fontFamily: fonts.nanumBarunGothicR,
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
                    fontFamily: fonts.nanumBarunGothicR,
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

        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            width: widthPercentageToDP(375),
            maxHeight: widthPercentageToDP(101),
            minHeight: widthPercentageToDP(56),
            alignItems: "center",
            paddingVertical: widthPercentageToDP(8)
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
            <TextInput
              ref={input => {
                this.TextInput = input;
              }}
              style={{
                color: "#000000",
                width: widthPercentageToDP(265),
                maxHeight: widthPercentageToDP(76),
                padding: widthPercentageToDP(0),
                margin: widthPercentageToDP(0),
                marginLeft: widthPercentageToDP(13),
                fontSize: widthPercentageToDP(14),
                fontFamily: fonts.nanumBarunGothic
              }}
              underlineColorAndroid="transparent"
              onChangeText={reply => this.setState({ reply })}
              placeholder={this.state.placholder}
              placeholderTextColor={"#929292"}
              value={this.state.reply}
              maxLength={1000}
              numberOfLines={1}
              autoCapitalize={"none"}
              multiline={true}
            />
            <TouchableOpacity
              onPress={() => {
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
                await this.setState({ reply: "" });
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center"
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
  postsList: state.talk.postsList,
  getPosts: state.talk.getPosts,

  replysList: state.talk.replysList,

  filter: state.talk.filter,
  orderby: state.talk.orderby,

  bottomModal: state.talk.bottomModal
}))(TalkDetail);
