import React from "react";
import { CustomModal } from "../../common/Modal";
import { CenterView, BaseView } from "../../common/View";
import { NBGBText } from "../../common/Text";
import { widthPercentageToDP } from "../../../utils/util";

export const ScheduleModal = props => {
  return (
    <CustomModal {...props} height={220}>
      <BaseView style={{ paddingTop: widthPercentageToDP(12) }}>
        <NBGBText style={{ textAlign: "center" }}>
          {"시간표를 불러오는데\n최대 수 분 정도 소요될 수 있습니다."}
        </NBGBText>
      </BaseView>
    </CustomModal>
  );
};
