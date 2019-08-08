import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  BackHandler
} from "react-native";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import { connect } from "react-redux";
import { TalkActions } from "../../store/actionCreator";
import {
  PostsListItem,
  ReportedPostsListItem
} from "../../components/talk/Button";

class TalkSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      filter: `postsCategoryIndex eq ${this.props.categoryIndex}`
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.navigateTalkAbout();
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  navigateTalkAbout = async () => {
    await TalkActions.initPostList();
    await TalkActions.pageListPosts(
      this.props.filter,
      this.props.orderby,
      this.props.postsList.length / 6 + 1,
      6
    );
    this.props.navigation.navigate("TalkAbout");
  };

  navigateTalkDetail = () => {
    this.props.navigation.navigate("TalkDetail", { from: "search" });
  };

  pageListPosts = async () => {
    await TalkActions.pageListPosts(
      this.state.filter +
        ` AND ( ( title LIKE ${this.state.text} ) OR ( content LIKE ${this.state.text} ) )`,
      this.props.orderby,
      this.props.postsList.length / 7 + 1,
      7
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

  renderPostslist = () => {
    if (this.props.total !== 0) {
      return (
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
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={{
              width: widthPercentageToDP(30),
              height: widthPercentageToDP(45),
              marginBottom: widthPercentageToDP(10)
            }}
            source={require("../../../assets/image/community/handamon.png")}
          />
          <Text
            style={{
              color: "#c3c3c3",
              fontSize: widthPercentageToDP(18),
              fontFamily: fonts.nanumBarunGothicB
            }}
          >
            게시판 글을 검색해보세요
          </Text>
        </View>
      );
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            width: widthPercentageToDP(375),
            height: widthPercentageToDP(60),
            justifyContent: "center",
            alignItems: "center",
            borderBottomColor: "#dbdbdb",
            borderBottomWidth: widthPercentageToDP(1)
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: widthPercentageToDP(299),
              height: widthPercentageToDP(40),
              alignItems: "center",
              borderWidth: widthPercentageToDP(1),
              borderRadius: widthPercentageToDP(20),
              borderColor: "#dbdbdb"
            }}
          >
            <Image
              style={{
                width: widthPercentageToDP(15),
                height: widthPercentageToDP(15),
                marginLeft: widthPercentageToDP(17),
                marginRight: widthPercentageToDP(8)
              }}
              source={require("../../../assets/image/community/search_in.png")}
            />
            <TextInput
              style={{
                color: "#000000",
                fontSize: widthPercentageToDP(14),
                fontFamily: fonts.nanumBarunGothic,
                width: widthPercentageToDP(244)
              }}
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ text })}
              placeholder={"글 제목, 내용을 입력해주세요."}
              placeholderTextColor={"#c3c3c3"}
              value={this.state.text}
              numberOfLines={1}
              autoCapitalize={"none"}
              returnKeyType={"search"}
              onSubmitEditing={async () => {
                // ` AND  ((title LIKE ${this.state.text}) OR (content LIKE ${this.state.text}))`
                await TalkActions.initPostList();
                await TalkActions.pageListPosts(
                  this.state.filter +
                    ` AND ( ( title LIKE ${this.state.text} ) OR ( content LIKE ${this.state.text} ) )`,
                  this.props.orderby,
                  this.props.postsList.length / 7,
                  7
                );
                console.log(this.props.postsList);
              }}
            />
          </View>
          <TouchableOpacity onPress={() => this.navigateTalkAbout()}>
            <Text
              style={{
                color: "#000000",
                fontSize: widthPercentageToDP(18),
                fontFamily: fonts.nanumBarunGothic,
                marginLeft: widthPercentageToDP(16)
              }}
            >
              취소
            </Text>
          </TouchableOpacity>
        </View>
        {this.renderPostslist()}
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
    width: widthPercentageToDP(375),
    height: widthPercentageToDP(122),
    justifyContent: "center",
    alignItems: "center"
  }
});

export default connect(state => ({
  categoryList: state.talk.categoryList,
  categoryIndex: state.talk.categoryIndex,
  postsList: state.talk.postsList,
  total: state.talk.total,
  filter: state.talk.filter,
  orderby: state.talk.orderby
}))(TalkSearch);
