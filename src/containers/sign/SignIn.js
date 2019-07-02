import React, { Component } from "react";
import { connect } from "react-redux";
import {
  SignInInputView,
  SignInInput
} from "../../components/signin/TextInput";
import { NBGText } from "../../components/common/Text";
import { SignInButton } from "../../components/signin/Button";
import { SignInMainView, SignInLinkView } from "../../components/signin/View";

class SignIn extends Component {
  render() {
    return (
      <SignInMainView>
        <SignInInputView marginBottom={12}>
          <SignInInput placeholder="이메일" keyboardType="email-address" />
        </SignInInputView>
        <SignInInputView marginBottom={44}>
          <SignInInput placeholder="비밀번호" secureTextEntry={true} />
        </SignInInputView>
        <SignInButton marginBottom={18}>
          <NBGText color={"white"}>시작하기</NBGText>
        </SignInButton>
        <SignInLinkView>
          <NBGText>가입하기</NBGText>
          <SignInButton
            marginLeft={10.5}
            marginRight={10.5}
            width={1}
            height={14}
            backgroundColor={"black"}
          />
          <NBGText>비밀번호를 잊어버리셨나요?</NBGText>
        </SignInLinkView>
      </SignInMainView>
    );
  }
}
export default connect()(SignIn);
