import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { HCenterView } from "../../components/common/View";
import { NBGBText } from "../../components/common/Text";

const Jongro = props => {
  return (
    <HCenterView>
      <NBGBText>종로</NBGBText>
    </HCenterView>
  );
};

export default connect()(Jongro);
