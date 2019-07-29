import React from "react";
import { SafeAreaView } from "react-native";
import Modal from "react-native-modal";

import { AlertModalView } from "./View";
import { AlertText } from "./Text";

export const AlertModal = props => {
  return (
    <Modal
      style={{ margin: 0 }}
      animationType={"fade"}
      isVisible={props.visible}
    >
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <AlertModalView>
          <AlertText>{props.text}</AlertText>
        </AlertModalView>
      </SafeAreaView>
    </Modal>
  );
};
