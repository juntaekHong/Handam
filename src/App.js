import React, { Component, PureComponent } from "react";
import { Platform, View, StyleSheet, Text, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import store from "./store";
import AppNavigation from "./navigations";
import SplashScreen from "react-native-splash-screen";
import { useScreens } from "react-native-screens";
useScreens();

export default class App extends PureComponent {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <AppNavigation />
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
