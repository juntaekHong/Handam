import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { HCenterView, Title } from "../../components/common/View";
import { NBGText } from "../../components/common/Text";
import { widthPercentageToDP } from "../../utils/util";
import { Password, NumberRow } from "../../components/lock/view/Password";
import { NumberButton } from "../../components/lock/button/NumberButton";
import { LockModal } from "../../components/lock/modal/LockModal";
import { LockActions } from "../../store/actionCreator";

const PassSetting = props => {
  const [firstPass, setFirstPass] = useState("");
  const [secondPass, setSecondPass] = useState("");
  const [contentText, setContentText] = useState(
    "새롭게 사용할\n암호 잠금번호를 입력하세요"
  );
  const [modal, setModal] = useState(false);
  const numberPress = useCallback(
    value => {
      if (firstPass.length < 4) setFirstPass(firstPass + String(value));
      else if (secondPass.length < 4) setSecondPass(secondPass + String(value));
      if (firstPass.length < 3)
        setContentText("새롭게 사용할\n암호 잠금번호를 입력하세요");
      else if (secondPass.length < 3) setContentText("재입력 해주세요");
    },
    [firstPass, secondPass, contentText]
  );

  const deletePress = useCallback(() => {
    if (firstPass.length < 4) setFirstPass(firstPass.slice(0, -1));
    else if (secondPass.length < 4) setSecondPass(secondPass.slice(0, -1));
  }, [firstPass, secondPass]);

  const complete = useCallback(async () => {
    await props.navigation.getParam("complete")();
    setModal(false);
    props.navigation.goBack();
  }, []);

  useEffect(() => {
    if (firstPass.length === 4 && secondPass.length === 4) {
      if (firstPass === secondPass) {
        setModal(true);
        LockActions.handlePassword(firstPass);
      } else {
        setFirstPass("");
        setSecondPass("");
        setContentText("암호가 틀렸습니다\n처음부터 다시 입력해주세요");
      }
    }
  }, [firstPass, secondPass]);

  return (
    <HCenterView>
      <LockModal
        visible={modal}
        footerHandler={complete}
        closeHandler={complete}
      />
      <Title title={"암호잠금 설정"} rightInVisible={true} />
      <NBGText
        style={{
          height: widthPercentageToDP(56),
          lineHeight: widthPercentageToDP(28)
        }}
        allowFontScaling={false}
        marginTop={72}
        marginBottom={40}
        align={"center"}
        alignVertical={"center"}
        fontSize={20}
      >
        {contentText}
      </NBGText>

      {firstPass.length < 4 ? (
        <Password pass={firstPass} />
      ) : (
        <Password pass={secondPass} />
      )}

      <NumberRow>
        <NumberButton number={1} onPress={numberPress} />
        <NumberButton number={2} onPress={numberPress} />
        <NumberButton number={3} onPress={numberPress} />
      </NumberRow>
      <NumberRow>
        <NumberButton number={4} onPress={numberPress} />
        <NumberButton number={5} onPress={numberPress} />
        <NumberButton number={6} onPress={numberPress} />
      </NumberRow>
      <NumberRow>
        <NumberButton number={7} onPress={numberPress} />
        <NumberButton number={8} onPress={numberPress} />
        <NumberButton number={9} onPress={numberPress} />
      </NumberRow>
      <NumberRow>
        <NumberButton number={""} disabled={true} />
        <NumberButton number={0} onPress={numberPress} />
        <NumberButton number={""} delete={true} onPress={deletePress} />
      </NumberRow>
    </HCenterView>
  );
};

export default connect(({ lock }) => ({
  password: lock.password
}))(PassSetting);
