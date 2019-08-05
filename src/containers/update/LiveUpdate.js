import React, { useState, useEffect, useCallback } from "react";
import CodePush from "react-native-code-push";
import moment from "moment";
import { CenterView } from "../../components/common/View";
import { LoadingUpdate } from "../../components/update/View";
import { NBGText } from "../../components/common/Text";
import { StatusBar, Platform } from "react-native";
import OneSignal from "react-native-onesignal";
import config from "../../configs/config";

const LiveUpdate = props => {
  const [progress, setProgress] = useState(true);
  const [message, setMessage] = useState("");

  checkCodePush = useCallback(() => {
    try {
      CodePush.sync(
        {
          installMode: CodePush.InstallMode.IMMEDIATE
        },
        syncStatus => {
          switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
              setMessage("최신 업데이트를 확인합니다.");
              break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
              setMessage("최신 업데이트를 다운로드 합니다.");
              break;
            // case CodePush.SyncStatus.AWAITING_USER_ACTION:
            //  setMessage("Awaiting user action.");
            //  break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
              setMessage("최신 업데이트를 설치합니다.");
              break;
            case CodePush.SyncStatus.UP_TO_DATE:
              setMessage("앱이 최신버전 입니다.");
              setProgress(false);
              break;
            // case codePush.SyncStatus.UPDATE_IGNORED:
            //  setMessage("Update cancelled by user.");
            //  break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
              setMessage("최신 업데이트가 설치되었습니다.");
              setProgress(true);
              break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
              setMessage("오류가 발생했습니다. 앱을 다시 실행해주세요.");
              break;
          }
        },
        progress => {
          setMessage(
            `${((progress.receivedBytes / progress.totalBytes) * 100).toFixed(
              0
            )}%`
          );
        }
      );
    } catch (error) {
      codePush.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      moment.lang("ko", {
        weekdays: [
          "일요일",
          "월요일",
          "화요일",
          "수요일",
          "목요일",
          "금요일",
          "토요일"
        ],
        weekdaysShort: ["일", "월", "화", "수", "목", "금", "토"]
      });
      StatusBar.setBarStyle("dark-content", true);
      if (Platform.OS === "android") StatusBar.setBackgroundColor("#fff");
      OneSignal.init(config.pushKey, { kOSSettingsKeyAutoPrompt: true });
      OneSignal.inFocusDisplaying(2);
    } catch (e) {}
    checkCodePush();
  }, []);

  useEffect(() => {
    if (!progress) {
      props.navigation.navigate("library");
    }
  }, [progress]);

  return (
    <CenterView>
      <LoadingUpdate />
      <NBGText fontSize={12}>{message}</NBGText>
    </CenterView>
  );
};

export default LiveUpdate;
