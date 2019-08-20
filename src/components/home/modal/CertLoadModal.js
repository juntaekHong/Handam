import React from "react";
import { CustomModal } from "../../common/Modal";
import { CenterView, BaseView } from "../../common/View";
import { NBGBText } from "../../common/Text";
import { widthPercentageToDP } from "../../../utils/util";

export const CertLoadModal = props => {
  return (
    <CustomModal {...props}>
      <BaseView style={{ paddingTop: widthPercentageToDP(12) }}>
        <NBGBText>종합정보시스템 인증중입니다.</NBGBText>
      </BaseView>
    </CustomModal>
  );
};
