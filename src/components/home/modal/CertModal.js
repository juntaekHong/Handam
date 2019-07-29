import React from "react";
import { CustomModal } from "../../common/Modal";
import { CenterView } from "../../common/View";
import { NBGBText } from "../../common/Text";

export const CertModal = props => {
  return (
    <CustomModal {...props}>
      <CenterView>
        <NBGBText>한성대학교를 인증해주세요!</NBGBText>
      </CenterView>
    </CustomModal>
  );
};
