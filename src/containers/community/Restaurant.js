import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity
} from "react-native";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import { connect } from "react-redux";
import { RestaurantActions } from "../../store/actionCreator";
import { AlertModal } from "../../components/community/Modal";

class Restaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    RestaurantActions.listRestaurantCategory();
    RestaurantActions.pageListRestaurant(null, 1);
  }

  navigateRestaurantDetail = () => {
    this.props.navigation.navigate("RestaurantDetail");
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <AlertModal
          visible={this.props.alertModal}
          text={this.props.alertText}
        />
        <FlatList
          horizontal={true}
          style={{
            flexGrow: 1,
            backgroundColor: "#f8f8f8",
            width: "100%",
            height: widthPercentageToDP(49)
          }}
          contentContainerStyle={{ alignItems: "center" }}
          ListHeaderComponent={() => (
            <View style={{ width: widthPercentageToDP(16) }}></View>
          )}
          // ListFooterComponent={() => (
          //   <View style={{ width: widthPercentageToDP(16) }}></View>
          // )}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={this.props.categoryList}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  // width: widthPercentageToDP(54),
                  height: widthPercentageToDP(16),
                  alignItems: "center",
                  marginRight: widthPercentageToDP(26)
                }}
                onPress={async () => {
                  if (index == 0) {
                    await RestaurantActions.handleFilter(null);
                  } else {
                    await RestaurantActions.handleFilter(
                      item.restaurantCategoryName
                    );
                  }
                  await RestaurantActions.initRestaurantList();
                  await RestaurantActions.pageListRestaurant(
                    this.props.filter,
                    this.props.restaurantList.length / 4
                  );
                }}
              >
                <Text
                  style={{
                    color: "#1d1d1d",
                    fontSize: widthPercentageToDP(14),
                    fontFamily: fonts.nanumBarunGothicB
                  }}
                >
                  {item.restaurantCategoryName}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <FlatList
          style={{
            flexGrow: 1,
            width: "100%",
            height: "100%"
          }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.01}
          onEndReached={() =>
            this.props.restaurantList.length < this.props.total
              ? RestaurantActions.pageListRestaurant(
                  this.props.filter,
                  this.props.restaurantList.length / 4 + 1
                )
              : null
          }
          data={this.props.restaurantList}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: "row",
                  width: "100%",
                  height: widthPercentageToDP(123),
                  paddingHorizontal: widthPercentageToDP(13),
                  paddingVertical: widthPercentageToDP(12),
                  borderBottomColor: "#dbdbdb",
                  borderBottomWidth: widthPercentageToDP(0.5)
                }}
                onPress={async () => {
                  await RestaurantActions.getRestaurant(item.restaurantIndex);
                  await RestaurantActions.pageListRestaurantReply(
                    item.restaurantIndex
                  );
                  this.navigateRestaurantDetail();
                }}
              >
                <Image
                  style={{
                    width: widthPercentageToDP(129),
                    height: widthPercentageToDP(99),
                    borderColor: "#ffffff",
                    borderWidth: widthPercentageToDP(1),
                    borderRadius: widthPercentageToDP(5)
                  }}
                  source={{ uri: item.restaurantImage }}
                />
                <View
                  style={{
                    width: widthPercentageToDP(220),
                    paddingTop: widthPercentageToDP(13),
                    paddingLeft: widthPercentageToDP(12)
                  }}
                >
                  <Text
                    style={{
                      color: "#0b0b0b",
                      fontSize: widthPercentageToDP(15),
                      fontFamily: fonts.nanumBarunGothicB
                    }}
                  >
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    {item.restaurantPriorityMenus.map((item2, index2) => {
                      return (
                        <Text
                          key={index2}
                          style={{
                            color: "#404040",
                            fontSize: widthPercentageToDP(11),
                            fontFamily: fonts.nanumBarunGothic,
                            marginTop: widthPercentageToDP(5),
                            marginRight: widthPercentageToDP(5)
                          }}
                        >
                          {item2.name}
                        </Text>
                      );
                    })}
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    {item.restaurantTag.map((item2, index2) => {
                      return (
                        <View
                          style={{
                            marginTop: widthPercentageToDP(16),
                            backgroundColor: "#f5f5f5",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingHorizontal: widthPercentageToDP(6),
                            paddingVertical: widthPercentageToDP(3),
                            marginRight: widthPercentageToDP(6),
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
                            {item2.tag}
                          </Text>
                        </View>
                      );
                    })}
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        style={{
                          width: widthPercentageToDP(9.1),
                          height: widthPercentageToDP(8.8)
                        }}
                        source={require("../../../assets/image/community/smalltalk.png")}
                      />
                      <Image
                        style={{
                          width: widthPercentageToDP(2),
                          height: widthPercentageToDP(2),
                          marginHorizontal: widthPercentageToDP(7)
                        }}
                        source={require("../../../assets/image/community/dot.png")}
                      />
                      <Text
                        style={{
                          color: "#b1b1b1",
                          fontSize: widthPercentageToDP(11),
                          fontFamily: fonts.nanumBarunGothic
                        }}
                      >
                        {"댓글수"}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => {}}>
                      <Image
                        style={{
                          width: widthPercentageToDP(21),
                          height: widthPercentageToDP(21)
                        }}
                        source={require("../../../assets/image/community/heart.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

export default connect(state => ({
  categoryList: state.restaurant.categoryList,
  restaurantList: state.restaurant.restaurantList,
  alertModal: state.restaurant.alertModal,
  alertText: state.restaurant.alertText,
  total: state.restaurant.total,
  filter: state.restaurant.filter
}))(Restaurant);
