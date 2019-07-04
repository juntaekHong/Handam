import React from "react";
import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";
import Home from "../../containers/Home/Home";
import Left from "../../containers/Left/Left";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { View, Button, Text } from "react-native";
import CommunityTab from "../CommunityTab/CommunityTab";
import TalkAboutScreen from "../../containers/Right/TalkAboutScreen";

const Test = props => {
  navigation = () => {
    const { number } = props.navigation.state.params;
    props.navigation.navigate(`Test${number}`, { number: number + 1 });
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{props.navigation.state.params.number}</Text>
      <Button title="next" onPress={navigation} />
    </View>
  );
};

const HomeStack = createStackNavigator(
  {
    Home: { screen: Home }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const RightStack = createStackNavigator(
  {
    Community: { screen: CommunityTab },
    TalkAbout: { screen: TalkAboutScreen },
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
)

export default createMaterialTopTabNavigator(
  {
    Left: { screen: Left, navigationOptions: { tabBarLabel: "성적표" } },
    Home: { screen: HomeStack, navigationOptions: { tabBarLabel: "홈" } },
    Right: { screen: RightStack, navigationOptions: { tabBarLabel: "커뮤니티" } }
  },
  {
    initialRouteName: "Home",
    tabBarPosition: "bottom",
    swipeEnabled: true,
    tabBarOptions: {
      indicatorStyle: {
        opacity: 0,
        backgroundColor: "#fff"
      },
      showIcon: true,
      activeTintColor: "rgb(96, 169, 243)",
      inactiveTintColor: "rgb(157, 157, 157)",
      tabStyle: {
        backgroundColor: "transparent"
      },
      style: {
        backgroundColor: "white"
      }
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = "home";
        } else if (routeName === "Left") {
          iconName = "person";
        } else if (routeName === "Right") {
          iconName = "chat";
        }
        return <MaterialIcon name={iconName} size={25} color={tintColor} />;
      }
    })
  }
);
