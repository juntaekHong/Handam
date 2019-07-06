import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { Title, HCenterView } from "../../components/common/View";
import { Step, TermCheckView, TermModal } from "../../components/signup/View";
import colors from "../../configs/colors";
import { SignUpActions } from "../../store/actionCreator";
import { NBGBText } from "../../components/common/Text";
import { Image } from "react-native";
import { SignUpNext, AllTermTrue } from "../../components/signup/Button";
import { NavigationActions, StackActions } from "react-navigation";

const SignUp1 = ({ first_term, second_term, navigation, term1, term2 }) => {
  const [term1_modal, setTerm1Modal] = useState(false);
  const [term2_modal, setTerm2Modal] = useState(false);

  const openTerm1Modal = useCallback(() => {
    setTerm1Modal(true);
  }, []);
  const closeTerm1Modal = useCallback(() => {
    setTerm1Modal(false);
  }, []);

  const openTerm2Modal = useCallback(() => {
    setTerm2Modal(true);
  }, []);
  const closeTerm2Modal = useCallback(() => {
    setTerm2Modal(false);
  }, []);

  const setAllTrue = useCallback(() => {
    SignUpActions.handleFirstTerm(true);
    SignUpActions.handleSecondTerm(true);
  }, []);

  const setFirst = useCallback(() => {
    SignUpActions.handleFirstTerm(!first_term);
  }, [first_term]);

  const setSecond = useCallback(() => {
    SignUpActions.handleSecondTerm(!second_term);
  }, [second_term]);

  const navigateNext = () => {
    navigation.navigate("signUp2");
  };
  const navigateBack = useCallback(async () => {
    await navigation.pop();
    SignUpActions.handleSecondTerm(false);
    SignUpActions.handleFirstTerm(false);
  }, []);
  const navigateReset = useCallback(async () => {
    await navigation.popToTop();
    SignUpActions.init();
  }, []);

  return (
    <HCenterView>
      <TermModal
        visible={term1_modal}
        title="개인정보 처리방침"
        rightHandler={closeTerm1Modal}
        content={term1}
      />
      <TermModal
        visible={term2_modal}
        title="한담 서비스 이용약관"
        rightHandler={closeTerm2Modal}
        content={term2}
      />

      <Title
        title="회원가입"
        leftHandler={navigateBack}
        rightHandler={navigateReset}
      />
      <Step number={1} />
      <HCenterView>
        <AllTermTrue
          backgroundColor={
            first_term && second_term ? colors.active : colors.white
          }
          onPress={setAllTrue}
        >
          <Image
            source={
              first_term && second_term
                ? require("HandamProject/assets/image/sign/smallsectionwhite.png")
                : require("HandamProject/assets/image/sign/smallsectionblack.png")
            }
          />
          <NBGBText
            color={first_term && second_term ? colors.white : colors.black}
          >
            회원가입 약관에 모두 동의합니다.
          </NBGBText>
        </AllTermTrue>
        <TermCheckView
          marginBottom={28}
          checkHandler={setFirst}
          check={first_term}
          subject="개인정보 수집 및 이용 동의 (필수)"
          content={`H6(이하 "소모임")은 정보통신망 이용촉친 및 정보보호 등에 관한 법률(이하 "정보통신망법"), 개인정보보호법, 통신...`}
          open={openTerm1Modal}
        />
        <TermCheckView
          checkHandler={setSecond}
          check={second_term}
          subject={"한담 서비스 이용 약관 (필수)"}
          content={`본 약관은 H6(이하 "소모임"이 제공하는 한성대학교 커뮤니티 서비스 한담(이하 "서비스")의 용에 관한 전반사항을`}
          open={openTerm2Modal}
        />
      </HCenterView>
      <SignUpNext
        disabled={!(first_term && second_term)}
        onPress={navigateNext}
      >
        <NBGBText color={colors.white}>계속 진행하기</NBGBText>
      </SignUpNext>
    </HCenterView>
  );
};

export default connect(({ common, signup }) => ({
  first_term: signup.first_term,
  second_term: signup.second_term,
  term1: common.term1,
  term2: common.term2
}))(SignUp1);
