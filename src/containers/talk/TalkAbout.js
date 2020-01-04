import React, { Component } from "react";
import {
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  FlatList,
  BackHandler
} from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { connect } from "react-redux";
import { TalkActions } from "../../store/actionCreator";
import { WritePostBTN, SearchBTN } from "../../components/talk/Button";
import {
  LineView,
  HotPostsListItem,
  PostsListItem,
  ReportedPostsListItem,
  BottomLoading
} from "../../components/talk/View";
import { TitleView } from "../../components/community/View";
import { AlertModal } from "../../components/community/Modal";

class TalkAbout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      refreshing: false,
      alertModal: false,
      alertText: null
    };

    didBlurSubscription = this.props.navigation.addListener(
      "didFocus",
      async payload => {
        TalkActions.initGetPosts();
      }
    );
  }

  async componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.navigateBack();
      return true;
    });

    this.getpostslist();
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  navigateBack = () => {
    this.props.navigation.navigate("Talk");
    // this.props.navigation.goBack();
  };

  navigateTalkDetail = (postsIndex, index) => {
    TalkActions.handleDetailloading(true);
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
      this.props.postsList.length / 15 + 1,
      15
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
      this.props.postsList.length / 15,
      15
    );

    const promise2 = TalkActions.pageListPosts(
      this.props.filter +
        ` AND status eq ACTIVE AND ( fromDate ge ${year}-${month}-01 AND toDate le ${year}-${month}-${lastDay} )`,
      "goodCount DESC",
      1,
      2
    );

    Promise.all([promise1, promise2]).then(() => {
      TalkActions.handleAboutloading(false);
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
    return this.state.loading ? <BottomLoading /> : null;
  };

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.getpostslist();
    this.setState({ refreshing: false });
  };

  render() {
    if (this.props.aboutloading == true) {
      return <UIActivityIndicator color={"gray"} />;
    } else
      return (
        <SafeAreaView style={styles.container}>
          <AlertModal
            visible={this.state.alertModal}
            text={this.state.alertText}
          />
          <TitleView
            titleName={this.props.navigation.state.params.categoryName}
            leftChild={true}
            handler={this.navigateBack}
            rightChild={
              <SearchBTN
                navigation={async () => {
                  await TalkActions.initpageListPostsforSearch();
                  this.navigateTalkSearch();
                }}
              />
            }
          />
          <LineView />
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
                return <ReportedPostsListItem data={item} />;
              }
            }}
          />
          <WritePostBTN handler={this.navigateTalkWrite} />
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
  postsList: state.talk.postsList,
  hotpostsList: state.talk.hotpostsList,
  total: state.talk.total,
  filter: state.talk.filter,
  orderby: state.talk.orderby,
  aboutloading: state.talk.aboutloading
}))(TalkAbout);
