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
import { AlertModal } from "../../components/community/Modal";

class TalkAbout extends Component {
  constructor(props) {
    super(props);

    didBlurSubscription = this.props.navigation.addListener(
      "didFocus",
      async payload => {
        TalkActions.initGetPosts();
        this.props.navigation.state.params.scrollIndex != undefined
          ? this.flatlistRef.scrollToIndex({
              index: this.props.navigation.state.params.scrollIndex,
              viewPosition: 0.5
            })
          : null;
      }
    );

    this.state = {
      loading: false,
      refreshing: false,
      alertModal: false,
      alertText: null
    };
  }

  async componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.navigateBack();
      return true;
    });

    await TalkActions.handleCategoryIndex(
      this.props.navigation.state.params.categoryIndex
    );
    await TalkActions.handleFilter(
      `postsCategoryIndex eq ${this.props.categoryIndex}`
    );

    this.getpostslist();
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  navigateBack = () => {
    this.props.navigation.goBack();
  };

  navigateTalkDetail = (postsIndex, index) => {
    TalkActions.handleLoading(true);
    this.props.navigation.navigate("TalkDetail", {
      from: "about",
      postsIndex: postsIndex,
      scrollIndex: index
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
      this.props.postsList.length / 6 + 1,
      6
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
      this.props.postsList.length / 6,
      6
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
    this.setState({ alertModal: true, alertText: rendertext });
    // TalkActions.handleAlertModal(true);
    // TalkActions.handleAlertText(rendertext);
    setTimeout(() => {
      this.setState({ alertModal: false });
      // TalkActions.handleAlertModal(false);
    }, 1000);
  };

  renderListHeader = () => {
    return (
      <FlatList
        ref={ref => {
          this.hotflatRef = ref;
        }}
        scrollEnabled={false}
        style={{ backgroundColor: "#ffffff", width: "100%" }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={this.props.hotpostsList}
        renderItem={({ item, index }) => {
          return (
            <HotPostsListItem
              handler={() => {
                this.navigateTalkDetail(item.postsIndex, null);
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
          <AlertModal
            visible={this.state.alertModal}
            text={this.state.alertText}
          />
          <TitleView
            titleName={
              this.props.categoryList[this.props.categoryIndex - 1].str
            }
            leftChild={true}
            handler={this.navigateBack}
            rightChild={this.renderSearchBtn()}
          />

          <LineView />

          <View style={{ flex: 1 }}>
            <FlatList
              ref={ref => {
                this.flatlistRef = ref;
              }}
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
                        this.navigateTalkDetail(item.postsIndex, index);
                      }}
                      data={item}
                    />
                  );
                } else {
                  return (
                    <ReportedPostsListItem handler={() => {}} data={item} />
                  );
                }
              }}
            />
          </View>

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
