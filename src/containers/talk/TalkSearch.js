import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  BackHandler
} from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import { connect } from "react-redux";
import { TalkActions } from "../../store/actionCreator";
import {
  PostsListItem,
  ReportedPostsListItem,
  BottomLoading,
  SearchNone,
  TextInputContainer,
  TextInputView
} from "../../components/talk/View";
import { SearchInIMG } from "../../components/talk/Image";
import { SearchCancelBTN } from "../../components/talk/Button";

class TalkSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text:
        this.props.navigation.state.params.searchtext != ""
          ? this.props.navigation.state.params.searchtext
          : "",
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
    TalkActions.handleLoading(true);
    this.props.navigation.navigate("TalkAbout");
    await TalkActions.initPostList();
    await TalkActions.pageListPosts(
      this.props.filter,
      this.props.orderby,
      this.props.postsList.length / 15 + 1,
      15
    );
    TalkActions.handleLoading(false);
  };

  navigateTalkDetail = postsIndex => {
    TalkActions.handleLoading(true);
    this.props.navigation.navigate("TalkDetail", {
      from: "search",
      postsIndex: postsIndex,
      searchtext: this.state.text
    });
  };

  pageListPosts = async () => {
    await TalkActions.pageListPosts(
      this.state.filter +
        ` AND ( ( title LIKE ${this.state.text} ) OR ( content LIKE ${this.state.text} ) )`,
      this.props.orderby,
      this.props.postsList.length / 15 + 1,
      15
    );
  };

  renderListFooter = () => {
    return this.props.loading ? <BottomLoading /> : null;
  };

  renderPostslist = () => {
    if (this.props.loading == true) {
      return <UIActivityIndicator color={"gray"} />;
    } else if (this.props.total !== 0) {
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
                  handler={() => {
                    this.navigateTalkDetail(item.postsIndex);
                  }}
                  data={item}
                />
              );
            } else {
              return <ReportedPostsListItem data={item} />;
            }
          }}
        />
      );
    } else {
      return <SearchNone />;
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TextInputContainer>
          <TextInputView>
            <SearchInIMG
              source={require("../../../assets/image/community/search_in.png")}
            />
            <TextInput
              style={styles.textinput}
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
                TalkActions.handleLoading(true);
                await TalkActions.initPostList();
                await TalkActions.pageListPosts(
                  this.state.filter +
                    ` AND ( ( title LIKE ${this.state.text} ) OR ( content LIKE ${this.state.text} ) )`,
                  this.props.orderby,
                  this.props.postsList.length / 7,
                  7
                );
                TalkActions.handleLoading(false);
              }}
            />
          </TextInputView>
          <SearchCancelBTN handler={this.navigateTalkAbout} />
        </TextInputContainer>
        {this.renderPostslist()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  flatlist: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%"
  },
  textinput: {
    color: "#000000",
    fontSize: widthPercentageToDP(14),
    fontFamily: fonts.nanumBarunGothic,
    width: widthPercentageToDP(244),
    justifyContent: "center",
    marginTop: widthPercentageToDP(1)
  }
});

export default connect(state => ({
  categoryIndex: state.talk.categoryIndex,
  postsList: state.talk.postsList,
  total: state.talk.total,
  filter: state.talk.filter,
  orderby: state.talk.orderby,
  loading: state.talk.loading
}))(TalkSearch);
