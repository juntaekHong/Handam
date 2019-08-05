import React from "react";
import { CustomModal } from "../common/Modal";
import { BaseView } from "../common/View";
import { NBGText } from "../common/Text";
import { widthPercentageToDP } from "../../utils/util";

export const UpdateModal = props => {
  return (
    <CustomModal {...props} height={201.9}>
      <BaseView style={{ paddingTop: widthPercentageToDP(12) }}>
        <NBGText>업데이트가 필요합니다.</NBGText>
      </BaseView>
    </CustomModal>
  );
};
