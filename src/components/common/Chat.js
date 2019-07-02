import React, { Component, PureComponent } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import PropTypes from "prop-types";
import { widthPercentageToDP } from "../../utils/util";

const BubbleSadow = {
  ...Platform.select({
    ios: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 5
    },
    android: {
      elevation: 6
    }
  })
};

export class RightBubble extends PureComponent {
  render() {
    return (
      <View style={rightBubble.talkBubble}>
        <View style={[rightBubble.talkBubbleSquare, BubbleSadow]}>
          <Text>{this.props.text}</Text>
        </View>
        <View style={[BubbleSadow]}>
          <View style={rightBubble.talkBubbleTriangle} />
        </View>
      </View>
    );
  }
}

RightBubble.propTypes = {
  text: PropTypes.string
};

const rightBubble = StyleSheet.create({
  talkBubble: {
    position: "relative",
    backgroundColor: "transparent",
    marginBottom: widthPercentageToDP(30)
  },
  talkBubbleSquare: {
    maxWidth: widthPercentageToDP(200),
    paddingTop: widthPercentageToDP(20),
    paddingBottom: widthPercentageToDP(20),
    paddingLeft: widthPercentageToDP(10),
    paddingRight: widthPercentageToDP(10),
    backgroundColor: "#fff",
    borderRadius: widthPercentageToDP(5),
    borderBottomRightRadius: 0
  },
  talkBubbleTriangle: {
    position: "absolute",
    right: 0,
    bottom: widthPercentageToDP(-6),
    width: 0,
    height: 0,
    borderTopColor: "#fff",
    borderTopWidth: widthPercentageToDP(13),
    borderLeftWidth: widthPercentageToDP(26),
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent"
  }
});
