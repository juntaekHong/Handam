import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  View,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { connect } from "react-redux";
import { VoteActions } from "../../store/actionCreator";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import { AlertModal } from "../../components/community/Modal";
import {
  NoticeText,
  SubjectText,
  TotalReText,
  TotalReplyText
} from "../../components/vote/Text";
import {
  TopView,
  BottomView,
  VoteView,
  PercentView,
  PreVoteView
} from "../../components/vote/View";
import { ReplyView } from "../../components/community/View";
import { CustomModalBlackText } from "../../components/talk/Text";
import {
  WriteContainer,
  TextInputContainer,
  SelectedEmojiView,
  EmojiListView
} from "../../components/community/View";
import { WriteButton, EmojiButton } from "../../components/community/Button";
import { BottomMenuModal, CustomModal } from "../../components/common/Modal";

class Vote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      no_click: false,
      form: "reply",
      replyIndex: null,
      reply: "",
      temp_reply: "", //댓글내용 임시저장
      replyinfo: {}, //댓글정보 저장
      placeholder: "댓글을 입력해주세요",
      parentIndex: null,
      opushed: false,
      xpushed: false,
      who: "me",
      deletemodal: false,
      oxmodel: false,
      ox: null,
      check: false,
      selected_emoji: null,
      emoji: false,
      dueTime: "loading"
    };
  }

  componentDidMount() {
    this.getVote();
  }

  componentWillUnmount() {
    clearInterval(Duetimeset);
  }

  getVote = async() => {
    const currentVote = await VoteActions.getVote();
    await VoteActions.pageListPastVote();
    if (currentVote) {
      //현재 진행중인 투표가 있으면
      const promise1 = VoteActions.checkVote(
        this.props.getVote.voteTopic.voteTopicIndex,
        0
      );
      const promise2 = VoteActions.pageListVoteReply(
        this.props.getVote.voteTopic.voteTopicIndex,
        0
      );
      Promise.all([promise1, promise2]).then(() => {
        this.IsPushed();
        if (this.props.dueDate != null) {
          Duetimeset = setInterval(() => this.DueTime(), 1000);
          this.DueTime();
        }
        VoteActions.handleLoading(false);
      });
    } else {
      //없으면
      const promise1 = VoteActions.getPastVote(
        this.props.pastVoteList[0].voteTopicIndex,
        0
      );
      const promise2 = VoteActions.checkVote(
        this.props.pastVoteList[0].voteTopicIndex,
        0
      );
      const promise3 = VoteActions.pageListVoteReply(
        this.props.pastVoteList[0].voteTopicIndex,
        0
      );
      Promise.all([promise1, promise2, promise3]).then(() => {
        VoteActions.handleEnable(false);
        this.IsPushed();
        if (this.props.dueDate != null) {
          Duetimeset = setInterval(() => this.DueTime(), 1000);
          this.DueTime();
        }
        VoteActions.handleLoading(false);
      });
    }
  }

  IsPushed = () => {
    this.props.getVote.voteItem[0].voteItemIndex ===
    this.props.c_checkVote.voteItemIndex
      ? this.setState({ opushed: true, check: true })
      : this.setState({ opushed: false });

    this.props.getVote.voteItem[1].voteItemIndex ===
    this.props.c_checkVote.voteItemIndex
      ? this.setState({ xpushed: true, check: true })
      : this.setState({ xpushed: false });
  };

  DueTime = () => {
    const today = new Date();
    const dueday = new Date(
      parseInt(this.props.dueDate.substring(0, 4), 10),
      parseInt(this.props.dueDate.substring(4, 6) - 1, 10),
      parseInt(this.props.dueDate.substring(6, 8), 10),
      parseInt(this.props.dueDate.substring(8, 10), 10),
      parseInt(this.props.dueDate.substring(10, 12), 10),
      parseInt(this.props.dueDate.substring(12, 14), 10)
    );

    const day_gap = dueday.getTime() - today.getTime();
    const day_gap_hour = Math.floor(day_gap / (1000 * 60 * 60));
    const time_gap = new Date(
      dueday.getFullYear() - today.getFullYear(),
      dueday.getMonth() - today.getMonth(),
      dueday.getDay() - today.getDay(),
      dueday.getHours() - today.getHours(),
      dueday.getMinutes() - today.getMinutes(),
      dueday.getSeconds() - today.getSeconds()
    );

    let hour_gap = day_gap_hour;
    let minute_gap = time_gap.getMinutes();
    let second_gap = time_gap.getSeconds();

    if (day_gap < 0) {
      clearInterval(Duetimeset);
      VoteActions.handleEnable(false);
      VoteActions.handleDueDateTime(null);
    }

    if (hour_gap < 10) {
      hour_gap = "0" + hour_gap;
    }
    if (minute_gap < 10) {
      minute_gap = "0" + minute_gap;
    }
    if (second_gap < 10) {
      second_gap = "0" + second_gap;
    }

    const gap = hour_gap + ":" + minute_gap + ":" + second_gap;
    this.setState({ dueTime: gap });
  };

  navigateVotePre = () => {
    this.props.navigation.navigate("VotePast");
  };

  percent = count => {
    const total = this.props.getVote.voteTopic.totalCount;
    if (total == 0) {
      return 0;
    } else {
      return Math.round(
        (count * 100) / this.props.getVote.voteTopic.totalCount
      );
    }
  };

  checkSpace = str => {
    if (str.replace(/(\s*)/g, "") == "") {
      return false;
    } else {
      return true;
    }
  };

  createVote = async index => {
    const vote = new Object();
    vote.voteTopicIndex = this.props.getVote.voteTopic.voteTopicIndex;
    vote.voteItemIndex = this.props.getVote.voteItem[index].voteItemIndex;
    await VoteActions.createVote(vote);
  };

  updateReply = async () => {
    await this.setState({
      form: "update",
      reply: this.state.temp_reply
    });
    this.TextInput.focus();
  };

  deleteReply = async () => {
    await VoteActions.deleteVoteReply(this.state.replyIndex);
    await VoteActions.pageListVoteReply(
      this.props.getVote.voteTopic.voteTopicIndex,
      0
    );
  };

  renderAlertModal = rendertext => {
    VoteActions.handleAlertModal(true);
    VoteActions.handleAlertText(rendertext);
    setTimeout(() => {
      VoteActions.handleAlertModal(false);
    }, 1000);
  };

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.getVote();
    this.setState({ refreshing: false });
    console.log("현수")
  };

  render() {
    if (this.props.loading == true) {
      return <UIActivityIndicator color={"gray"} />;
    } else
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
          <AlertModal
            visible={this.props.alertModal}
            text={this.props.alertText}
          />
          <BottomMenuModal
            visible={this.props.bottomModal}
            handler={() => VoteActions.handleBottomModal(false)}
            updateHandler={this.updateReply}
            deleteHandler={() => this.setState({ deletemodal: true })}
            who={this.state.who}
          />
          <CustomModal
            height={widthPercentageToDP(201.9)}
            children={
              <CustomModalBlackText>
                해당 댓글을 삭제하겠습니까?
              </CustomModalBlackText>
            }
            visible={this.state.deletemodal}
            footerHandler={() => {
              this.deleteReply();
              this.setState({ deletemodal: false });
            }}
            closeHandler={() => this.setState({ deletemodal: false })}
          />

          <CustomModal
            height={widthPercentageToDP(201.9)}
            children={
              <CustomModalBlackText>
                {`${this.state.ox}에 투표하시겠습니까?`}
              </CustomModalBlackText>
            }
            visible={this.state.oxmodel}
            footerHandler={async () => {
              VoteActions.handleEnable(false);
              this.state.ox == "O"
                ? [await this.createVote(0), this.setState({ opushed: true })]
                : [await this.createVote(1), this.setState({ xpushed: true })];
              this.setState({ oxmodel: false, check: true });
              await VoteActions.getVote();
            }}
            closeHandler={() => this.setState({ oxmodel: false })}
          />

          <ScrollView
            ref={ref => {
              this.flatlistRef = ref;
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="never"
          >
            <Image
              style={styles.background}
              source={require("../../../assets/image/community/vote_pung.png")}
            />
            <TopView>
              {this.props.dueDate != null ? (
                <NoticeText>{`투표 종료까지 ${this.state.dueTime}\n제출된 선택은 수정이 안됩니다. 신중히 선택해주세요.`}</NoticeText>
              ) : (
                <NoticeText>{`투표가 종료되었습니다.`}</NoticeText>
              )}
              <SubjectText>
                {this.props.getVote.voteTopic.topicName}
              </SubjectText>
              <View style={{ flexDirection: "row" }}>
                <VoteView
                  handler={async () => {
                    this.setState({ ox: "O", oxmodel: true });
                  }}
                  pushed={this.state.opushed}
                  enabled={this.props.enable}
                  text="O"
                  oText={this.props.getVote.voteItem[0].itemName}
                />
                <VoteView
                  handler={async () => {
                    this.setState({ ox: "X", oxmodel: true });
                  }}
                  pushed={this.state.xpushed}
                  enabled={this.props.enable}
                  text="X"
                  xText={this.props.getVote.voteItem[1].itemName}
                />
              </View>
              <PercentView
                number={this.props.getVote.voteTopic.totalCount}
                oPercent={this.percent(this.props.getVote.voteItem[0].count)}
                xPercent={this.percent(this.props.getVote.voteItem[1].count)}
                check={this.state.check}
              />
            </TopView>

            <PreVoteView handler={this.navigateVotePre} />

            <BottomView>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: widthPercentageToDP(16)
                }}
              >
                <TotalReText>전체 댓글</TotalReText>
                <Image
                  style={{
                    width: widthPercentageToDP(10.2),
                    height: widthPercentageToDP(9.9)
                  }}
                  source={require("../../../assets/image/community/replys.png")}
                />
                <TotalReplyText>
                  {this.props.voteReplyList.length}
                </TotalReplyText>
              </View>
              {/* 투표댓글 */}
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
                data={this.props.voteReplyList}
                renderItem={({ item, index }) => {
                  return (
                    <View>
                      {/* 댓글 */}
                      <ReplyView
                        key={index}
                        isGoodButton={false}
                        isReplyButton={false}
                        isdotsButton={
                          item.userNickName == this.props.userNickName
                            ? true
                            : false
                        }
                        handler={async () => {
                          await this.setState({
                            replyinfo: item,
                            temp_reply: item.content,
                            replyIndex: item.voteReplyIndex
                          });
                          VoteActions.handleBottomModal(true);
                        }}
                        data={item}
                        // writerName={this.props.getPosts.userNickName}
                      />
                    </View>
                  );
                }}
              />
            </BottomView>
          </ScrollView>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
            keyboardVerticalOffset={Platform.OS === "ios" ? 103 : 0}
            enabled
          >
            {/* 선택된 이모지뷰 */}
            {/* {this.state.selected_emoji != null ? (
          <SelectedEmojiView
            handler={() => this.setState({ selected_emoji: null })}
            selectedEmoji={this.state.selected_emoji}
          />
        ) : null} */}

            {/* {this.renderCreateReply} */}
            <WriteContainer>
              <TextInputContainer>
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
                    reply.voteTopicIndex = this.props.getVote.voteTopic.voteTopicIndex;

                    if (this.state.form == "reply") {
                      //댓글 작성
                      await VoteActions.createVoteReply(reply);
                      this.renderAlertModal("댓글이 작성되었습니다.");
                    } else if (this.state.form == "update") {
                      //댓글 수정
                      reply.voteReplyIndex = this.state.replyIndex;
                      await VoteActions.updateVoteReply(reply);
                      this.renderAlertModal("댓글이 수정되었습니다.");
                    } else {
                      //대댓글 작성
                      // reply.parentsVoteReplyIndex = this.state.parentIndex;
                      // await TalkActions.createPostsReply(reply);
                    }

                    Keyboard.dismiss();
                    await VoteActions.pageListVoteReply(
                      this.props.getVote.voteTopic.voteTopicIndex,
                      0
                    );
                    if (this.state.form == "reply") {
                      setTimeout(() => {
                        this.flatlistRef.scrollToEnd();
                      }, 500);
                    }
                    this.setState({
                      no_click: false,
                      form: "reply",
                      reply: "",
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
  background: {
    position: "absolute",
    width: widthPercentageToDP(343),
    height: widthPercentageToDP(379),
    marginTop: widthPercentageToDP(11),
    marginHorizontal: widthPercentageToDP(16)
  },
  textInput: {
    color: "#000000",
    // width: widthPercentageToDP(265), 이모지 버튼 있을때 넓이
    width: widthPercentageToDP(295), //이모지 버튼 없을때 넓이
    maxHeight: widthPercentageToDP(76),
    padding: widthPercentageToDP(0),
    paddingBottom: Platform.OS === "ios" ? widthPercentageToDP(5) : 0,
    margin: widthPercentageToDP(0),
    marginLeft: widthPercentageToDP(13),
    fontSize: widthPercentageToDP(14),
    fontFamily: fonts.nanumBarunGothic
  }
});

export default connect(state => ({
  getVote: state.vote.getVote,
  pastVoteList: state.vote.pastVoteList,
  voteReplyList: state.vote.voteReplyList,
  c_checkVote: state.vote.c_checkVote,
  enable: state.vote.enable,
  bottomModal: state.vote.bottomModal,
  loading: state.vote.loading,
  alertModal: state.vote.alertModal,
  alertText: state.vote.alertText,

  dueDate: state.vote.dueDate,
  dueTime: state.vote.dueTime,

  userNickName: state.signin.user.userNickName
}))(Vote);
