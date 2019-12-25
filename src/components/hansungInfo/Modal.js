import React from "react";
import { CustomModal } from "../common/Modal";
import { BaseView } from "../common/View";
import { NBGBText } from "../common/Text";
import { widthPercentageToDP } from "../../utils/util";

export const GradesModal = props => {
  return (
    <CustomModal {...props} height={220}>
      <BaseView style={{ paddingTop: widthPercentageToDP(12) }}>
        <NBGBText style={{ textAlign: "center" }}>
          {props.children}
        </NBGBText>
      </BaseView>
    </CustomModal>
  );
};

export const NonSubjectPointModal = props => {
  return (
    <CustomModal {...props} height={220}>
      <BaseView style={{ paddingTop: widthPercentageToDP(12) }}>
        <NBGBText style={{ textAlign: "center" }}>
          {props.children}
        </NBGBText>
      </BaseView>
    </CustomModal>
  );
};
