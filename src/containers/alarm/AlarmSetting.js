import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { HCenterView, Title } from "../../components/common/View";
import { widthPercentageToDP } from "../../utils/util";
import colors from "../../configs/colors";
import { NBGBText } from "../../components/common/Text";
import { View } from "react-native";
import {
  AlarmSetMenu,
  AlarmSetSubject,
  Bar
} from "../../components/alarm/view/AlarmSetMenu";
import { AlarmActions } from "../../store/actionCreator";

const AlarmSetting = ({ alarmSet }) => {
  const checkAll = useCallback(() => {
    let check = false;
    for (let key in alarmSet) {
      if (key !== "all" && alarmSet[key]) check = true;
    }
    AlarmActions.alarmAllAction(check);
    return check;
  }, []);

  const handleIsPosts = useCallback(async value => {
    await AlarmActions.alarmIsPostsAction(value);
    checkAll();
    AlarmActions.putUpdateUser(value ? "posts" : "posts_off");
  }, []);

  const handleAll = useCallback(value => {
    AlarmActions.alarmAllAction(value);
    AlarmActions.alarmIsPostsAction(value);
    AlarmActions.putUpdateUser(value ? "all" : "all_off");
  }, []);

  useEffect(() => {
    checkAll();
  }, []);

  return (
    <HCenterView>
      <Title title={"알림설정"} rightInVisible={true} />
      <AlarmSetMenu
        title={"전체알림"}
        height={68.5}
        menuDisable={false}
        value={alarmSet.all}
        toggle={handleIsPosts}
      />
      <AlarmSetSubject title={"활동알림"} />
      <View style={{ height: widthPercentageToDP(16.5) }} />
      <AlarmSetMenu
        title={"댓글 알림"}
        height={24}
        menuDisable={false}
        value={alarmSet.isPostsAlarm}
        toggle={handleAll}
      />
      <View style={{ width: "100%", paddingLeft: widthPercentageToDP(29) }}>
        <NBGBText
          color={colors.disable}
          fontSize={12}
          marginTop={6}
          marginBottom={9.5}
        >
          (내가 쓴 글에 댓글이 달리면 알려드립니다)
        </NBGBText>
        <Bar />
      </View>
    </HCenterView>
  );
};

export default connect(({ alarm }) => ({
  alarmSet: alarm.alarmSet
}))(AlarmSetting);
