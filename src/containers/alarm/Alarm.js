import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { BaseView, Title } from "../../components/common/View";
import { AlarmTab } from "../../components/alarm/view/AlarmTab";
import { AlarmList } from "../../components/alarm/view/AlarmList";
import { AlarmActions, CommonActions } from "../../store/actionCreator";

const Alarm = props => {
  const [index, setIndex] = useState(0);
  const handleUnread = useCallback(() => {
    listCall(0);
  }, []);
  const handleRead = useCallback(() => {
    listCall(1);
  }, []);
  const listCall = useCallback(async value => {
    await CommonActions.handleLoading(true);
    setIndex(value);
    await AlarmActions.getAlarmList(value === 0 ? false : true, 0);
    await CommonActions.handleLoading(false);
  });
  useEffect(() => {
    listCall(0);
  }, []);
  return (
    <BaseView>
      <Title title={"알림함"} rightInVisible={true} />
      <AlarmTab
        index={index}
        handleUnread={handleUnread}
        handleRead={handleRead}
        count={props.count}
      />
      {index == 0 ? (
        <AlarmList list={props.unreadList} index={index} />
      ) : (
        <AlarmList list={props.readList} index={index} />
      )}
    </BaseView>
  );
};

export default connect(({ alarm }) => ({
  unreadList: alarm.unreadList,
  readList: alarm.readList,
  count: alarm.count
}))(Alarm);
