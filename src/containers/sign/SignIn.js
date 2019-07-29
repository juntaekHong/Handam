import React, { useState, useCallback, useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
  SignInInputView,
  SignInInput
} from "../../components/signin/TextInput";
import { NBGText } from "../../components/common/Text";
import { SignInButton } from "../../components/signin/Button";
import {
  SignInMainView,
  SignInLinkView,
  SignInImage
} from "../../components/signin/View";
import { LinkView } from "../../components/common/View";
import colors from "../../configs/colors";
import {
  SignInActions,
  SignUpActions,
  CommonActions,
  HansungInfoActions
} from "../../store/actionCreator";
import OneSignal from "react-native-onesignal";
import { showMessage } from "../../utils/util";
import { FindPwModal } from "../../components/signin/Modal";
import { checkEmail } from "../../utils/validation";
import _ from "lodash";

const SignIn = ({ navigation }) => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwModal, setPwModal] = useState(false);
  const [email, setEmail] = useState("");
  const [pwError, setPwError] = useState(0);
  const [modalLoading, setModalLoading] = useState(false);

  const navigateSignUp = useCallback(() => {
    SignUpActions.init();
    navigation.navigate("signUp1");
  }, []);

  const openPwModal = useCallback(() => {
    setEmail("");
    setPwError(0);
    setPwModal(true);
  }, []);
  const closePwModal = useCallback(() => {
    setPwModal(false);
  }, []);

  const findOnChageText = useCallback(async value => {
    setEmail(value);
    if (value.length <= 0) setPwError(0);
    else {
      if (checkEmail(value)) {
        const result = await SignUpActions.checkUserId(value);
        if (!result) setPwError(2);
        else setPwError(3);
      } else {
        setPwError(1);
      }
    }
  }, []);

  const sendFindPwd = useCallback(async () => {
    if (modalLoading) return;
    await setModalLoading(true);
    const result = await SignInActions.sendFindPwd(email);
    if (result) showMessage("임시 비밀번호가 전송되었습니다.");
    else showMessage("임시 비밀번호 전송에 실패했습니다.");
    closePwModal();
    setModalLoading(false);
  }, [email, modalLoading]);

  const handleId = useCallback(value => {
    setId(value);
  }, []);
  const handlePwd = useCallback(value => {
    setPwd(value);
  }, []);

  const initState = useCallback(() => {
    setId("");
    setPwd("");
  }, []);

  const postSignIn = useCallback(async () => {
    OneSignal.getPermissionSubscriptionState(async status => {
      await CommonActions.handleLoading(true);
      const result = await SignInActions.postSingIn(id, pwd, status.userId);
      if (result) {
        await HansungInfoActions.getHansungInfo();
        await CommonActions.handleLoading(false);
        navigation.navigate("main");
        initState();
      } else {
        await CommonActions.handleLoading(false);
        showMessage("로그인에 실패했습니다.");
      }
    });
  }, [id, pwd]);

  return (
    <SignInMainView>
      <FindPwModal
        loading={modalLoading}
        value={email}
        visible={pwModal}
        error={pwError}
        footerDisabled={pwError == 2 ? false : true}
        onChangeText={findOnChageText}
        footerHandler={sendFindPwd}
        closeHandler={closePwModal}
      />
      <SignInImage />
      <SignInInputView marginBottom={12}>
        <SignInInput
          placeholder="이메일"
          keyboardType="email-address"
          value={id}
          onChangeText={handleId}
        />
      </SignInInputView>
      <SignInInputView marginBottom={44}>
        <SignInInput
          placeholder="비밀번호"
          secureTextEntry={true}
          value={pwd}
          onChangeText={handlePwd}
        />
      </SignInInputView>
      <SignInButton
        marginBottom={15}
        onPress={postSignIn}
        disabled={id.length <= 0 || pwd.length <= 0}
      >
        <NBGText color={"white"}>시작하기</NBGText>
      </SignInButton>
      <SignInLinkView height={22}>
        <LinkView
          paddingLeft={10.5}
          paddingRight={10.5}
          onPress={navigateSignUp}
        >
          <NBGText color={colors.active}>가입하기</NBGText>
        </LinkView>
        <SignInButton width={1} height={14} backgroundColor={"black"} />
        <LinkView paddingLeft={10.5} paddingRight={10.5} onPress={openPwModal}>
          <NBGText>비밀번호를 잊어버리셨나요?</NBGText>
        </LinkView>
      </SignInLinkView>
    </SignInMainView>
  );
};
export default connect()(SignIn);
