import React, { Component } from "react";
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { widthPercentageToDP } from "../../utils/util";
import { connect } from "react-redux";
import { RestaurantActions } from "../../store/actionCreator";
import { RestaurantItem, CategoryItem } from "../../components/restaurant/View";

class Restaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 0,
      loading: false,
      loadingList: false
    };
  }

  async componentDidMount() {
    const promise1 = RestaurantActions.listRestaurantCategory();
    const promise2 = RestaurantActions.pageListRestaurant(null, 1);
    Promise.all([promise1, promise2]).then(() => {
      RestaurantActions.handleLoading(false);
    });
  }

  onreach = async () => {
    await this.setState({ loading: true });
    await RestaurantActions.pageListRestaurant(
      this.props.filter,
      this.props.restaurantList.length / 4 + 1
    );
    await this.setState({ loading: false });
  };

  renderListFooter = () => {
    return this.state.loading ? (
      <View style={styles.listFooterContainer}>
        <UIActivityIndicator size={widthPercentageToDP(30)} color={"#727272"} />
      </View>
    ) : null;
  };

  render() {
    if (this.props.loading == true) {
      return <UIActivityIndicator color={"gray"} />;
    } else
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            horizontal={true}
            style={styles.category}
            contentContainerStyle={{ alignItems: "center" }}
            ListHeaderComponent={() => (
              <View style={{ width: widthPercentageToDP(3) }}></View>
            )}
            listFooterContainer={() => (
              <View style={{ width: widthPercentageToDP(3) }}></View>
            )}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={this.props.categoryList}
            renderItem={({ item, index }) => {
              return (
                <CategoryItem
                  handler={async () => {
                    this.setState({ selected: index, loadingList: true });
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
                    this.setState({ loadingList: false });
                  }}
                  data={item}
                  textcolor={
                    this.state.selected == index ? "#1d1d1d" : "#9e9e9e"
                  }
                  selected={this.state.selected == index}
                />
              );
            }}
          />

          <FlatList
            ref={ref => {
              this.flatlistRef = ref;
            }}
            style={styles.restaurant}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={this.renderListFooter}
            onEndReachedThreshold={0.01}
            onEndReached={() =>
              this.props.restaurantList.length < this.props.total
                ? this.onreach()
                : null
            }
            data={this.props.restaurantList}
            renderItem={({ item, index }) => {
              return (
                <RestaurantItem
                  navigation={this.props.navigation}
                  loadingHandler={RestaurantActions.handleDetailLoading}
                  likeHandler={RestaurantActions.putRestaurantSubscriber}
                  data={item}
                  index={index} //렌더 순서
                />
              );
            }}
          />
        </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  category: {
    flexGrow: 1,
    backgroundColor: "#f8f8f8",
    width: "100%",
    height: widthPercentageToDP(49)
  },
  restaurant: { flexGrow: 1, width: "100%", height: "100%" },
  listFooterContainer: {
    height: widthPercentageToDP(122),
    width: widthPercentageToDP(375),
    justifyContent: "center",
    alignItems: "center"
  }
});

export default connect(state => ({
  categoryList: state.restaurant.categoryList,
  restaurantList: state.restaurant.restaurantList,
  total: state.restaurant.total,
  filter: state.restaurant.filter,
  loading: state.restaurant.loading
}))(Restaurant);
