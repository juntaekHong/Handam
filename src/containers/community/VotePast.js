import React, { Component } from "react";
import { SafeAreaView, View, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { widthPercentageToDP } from "../../utils/util";
import { VoteActions } from "../../store/actionCreator";
import { PastVoteItem } from "../../components/vote/Button";
import { PastVoteName, PastVote } from "../../components/vote/Text";
import { DefaultImage } from "../../components/community/Image";

class VotePast extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateVote = () => {
    this.props.navigation.navigate("Vote");
  };

  navigateVotePastResult = () => {
    this.props.navigation.navigate("VotePastResult");
  };

  renderListComponent = h => {
    return <View style={{ height: widthPercentageToDP(h) }} />;
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
          <PastVote>지난투표</PastVote>
          <TouchableOpacity
            style={{ marginLeft: widthPercentageToDP(10) }}
            onPress={() => {
              this.navigateVote();
            }}
          >
            <DefaultImage
              source={require("../../../assets/image/community/back.png")}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          style={{
            flexGrow: 1,
            width: "100%",
            height: "100%"
          }}
          contentContainerStyle={{ alignItems: "center" }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={this.renderListComponent(16)}
          ListfooterComponent={this.renderListComponent(12)}
          data={this.props.pastVoteList}
          renderItem={({ item, index }) => {
            return (
              <PastVoteItem
                onPress={async () => {
                  await VoteActions.getPastVote(item.voteTopicIndex);
                  await VoteActions.pageListVoteReply(item.voteTopicIndex, 1);
                  this.navigateVotePastResult();
                }}
              >
                <PastVoteName>{`Q. ${item.topicName}`}</PastVoteName>
              </PastVoteItem>
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

export default connect(state => ({
  pastVoteList: state.vote.pastVoteList
}))(VotePast);
