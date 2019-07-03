import React, { Component, useState, useCallback } from "react";
import { connect } from "react-redux";
import {
  SignInInputView,
  SignInInput
} from "../../components/signin/TextInput";
import { NBGText } from "../../components/common/Text";
import { SignInButton } from "../../components/signin/Button";
import { SignInMainView, SignInLinkView } from "../../components/signin/View";
import { LinkView } from "../../components/common/View";
import colors from "../../configs/colors";
import { SignInActions } from "../../store/actionCreator";
import OneSignal from "react-native-onesignal";
import { showMessage } from "../../utils/util";

const SignIn = ({ navigation }) => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  handleId = useCallback(value => {
    setId(value);
  }, []);
  handlePwd = useCallback(value => {
    setPwd(value);
  }, []);

  initState = useCallback(() => {
    setId("");
    setPwd("");
  }, []);

  postSignIn = useCallback(() => {
    OneSignal.getPermissionSubscriptionState(async status => {
      const result = await SignInActions.postSingIn(id, pwd, status.userId);
      if (result) navigation.navigate("main");
      else showMessage("로그인에 실패했습니다.");
    });
  }, [id, pwd]);

  return (
    <SignInMainView>
      <SignInInputView marginBottom={12}>
        <SignInInput
          placeholder="이메일"
          keyboardType="email-address"
          value={id}
          onChangeText={this.handleId}
        />
      </SignInInputView>
      <SignInInputView marginBottom={44}>
        <SignInInput
          placeholder="비밀번호"
          secureTextEntry={true}
          value={pwd}
          onChangeText={this.handlePwd}
        />
      </SignInInputView>
      <SignInButton
        marginBottom={15}
        onPress={this.postSignIn}
        disabled={id.length <= 0 || pwd.length <= 0}
      >
        <NBGText color={"white"}>시작하기</NBGText>
      </SignInButton>
      <SignInLinkView height={22}>
        <LinkView paddingLeft={10.5} paddingRight={10.5}>
          <NBGText color={colors.active}>가입하기</NBGText>
        </LinkView>
        <SignInButton width={1} height={14} backgroundColor={"black"} />
        <LinkView paddingLeft={10.5} paddingRight={10.5}>
          <NBGText>비밀번호를 잊어버리셨나요?</NBGText>
        </LinkView>
      </SignInLinkView>
    </SignInMainView>
  );
};
export default connect()(SignIn);
