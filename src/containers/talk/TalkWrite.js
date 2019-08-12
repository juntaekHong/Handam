import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
  Image,
  FlatList,
  Platform
} from "react-native";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import { connect } from "react-redux";
import { TalkActions } from "../../store/actionCreator";
import { UIActivityIndicator } from "react-native-indicators";

import ImageCropPicker from "react-native-image-crop-picker";

import {
  CustomModalBlackText,
  AnonymousOFFText,
  AnonymousONText
} from "../../components/talk/Text";
import { CustomModal } from "../../components/common/Modal";

class TalkWrite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title:
        this.props.navigation.state.params.form == "update"
          ? this.props.getPosts.title
          : "",
      content:
        this.props.navigation.state.params.form == "update"
          ? this.props.getPosts.content
          : "",
      clicked: false,
      imageTEMPArray:
        this.props.getPosts.imagePath != undefined &&
        this.props.getPosts.imagePath.length > 0
          ? eval("(" + this.props.getPosts.imagePath[0].path + ")").image
          : [],
      imageArray:
        this.props.getPosts.imagePath != undefined &&
        this.props.getPosts.imagePath.length > 0
          ? eval("(" + this.props.getPosts.imagePath[0].path + ")").image
          : [],
      imageNumber:
        this.props.getPosts.imagePath != undefined &&
        this.props.getPosts.imagePath.length > 0
          ? this.props.getPosts.imagePath.length
          : 0,
      imageSize: 0,
      deletemodal: false,
      imageinfo: null,
      imageindex: null,
      anonymous: 1
    };
  }

  navigationBack = () => {
    this.props.navigation.goBack();
  };

  navigateTalkAbout = () => {
    this.props.navigation.navigate("TalkAbout");
  };

  checkSpace = str => {
    if (str.replace(/(\s*)/g, "") == "") {
      return false;
    } else {
      return true;
    }
  };

  //이미지 선택
  onClickSelectPicture = async () => {
    try {
      let image = await ImageCropPicker.openPicker({
        width: 200,
        height: 200,
        mediaType: "photo",
        // cropping: true,
        includeBase64: true,
        cropperToolbarTitle: ""
      });

      // console.log('posts >> ')
      // console.log(Object.keys(image));
      // console.log('posts end')

      await this.setState({ imageSize: this.state.imageSize + image.size });

      if (this.state.imageSize < 10000000) {
        //이미지 총 합이 10MB보다 작으면
        await this.state.imageArray.push(image);
        await this.setState({ imageNumber: this.state.imageNumber + 1 });
      } else {
        this.setState({ imageSize: this.state.imageSize - image.size });
      }

      this.renderAlertModal("선택하신 이미지가 첨부되었습니다.");
    } catch (err) {
      // err.code : E_PICKER_CANCELLED,
      console.log(err);
    }
  };

  renderAlertModal = rendertext => {
    TalkActions.handleAlertModal(true);
    TalkActions.handleAlertText(rendertext);
    setTimeout(() => {
      TalkActions.handleAlertModal(false);
    }, 1000);
  };

  renderSubmit = () => {
    if (
      this.state.title != "" &&
      this.state.content != "" &&
      this.checkSpace(this.state.title) &&
      this.checkSpace(this.state.content) &&
      this.state.clicked == false
    ) {
      return (
        <TouchableOpacity
          style={styles.submit}
          activeOpacity={0.3}
          onPress={async () => {
            this.setState({ clicked: true });

            const formData = new FormData();
            const prevImage = new Array(); //유지 이미지 배열
            const removedImage = new Array(); //삭제 이미지 배열

            if (this.state.imageArray != null) {
              this.state.imageArray.map((item, i) => {
                if (typeof item == "string") {
                  this.state.imageTEMPArray.splice(
                    this.state.imageTEMPArray.indexOf(item),
                    1
                  ); //삭제된 s3 이미지 걸러내기
                  prevImage.push(item);
                } else {
                  formData.append("upload", {
                    uri: item.path,
                    type: `${item.mime}`,
                    name: `${i}.${item.mime.substr(
                      item.mime.indexOf("/") + 1,
                      item.mime.length - 1
                    )}`
                  });
                }
              });
              if (this.state.imageTEMPArray != null) {
                this.state.imageTEMPArray.map(item => {
                  removedImage.push(item);
                });
              }
              if (prevImage.length != 0)
                formData.append(
                  "prevPath",
                  JSON.stringify({ image: prevImage })
                );
              if (removedImage.length != 0)
                formData.append(
                  "removedPath",
                  JSON.stringify({ image: removedImage })
                );
            }
            formData.append("postsCategoryIndex", this.props.categoryIndex);
            formData.append("title", this.state.title);
            formData.append("content", this.state.content);
            formData.append("isAnonymous", this.state.anonymous);

            if (this.props.navigation.state.params.form == "update") {
              await TalkActions.updatePosts(
                formData,
                this.props.getPosts.postsIndex
              );
            } else {
              await TalkActions.createPosts(formData);
            }

            await TalkActions.initPostList();
            await TalkActions.handleFilter(
              `postsCategoryIndex eq ${this.props.categoryIndex}`
            );
            await TalkActions.pageListPosts(
              this.props.filter,
              this.props.orderby,
              this.props.postsList.length / 6,
              6
            );
            await TalkActions.pageListPosts(
              this.props.filter,
              "count DESC",
              1,
              2
            );
            this.navigateTalkAbout();
            if (this.props.navigation.state.params.form == "update") {
              this.renderAlertModal("게시글을 업데이트했습니다.");
            } else {
              this.renderAlertModal("게시글을 업로드했습니다.");
            }
          }}
        >
          <Text style={[styles.submitText]}>완료</Text>
        </TouchableOpacity>
      );
    } else if (this.state.clicked == true) {
      return (
        <View style={styles.submitDisable}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <UIActivityIndicator
              size={widthPercentageToDP(20)}
              color={"#ffffff"}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.submitDisable}>
          <Text style={[styles.submitText]}>완료</Text>
        </View>
      );
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomModal
          height={widthPercentageToDP(201.9)}
          children={
            <CustomModalBlackText>사진을 삭제하겠습니까?</CustomModalBlackText>
          }
          visible={this.state.deletemodal}
          footerHandler={() => {
            this.state.imageArray.splice(this.state.imageindex, 1); //선택된 이미지 제거
            this.setState({
              imageNumber: this.state.imageNumber - 1,
              imageSize: this.state.imageSize - this.state.imageinfo.size
            });
            this.setState({ deletemodal: false });
          }}
          closeHandler={() => this.setState({ deletemodal: false })}
        />
        <View
          style={{
            flexDirection: "row",
            width: widthPercentageToDP(375),
            height: widthPercentageToDP(60),
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: widthPercentageToDP(11),
            paddingBottom: widthPercentageToDP(14)
          }}
        >
          <Text
            style={{
              position: "absolute",
              width: widthPercentageToDP(375),
              color: "#000000",
              fontSize: widthPercentageToDP(17),
              fontFamily: fonts.nanumBarunGothicB,
              textAlign: "center"
            }}
          >
            글쓰기
          </Text>
          {this.renderSubmit()}
        </View>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          enabled
        >
          <ScrollView
            style={{ width: widthPercentageToDP(375) }}
            keyboardShouldPersistTaps="never"
          >
            <View style={{ flex: 1 }}>
              <View style={styles.line} />
              <View style={styles.titleContainer}>
                <TextInput
                  style={{
                    color: "#000000",
                    width: widthPercentageToDP(335),
                    // height: util.widthPercentageToDP(20),
                    fontSize: widthPercentageToDP(16),
                    padding: 0
                  }}
                  underlineColorAndroid="transparent"
                  onChangeText={title => this.setState({ title })}
                  placeholder={"제목"}
                  placeholderTextColor={"#929292"}
                  value={this.state.title}
                  maxLength={30}
                  numberOfLines={1}
                  autoCapitalize={"none"}
                  returnKeyType={"done"}
                  multiline={false}
                />
              </View>
              <View style={styles.line} />
              <View style={styles.contentContainer}>
                <TextInput
                  style={{
                    color: "#000000",
                    width: widthPercentageToDP(335),
                    //height: util.widthPercentageToDP(20),
                    fontSize: widthPercentageToDP(16),
                    padding: 0,
                    textAlignVertical: "top"
                  }}
                  underlineColorAndroid="transparent"
                  onChangeText={content => this.setState({ content })}
                  value={this.state.content}
                  placeholder="본문"
                  placeholderTextColor={"#929292"}
                  maxLength={1000}
                  numberOfLines={100}
                  autoCapitalize={"none"}
                  multiline={true}
                />
              </View>
              {this.state.imageArray.length != 0 ? (
                <FlatList
                  style={{
                    flexGrow: 1,
                    backgroundColor: "#ffffff",
                    width: "100%",
                    height: "100%",
                    marginTop: widthPercentageToDP(43),
                    paddingHorizontal: widthPercentageToDP(16)
                  }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  ListHeaderComponent={this.renderListHeader}
                  ListFooterComponent={this.renderListFooter}
                  data={this.state.imageArray}
                  renderItem={({ item, index }) => {
                    return (
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              deletemodal: true,
                              imageinfo: item,
                              imageindex: index
                            });
                          }}
                        >
                          <Image
                            style={{
                              width: widthPercentageToDP(95),
                              height: widthPercentageToDP(95),
                              marginRight: widthPercentageToDP(10),
                              borderRadius: widthPercentageToDP(4)
                            }}
                            resizeMode={"cover"}
                            source={
                              typeof item == "string"
                                ? { uri: `${item}` }
                                : {
                                    uri: `data:${item.mime};base64,${item.data}`
                                  }
                            }
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              ) : null}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View
          style={{
            flexDirection: "row",
            width: widthPercentageToDP(375),
            height: widthPercentageToDP(58),
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                marginLeft: widthPercentageToDP(16),
                marginRight: widthPercentageToDP(10)
              }}
              onPress={() => this.onClickSelectPicture()}
            >
              <Image
                style={{
                  width: widthPercentageToDP(28),
                  height: widthPercentageToDP(28)
                }}
                source={require("../../../assets/image/community/image.png")}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: "#c3c3c3",
                fontSize: widthPercentageToDP(13),
                fontFamily: fonts.nanumBarunGothic
              }}
            >
              사진추가 {this.state.imageNumber}/5 최대 10MB
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={async () => {
                this.state.anonymous == 0
                  ? await this.setState({ anonymous: 1 })
                  : await this.setState({ anonymous: 0 });
              }}
            >
              <Image
                style={{
                  width: widthPercentageToDP(28),
                  height: widthPercentageToDP(28)
                }}
                source={
                  this.state.anonymous == 0
                    ? require("../../../assets/image/community/anonymous_off.png")
                    : require("../../../assets/image/community/anonymous_on.png")
                }
              />
            </TouchableOpacity>
            {this.state.anonymous == 0 ? (
              <AnonymousOFFText
                style={{
                  marginRight: widthPercentageToDP(18),
                  marginLeft: widthPercentageToDP(2)
                }}
              >
                익명
              </AnonymousOFFText>
            ) : (
              <AnonymousONText
                style={{
                  marginRight: widthPercentageToDP(18),
                  marginLeft: widthPercentageToDP(2)
                }}
              >
                익명
              </AnonymousONText>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  submitText: {
    color: "white",
    fontSize: widthPercentageToDP(15),
    fontFamily: fonts.nanumBarunGothicB
  },
  submit: {
    backgroundColor: "#259ffa",
    width: widthPercentageToDP(74.7),
    height: widthPercentageToDP(31.5),
    justifyContent: "center",
    alignItems: "center",
    marginRight: widthPercentageToDP(16),
    borderRadius: widthPercentageToDP(29)
  },
  submitDisable: {
    backgroundColor: "#c3c3c3",
    width: widthPercentageToDP(74.7),
    height: widthPercentageToDP(31.5),
    justifyContent: "center",
    alignItems: "center",
    marginRight: widthPercentageToDP(16),
    borderRadius: widthPercentageToDP(29)
  },
  titleContainer: {
    width: widthPercentageToDP(343),
    height: widthPercentageToDP(19),
    marginVertical: widthPercentageToDP(20),
    marginHorizontal: widthPercentageToDP(16)
  },
  contentContainer: {
    width: widthPercentageToDP(343),
    height: widthPercentageToDP(295),
    marginTop: widthPercentageToDP(20),
    marginHorizontal: widthPercentageToDP(16)
  },
  line: {
    backgroundColor: "#dbdbdb",
    width: widthPercentageToDP(375),
    height: widthPercentageToDP(1)
  }
});

export default connect(state => ({
  categoryList: state.talk.categoryList,
  categoryIndex: state.talk.categoryIndex,
  postsList: state.talk.postsList,

  getPosts: state.talk.getPosts,

  filter: state.talk.filter,
  orderby: state.talk.orderby
}))(TalkWrite);
