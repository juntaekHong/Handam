import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  BackHandler
} from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import { connect } from "react-redux";
import { TalkActions } from "../../store/actionCreator";
import {
  WritePostBtn,
  HotPostsListItem,
  PostsListItem,
  ReportedPostsListItem
} from "../../components/talk/Button";
import { WritePostView, LineView } from "../../components/talk/View";
import { TitleView } from "../../components/community/View";

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
      loading: false,
      refreshing: false
    };
  }

  async componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.navigateBack();
      return true;
    });

    await TalkActions.handleCategoryIndex(
      this.props.navigation.state.params.index
    );
    await TalkActions.handleFilter(
      `postsCategoryIndex eq ${this.props.categoryIndex}`
    );

    this.getpostslist();
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  navigateBack = async () => {
    this.props.navigation.goBack();
  };

  navigateTalkDetail = postsIndex => {
    TalkActions.handleLoading(true);
    this.props.navigation.navigate("TalkDetail", {
      from: "about",
      postsIndex: postsIndex
    });
  };

  navigateTalkWrite = () => {
    this.props.navigation.navigate("TalkWrite", {
      form: "write"
    });
  };

  navigateTalkSearch = () => {
    this.props.navigation.navigate("TalkSearch", { searchtext: "" });
  };

  pageListPosts = async () => {
    await this.setState({ loading: true });
    await TalkActions.pageListPosts(
      this.props.filter,
      this.props.orderby,
      this.props.postsList.length / 5 + 1,
      5
    );
    await this.setState({ loading: false });
  };

  getpostslist = async () => {
    await TalkActions.initPostList();

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    var lastDay = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();

    const promise1 = TalkActions.pageListPosts(
      this.props.filter,
      this.props.orderby,
      this.props.postsList.length / 5,
      5
    );

    const promise2 = TalkActions.pageListPosts(
      this.props.filter +
        ` AND status eq ACTIVE AND ( fromDate ge ${year}-${month}-01 AND toDate le ${year}-${month}-${lastDay} )`,
      "goodCount DESC",
      1,
      2
    );

    Promise.all([promise1, promise2]).then(() => {
      TalkActions.handleLoading(false);
    });
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
              handler={() => {
                this.navigateTalkDetail(item.postsIndex);
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
    return this.state.loading ? (
      <View style={styles.listFooterContainer}>
        <UIActivityIndicator size={widthPercentageToDP(30)} color={"#727272"} />
      </View>
    ) : null;
  };

  renderSearchBtn = () => {
    return (
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
    );
  };

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.getpostslist();
    this.setState({ refreshing: false });
  };

  render() {
    if (this.props.loading == true) {
      return <UIActivityIndicator color={"gray"} />;
    } else
      return (
        <SafeAreaView style={styles.container}>
          <TitleView
            titleName={
              this.props.categoryList[this.props.categoryIndex - 1].str
            }
            leftChild={true}
            handler={this.navigateBack}
            rightChild={this.renderSearchBtn()}
          />

          <LineView />
          {/* <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          > */}
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            style={styles.flatlist}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.01}
            onEndReached={() => {
              this.props.postsList.length < this.props.total
                ? this.pageListPosts()
                : null;
            }}
            ListHeaderComponent={this.renderListHeader}
            ListFooterComponent={this.renderListFooter}
            data={this.props.postsList}
            renderItem={({ item, index }) => {
              if (item.status == "ACTIVE") {
                return (
                  <PostsListItem
                    handler={() => {
                      this.navigateTalkDetail(item.postsIndex);
                    }}
                    data={item}
                  />
                );
              } else {
                return <ReportedPostsListItem handler={() => {}} data={item} />;
              }
            }}
          />
          {/* </ScrollView> */}
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
  },
  listFooterContainer: {
    height: widthPercentageToDP(122),
    width: widthPercentageToDP(375),
    justifyContent: "center",
    alignItems: "center"
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
  loading: state.talk.loading
}))(TalkAbout);
