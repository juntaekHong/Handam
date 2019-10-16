import React, { Component } from "react";
import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP } from "../../utils/util";
import { connect } from "react-redux";
import {
  TalkActions,
  VoteActions,
  RestaurantActions
} from "../../store/actionCreator";
import { CategoryCard } from "../../components/talk/View";

class TalkScreen extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    TalkActions.listPostsCategory(); //카테고리 리스트 받아오는 부분
    VoteActions.handleLoading(true);
    RestaurantActions.handleLoading(true);
  }

  navigateTalkAbout = categoryName => {
    TalkActions.handleAboutloading(true);
    this.props.navigation.navigate("TalkAbout", { categoryName: categoryName });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.flatlist}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={this.props.categoryList}
          renderItem={({ item, index }) => {
            return (
              <CategoryCard
                data={item}
                navigation={async () => {
                  await TalkActions.handleCategoryIndex(index + 1);
                  await TalkActions.handleFilter(
                    `postsCategoryIndex eq ${this.props.categoryIndex}`
                  );
                  this.navigateTalkAbout(
                    this.props.categoryList[index].postsCategoryName
                  );
                }}
              />
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
  flatlist: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    marginTop: widthPercentageToDP(16),
    paddingHorizontal: widthPercentageToDP(16)
  }
});

export default connect(state => ({
  categoryList: state.talk.categoryList,
  categoryIndex: state.talk.categoryIndex
}))(TalkScreen);
