import React, { Component, PureComponent } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { connect } from "react-redux";
import { RightBubble } from "../../components/Chat";
import {
  CustomText,
  NRText,
  NLText,
  NBText,
  NEBText
} from "../../components/common/Text";
import fonts from "../../configs/fonts";

class Home extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <RightBubble text="안녕하세요." />
        <NLText>Hi</NLText>
        <NRText>Hi</NRText>
        <NBText>Hi</NBText>
        <NEBText>Hi</NEBText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default connect()(Home);
