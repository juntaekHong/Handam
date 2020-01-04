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
  KeyboardAvoidingView,
  Platform,
  BackHandler
} from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import { connect } from "react-redux";
import {MyInfoActions, TalkActions} from "../../store/actionCreator";
import navigators from "../../utils/navigators";
import { Top, Center, Bottom } from "../../components/talk/View";
import {
  CustomModalText,
  CustomModalBlackText,
  AnonymousOFFText,
  AnonymousONText
} from "../../components/talk/Text";
import { ImageModal } from "../../components/talk/Modal";
import { ZoomImageModal } from "../../components/restaurant/Modal";
import {
  ReplyView,
  Re_ReplyView,
  ReportDetailBody
} from "../../components/community/View";
import { BottomMenuModal, CustomModal } from "../../components/common/Modal";
import {
  WriteContainer,
  TextInputContainer,
  TitleView,
  SelectedEmojiView,
  EmojiListView
} from "../../components/community/View";
import {
  WriteButton,
  EmojiButton,
  AnonymousButton
} from "../../components/community/Button";
import { AlertModal } from "../../components/community/Modal";

class TalkDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      no_click: false,
      imageData: null,
      form: "reply", //textinput 상태 : 댓글생성(reply), 댓글수정(update), 답글생성(re_reply) 결정
      replyIndex: null,
      reply: "",
      temp_reply: "", //댓글내용 임시저장
      replyinfo: {}, //댓글정보 저장
      placeholder: "댓글을 입력하세요.",
      goodCount: null,
      isGood: null,
      isScrap: null,
      emoji: false,
      selected_emoji: null,
      who: "me",
      type: "posts",
      anonymous: 1,
      deletemodal: false,
      updatemodal: false,
      reportmodal: false,
      detailmodal: false,
      scrapmodal: false,
      alertModal: false,
      alertText: null,
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

    didBlurSubscription = this.props.navigation.addListener(
      "didFocus",
      async payload => {
        const promise1 = TalkActions.getPosts(
          this.props.navigation.state.params.postsIndex
        );
        const promise2 = TalkActions.pageListPostsReply(
          "page=1&count=100",
          this.props.navigation.state.params.postsIndex
        );
        Promise.all([promise1, promise2]).then(result => {
          // if (this.props.getPosts.imagePath.length > 0) {
          //   this.setState({
          //     imageData: eval("(" + this.props.getPosts.imagePath[0].path + ")")
          //       .image
          //   });
          // } else {
          //   this.setState({ imageData: [] });
          // }
          if (this.props.getPosts.imagePath.length > 0) {
            let arr = [];
            eval("(" + this.props.getPosts.imagePath[0].path + ")").image.map(
              (item, index) => arr.push({ url: item })
            );
            this.setState({ imageData: arr });
          }

          this.setState({
            goodCount: this.props.getPosts.goodCount,
            isGood: this.props.getPosts.isGood,
            isScrap: this.props.getPosts.isScrap
          });
          if (result[0] == "deleted") {
            this.renderAlertModal("존재하지 않는 게시글입니다.");
            this.navigateBack();
          }
          TalkActions.handleDetailloading(false);
        });
      }
    );
  }

  async componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      TalkActions.handleBottomModal(false);
      this.navigateBack();
      return true;
    });

    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidHide() {
    TalkActions.handleReplyModal(true);
  }

  navigateBack = async () => {
    if (
      this.props.navigation.state.params.from == "about" ||
      this.props.navigation.state.params.from == "write"
    ) {
      this.props.navigation.navigate("TalkAbout");
    } else if (this.props.navigation.state.params.from === "alarm") {
      navigators.navigateBack();
    } else if (this.props.navigation.state.params.from === "MyPost") {
      this.props.navigation.navigate("MyPost");
    } else if (this.props.navigation.state.params.from === "MyScrap") {
      this.props.navigation.navigate("MyScrap");
    } else {
      this.props.navigation.navigate("TalkSearch", {
        searchtext: this.props.navigation.state.params.searchtext
      });
    }
  };

  navigateTalkWrite = () => {
    this.props.navigation.navigate("TalkWrite", {
      form: "update"
    });
  };

  // 내가 쓴 글&내가 스크랩한 글에서 게시물을 수정 페이지 이동 후, 수정 or 취소 경우, 내가 쓴 글&내가 스크랩한 글로 이동하게
  navigateTalkWriteBackMyPost = () => {
    this.props.navigation.navigate("TalkWrite", {
      form: "update",
      from: "MyPost"
    });
  };

  navigateTalkWriteBackMyScrap = () => {
    this.props.navigation.navigate("TalkWrite", {
      form: "update",
      from: "MyScrap"
    });
  };

  deletePost = async () => {
    await TalkActions.deletePosts(this.props.getPosts.postsIndex);
    await TalkActions.initPostList();

    // 내가 쓴 글, 내가 스크랩한 글(자신의 게시물 스크랩 경우) 게시물 삭제 시, 리스트 초기화.
    await MyInfoActions.initPostsList();
    await MyInfoActions.initScrapsList();

    const pro1 = TalkActions.pageListPosts(
      this.props.filter,
      this.props.orderby,
      this.props.postsList.length / 15,
      15
    );
    const pro2 = TalkActions.pageListPosts(
      this.props.filter,
      "count DESC",
      1,
      2
    );

    // 내가 쓴 글, 내가 스크랩한 글 리스트 불러오기.
    const pro3 = MyInfoActions.pageListPostsByUserIndex(
        this.props.orderby,
        this.props.myPostsList.length / 7,
        7
    );

    const pro4 = MyInfoActions.pageListPostsByIsScrap(
        this.props.orderby,
        this.props.myScrapsList.length / 7,
        7
    );


    Promise.all([pro1, pro2, pro3, pro4]).then(() => {
      this.navigateBack();
      this.renderAlertModal("게시글이 삭제되었습니다.");
    });
  };

  reportPost = async () => {
    var posts = new Object();
    posts.postsIndex = this.props.getPosts.postsIndex;
    posts.content = this.props.getPosts.content;
    await TalkActions.createPostsReport(posts);
    TalkActions.getPosts(this.props.getPosts.postsIndex);
  };

  deleteReply = async () => {
    await TalkActions.deletePostsReply(this.state.replyIndex);
    TalkActions.pageListPostsReply(
      "page=1&count=100",
      this.props.getPosts.postsIndex
    );
  };

  updateReply = async () => {
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
    TalkActions.pageListPostsReply(
      "page=1&count=100",
      this.props.getPosts.postsIndex
    );
  };

  handleReportEUindex = index => {
    this.setState({ reportEUindex: index });
  };

  handleSelectedEmoji = index => {
    this.setState({ selected_emoji: index });
  };

  //사용자가 글쓴이인지 판단
  checkUser = async nick => {
    if (nick == this.props.userNickName) {
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

  space = () => {
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
            ListHeaderComponent={imageData.length == 1 ? null : this.space}
            ListFooterComponent={imageData.length == 1 ? null : this.space}
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
                  activeOpacity={1}
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
                    <View
                      style={
                        imageData.length == 1
                          ? styles.image_single_gif
                          : styles.image_multi_gif
                      }
                    >
                      <Text
                        style={
                          imageData.length == 1
                            ? styles.image_single_gif_text
                            : styles.image_multi_gif_text
                        }
                      >
                        GIF
                      </Text>
                    </View>
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
        style={styles.replylist}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={this.props.replysList}
        renderItem={({ item, index }) => {
          return (
            <View>
              {/* 댓글 */}
              <ReplyView
                key={index}
                isGoodButton={false}
                isReplyButton={true}
                isdotsButton={true}
                handler={async () => {
                  this.checkUser(item.userNickName);
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
                    placeholder: "답글을 입력하세요.",
                    replyIndex: item.postsReplyIndex
                  });
                  this.TextInput.focus();
                }}
                data={item}
                writerName={this.props.getPosts.userNickName}
              />
              {/* 답글 */}
              {item.childReplies.length != 0
                ? item.childReplies.map((item2, index) => {
                    return (
                      <Re_ReplyView
                        key={index}
                        handler={async () => {
                          this.checkUser(item2.userNickName);
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
    this.setState({ alertModal: true, alertText: rendertext });
    setTimeout(() => {
      this.setState({ alertModal: false });
    }, 1500);
  };

  render() {
    if (this.props.detailloading == true) {
      return <UIActivityIndicator color={"gray"} />;
    } else
      return (
        <SafeAreaView
          style={[
            styles.container,
            this.props.replysList.length == 0
              ? { backgroundColor: "#ffffff" }
              : { backgroundColor: "#f2f2f2" }
          ]}
        >
          <AlertModal
            visible={this.state.alertModal}
            text={this.state.alertText}
          />
          {/* <ImageModal
            visible={this.props.imageModal}
            close={() => TalkActions.handleImageModal(false)}
            images={this.state.imageData}
            index={this.props.imageIndex}
            indexhandle={TalkActions.handleImageIndex}
          /> */}
          <ZoomImageModal
            visible={this.props.imageModal}
            image={this.state.imageData}
            index={this.props.imageIndex}
            close={() => TalkActions.handleImageModal(false)}
          />

          <BottomMenuModal
            visible={this.props.bottomModal}
            handler={() => TalkActions.handleBottomModal(false)}
            updateHandler={
              this.state.type == "posts"
                ?
                  // 내가 쓴 글 or 내가 스크랩한 글 페이지를 통해 게시물을 들어와 수정할 경우, from 파미터로 수정페이지에서 수정 취소 or 수정완료할 경우 해당 페이지로 이동.
                  this.props.navigation.state.params != null && this.props.navigation.state.params.from === "MyPost" ?
                      this.navigateTalkWriteBackMyPost
                      :
                      this.props.navigation.state.params != null && this.props.navigation.state.params.from === "MyScrap" ?
                          this.navigateTalkWriteBackMyScrap
                          :
                          this.navigateTalkWrite
                : this.updateReply
            }
            deleteHandler={() => this.setState({ deletemodal: true })}
            reportHandler={() => this.setState({ detailmodal: true })}
            who={this.state.who}
          />
          {/* <CustomModal
            height={widthPercentageToDP(201.9)}
            children={
              <CustomModalBlackText>
                댓글 작성을 취소하시겠습니까?
              </CustomModalBlackText>
            }
            visible={this.props.replyModal}
            footerHandler={() => {
              TalkActions.handleReplyModal(false);
              this.setState({
                form: "reply",
                reply: "",
                placeholder: "댓글을 입력해주세요."
              });
            }}
            closeHandler={() => {
              TalkActions.handleReplyModal(false);
              this.TextInput.focus();
            }}
          /> */}
          <CustomModal
            height={201.9}
            children={
              <CustomModalBlackText>
                해당 글을 삭제하겠습니까?
              </CustomModalBlackText>
            }
            visible={this.state.deletemodal}
            footerHandler={() => {
              this.state.type == "posts"
                ? this.deletePost()
                : this.deleteReply();
              this.setState({ deletemodal: false });
            }}
            closeHandler={() => this.setState({ deletemodal: false })}
          />
          {/* <CustomModal
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
              this.setState({ reportmodal: false, detailmodal: true });
            }}
            closeHandler={() => this.setState({ reportmodal: false })}
          /> */}
          <CustomModal
            height={381}
            children={
              <ReportDetailBody
                handler={this.handleReportEUindex}
                reportEUindex={this.state.reportEUindex}
                reportEU={this.state.reportEU}
              />
            }
            visible={this.state.detailmodal}
            footerDisabled={this.state.reportEUindex == null ? true : false}
            footerHandler={async () => {
              this.state.type == "posts"
                ? await this.reportPost()
                : await this.reportReply();
              this.setState({
                detailmodal: false,
                reportEUindex: null
              });
              // this.renderAlertModal("신고가 완료되었습니다.");
            }}
            closeHandler={() =>
              this.setState({ detailmodal: false, reportEUindex: null })
            }
          />
          <CustomModal
            height={201.9}
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

              await MyInfoActions.initScrapsList();

              await TalkActions.putPostsSubscriber(posts);
              if (this.state.isScrap == true) {
                setTimeout(() => {
                  // 스크랩 취소 시, 나의 스크랩 리스트 초기화 및 불러오기
                  MyInfoActions.pageListPostsByIsScrap(
                      this.props.orderby,
                      this.props.myScrapsList.length / 7,
                      7
                  );

                  this.setState({ isScrap: false });
                }, 500);
                // this.renderAlertModal("스크랩을 취소하였습니다.");
              } else {
                setTimeout(() => {
                  // 스크랩 취소 후 재스크랩 시, 나의 스크랩 리스트 초기화 및 불러오기
                  MyInfoActions.pageListPostsByIsScrap(
                      this.props.orderby,
                      this.props.myScrapsList.length / 7,
                      7
                  );

                  this.setState({ isScrap: true });
                }, 500);
                // this.renderAlertModal("이 글을 스크랩하였습니다.");
              }
              this.setState({ scrapmodal: false });
            }}
            closeHandler={() => this.setState({ scrapmodal: false })}
          />

          <TitleView
            titleName={this.props.getPosts.postsCategoryName}
            leftChild={true}
            handler={this.navigateBack}
          />

          <ScrollView
            ref={ref => {
              this.flatListRef = ref;
            }}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="never"
          >
            <View
              style={{
                backgroundColor: "white",
                width: widthPercentageToDP(375),
                paddingLeft: widthPercentageToDP(16)
              }}
            >
              <Top
                isScrap={this.state.isScrap}
                data={this.props.getPosts}
                handleScrap={() => this.setState({ scrapmodal: true })}
                handleDots={() => {
                  this.checkUser(this.props.getPosts.userNickName);
                  this.setState({ type: "posts" });
                  TalkActions.handleBottomModal(true);
                }}
              />
              <Center data={this.props.getPosts} />
              <Bottom
                isGood={this.state.isGood}
                goodCount={this.state.goodCount}
                data={this.props.getPosts}
                handleLike={async () => {
                  const posts = new Object();
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
              />
            </View>
            {this.renderImages()}
            {this.renderReplyList()}
          </ScrollView>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
            keyboardVerticalOffset={Platform.OS === "ios" ? 43 : 0}
            enabled
          >
            {/* 선택된 이모지뷰 */}
            {/* {this.state.selected_emoji != null ? (
            <SelectedEmojiView
              handler={() => this.setState({ selected_emoji: null })}
              selectedEmoji={this.state.selected_emoji}
            />
          ) : null} */}
            <WriteContainer>
              <TextInputContainer>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AnonymousButton
                    handler={async () => {
                      this.state.anonymous == 0
                        ? await this.setState({ anonymous: 1 })
                        : await this.setState({ anonymous: 0 });
                    }}
                    anonymous={this.state.anonymous}
                  />
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
                  style={styles.textInput}
                  underlineColorAndroid="transparent"
                  onChangeText={reply => this.setState({ reply })}
                  onFocus={() => this.setState({ emoji: false })}
                  placeholder={this.state.placeholder}
                  placeholderTextColor={"#929292"}
                  value={this.state.reply}
                  maxLength={1000}
                  numberOfLines={1}
                  autoCapitalize={"none"}
                  multiline={true}
                />
                {/* <EmojiButton
                handler={async () => {
                  await Keyboard.dismiss();
                  this.state.emoji == false
                    ? this.setState({ emoji: true })
                    : this.setState({ emoji: false });
                }}
                emoji={this.state.emoji}
              /> */}
              </TextInputContainer>
              <WriteButton
                no_click={this.state.no_click}
                handler={async () => {
                  if (
                    this.state.reply != "" &&
                    this.checkSpace(this.state.reply)
                  ) {
                    await this.setState({ no_click: true });
                    var reply = new Object();
                    reply.content = this.state.reply;
                    reply.postsIndex = this.props.getPosts.postsIndex;
                    reply.isAnonymous = this.state.anonymous;
                    if (this.state.form == "reply") {
                      //댓글 작성
                      await TalkActions.createPostsReply(reply);
                      this.renderAlertModal("댓글이 작성되었습니다.");
                    } else if (this.state.form == "update") {
                      //댓글 수정
                      reply.postsReplyIndex = this.state.replyIndex;
                      await TalkActions.updatePostsReply(reply);
                      this.renderAlertModal("댓글이 수정되었습니다.");
                    } else {
                      //대댓글 작성
                      reply.parentsPostsReplyIndex = this.state.replyIndex;
                      await TalkActions.createPostsReply(reply);
                      this.renderAlertModal("답글이 작성되었습니다.");
                    }
                    Keyboard.dismiss();
                    await TalkActions.pageListPostsReply(
                      "page=1&count=100",
                      this.props.getPosts.postsIndex
                    );
                    if (this.state.form == "reply") {
                      setTimeout(() => {
                        this.flatListRef.scrollToEnd();
                      }, 500);
                    }
                    this.setState({
                      no_click: false,
                      form: "reply",
                      reply: "",
                      placeholder: "댓글을 입력하세요",
                      emoji: false,
                      selected_emoji: null
                    });
                  }
                }}
              />
            </WriteContainer>
          </KeyboardAvoidingView>

          {/* 이모지 리스트뷰 */}
          {/* {this.state.emoji == true ? (
            <EmojiListView handler={this.handleSelectedEmoji} />
          ) : null} */}
        </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  replylist: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    padding: widthPercentageToDP(16)
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
    width: widthPercentageToDP(44),
    height: widthPercentageToDP(20),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: widthPercentageToDP(323),
    marginTop: widthPercentageToDP(208),
    borderRadius: widthPercentageToDP(3),
    borderWidth: widthPercentageToDP(0.5),
    borderColor: "#e0e0e0",
    backgroundColor: "#e0e0e0"
  },
  image_multi_gif: {
    position: "absolute",
    width: widthPercentageToDP(35),
    height: widthPercentageToDP(15),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: widthPercentageToDP(95),
    marginTop: widthPercentageToDP(109),
    paddingTop: widthPercentageToDP(2),
    borderRadius: widthPercentageToDP(3),
    borderWidth: widthPercentageToDP(0.5),
    borderColor: "#e0e0e0",
    backgroundColor: "#e0e0e0"
  },
  image_single_gif_text: {
    color: "#000000",
    fontSize: widthPercentageToDP(13),
    fontFamily: fonts.nanumBarunGothicB
  },
  image_multi_gif_text: {
    color: "#000000",
    fontSize: widthPercentageToDP(11),
    fontFamily: fonts.nanumBarunGothicB
  },
  textInput: {
    color: "#000000",
    // width: widthPercentageToDP(216), //이모지 버튼 없을 경우에
    width: widthPercentageToDP(246), //이모지 버튼 있는 경우
    maxHeight: widthPercentageToDP(76),
    padding: widthPercentageToDP(0),
    paddingBottom: Platform.OS === "ios" ? widthPercentageToDP(5) : 0,
    margin: widthPercentageToDP(0),
    marginLeft: widthPercentageToDP(5),
    fontSize: widthPercentageToDP(14),
    fontFamily: fonts.nanumBarunGothic
  }
});

export default connect(state => ({
  postsList: state.talk.postsList,
  getPosts: state.talk.getPosts,

  replysList: state.talk.replysList,

  filter: state.talk.filter,
  orderby: state.talk.orderby,
  detailloading: state.talk.detailloading,

  bottomModal: state.talk.bottomModal,
  imageModal: state.talk.imageModal,
  imageIndex: state.talk.imageIndex,
  replyModal: state.talk.replyModal,

  userNickName: state.signin.user.userNickName,

  // 내가 쓴 글, 스크랩한 글
  myPostsList: state.myInfo.postsList,
  myScrapsList: state.myInfo.scrapsList,
}))(TalkDetail);
