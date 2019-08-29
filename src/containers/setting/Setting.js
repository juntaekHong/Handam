import React, { useCallback } from "react";
import { HCenterView, Title, Scroll } from "../../components/common/View";
import { connect } from "react-redux";
import { SettingMenuTitle } from "../../components/setting/view/SettingMenuTitle";
import { SettingMenu } from "../../components/setting/view/SettingMenu";
import { widthPercentageToDP, timeFormat } from "../../utils/util";
import { Platform } from "react-native";

const Setting = ({ navigation, term1, term2, appVersion }) => {
  const navigateTeamInfo = useCallback(() => {
    navigation.navigate("teaminfo");
  }, []);
  const navigationTerm1 = useCallback(() => {
    navigation.navigate("terminfo", {
      title: "개인정보처리방침",
      content: term2
    });
  }, []);
  const navigationTerm2 = useCallback(() => {
    navigation.navigate("terminfo", { title: "이용약관", content: term1 });
  }, []);
  const navigationLock = useCallback(() => {
    navigation.navigate("lockstack");
  }, []);
  const navigationAlarm = useCallback(() => {
    navigation.navigate("alarmsetting");
  }, []);
  return (
    <HCenterView>
      <Title title={"설정"} rightInVisible={true} />
      <Scroll>
        <SettingMenuTitle title={"Settings"} />
        <SettingMenu
          style={{ marginTop: widthPercentageToDP(6) }}
          title={"암호잠금 설정"}
          onPress={navigationLock}
        />
        <SettingMenu title={"알림 설정"} onPress={navigationAlarm} />
        <SettingMenu title={"개인정보처리방침"} onPress={navigationTerm1} />
        <SettingMenu title={"이용약관"} onPress={navigationTerm2} />
        <SettingMenu
          disabled={true}
          title={"앱 버전"}
          border={false}
          right={true}
          rightText={`${
            Platform.OS == "android" ? appVersion.android : appVersion.ios
          }(${timeFormat(appVersion.updatedAt, "YYYYMMDD")})`}
        />
        <SettingMenuTitle
          style={{ marginTop: widthPercentageToDP(6) }}
          title={"Contact us"}
        />
        <SettingMenu
          style={{ marginTop: widthPercentageToDP(6) }}
          title={"팀 정보"}
          onPress={navigateTeamInfo}
        />
        <SettingMenu
          disabled={true}
          title={"문의"}
          border={false}
          right={true}
          rightText={"h6handam@gmail.com"}
        />
      </Scroll>
    </HCenterView>
  );
};

export default connect(({ common }) => ({
  term1: common.term1,
  term2: common.term2,
  appVersion: common.appVersion
}))(Setting);
