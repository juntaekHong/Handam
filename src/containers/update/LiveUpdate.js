import React, { useState, useEffect, useCallback } from "react";
import CodePush from "react-native-code-push";
import moment from "moment";
import { CenterView } from "../../components/common/View";
import { LoadingUpdate } from "../../components/update/View";
import { NBGText } from "../../components/common/Text";
import { StatusBar, Platform } from "react-native";
import OneSignal from "react-native-onesignal";
import config from "../../configs/config";

const codepushOption = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.IMMEDIATE
};

class LiveUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: true,
      message: ""
    };
  }

  componentDidMount() {
    try {
      moment.lang("ko", {
        weekdays: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
        weekdaysShort: ["일", "월", "화", "수", "목", "금", "토"]
      });
      StatusBar.setBarStyle("dark-content", true);
      if (Platform.OS === "android") StatusBar.setBackgroundColor("#fff");
      OneSignal.init(config.pushKey, { kOSSettingsKeyAutoPrompt: true });
      OneSignal.inFocusDisplaying(2);
    } catch (e) {}
  }

  codePushStatusDidChange(status) {
    switch (status) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({ message: "최신 업데이트를 확인합니다." });
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({ message: "최신 업데이트를 다운로드 합니다." });
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({ message: "최신 업데이트를 설치합니다." });
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.setState({ message: "앱이 최신버전 입니다.", process: false });
        this.props.navigation.navigate("library");
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({
          message: "최신 업데이트가 설치되었습니다.",
          process: true
        });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({
          message: "오류가 발생했습니다. 앱을 다시 실행해주세요."
        });
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    this.setState({
      message: `${((progress.receivedBytes / progress.totalBytes) * 100).toFixed(0)}%`
    });
  }

  render() {
    return (
      <CenterView>
        <LoadingUpdate />
        <NBGText fontSize={12}>{this.state.message}</NBGText>
      </CenterView>
    );
  }
}
export default CodePush(codepushOption)(LiveUpdate);
