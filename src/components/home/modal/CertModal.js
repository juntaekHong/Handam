import React from "react";
import { CustomModal } from "../../common/Modal";
import { CenterView, BaseView } from "../../common/View";
import { NBGBText } from "../../common/Text";
import { widthPercentageToDP } from "../../../utils/util";

export const CertModal = props => {
  return (
    <CustomModal {...props}>
      <BaseView style={{ paddingTop: widthPercentageToDP(12) }}>
        <NBGBText>한성대학교를 인증해주세요!</NBGBText>
      </BaseView>
    </CustomModal>
  );
};
