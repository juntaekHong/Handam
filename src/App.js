import React, { Component } from "react";
import { Platform, View, StyleSheet, Text, SafeAreaView } from "react-native";
import AppNavigation from "./navigations";
import SplashScreen from "react-native-splash-screen";
import { useScreens } from "react-native-screens";
import NavigatorService from "./utils/navigators";
import config from "./configs/config";
import OneSignal from "react-native-onesignal";
import { connect } from "react-redux";
import { CenterView } from "./components/common/View";
import { UIActivityIndicator } from "react-native-indicators";
import Modal from "react-native-modal";
//붙여넣기 기능 쓰려면 이 놈 주석처리
// useScreens();

class App extends Component {
  constructor(props) {
    super(props);
    SplashScreen.hide();
  }

  render() {
    const { loading } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Modal isVisible={loading}>
          <CenterView backgroundColor={"transparent"}>
            <UIActivityIndicator color={"gray"} />
          </CenterView>
        </Modal>
        <AppNavigation
          ref={navigatorRef => {
            NavigatorService.setContainer(navigatorRef);
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default connect(({ common }) => ({
  loading: common.loading
}))(App);
