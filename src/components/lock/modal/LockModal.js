import React from "react";
import { CustomModal } from "../../common/Modal";
import { HCenterView } from "../../common/View";
import { NBGText } from "../../common/Text";

export const LockModal = props => {
  return (
    <CustomModal {...props} height={220}>
      <HCenterView>
        <NBGText fontSize={20}>암호가 설정되었습니다.</NBGText>
      </HCenterView>
    </CustomModal>
  );
};
