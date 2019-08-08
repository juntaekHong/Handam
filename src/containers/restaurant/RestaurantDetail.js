import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import { widthPercentageToDP, timeSince } from "../../utils/util";
import fonts from "../../configs/fonts";
import { connect } from "react-redux";
import { RestaurantActions } from "../../store/actionCreator";
import { BottomMenuModal, CustomModal } from "../../components/common/Modal";
import { CustomModalBlackText } from "../../components/talk/Text";

class RestaurantDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: "write",
      deletemodal: false,
      who: "me"
    };

    this.MenuOrder();
  }

  navigateRestaurant = () => {
    this.props.navigation.navigate("Restaurant");
  };

  navigateRestaurantWrite = () => {
    this.props.navigation.navigate("RestaurantWrite", {
      form: this.state.form
    });
  };

  MenuOrder = () => {
    this.props.getRestaurant.restaurantMenu.sort((a, b) => {
      if (a.priority == null) return 1;
      else if (b.priority == null) return -1;
      return a.priority - b.priority;
    });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <BottomMenuModal
          visible={this.props.bottomModal}
          handler={() => RestaurantActions.handleBottomModal(false)}
          updateHandler={async () => {
            await this.setState({ form: "update" });
            this.navigateRestaurantWrite();
          }}
          deleteHandler={() => this.setState({ deletemodal: true })}
          reportHandler={null}
          who={this.state.who}
        />
        <CustomModal
          height={widthPercentageToDP(201.9)}
          children={
            <CustomModalBlackText>
              해당 리뷰를 삭제하시겠습니까?
            </CustomModalBlackText>
          }
          visible={this.state.deletemodal}
          footerHandler={() => {
            // RestaurantActions.deleteRestaurantReply(); //reply인덱스 넣어야댐
          }}
          closeHandler={() => this.setState({ deletemodal: false })}
        />
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            width: widthPercentageToDP(375),
            height: widthPercentageToDP(60),
            justifyContent: "space-between",
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
              fontSize: widthPercentageToDP(18),
              fontFamily: fonts.nanumBarunGothic,
              textAlign: "center"
            }}
          >
            한슐랭
          </Text>
          <TouchableOpacity
            style={{ marginLeft: widthPercentageToDP(8) }}
            onPress={() => this.navigateRestaurant()}
          >
            <Image
              style={{
                width: widthPercentageToDP(28),
                height: widthPercentageToDP(28)
              }}
              source={require("../../../assets/image/community/back.png")}
            />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <Text
            style={{
              color: "#0b0b0b",
              fontSize: widthPercentageToDP(18),
              fontFamily: fonts.nanumBarunGothicB,
              marginTop: widthPercentageToDP(18),
              marginLeft: widthPercentageToDP(21),
              marginBottom: widthPercentageToDP(17)
            }}
          >
            {this.props.getRestaurant.name}
          </Text>

          {/* 이미지 */}
          <View
            style={{
              backgroundColor: "red",
              width: widthPercentageToDP(375),
              height: widthPercentageToDP(207)
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: widthPercentageToDP(16),
              paddingHorizontal: widthPercentageToDP(22)
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  color: "#0b0b0b",
                  fontSize: widthPercentageToDP(15),
                  fontFamily: fonts.nanumBarunGothicB
                }}
              >
                {this.props.getRestaurant.name}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  marginLeft: widthPercentageToDP(12)
                }}
              >
                {this.props.getRestaurant.resultRestaurantTag.map(
                  (item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          backgroundColor: "#f5f5f5",
                          width: widthPercentageToDP(34),
                          height: widthPercentageToDP(15),
                          justifyContent: "center",
                          alignItems: "center",
                          borderColor: "#ffffff",
                          borderWidth: widthPercentageToDP(1),
                          borderRadius: widthPercentageToDP(10)
                        }}
                      >
                        <Text
                          style={{
                            color: "#404040",
                            fontSize: widthPercentageToDP(8),
                            fontFamily: fonts.nanumBarunGothicB
                          }}
                        >
                          {item.tag}
                        </Text>
                      </View>
                    );
                  }
                )}
              </View>
            </View>

            <TouchableOpacity>
              <Image
                style={{
                  width: widthPercentageToDP(21),
                  height: widthPercentageToDP(21)
                }}
                source={require("../../../assets/image/community/heart.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={{ marginHorizontal: widthPercentageToDP(19) }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: widthPercentageToDP(13)
              }}
            >
              <TouchableOpacity onPress={() => {}}>
                <Image
                  style={{
                    width: widthPercentageToDP(18),
                    height: widthPercentageToDP(18),
                    marginRight: widthPercentageToDP(16)
                  }}
                  source={require("../../../assets/image/community/phone.png")}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: "#404040",
                  fontSize: widthPercentageToDP(14),
                  fontFamily: fonts.nanumBarunGothicB
                }}
              >
                {this.props.getRestaurant.tel}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: widthPercentageToDP(13)
              }}
            >
              <Image
                style={{
                  width: widthPercentageToDP(20),
                  height: widthPercentageToDP(20),
                  marginRight: widthPercentageToDP(14)
                }}
                source={require("../../../assets/image/community/clock.png")}
              />
              <Text
                style={{
                  color: "#404040",
                  fontSize: widthPercentageToDP(14),
                  fontFamily: fonts.nanumBarunGothicB
                }}
              >
                {this.props.getRestaurant.openingHours}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#dbdbdb",
              height: widthPercentageToDP(0.5),
              marginVertical: widthPercentageToDP(16)
            }}
          />

          <View
            style={{
              paddingHorizontal: widthPercentageToDP(22),
              marginBottom: widthPercentageToDP(10)
            }}
          >
            <Text
              style={{
                color: "#0b0b0b",
                fontSize: widthPercentageToDP(15),
                fontFamily: fonts.nanumBarunGothicB
              }}
            >
              한줄평
            </Text>
            <Text
              style={{
                color: "#404040",
                fontSize: widthPercentageToDP(12),
                fontFamily: fonts.nanumBarunGothic,
                lineHeight: widthPercentageToDP(18),
                marginTop: widthPercentageToDP(10)
              }}
            >
              {this.props.getRestaurant.review}
            </Text>
          </View>

          <View style={{ paddingHorizontal: widthPercentageToDP(22) }}>
            <Text
              style={{
                color: "#0b0b0b",
                fontSize: widthPercentageToDP(15),
                fontFamily: fonts.nanumBarunGothicB
              }}
            >
              대표메뉴
            </Text>

            {this.props.getRestaurant.restaurantMenu.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: widthPercentageToDP(10)
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color: "#404040",
                        fontSize: widthPercentageToDP(12),
                        fontFamily: fonts.nanumBarunGothic
                      }}
                    >
                      {item.name}
                    </Text>
                    <View
                      style={{
                        backgroundColor: "#dbdbdb",
                        width: widthPercentageToDP(101),
                        height: widthPercentageToDP(0.5),
                        marginLeft: widthPercentageToDP(8)
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {item.priority != null ? (
                      <View
                        style={{
                          backgroundColor: "#ff000d",
                          width: widthPercentageToDP(32),
                          height: widthPercentageToDP(12),
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: widthPercentageToDP(1),
                          borderRadius: widthPercentageToDP(10),
                          borderColor: "#ff000d"
                        }}
                      >
                        <Text
                          style={{
                            color: "#ffffff",
                            fontSize: widthPercentageToDP(8),
                            fontFamily: fonts.nanumBarunGothicB
                          }}
                        >
                          추천
                        </Text>
                      </View>
                    ) : null}

                    <Text
                      style={{
                        color: "#404040",
                        fontSize: widthPercentageToDP(12),
                        fontFamily: fonts.nanumBarunGothic,
                        marginLeft: widthPercentageToDP(10)
                      }}
                    >
                      {item.price}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View
            style={{
              backgroundColor: "#dbdbdb",
              height: widthPercentageToDP(0.5),
              marginVertical: widthPercentageToDP(16)
            }}
          />

          <View
            style={{
              paddingHorizontal: widthPercentageToDP(22),
              marginBottom: widthPercentageToDP(16)
            }}
          >
            <Text
              style={{
                color: "#0b0b0b",
                fontSize: widthPercentageToDP(15),
                fontFamily: fonts.nanumBarunGothicB
              }}
            >
              위치정보
            </Text>
          </View>
          {/* 지도 */}
          <View
            style={{
              backgroundColor: "red",
              width: widthPercentageToDP(375),
              height: widthPercentageToDP(207)
            }}
          />

          <View
            style={{
              alignItems: "center",
              marginTop: widthPercentageToDP(27)
            }}
          >
            <Text
              style={{
                color: "#0b0b0b",
                fontSize: widthPercentageToDP(15),
                fontFamily: fonts.nanumBarunGothicB
              }}
            >
              리뷰를 남겨보세요!
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Image
              style={{
                width: widthPercentageToDP(33.6),
                height: widthPercentageToDP(16.8),
                marginRight: widthPercentageToDP(12)
              }}
              source={require("../../../assets/image/community/review.png")}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: widthPercentageToDP(16)
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: widthPercentageToDP(21),
                  height: widthPercentageToDP(21),
                  marginRight: widthPercentageToDP(8)
                }}
                source={require("../../../assets/image/community/heart.png")}
              />
              <Text
                style={{
                  color: "#404040",
                  fontSize: widthPercentageToDP(12),
                  fontFamily: fonts.nanumBarunGothic,
                  marginRight: widthPercentageToDP(19.6)
                }}
              >
                {this.props.getRestaurant.goodCount}
              </Text>
              <Image
                style={{
                  width: widthPercentageToDP(17),
                  height: widthPercentageToDP(17),
                  marginRight: widthPercentageToDP(8)
                }}
                source={require("../../../assets/image/community/bigtalk.png")}
              />
              <Text
                style={{
                  color: "#404040",
                  fontSize: widthPercentageToDP(12),
                  fontFamily: fonts.nanumBarunGothic
                }}
              >
                {this.props.restaurantReplyList.length}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.navigateRestaurantWrite();
              }}
            >
              <Image
                style={{
                  width: widthPercentageToDP(28),
                  height: widthPercentageToDP(28)
                }}
                source={require("../../../assets/image/community/writeicon.png")}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            style={{
              flexGrow: 1,
              backgroundColor: "#ffffff",
              width: "100%",
              height: "100%"
            }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.01}
            onEndReached={() => {}}
            ListHeaderComponent={() => (
              <View style={{ height: widthPercentageToDP(11) }} />
            )}
            // ListFooterComponent={this.renderListFooter}
            data={this.props.restaurantReplyList}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    height: widthPercentageToDP(81),
                    paddingLeft: widthPercentageToDP(16),
                    paddingVertical: widthPercentageToDP(12),
                    borderTopWidth: widthPercentageToDP(1),
                    borderTopColor: "#dbdbdb"
                  }}
                >
                  <Text
                    style={{
                      color: "#101010",
                      fontSize: widthPercentageToDP(13),
                      fontFamily: fonts.nanumBarunGothicB,
                      width: widthPercentageToDP(288),
                      marginBottom: widthPercentageToDP(8)
                    }}
                  >
                    {item.title != undefined ? item.title : "제목"}
                  </Text>
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: widthPercentageToDP(11),
                      fontFamily: fonts.nanumBarunGothic,
                      width: widthPercentageToDP(288),
                      marginBottom: widthPercentageToDP(10)
                    }}
                  >
                    {item.content}
                  </Text>
                  <Text
                    style={{
                      color: "#646464",
                      fontSize: widthPercentageToDP(11),
                      fontFamily: fonts.nanumBarunGothicB
                    }}
                  >
                    {timeSince(item.createdAt)}
                  </Text>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      marginTop: widthPercentageToDP(12),
                      marginLeft: widthPercentageToDP(332)
                    }}
                    onPress={() => {
                      console.log(item);
                      // RestaurantActions.getRestaurantReply(item.)  //reply인덱스 넣어야함
                      RestaurantActions.handleBottomModal(true);
                    }}
                  >
                    <Image
                      style={{
                        width: widthPercentageToDP(28),
                        height: widthPercentageToDP(28)
                      }}
                      source={require("../../../assets/image/community/dots.png")}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(state => ({
  getRestaurant: state.restaurant.getRestaurant,
  restaurantReplyList: state.restaurant.restaurantReplyList,
  bottomModal: state.restaurant.bottomModal
}))(RestaurantDetail);
