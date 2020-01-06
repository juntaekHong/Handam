import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  BackHandler,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import Swiper from "react-native-swiper";
import call from "react-native-communications";
import { widthPercentageToDP } from "../../utils/util";
import { connect } from "react-redux";
import { RestaurantActions } from "../../store/actionCreator";
import { BottomMenuModal, CustomModal } from "../../components/common/Modal";
import { TitleView } from "../../components/community/View";
import { Image28 } from "../../components/community/Image";
import { CustomModalBlackText } from "../../components/talk/Text";
import { ImageModalCloseView } from "../../components/talk/View";
import { D_Name } from "../../components/restaurant/Text";
import {
  RestaurantInfo,
  OneLineReview,
  LocationInfo,
  LeaveReview,
  RestaurantReviewItem,
  Pagenation
} from "../../components/restaurant/View";
import fonts from "../../configs/fonts";
import { ZoomImageModal } from "../../components/restaurant/Modal";

const ImageModalClose = props => {
  return (
    <ImageModalCloseView style={{ position: "absolute" }}>
      <TouchableOpacity onPress={() => props.handler()}>
        <Image28
          source={require("../../../assets/image/community/close_white.png")}
        />
      </TouchableOpacity>
    </ImageModalCloseView>
  );
};

class RestaurantDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: "write",
      replyIndex: null,
      imageIndex: 1,
      imageData: null,
      deletemodal: false,
      dialmodal: false,
      who: "me",
      isGood: null
    };
  }

  async componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      RestaurantActions.handleBottomModal(false);
      this.navigateRestaurant();

      return true;
    });

    const promise1 = RestaurantActions.getRestaurant(
      this.props.navigation.state.params.restaurantIndex
    );
    const promise2 = RestaurantActions.pageListRestaurantReply(
      this.props.navigation.state.params.restaurantIndex
    );

    Promise.all([promise1, promise2]).then(() => {
      let arr = [];
      this.props.getRestaurant.resultRestaurantImage.subImage.map(
        (item, index) => arr.push({ url: item })
      );

      this.setState({
        isGood: this.props.getRestaurant.isGood,
        imageData: arr
      });
      this.MenuOrder();
      RestaurantActions.handleDetailLoading(false);
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  navigateRestaurant = () => {
    this.props.navigation.navigate("Restaurant");
  };

  navigateRestaurantWrite = () => {
    this.props.navigation.navigate("RestaurantWrite", {
      form: this.state.form,
      handler: this.props.navigation.state.params.likeHandler,
      replyIndex: this.state.replyIndex
    });
  };

  MenuOrder = () => {
    this.props.getRestaurant.restaurantMenu.sort((a, b) => {
      if (a.priority == null) return 1;
      else if (b.priority == null) return -1;
      return a.priority - b.priority;
    });
  };

  putLike = async bool => {
    await this.setState({ isGood: bool });
    const good = new Object();
    good.isGood = bool;
    good.restaurantIndex = this.props.getRestaurant.restaurantIndex;
    RestaurantActions.putRestaurantSubscriber(good);
    this.props.navigation.state.params.likeHandler({isGood:bool});
  };

  render() {
    if (this.props.detailloading == true) {
      return <UIActivityIndicator color={"gray"} />;
    } else
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <BottomMenuModal
            visible={this.props.bottomModal}
            handler={() => RestaurantActions.handleBottomModal(false)}
            updateHandler={async () => {
              await RestaurantActions.getRestaurantReply(this.state.replyIndex);
              await this.setState({ form: "update" });
              this.navigateRestaurantWrite();
              await this.setState({ form: "write" });
            }}
            deleteHandler={() => this.setState({ deletemodal: true })}
            reportHandler={null}
            who={this.state.who}
          />

          <ZoomImageModal
            visible={this.props.imageModal}
            image={this.state.imageData}
            index={this.props.imageIndex}
            close={() => RestaurantActions.handleImageModal(false)}
          />

          <CustomModal
            height={201.9}
            children={
              <CustomModalBlackText>
                해당 리뷰를 삭제하시겠습니까?
              </CustomModalBlackText>
            }
            visible={this.state.deletemodal}
            footerHandler={async () => {
              this.setState({ deletemodal: false });
              await RestaurantActions.deleteRestaurantReply(
                this.state.replyIndex
              );
              RestaurantActions.pageListRestaurantReply(
                this.props.getRestaurant.restaurantIndex
              );
            }}
            closeHandler={() => this.setState({ deletemodal: false })}
          />
          <CustomModal
            height={201.9}
            children={
              <CustomModalBlackText>
                {this.props.getRestaurant.tel}
              </CustomModalBlackText>
            }
            visible={this.state.dialmodal}
            footerText={"전화걸기"}
            footerDisabled={
              this.props.getRestaurant.tel == "준비중" ? true : false
            }
            footerHandler={() => {
              this.setState({ dialmodal: false });
              call.phonecall(
                this.props.getRestaurant.tel.replace(/-/gi, ""),
                false
              );
              // .replace(/-/gi, ""),
            }}
            closeHandler={() => this.setState({ dialmodal: false })}
          />

          <TitleView
            titleName={"한슐랭"}
            leftChild={true}
            handler={this.navigateRestaurant}
          />

          <ScrollView>
            <D_Name>{this.props.getRestaurant.name}</D_Name>
            <Swiper
              horizontal={true}
              removeClippedSubviews={false}
              width={widthPercentageToDP(375)}
              height={widthPercentageToDP(207)}
              loop={false}
              autoplay={false}
              onIndexChanged={async index => {
                await this.setState({ imageIndex: index + 1 });
              }}
              showsPagination={true}
              scrollEnabled={true}
              renderPagination={() => {
                return (
                  <Pagenation
                    key={`page${this.state.imageIndex}`}
                    index={this.state.imageIndex}
                    total={
                      this.props.getRestaurant.resultRestaurantImage.subImage
                        .length
                    }
                  />
                );
              }}
            >
              {this.props.getRestaurant.resultRestaurantImage.subImage.map(
                (item, index) => {
                  return (
                    <TouchableWithoutFeedback
                      key={`btn${index}`}
                      onPress={() => {
                        RestaurantActions.handleImageIndex(
                          this.state.imageIndex - 1
                        );
                        RestaurantActions.handleImageModal(true);
                      }}
                    >
                      <Image
                        key={index}
                        style={{
                          width: widthPercentageToDP(375),
                          height: widthPercentageToDP(207)
                        }}
                        source={{ uri: item }}
                      />
                    </TouchableWithoutFeedback>
                  );
                }
              )}
            </Swiper>

            <RestaurantInfo
              scrapHandler={() => {
                this.state.isGood == 1 ? this.putLike(0) : this.putLike(1);
              }}
              phoneHandler={() => this.setState({ dialmodal: true })}
              restaurantInfo={this.props.getRestaurant}
              isGood={this.state.isGood}
            />

            <View style={styles.line} />

            <OneLineReview
              review={this.props.getRestaurant.review}
              restaurantMenuList={this.props.getRestaurant.restaurantMenu}
            />

            <View style={styles.line} />

            <LocationInfo
              latitude={this.props.getRestaurant.latitude}
              longitude={this.props.getRestaurant.longitude}
            />

            <LeaveReview
              writeHandler={this.navigateRestaurantWrite}
              goodCount={this.props.getRestaurant.goodCount}
              restaurantReplyListCount={this.props.restaurantReplyList.length}
            />

            {this.props.restaurantReplyList.length == 0 ? (
              <View
                style={{
                  height: widthPercentageToDP(284),
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: widthPercentageToDP(11),
                  borderTopColor: "#dbdbdb",
                  borderTopWidth: widthPercentageToDP(0.5)
                }}
              >
                <Text
                  style={{
                    color: "#b2b2b2",
                    fontSize: widthPercentageToDP(12),
                    fontFamily: fonts.nanumBarunGothicB
                  }}
                >
                  해당 맛집의 첫 리뷰를 남겨보세요!
                </Text>
              </View>
            ) : (
              <FlatList
                style={styles.replyList}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.01}
                onEndReached={() => {}}
                ListHeaderComponent={() => (
                  <View style={{ height: widthPercentageToDP(11) }} />
                )}
                data={this.props.restaurantReplyList}
                renderItem={({ item, index }) => {
                  return (
                    <RestaurantReviewItem
                      key={index}
                      data={item}
                      handler={async () => {
                        await this.setState({
                          replyIndex: item.restaurantReplyIndex
                        });
                        RestaurantActions.handleBottomModal(true);
                      }}
                      isDots={
                        item.userNickName == this.props.userNickName
                          ? true
                          : false
                      }
                    />
                  );
                }}
              />
            )}
          </ScrollView>
        </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  line: {
    backgroundColor: "#dbdbdb",
    height: widthPercentageToDP(0.5),
    marginVertical: widthPercentageToDP(16)
  },
  replyList: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%"
  }
});

export default connect(state => ({
  getRestaurant: state.restaurant.getRestaurant,
  getRestaurantReply: state.restaurant.getRestaurantReply,
  restaurantReplyList: state.restaurant.restaurantReplyList,
  bottomModal: state.restaurant.bottomModal,
  imageModal: state.restaurant.imageModal,
  imageIndex: state.restaurant.imageIndex,
  detailloading: state.restaurant.detailloading,

  userNickName: state.signin.user.userNickName
}))(RestaurantDetail);
