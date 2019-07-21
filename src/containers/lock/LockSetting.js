import React, { useCallback, useRef, useEffect } from "react";
import { HCenterView, Title } from "../../components/common/View";
import { connect } from "react-redux";
import TouchID from "react-native-touch-id";
import { LockMenu } from "../../components/lock/view/LockMenu";
import { View } from "react-native";
import { widthPercentageToDP, storeData } from "../../utils/util";
import { NBGText } from "../../components/common/Text";
import { LockActions } from "../../store/actionCreator";
import navigators from "../../utils/navigators";

const LockSetting = props => {
  const passRef = useRef(null);
  const bioRef = useRef(null);

  const setPassLock = useCallback(async value => {
    if (!value) {
      await setBioLock(false);
      await LockActions.lockPassAction(false);
      LockActions.lockPasswordAction("");
      storeData("pass_locking", value + "");
    } else {
      await navigators.navigate("passsetting");
      if (passRef) passRef.current.toggleSwitchToValue(true, false);
    }
  });
  const setBioLock = useCallback(async value => {
    toggleSwitchToValue(true, false);
    await LockActions.lockBioAction(value);
    storeData("bio_locking", value + "");
  });
  return (
    <HCenterView>
      <Title
        title={"암호잠금 설정"}
        leftInVisible={true}
        style={{ borderBottomWidth: 1, borderColor: "#e4e4e4" }}
      />
      <LockMenu
        switchRef={passRef}
        title={"암호잠금 사용"}
        switch={true}
        disabled={true}
        value={props.passLock}
        toggle={setPassLock}
      />
      <LockMenu
        title={"암호잠금 변경"}
        border={false}
        menuDisable={!props.passLock}
        disabled={!props.passLock}
      />
      <View
        style={{
          height: widthPercentageToDP(9),
          width: "100%",
          backgroundColor: "#f8f8f8"
        }}
      />
      <LockMenu
        switchRef={bioRef}
        title={"생체인식 사용"}
        switch={true}
        border={false}
        disabled={true}
        value={props.bioLock}
        menuDisable={!props.passLock}
        toggle={setBioLock}
      />
      <NBGText
        style={{ width: "100%", paddingLeft: widthPercentageToDP(29) }}
        fontSize={10}
        color={"#272727"}
      >
        암호잠금을 10회이상 틀리면 자동 로그아웃 되며, 재로그인을 할 수
        있습니다.
      </NBGText>
    </HCenterView>
  );
};

export default connect(({ lock }) => ({
  passLock: lock.passLock,
  bioLock: lock.bioLock
}))(LockSetting);
