import React, { useCallback } from "react";
import { connect } from "react-redux";
import { BaseView, Title } from "../../components/common/View";
import { Step } from "../../components/signup/View";
import { SignUpActions } from "../../store/actionCreator";

const SignUp2 = ({ navigation }) => {
  const navigateReset = useCallback(async () => {
    await navigation.popToTop();
    SignUpActions.init();
  }, []);
  return (
    <BaseView>
      <Title title="회원가입" rightHandler={navigateReset} />
      <Step number={2} />
    </BaseView>
  );
};

export default connect()(SignUp2);
