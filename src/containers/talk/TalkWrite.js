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
  FlatList,
  Platform,
  BackHandler
} from "react-native";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import { connect } from "react-redux";
import { TalkActions } from "../../store/actionCreator";
import { UIActivityIndicator } from "react-native-indicators";
import ImageCropPicker from "react-native-image-crop-picker";
import { WriteBottom } from "../../components/talk/View";
import { ImageBTN } from "../../components/talk/Button";
import { CustomModalBlackText } from "../../components/talk/Text";
import { TitleView } from "../../components/community/View";
import { CustomModal } from "../../components/common/Modal";
import { AlertModal } from "../../components/community/Modal";

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
      alertModal: false,
      alertText: null,
      imageinfo: null,
      imageindex: null,
      anonymous:
        this.props.navigation.state.params.form == "update"
          ? this.props.getPosts.isAnonymous
          : 1
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.navigateTalkDetail();
      return true;
    });
  }

  navigateTalkDetail = () => {
    this.props.navigation.navigate("TalkDetail", {
      from: "write"
    });
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
              await TalkActions.getPosts(this.props.getPosts.postsIndex);
              this.navigateTalkDetail();
            } else {
              await TalkActions.createPosts(formData);
              await TalkActions.initPostList();

              const pro1 = TalkActions.pageListPosts(
                this.props.filter,
                this.props.orderby,
                this.props.postsList.length / 6,
                6
              );
              const pro2 = TalkActions.pageListPosts(
                this.props.filter,
                "count DESC",
                1,
                2
              );
              Promise.all([pro1, pro2]).then(this.navigateTalkAbout());
            }

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

  renderAlertModal = async rendertext => {
    await this.setState({ alertModal: true, alertText: rendertext });
    // TalkActions.handleAlertModal(true);
    // TalkActions.handleAlertText(rendertext);
    setTimeout(() => {
      this.setState({ alertModal: false });
      // TalkActions.handleAlertModal(false);
    }, 1000);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AlertModal
          visible={this.state.alertModal}
          text={this.state.alertText}
        />
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
        <TitleView
          titleName={"글쓰기"}
          leftChild={true}
          handler={this.navigateTalkDetail}
          rightChild={this.renderSubmit()}
        />
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
                  style={styles.titleinput}
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
                  style={styles.contentinput}
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
                  style={styles.imagelist}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  data={this.state.imageArray}
                  renderItem={({ item, index }) => {
                    return (
                      <ImageBTN
                        data={item}
                        handler={() => {
                          this.setState({
                            deletemodal: true,
                            imageinfo: item,
                            imageindex: index
                          });
                        }}
                      />
                    );
                  }}
                />
              ) : null}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <WriteBottom
          imageNum={this.state.imageNumber}
          anonymous={this.state.anonymous}
          addImage={this.onClickSelectPicture}
        />
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
  titleinput: {
    color: "#000000",
    width: widthPercentageToDP(335),
    fontSize: widthPercentageToDP(16),
    padding: 0
  },
  contentContainer: {
    width: widthPercentageToDP(343),
    height: widthPercentageToDP(295),
    marginTop: widthPercentageToDP(20),
    marginHorizontal: widthPercentageToDP(16)
  },
  contentinput: {
    color: "#000000",
    width: widthPercentageToDP(335),
    fontSize: widthPercentageToDP(16),
    padding: 0,
    textAlignVertical: "top"
  },
  line: {
    backgroundColor: "#dbdbdb",
    width: widthPercentageToDP(375),
    height: widthPercentageToDP(1)
  },
  imagelist: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%",
    marginTop: widthPercentageToDP(43),
    paddingHorizontal: widthPercentageToDP(16)
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
