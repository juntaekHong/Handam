import React from "react";
import { connect } from "react-redux";
import { HCenterView, Title } from "../../components/common/View";

const AlarmSetting = props => {
  return (
    <HCenterView>
      <Title title={"알림설정"} rightInVisible={true} />
    </HCenterView>
  );
};

export default connect()(AlarmSetting);
