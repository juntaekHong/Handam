import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView
} from "react-native";
import { CTText, CEText } from "../../components/community/Text";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";
import { connect } from "react-redux";
import { TalkActions } from "../../store/actionCreator";

class TalkScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.start = false; // 버튼 중복 방지
  }

  navigateTalkAbout = () => {
    this.props.navigation.navigate("TalkAbout");
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
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
                  if (this.start) return;
                  this.start = true;
                  await TalkActions.handleCategoryIndex(index + 1);
                  await TalkActions.handleFilter(
                    `postsCategoryIndex eq ${this.props.categoryIndex}`
                  );
                  // await TalkActions.initPostList();
                  await TalkActions.pageListPosts(
                    this.props.filter,
                    this.props.orderby,
                    this.props.postsList.length / 6,
                    6
                  );
                  await TalkActions.pageListPosts(
                    this.props.filter,
                    "count DESC",
                    1,
                    2
                  );
                  this.navigateTalkAbout();
                  this.start = false;
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
                  <CTText>{item.str}</CTText>
                  <Image
                    style={{
                      width: widthPercentageToDP(13),
                      height: widthPercentageToDP(14),
                      marginLeft: widthPercentageToDP(5)
                    }}
                    source={require("../../../assets/image/community/new.png")}
                  />
                </View>
                <CEText>{item.explain}</CEText>
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
  categoryIndex: state.talk.categoryIndex,
  postsList: state.talk.postsList,
  filter: state.talk.filter,
  orderby: state.talk.orderby
}))(TalkScreen);
