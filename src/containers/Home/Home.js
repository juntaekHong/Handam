import React, { Component, PureComponent } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { connect } from "react-redux";
import { RightBubble } from "../../components/common/Chat";
import {
  NRText,
  NLText,
  NBText,
  NEBText,
  NBGBText,
  NBGText,
  NBGLText,
  NBGULText
} from "../../components/common/Text";
import api from "../../utils/api";

class Home extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.call();
  }

  call = async () => {
    // await api.get("/userValidation/userId/tlswnsxo@navr.com");
    // await api.put("/alarm/alarmIndex/1");
    // await api.post("/user/userId/tlswnsxo@naver.com/uploadAvatar");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text testID="HomeTitle">Home Screen</Text>
        <RightBubble text="안녕하세요." />
        <NBGBText>Hi</NBGBText>
        <NBGText>Hi</NBGText>
        <NBGLText>Hi</NBGLText>
        <NBGULText>Hi</NBGULText>
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
