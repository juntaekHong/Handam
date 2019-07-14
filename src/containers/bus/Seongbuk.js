import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { HCenterView } from "../../components/common/View";
import { NBGBText } from "../../components/common/Text";

const Sungbuk = props => {
  return (
    <HCenterView>
      <NBGBText>성북</NBGBText>
    </HCenterView>
  );
};

export default connect()(Sungbuk);
