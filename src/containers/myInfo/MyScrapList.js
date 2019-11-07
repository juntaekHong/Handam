import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList
} from "react-native";
import { widthPercentageToDP } from "../../utils/util";
import { SECText } from "../../components/myInfo/Text";
import { connect } from "react-redux";
import { MyInfoActions, TalkActions } from "../../store/actionCreator";
import {
  PostsListItem,
  ReportedPostsListItem
} from "../../components/talk/View";
import { UIActivityIndicator } from "react-native-indicators";

class MyScrapList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  navigategoBack = () => {
    this.props.navigation.goBack();
  };

  navigateTalkDetail = postsIndex => {
    TalkActions.handleDetailloading(true);
    this.props.navigation.navigate("TalkDetail", {
      from: "MyScrap",
      postsIndex: postsIndex
    });
  };

  async componentDidMount() {
    await MyInfoActions.postLoadingHandle(true);
    await MyInfoActions.initScrapsList();
    await MyInfoActions.pageListPostsByIsScrap(
      this.props.orderby,
      this.props.scrapsList.length / 7,
      7
    );
    await MyInfoActions.postLoadingHandle(false);
  }

  pageListScraps = async () => {
    await this.setState({ loading: true });
    await MyInfoActions.pageListPostsByIsScrap(
      this.props.orderby,
      this.props.scrapsList.length / 7 + 1,
      7
    );
    await this.setState({ loading: false });
  };

  renderListHeader = () => {
    return (
      <View
        style={{
          height: widthPercentageToDP(120.5),
          borderBottomWidth: widthPercentageToDP(0.5),
          borderBottomColor: "#888888"
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "flex-end",
            marginTop: widthPercentageToDP(16),
            marginRight: widthPercentageToDP(14)
          }}
          onPress={() => {
            this.navigategoBack();
          }}
        >
          <Image
            width={widthPercentageToDP(28)}
            height={widthPercentageToDP(28)}
            source={require("../../../assets/image/myInfo/close.png")}
          />
        </TouchableOpacity>
        <View
          style={{
            alignItems: "flex-start",
            marginTop: widthPercentageToDP(45),
            marginLeft: widthPercentageToDP(25)
          }}
        >
          <SECText>내가 스크랩한 글</SECText>
        </View>
      </View>
    );
  };

  renderListFooter = () => {
    return this.state.loading ? (
      <View style={styles.listFooterContainer}>
        <UIActivityIndicator size={widthPercentageToDP(30)} color={"#727272"} />
      </View>
    ) : null;
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.props.myPost_loading == true ? (
          <UIActivityIndicator color={"gray"} />
        ) : (
          <FlatList
            style={styles.flatlist}
            showsHorizontalScrollIndicator={false}
            data={this.props.scrapsList}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.01}
            onEndReached={() => {
              this.props.scrapsList.length < this.props.scrapsTotal
                ? this.pageListScraps()
                : null;
            }}
            ListHeaderComponent={this.renderListHeader}
            ListFooterComponent={this.renderListFooter}
            renderItem={({ item }) => {
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
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  divisionLine: {
    marginHorizontal: widthPercentageToDP(29),
    marginTop: widthPercentageToDP(11.5),
    height: widthPercentageToDP(1),
    backgroundColor: "#f8f8f8"
  },
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
  orderby: state.myInfo.orderby,
  scrapsList: state.myInfo.scrapsList,
  scrapsTotal: state.myInfo.scrapstotal,
  myPost_loading: state.myInfo.myPost_loading
}))(MyScrapList);
