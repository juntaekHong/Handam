import React, { Component, PureComponent } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { connect } from "react-redux";
import { RightBubble } from "../../components/Chat";
import { CustomText } from "../../components/common/Text";
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
        <CustomText
          fontFamily={fonts.nanumSquareB}
          fontSize={12}
          color={"#f00"}
        >
          Hi
        </CustomText>
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
