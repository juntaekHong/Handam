import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";
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
  PercentView
} from "../../components/vote/View";
import { ReplyView } from "../../components/community/View";
import { PastVote } from "../../components/vote/Text";

class VotePastResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyIndex: null,
      opushed:
        this.props.getPastVote.voteItem[0].voteItemIndex ===
        this.props.p_checkVote.voteItemIndex
          ? true
          : false,
      xpushed:
        this.props.getPastVote.voteItem[1].voteItemIndex ===
        this.props.p_checkVote.voteItemIndex
          ? true
          : false
    };
  }

  navigateVotePast = () => {
    this.props.navigation.navigate("VotePast");
  };

  percent = count => {
    const total = this.props.getPastVote.voteTopic.totalCount;
    if (total == 0) {
      return 0;
    } else {
      return Math.round(
        (count * 100) / this.props.getPastVote.voteTopic.totalCount
      );
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <View
          style={{
            backgroundColor: "#ffffff",
            flexDirection: "row",
            width: widthPercentageToDP(375),
            height: widthPercentageToDP(60),
            alignItems: "center"
          }}
        >
          <PastVote>지난투표 결과</PastVote>
          <TouchableOpacity
            style={{ marginLeft: widthPercentageToDP(10) }}
            onPress={() => {
              this.navigateVotePast();
            }}
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

        <ScrollView>
          <Image
            style={styles.background}
            source={require("../../../assets/image/community/vote_pung.png")}
          />
          <TopView>
            <NoticeText>{`투표가 종료되었습니다.`}</NoticeText>
            <SubjectText>
              {this.props.getPastVote.voteTopic.topicName}
            </SubjectText>
            <View style={{ flexDirection: "row" }}>
              <VoteView
                pushed={this.state.opushed}
                enabled={false}
                text="O"
                oText={this.props.getPastVote.voteItem[0].itemName}
              />
              <View style={{ width: widthPercentageToDP(23) }} />
              <VoteView
                pushed={this.state.xpushed}
                enabled={false}
                text="X"
                xText={this.props.getPastVote.voteItem[1].itemName}
              />
            </View>
            <PercentView
              number={this.props.getPastVote.voteTopic.totalCount}
              oPercent={this.percent(this.props.getPastVote.voteItem[0].count)}
              xPercent={this.percent(this.props.getPastVote.voteItem[1].count)}
            />
          </TopView>
          <BottomView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: widthPercentageToDP(16),
                paddingTop: widthPercentageToDP(16)
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
                {this.props.pastVoteReplyList.length}
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
              data={this.props.pastVoteReplyList}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    {/* 댓글 */}
                    <ReplyView key={index} data={item} />
                  </View>
                );
              }}
            />
          </BottomView>
        </ScrollView>
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
    width: widthPercentageToDP(216),
    maxHeight: widthPercentageToDP(76),
    padding: widthPercentageToDP(0),
    margin: widthPercentageToDP(0),
    marginLeft: widthPercentageToDP(5),
    fontSize: widthPercentageToDP(14),
    fontFamily: fonts.nanumBarunGothic
  }
});

export default connect(state => ({
  getPastVote: state.vote.getPastVote,
  pastVoteReplyList: state.vote.pastVoteReplyList,
  p_checkVote: state.vote.p_checkVote
}))(VotePastResult);
