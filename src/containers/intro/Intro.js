import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../../utils/util";
import AppIntroSlider from "react-native-app-intro-slider";
import { StyleSheet, View, Text } from "react-native";
import { AuthActions } from "../../store/actionCreator";

const slides = [
  {
    key: "somethun",
    title: "Title 1",
    text: "Description.\nSay something cool",
    // image: require('./assets/1.jpg'),
    backgroundColor: "#59b2ab"
  },
  {
    key: "somethun-dos",
    title: "Title 2",
    text: "Other cool stuff",
    // image: require('./assets/2.jpg'),
    backgroundColor: "#febe29"
  },
  {
    key: "somethun1",
    title: "Rocket guy",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    // image: require('./assets/3.jpg'),
    backgroundColor: "#22bcb5"
  }
];

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intro: false
    };
  }

  onDone = async () => {
    await AuthActions.storeIntro("true");
    this.props.navigation.navigate(this.props.signin_navigate);
  };

  render() {
    const { intro } = this.state;
    if (!intro)
      return (
        <AppIntroSlider
          slides={slides}
          showSkipButton={true}
          onDone={this.onDone}
        />
      );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "space-between"
  }
});

export default connect(({ auth, signin }) => ({
  signin_navigate: signin.signin_navigate
}))(Intro);
