import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { BaseView, Title, HCenterView } from "../../components/common/View";
import { Step } from "../../components/signup/View";
import { SignUpActions } from "../../store/actionCreator";
import { SignUpTextField } from "../../components/signup/Text";
import { SignUpNext } from "../../components/signup/Button";
import { NBGBText } from "../../components/common/Text";
import colors from "../../configs/colors";
import { KeyboardAvoidingView, ScrollView, Platform, View } from "react-native";
import {
  checkEmail,
  checkNickName,
  checkNickNameLength,
  checkPass,
  checkEmoji
} from "../../utils/validation";
import { SignUpCheckModal } from "../../components/signup/Modal";

const SignUp2 = ({ navigation, userId, userPw, userNickName }) => {
  const [userRePw, settingUserRePw] = useState("");
  const [checkModal, setCheckModal] = useState(false);
  const [checkStr, setCheckStr] = useState("");

  const [pwFocus, setPwFocus] = useState(false);
  const [idFocus, setIdFocus] = useState(false);
  const [rePwFocus, setRePwFocus] = useState(false);
  const [nickNameFocus, setNickNameFocus] = useState(false);

  const [idErr, setIdErr] = useState(false);
  const [pwErr, setPwErr] = useState(false);
  const [rePwErr, setRePwErr] = useState(false);
  const [nickNameErr, setNickNameErr] = useState(false);

  const navigateNext = useCallback(async () => {
    if (!checkEmoji(userNickName)) {
      setNickNameErr(true);
      return openCheckModal("이모티콘은 사용하실 수 없습니다.");
    }

    const idCheck = await SignUpActions.checkUserId(userId);
    if (!idCheck) {
      setIdErr(true);
      return openCheckModal("중복되는 이메일 입니다.");
    }
    const badNickName = await SignUpActions.checkBlockUserNickName(
      userNickName
    );
    if (!badNickName) {
      setNickNameErr(true);
      return openCheckModal("만들수 없는 닉네임입니다.");
    }
    const nickNameCheck = await SignUpActions.checkUserNickName(userNickName);
    if (!nickNameCheck) {
      setNickNameErr(true);
      return openCheckModal("중복되는 닉네임 입니다.");
    }
    navigation.navigate("signUp3");
  }, [userId, userPw, userNickName, checkStr]);
  const navigateReset = useCallback(async () => {
    await navigation.popToTop();
    SignUpActions.init();
  }, []);

  const openCheckModal = useCallback(value => {
    setCheckStr(value);
    setCheckModal(true);
  }, []);
  const closeCheckModal = useCallback(() => {
    setCheckModal(false);
    setCheckStr("");
  }, []);

  const setIdOnFocus = useCallback(() => {
    setIdFocus(true);
  }, []);
  const setIdOnBlur = useCallback(() => {
    setIdFocus(false);
  }, []);

  const setPwOnFocus = useCallback(() => {
    setPwFocus(true);
  }, []);
  const setPwOnBlur = useCallback(() => {
    setPwFocus(false);
  }, []);

  const setRePwOnFocus = useCallback(() => {
    setRePwFocus(true);
  }, []);
  const setRePwOnBlur = useCallback(() => {
    setRePwFocus(false);
  }, []);

  const setNickNameOnFocus = useCallback(() => {
    setNickNameFocus(true);
  }, []);
  const setNickNameOnBlur = useCallback(() => {
    setNickNameFocus(false);
  }, []);

  const setUserId = useCallback(value => {
    SignUpActions.userIdAction(value);
    if (checkEmail(value)) setIdErr(false);
    else setIdErr(true);
  }, []);
  const setUserPw = useCallback(value => {
    SignUpActions.userPwAction(value);
    if (!checkPass(value)) return setPwErr(true);
    else return setPwErr(false);
  }, []);
  const setUserRePw = useCallback(value => {
    settingUserRePw(value);
  }, []);
  const setUserNickName = useCallback(value => {
    SignUpActions.userNickNameAction(value);
    if (!checkNickNameLength(value)) return setNickNameErr(true);
    if (!checkNickName(value)) return setNickNameErr(true);
    setNickNameErr(false);
  }, []);

  const nextCheck = useCallback(() => {
    return !(
      !idErr &&
      !pwErr &&
      !rePwErr &&
      !nickNameErr &&
      userId.length > 0 &&
      userPw.length > 0 &&
      userRePw.length > 0 &&
      userNickName.length > 0
    );
  }, [
    idErr,
    pwErr,
    rePwErr,
    nickNameErr,
    userId,
    userPw,
    userRePw,
    userNickName
  ]);

  return (
    <HCenterView>
      <SignUpCheckModal
        visible={checkModal}
        value={checkStr}
        closeHandler={closeCheckModal}
        footerHandler={closeCheckModal}
      />
      <Title title="회원가입" rightHandler={navigateReset} />
      <Step number={2} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : ""}
        enabled
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            <SignUpTextField
              isFocus={idFocus}
              onFocus={setIdOnFocus}
              onBlur={setIdOnBlur}
              value={userId}
              onChangeText={setUserId}
              error={idErr}
              label="이메일"
              placeholder="정확한 이메일 형태를 입력"
              keyboardType={"email-address"}
            />
            <SignUpTextField
              isFocus={pwFocus}
              onFocus={setPwOnFocus}
              onBlur={setPwOnBlur}
              value={userPw}
              onChangeText={setUserPw}
              error={pwErr}
              label="비밀번호"
              placeholder="영문, 숫자, 특수문자를 포함한 7자이상"
              secureTextEntry={true}
            />
            <SignUpTextField
              isFocus={rePwFocus}
              onFocus={setRePwOnFocus}
              onBlur={setRePwOnBlur}
              value={userRePw}
              onChangeText={setUserRePw}
              error={userPw !== userRePw}
              label="비밀번호 확인"
              placeholder="한번 더"
              secureTextEntry={true}
            />
            <SignUpTextField
              isFocus={nickNameFocus}
              onFocus={setNickNameOnFocus}
              onBlur={setNickNameOnBlur}
              value={userNickName}
              onChangeText={setUserNickName}
              error={nickNameErr}
              label="닉네임"
              placeholder="닉네임은 변경이 불가하니 신중!(2글자 이상)"
              marginBottom={32}
            />
          </View>
          <SignUpNext
            disabled={
              !(
                !idErr &&
                !pwErr &&
                userPw === userRePw &&
                !nickNameErr &&
                userId.length > 0 &&
                userPw.length > 0 &&
                userRePw.length > 0 &&
                userNickName.length > 0
              )
            }
            onPress={navigateNext}
          >
            <NBGBText color={colors.white}>계속 진행하기</NBGBText>
          </SignUpNext>
        </ScrollView>
      </KeyboardAvoidingView>
    </HCenterView>
  );
};

export default connect(({ signup }) => ({
  userId: signup.userId,
  userPw: signup.userPw,
  userNickName: signup.userNickName
}))(SignUp2);
