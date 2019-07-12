import React from "react";
import { connect } from "react-redux";
import { HCenterView, Title } from "../../components/common/View";
import { TabView, SceneMap } from "react-native-tab-view";

const Bus = props => {
  return (
    <HCenterView>
      <Title title={"스쿨버스"} rightInVisible={true} />
    </HCenterView>
  );
};

export default connect()(Bus);
