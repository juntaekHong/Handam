import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView
} from "react-native";
import { CategoryName, CategoryExplain } from "../../components/community/Text";
import { widthPercentageToDP } from "../../utils/util";
import { connect } from "react-redux";
import {
  TalkActions,
  VoteActions,
  RestaurantActions
} from "../../store/actionCreator";
import { AlertModal } from "../../components/community/Modal";

class TalkScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.start = false; // 버튼 중복 방지
  }

  async componentDidMount() {
    VoteActions.handleLoading(true);
    RestaurantActions.handleLoading(true);
  }

  navigateTalkAbout = index => {
    TalkActions.handleLoading(true);
    this.props.navigation.navigate("TalkAbout", { index: index });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AlertModal
          visible={this.props.alertModal}
          text={this.props.alertText}
        />
        <FlatList
          ref={ref => {
            this.flatListRef = ref;
          }}
          style={{
            flexGrow: 1,
            width: "100%",
            height: "100%",
            marginTop: widthPercentageToDP(16),
            paddingHorizontal: widthPercentageToDP(16)
          }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={this.props.categoryList}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.category}
                onPress={async () => {
                  this.navigateTalkAbout(index + 1);
                }}
              >
                <Image
                  style={{
                    position: "absolute",
                    width: widthPercentageToDP(343),
                    height: widthPercentageToDP(105)
                  }}
                  source={require("../../../assets/image/community/category.png")}
                />
                <Image
                  style={{
                    width: widthPercentageToDP(20),
                    height: widthPercentageToDP(13)
                  }}
                  source={require("../../../assets/image/community/quotation_color.png")}
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CategoryName>{item.str}</CategoryName>
                  <Image
                    style={{
                      width: widthPercentageToDP(13),
                      height: widthPercentageToDP(14),
                      marginLeft: widthPercentageToDP(5)
                    }}
                    source={require("../../../assets/image/community/new.png")}
                  />
                </View>
                <CategoryExplain>{item.explain}</CategoryExplain>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    alignItems: "center"
  },
  pageName: {
    width: widthPercentageToDP(79),
    height: widthPercentageToDP(18),
    textAlign: "center"
  },
  pageNameBottom: {
    backgroundColor: "#259ffa",
    height: widthPercentageToDP(2),
    marginTop: widthPercentageToDP(12)
  },
  category: {
    width: widthPercentageToDP(343),
    height: widthPercentageToDP(105),
    marginBottom: widthPercentageToDP(12),
    paddingTop: widthPercentageToDP(12),
    paddingLeft: widthPercentageToDP(12)
  }
});

export default connect(state => ({
  categoryList: state.talk.categoryList,
  alertModal: state.talk.alertModal,
  alertText: state.talk.alertText,
  filter: state.talk.filter,
  orderby: state.talk.orderby,

  getVote: state.vote.getVote,
  pastVoteList: state.vote.pastVoteList
}))(TalkScreen);
