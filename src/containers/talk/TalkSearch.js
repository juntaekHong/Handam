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
      filter: `postsCategoryIndex eq ${this.props.categoryIndex}`,
      loading: false
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
    // TalkActions.handleAboutloading(true);
    this.props.navigation.navigate("TalkAbout");
    // await TalkActions.initpageListPostsforSearch();
    // await TalkActions.pageListPostsForSearch(
    //   this.props.filter,
    //   this.props.orderby,
    //   this.props.searchpostsList.length / 15 + 1,
    //   15
    // );
    // TalkActions.handleAboutloading(false);
  };

  navigateTalkDetail = postsIndex => {
    TalkActions.handleDetailloading(true);
    this.props.navigation.navigate("TalkDetail", {
      from: "search",
      postsIndex: postsIndex,
      searchtext: this.state.text
    });
  };

  pageListPostsForSearch = async () => {
    await this.setState({ loading: true });
    const text = this.state.text.replace(/ /gi,'');
    await TalkActions.pageListPostsForSearch(
      this.state.filter +
        ` AND ( ( title LIKE ${text} ) OR ( content LIKE ${text} ) )`,
      this.props.orderby,
      this.props.searchpostsList.length / 15 + 1,
      15
    );
    await this.setState({ loading: false });
  };

  renderListFooter = () => {
    return this.state.loading ? <BottomLoading /> : null;
  };

  renderPostslist = () => {
    if (this.props.detailloading == true) {
      return <UIActivityIndicator color={"gray"} />;
    } else if (this.props.searchTotal !== 0) {
      return (
        <FlatList
          style={styles.flatlist}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.01}
          onEndReached={() =>
            this.props.searchpostsList.length < this.props.searchTotal
              ? this.pageListPostsForSearch()
              : null
          }
          ListFooterComponent={this.renderListFooter}
          data={this.props.searchpostsList}
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
                TalkActions.handleDetailloading(true);
                const text = this.state.text.replace(/ /gi,'');
                console.log({text})
                await TalkActions.initpageListPostsforSearch();
                await TalkActions.pageListPostsForSearch(
                  this.state.filter +
                    ` AND ( ( title LIKE ${text} ) OR ( content LIKE ${text} ) )`,
                  this.props.orderby,
                  this.props.searchpostsList.length / 15,
                  15
                );
                TalkActions.handleDetailloading(false);
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
  searchpostsList: state.talk.searchpostsList,
  searchTotal: state.talk.searchTotal,
  filter: state.talk.filter,
  orderby: state.talk.orderby,
  detailloading: state.talk.detailloading
}))(TalkSearch);
