import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  BackHandler
} from "react-native";
import { widthPercentageToDP, timeSince } from "../../utils/util";
import fonts from "../../configs/fonts";
import { connect } from "react-redux";
import { TalkActions } from "../../store/actionCreator";
import { UIActivityIndicator } from "react-native-indicators";
import {
  WritePostBtn,
  HotPostsListItem,
  PostsListItem,
  ReportedPostsListItem
} from "../../components/talk/Button";
import { WritePostView, LineView } from "../../components/talk/View";
import { AlertModal } from "../../components/community/Modal";

class TalkAbout extends Component {
  constructor(props) {
    super(props);

    didBlurSubscription = this.props.navigation.addListener(
      "didFocus",
      async payload => {
        TalkActions.initGetPosts();
      }
    );

    this.state = {};
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.navigateBack();
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  navigateBack = async () => {
    await TalkActions.initPostList();
    this.props.navigation.goBack();
  };

  navigateTalkDetail = () => {
    this.props.navigation.navigate("TalkDetail");
  };

  navigateTalkWrite = () => {
    this.props.navigation.navigate("TalkWrite", {
      form: "write"
    });
  };

  navigateTalkSearch = () => {
    this.props.navigation.navigate("TalkSearch");
  };

  pageListPosts = () => {
    TalkActions.pageListPosts(
      this.props.filter,
      this.props.orderby,
      this.props.postsList.length / 6 + 1,
      6
    );
  };

  renderAlertModal = rendertext => {
    TalkActions.handleAlertModal(true);
    TalkActions.handleAlertText(rendertext);
    setTimeout(() => {
      TalkActions.handleAlertModal(false);
    }, 1000);
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
        <AlertModal
          visible={this.state.alertmodal}
          text={this.state.alerttext}
        />
        <View
          style={{
            flexDirection: "row",
            width: widthPercentageToDP(375),
            height: widthPercentageToDP(60),
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
            {this.props.categoryList[this.props.categoryIndex - 1].str}
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
            if (item.status == "ACTIVE") {
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
            } else {
              return (
                <ReportedPostsListItem
                  handler={() => {
                    console.log("신고당한 댓글은 핸들러가 없지요.");
                  }}
                  data={item}
                />
              );
            }
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
  categoryIndex: state.talk.categoryIndex,
  postsList: state.talk.postsList,
  hotpostsList: state.talk.hotpostsList,
  total: state.talk.total,
  filter: state.talk.filter,
  orderby: state.talk.orderby,
  alertModal: state.talk.alertModal,
  alertText: state.talk.alertText
}))(TalkAbout);
