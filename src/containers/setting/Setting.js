import React, { useCallback } from "react";
import { HCenterView, Title, Scroll } from "../../components/common/View";
import { connect } from "react-redux";
import { SettingMenuTitle } from "../../components/setting/view/SettingMenuTitle";
import { SettingMenu } from "../../components/setting/view/SettingMenu";
import { NavigationActions } from "react-navigation";
import { widthPercentageToDP } from "../../utils/util";

const Setting = ({ navigation }) => {
  return (
    <HCenterView>
      <Title title={"설정"} rightInVisible={true} />
      <Scroll>
        <SettingMenuTitle
          style={{ marginBottom: widthPercentageToDP(5.5) }}
          title={"Settings"}
        />
        <SettingMenu title={"암호잠금 설정"} />
        <SettingMenu title={"개인정보처리방침"} />
        <SettingMenu title={"이용약관"} />
        <SettingMenu disabled={true} title={"앱 버전"} border={false} />
        <SettingMenuTitle
          style={{ marginTop: widthPercentageToDP(6) }}
          title={"Contact us"}
        />
        <SettingMenu title={"팀 정보"} />
        <SettingMenu title={"공지사항"} />
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

export default connect()(Setting);
