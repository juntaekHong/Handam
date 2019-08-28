import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { connect } from "react-redux";
import { widthPercentageToDP } from "../../utils/util";
import { VoteActions } from "../../store/actionCreator";
import { PastVoteItem } from "../../components/vote/Button";
import { PastVoteName, PastVote } from "../../components/vote/Text";
import { TitleView } from "../../components/community/View";

class VotePast extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.navigateVote();

      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  navigateVote = () => {
    this.props.navigation.navigate("Vote");
  };

  navigateVotePastResult = voteindex => {
    VoteActions.handleLoading(true);
    this.props.navigation.navigate("VotePastResult", { index: voteindex });
  };

  renderListComponent = h => {
    return <View style={{ height: widthPercentageToDP(h) }} />;
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <TitleView
          titleName={"지난투표"}
          leftChild={true}
          handler={this.navigateVote}
        />

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
                  this.navigateVotePastResult(item.voteTopicIndex);
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
  getVote: state.vote.getVote,
  pastVoteList: state.vote.pastVoteList
}))(VotePast);
