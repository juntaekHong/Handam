import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { BaseView, Title } from "../../components/common/View";
import { AlarmTab } from "../../components/alarm/AlarmTab";

const Alarm = props => {
  const [index, setIndex] = useState(0);
  const handleUnread = useCallback(() => {
    setIndex(0);
  }, []);
  const handleRead = useCallback(() => {
    setIndex(1);
  }, []);
  return (
    <BaseView>
      <Title title={"알림함"} rightInVisible={true} />
      <AlarmTab
        index={index}
        handleUnread={handleUnread}
        handleRead={handleRead}
      />
    </BaseView>
  );
};

export default connect()(Alarm);
