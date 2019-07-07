import React from "react";
import styled from "styled-components/native";
import { CustomModal } from "../common/Modal";
import { NBGText } from "../common/Text";

export const SignUpCheckModal = props => {
  return (
    <CustomModal {...props}>
      <NBGText>{props.value}</NBGText>
    </CustomModal>
  );
};
