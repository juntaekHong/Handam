import React, { Component } from "react";
import { View, Text } from "react-native";

export default class Left extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Left Screen</Text>
      </View>
    );
  }
}
