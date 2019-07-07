import React from "react";
import { connect } from "react-redux";
import { BaseView, Title, HCenterView } from "../../components/common/View";
import { Step, SelectView } from "../../components/signup/View";
import { SignUpNext } from "../../components/signup/Button";
import { NBGBText } from "../../components/common/Text";
import colors from "../../configs/colors";

const SignUp3 = props => {
  return (
    <HCenterView>
      <Title title="회원가입" />
      <Step number={3} />
      <HCenterView>
        <SelectView subject={"전공(1트랙)-필수"} value={"선택하기"} />
        <SelectView subject={"복수전공(2트랙)"} value={"선택하기"} />
        <SelectView subject={"부전공"} value={"선택하기"} />
        <SelectView subject={"연계전공"} value={"선택하기"} />
        <SelectView subject={"입학년도-필수"} value={"선택하기"} />
      </HCenterView>
      <SignUpNext>
        <NBGBText color={colors.white}>시작하기</NBGBText>
      </SignUpNext>
    </HCenterView>
  );
};

export default connect()(SignUp3);
