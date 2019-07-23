import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { HCenterView, Title } from "../../components/common/View";
import { NBGText } from "../../components/common/Text";
import { widthPercentageToDP, removeAllData } from "../../utils/util";
import { Password, NumberRow } from "../../components/lock/view/Password";
import { NumberButton } from "../../components/lock/button/NumberButton";
import navigators from "../../utils/navigators";
import TouchID from "react-native-touch-id";

const LockSolve = props => {
  const [pass, setPass] = useState("");
  const [count, setCount] = useState(0);
  const [bio, setBio] = useState(true);
  const [contentText, setContentText] = useState("암호를 입력해주세요");

  const numberPress = useCallback(
    value => {
      if (pass.length < 4) setPass(pass + String(value));
      if (pass.length < 3) setContentText("암호를 입력해주세요");
    },
    [pass]
  );

  const deletePress = useCallback(() => {
    if (pass.length < 4) setPass(pass.slice(0, -1));
  }, [pass]);

  const requestBio = useCallback(() => {
    const optionalConfigObject = {
      title: props.bioOption === "FaceID" ? "FaceID" : "TouchID", // Android
      imageColor: "#e00606", // Android 7ed5ff
      imageErrorColor: "#e00606", // Android
      sensorDescription: "Touch sensor", // Android
      sensorErrorDescription: "Failed", // Androidbio_locking
      sensorErrorDescriptionColor: "#e00606",
      cancelText: "닫기", // Android
      fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };

    TouchID.authenticate(
      props.bioOption === "FaceID" ? "얼굴을 인식하세요" : "지문을 인식하세요",
      optionalConfigObject
    )
      .then(success => {
        navigators.navigate(props.signin_navigate);
      })
      .catch(error => {
        setBio(false);
      });
  }, []);

  useEffect(() => {
    if (props.bioOption.length > 0 && props.bioLock && bio) requestBio();

    if (pass.length === 4) {
      if (pass === props.password) {
        navigators.navigate(props.signin_navigate);
      } else {
        if (count >= 10) {
          removeAllData();
          navigators.navigate("signIn");
        } else {
          setPass("");
          setCount(count + 1);
          setContentText("암호가 틀렸습니다\n다시 입력해주세요");
        }
      }
    }
  }, [pass, count]);

  return (
    <HCenterView>
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
      <Password pass={pass} />
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

export default connect(({ signin, lock }) => ({
  password: lock.password,
  bioOption: lock.bioOption,
  signin_navigate: signin.signin_navigate,
  bioLock: lock.bioLock
}))(LockSolve);
