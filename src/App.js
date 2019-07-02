import React, { Component, PureComponent } from "react";
import { Platform, View, StyleSheet, Text, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import store from "./store";
import AppNavigation from "./navigations";
import SplashScreen from "react-native-splash-screen";
import { useScreens } from "react-native-screens";
import NavigatorService from "./utils/navigators";
import config from "./configs/config";
import OneSignal from "react-native-onesignal";
useScreens();

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    try {
      OneSignal.init(config.pushKey);
      OneSignal.inFocusDisplaying(2);
    } catch (e) {}

    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <AppNavigation
            ref={navigatorRef => {
              NavigatorService.setContainer(navigatorRef);
            }}
          />
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
