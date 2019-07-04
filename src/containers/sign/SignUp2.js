import React from "react";
import { connect } from "react-redux";
import { BaseView, Title } from "../../components/common/View";
import { Step } from "../../components/signup/View";

const SignUp2 = props => {
  return (
    <BaseView>
      <Title title="회원가입" />
      <Step number={2} />
    </BaseView>
  );
};

export default connect()(SignUp2);
