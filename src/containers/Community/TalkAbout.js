import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList
} from "react-native";
import { widthPercentageToDP, timeSince } from "../../utils/util";
import fonts from "../../configs/fonts";
import { connect } from "react-redux";
import { TalkActions } from "../../store/actionCreator";
import { UIActivityIndicator } from "react-native-indicators";
import {
  WritePostBtn,
  PostsListItem,
  HotPostsListItem
} from "../../components/talk/Button";
import { WritePostView, LineView } from "../../components/talk/View";

class TalkAbout extends Component {
  constructor(props) {
    super(props);

    didBlurSubscription = this.props.navigation.addListener(
      "didFocus",
      async payload => {
        TalkActions.initGetPosts();
      }
    );

    this.state = {
      categoryName: this.props.categoryList[
        this.props.navigation.state.params.category
      ].str
    };
  }

  navigateBack = () => {
    this.props.navigation.goBack();
  };

  navigateTalkDetail = () => {
    this.props.navigation.navigate("TalkDetail", {
      category: this.props.navigation.state.params.category
    });
  };

  navigateTalkWrite = () => {
    this.props.navigation.navigate("TalkWrite", {
      category: this.props.navigation.state.params.category,
      form: "upload"
    });
  };

  navigateTalkSearch = () => {
    this.props.navigation.navigate("TalkSearch", {
      category: this.props.navigation.state.params.category
    });
  };

  pageListPosts = () => {
    TalkActions.pageListPosts(
      this.props.filter,
      this.props.orderby,
      this.props.postsList.length / 6 + 1,
      6
    );
  };

  renderListHeader = () => {
    return (
      <FlatList
        style={{ backgroundColor: "#ffffff", width: "100%" }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={this.props.hotpostsList}
        renderItem={({ item, index }) => {
          return (
            <HotPostsListItem
              handler={async () => {
                await TalkActions.getPosts(item.postsIndex);
                await TalkActions.pageListPostsReply(
                  "page=1&count=100",
                  item.postsIndex
                );
                this.navigateTalkDetail();
              }}
              data={item}
              index={index}
            />
          );
        }}
      />
    );
  };

  renderListFooter = () => {
    return this.props.loading ? (
      <View style={styles.listFooterContainer}>
        <UIActivityIndicator size={widthPercentageToDP(20)} color={"#727272"} />
      </View>
    ) : (
      <View>{null}</View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            width: widthPercentageToDP(375),
            height: widthPercentageToDP(53),
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: widthPercentageToDP(11),
            paddingBottom: widthPercentageToDP(14)
          }}
        >
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
          <Text
            style={{
              color: "#000000",
              fontSize: widthPercentageToDP(17),
              fontFamily: fonts.nanumBarunGothicB
            }}
          >
            {this.state.categoryName}
          </Text>
          <TouchableOpacity
            onPress={async () => {
              await TalkActions.initPostList();
              this.navigateTalkSearch();
            }}
          >
            <Image
              style={{
                width: widthPercentageToDP(21),
                height: widthPercentageToDP(21),
                marginRight: widthPercentageToDP(16)
              }}
              source={require("../../../assets/image/community/search.png")}
            />
          </TouchableOpacity>
        </View>

        <LineView />

        <FlatList
          style={styles.flatlist}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.01}
          onEndReached={() =>
            this.props.postsList.length < this.props.total
              ? this.pageListPosts()
              : null
          }
          ListHeaderComponent={this.renderListHeader}
          ListFooterComponent={this.renderListFooter}
          data={this.props.postsList}
          renderItem={({ item, index }) => {
            return (
              <PostsListItem
                handler={async () => {
                  await TalkActions.getPosts(item.postsIndex);
                  await TalkActions.pageListPostsReply(
                    "page=1&count=100",
                    item.postsIndex
                  );
                  this.navigateTalkDetail();
                }}
                data={item}
              />
            );
          }}
        />
        <WritePostView>
          <WritePostBtn handler={this.navigateTalkWrite} />
        </WritePostView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  flatlist: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%"
  }
});

export default connect(state => ({
  categoryList: state.talk.categoryList,
  postsList: state.talk.postsList,
  hotpostsList: state.talk.hotpostsList,
  total: state.talk.total,
  filter: state.talk.filter,
  orderby: state.talk.orderby
}))(TalkAbout);
