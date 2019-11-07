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
          {"성적표를 불러오는데\n최대 수 분 정도 소요될 수 있습니다."}
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
          {"비교과를 불러오는데\n최대 수 분 정도 소요될 수 있습니다."}
        </NBGBText>
      </BaseView>
    </CustomModal>
  );
};
