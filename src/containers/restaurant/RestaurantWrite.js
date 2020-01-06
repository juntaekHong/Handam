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
  Platform,
  BackHandler
} from "react-native";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import { connect } from "react-redux";
import { RestaurantActions } from "../../store/actionCreator";
import { UIActivityIndicator } from "react-native-indicators";
import ImageCropPicker from "react-native-image-crop-picker";
import { TitleView } from "../../components/community/View";
import {
  CustomModalBlackText,
  AnonymousOFFText,
  AnonymousONText
} from "../../components/talk/Text";
import { CustomModal } from "../../components/common/Modal";
import { LineView } from "../../components/restaurant/View";
import { AlertModal } from "../../components/community/Modal";

class RestaurantWrite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title:
        this.props.navigation.state.params.form == "update"
          ? this.props.getRestaurantReply.title
          : "",
      content:
        this.props.navigation.state.params.form == "update"
          ? this.props.getRestaurantReply.content
          : "",
      clicked: false,
      // imageTEMPArray:
      //   this.props.getRestaurantReply.imagePath != undefined &&
      //   this.props.getRestaurantReply.imagePath.length > 0
      //     ? eval("(" + this.props.getRestaurantReply.imagePath[0].path + ")").image
      //     : [],
      // imageArray:
      //   this.props.getRestaurantReply.imagePath != undefined &&
      //   this.props.getRestaurantReply.imagePath.length > 0
      //     ? eval("(" + this.props.getRestaurantReply.imagePath[0].path + ")").image
      //     : [],
      // imageNumber:
      //   this.props.getRestaurantReply.imagePath != undefined &&
      //   this.props.getRestaurantReply.imagePath.length > 0
      //     ? this.props.getRestaurantReply.imagePath.length
      //     : 0,
      imageSize: 0,
      deletemodal: false,
      imageinfo: null,
      imageindex: null,
      anonymous: 1
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.navigateRestaurantDetail();

      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  navigateRestaurantDetail = () => {
    this.props.navigation.navigate("RestaurantDetail", {
      likeHandler: this.props.navigation.state.params.handler
    });
  };

  checkSpace = str => {
    if (str.replace(/(\s*)/g, "") == "") {
      return false;
    } else {
      return true;
    }
  };

  //이미지 선택
  // onClickSelectPicture = async () => {
  //   try {
  //     let image = await ImageCropPicker.openPicker({
  //       width: 200,
  //       height: 200,
  //       mediaType: "photo",
  //       // cropping: true,
  //       includeBase64: true,
  //       cropperToolbarTitle: ""
  //     });

  //     await this.setState({ imageSize: this.state.imageSize + image.size });

  //     if (this.state.imageSize < 10000000) {
  //       //이미지 총 합이 10MB보다 작으면
  //       await this.state.imageArray.push(image);
  //       await this.setState({ imageNumber: this.state.imageNumber + 1 });
  //     } else {
  //       this.setState({ imageSize: this.state.imageSize - image.size });
  //     }

  //     this.renderAlertModal("선택하신 이미지가 첨부되었습니다.");
  //   } catch (err) {
  //     // err.code : E_PICKER_CANCELLED,
  //     console.log(err);
  //   }
  // };

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

            // const formData = new FormData();
            // const prevImage = new Array(); //유지 이미지 배열
            // const removedImage = new Array(); //삭제 이미지 배열

            // if (this.state.imageArray != null) {
            //   this.state.imageArray.map((item, i) => {
            //     if (typeof item == "string") {
            //       this.state.imageTEMPArray.splice(
            //         this.state.imageTEMPArray.indexOf(item),
            //         1
            //       ); //삭제된 s3 이미지 걸러내기
            //       prevImage.push(item);
            //     } else {
            //       formData.append("upload", {
            //         uri: item.path,
            //         type: `${item.mime}`,
            //         name: `${i}.${item.mime.substr(
            //           item.mime.indexOf("/") + 1,
            //           item.mime.length - 1
            //         )}`
            //       });
            //     }
            //   });
            //   if (this.state.imageTEMPArray != null) {
            //     this.state.imageTEMPArray.map(item => {
            //       removedImage.push(item);
            //     });
            //   }
            //   if (prevImage.length != 0)
            //     formData.append(
            //       "prevPath",
            //       JSON.stringify({ image: prevImage })
            //     );
            //   if (removedImage.length != 0)
            //     formData.append(
            //       "removedPath",
            //       JSON.stringify({ image: removedImage })
            //     );
            // }

            // formData.append("title", this.state.title);
            // formData.append("content", this.state.content);
            // formData.append("isAnonymous", this.state.anonymous);

            const body = new Object();
            body.title = this.state.title;
            body.content = this.state.content;

            this.props.navigation.state.params.form == "update"
              ? await RestaurantActions.updateRestaurantReply(
                  body,
                  this.props.navigation.state.params.replyIndex
                )
              : await RestaurantActions.createRestaurantReply(
                  body,
                  this.props.getRestaurant.restaurantIndex
                );

            await RestaurantActions.pageListRestaurantReply(
              this.props.getRestaurant.restaurantIndex
            );

            this.props.navigation.state.params.form == "update"
              ? this.renderAlertModal("리뷰가 수정되었습니다.")
              : this.renderAlertModal("리뷰가 작성되었습니다.");

            this.navigateRestaurantDetail();
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

  renderAlertModal = rendertext => {
    RestaurantActions.handleAlertModal(true);
    RestaurantActions.handleAlertText(rendertext);
    setTimeout(() => {
      RestaurantActions.handleAlertModal(false);
    }, 1500);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AlertModal
          visible={this.props.alertModal}
          text={this.props.alertText}
        />
        {/* <CustomModal
          height={201.9}
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
        /> */}
        <TitleView
          titleName={"글쓰기"}
          leftChild={true}
          handler={this.navigateRestaurantDetail}
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
              <LineView />
              <View style={styles.titleContainer}>
                <TextInput
                  style={styles.titleInput}
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

              <LineView />

              <View style={styles.contentContainer}>
                <TextInput
                  style={styles.contentInput}
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

              {/* {this.state.imageArray.length != 0 ? (
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
              ) : null} */}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  titleInput: {
    color: "#000000",
    width: widthPercentageToDP(335),
    fontSize: widthPercentageToDP(16),
    padding: 0
  },
  contentInput: {
    color: "#000000",
    width: widthPercentageToDP(335),
    fontSize: widthPercentageToDP(16),
    padding: 0,
    textAlignVertical: "top"
  }
});

export default connect(state => ({
  getRestaurant: state.restaurant.getRestaurant,
  getRestaurantReply: state.restaurant.getRestaurantReply,
  alertModal: state.restaurant.alertModal,
  alertText: state.restaurant.alertText
}))(RestaurantWrite);
