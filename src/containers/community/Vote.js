import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  Keyboard
} from "react-native";
import { connect } from "react-redux";
import { VoteActions } from "../../store/actionCreator";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
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
      form: "reply",
      replyIndex: null,
      reply: "",
      temp_reply: "", //댓글내용 임시저장
      replyinfo: {}, //댓글정보 저장
      placeholder: "댓글을 입력해주세요",
      parentIndex: null,
      opushed:
        this.props.getVote.voteItem[0].voteItemIndex ===
        this.props.c_checkVote.voteItemIndex
          ? true
          : false,
      xpushed:
        this.props.getVote.voteItem[1].voteItemIndex ===
        this.props.c_checkVote.voteItemIndex
          ? true
          : false,
      who: "me",
      deletemodal: false,
      oxmodel: false,
      ox: null,
      selected_emoji: null,
      emoji: false
    };
  }

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

  checkUser = async () => {
    // const userId = await getData("userId"); //유저닉네임으로 변경해야함
    // if (this.props.getPosts.userNickName == userId) {
    //   this.setState({ who: "me" });
    // } else {
    //   this.setState({ who: "you" });
    // }
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

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
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
              해당 글을 삭제하겠습니까?
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
              ? [
                  await this.createVote(0),
                  this.setState({ opushed: true, oxmodel: false })
                ]
              : [
                  await this.createVote(1),
                  this.setState({ xpushed: true, oxmodel: false })
                ];
            await VoteActions.getVote();
          }}
          closeHandler={() => this.setState({ oxmodel: false })}
        />

        <ScrollView>
          <Image
            style={styles.background}
            source={require("../../../assets/image/community/vote_pung.png")}
          />
          <TopView>
            <NoticeText>{`투표 종료까지 ${"00:00:00"}\n제출된 선택은 수정이 안됩니다. 신중히 선택해주세요.`}</NoticeText>
            <SubjectText>{this.props.getVote.voteTopic.topicName}</SubjectText>
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
              <View style={{ width: widthPercentageToDP(23) }} />
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
              <TotalReplyText>{this.props.voteReplyList.length}</TotalReplyText>
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
                      isButton={false}
                      isdotsButton={false}
                      handler={async () => {
                        this.checkUser();
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

        {/* 선택된 이모지뷰 */}
        {this.state.selected_emoji != null ? (
          <SelectedEmojiView
            handler={() => this.setState({ selected_emoji: null })}
            selectedEmoji={this.state.selected_emoji}
          />
        ) : null}

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
              placeholder={this.state.placholder}
              placeholderTextColor={"#929292"}
              value={this.state.reply}
              maxLength={1000}
              numberOfLines={1}
              autoCapitalize={"none"}
              multiline={true}
            />
            <EmojiButton
              handler={async () => {
                await Keyboard.dismiss();
                this.state.emoji == false
                  ? this.setState({ emoji: true })
                  : this.setState({ emoji: false });
              }}
              emoji={this.state.emoji}
            />
          </TextInputContainer>
          <WriteButton
            handler={async () => {
              if (this.state.reply != "" && this.checkSpace(this.state.reply)) {
                var reply = new Object();
                reply.content = this.state.reply;
                reply.voteTopicIndex = this.props.getVote.voteTopic.voteTopicIndex;

                if (this.state.form == "reply") {
                  //댓글 작성
                  await VoteActions.createVoteReply(reply);
                } else if (this.state.form == "update") {
                  //댓글 수정
                  reply.voteReplyIndex = this.state.replyIndex;
                  await VoteActions.updateVoteReply(reply);
                  await this.setState({ form: "reply" });
                } else {
                  //대댓글 작성
                  // reply.parentsVoteReplyIndex = this.state.parentIndex;
                  // await TalkActions.createPostsReply(reply);
                  // await this.setState({ form: "reply" });
                }

                Keyboard.dismiss();
                await this.setState({
                  reply: "",
                  emoji: false,
                  selected_emoji: null
                });

                await VoteActions.pageListVoteReply(
                  this.props.getVote.voteTopic.voteTopicIndex,
                  0
                );
              }
            }}
          />
        </WriteContainer>

        {/* 이모지 리스트뷰 */}
        {this.state.emoji == true ? (
          <EmojiListView handler={this.handleSelectedEmoji} />
        ) : null}
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
    width: widthPercentageToDP(265),
    maxHeight: widthPercentageToDP(76),
    padding: widthPercentageToDP(0),
    margin: widthPercentageToDP(0),
    marginLeft: widthPercentageToDP(13),
    fontSize: widthPercentageToDP(14),
    fontFamily: fonts.nanumBarunGothic
  }
});

export default connect(state => ({
  getVote: state.vote.getVote,
  voteReplyList: state.vote.voteReplyList,
  c_checkVote: state.vote.c_checkVote,
  enable: state.vote.enable,
  bottomModal: state.vote.bottomModal
}))(Vote);
