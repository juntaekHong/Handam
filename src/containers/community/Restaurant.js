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
import { RestaurantItem } from "../../components/restaurant/View";

class Restaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 0
    };
  }

  componentDidMount() {
    RestaurantActions.listRestaurantCategory();
    RestaurantActions.pageListRestaurant(null, 1);
  }

  navigateRestaurantDetail = handler => {
    this.props.navigation.navigate("RestaurantDetail", { handler: handler });
  };

  handler = async (index, handler) => {
    await RestaurantActions.getRestaurant(index);
    await RestaurantActions.pageListRestaurantReply(index);
    this.navigateRestaurantDetail(handler);
  };

  putlike = (index, isgood) => {
    const good = new Object();
    good.isGood = isgood == 1 ? 0 : 1;
    good.restaurantIndex = index;
    RestaurantActions.putRestaurantSubscriber(good);
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
                  this.setState({ selected: index });
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
                  style={[
                    {
                      fontSize: widthPercentageToDP(14),
                      fontFamily: fonts.nanumBarunGothicB
                    },
                    this.state.selected == index
                      ? { color: "#1d1d1d" }
                      : { color: "#9e9e9e" }
                  ]}
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
              <RestaurantItem
                handler={this.handler}
                putlike={this.putlike}
                data={item}
              />
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
