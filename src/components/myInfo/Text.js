/**
 * 폰트 적용된 Text Component
 * 기본 폰트 크기 14
 * 기본 색      #000
 */
import React from "react";
import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

// 기본 텍스트
export const StandText = styled.Text`
  font-size: ${widthPercentageToDP(14)};
  font-family: ${fonts.nanumBarunGothic};
  color: ${"black"};
`;

export const AccountDetailText = styled.Text`
  font-size: ${widthPercentageToDP(16)};
  font-family: ${fonts.nanumBarunGothic};
  color: ${"black"};
`;

export const CustomModalBlackText = styled.Text`
  color: #000000;
  font-size: ${widthPercentageToDP(20)};
  font-family: ${fonts.nanumBarunGothic};
  text-align: center;
`;

export const CustomModalBlackSmallText = styled.Text`
  color: #000000;
  font-size: ${widthPercentageToDP(14)};
  text-align: center;
  font-family: ${fonts.nanumBarunGothic};
`;

// 회원탈퇴 페이지 기본 텍스트
export const SECText = styled.Text`
  font-size: ${widthPercentageToDP(18)};
  font-family: ${fonts.nanumBarunGothic};
  color: ${"black"};
`;

// 계정정보 페이지 기본 텍스트
export const ACCOUNTINFOText = styled.Text`
  font-size: ${widthPercentageToDP(16)};
  font-family: ${fonts.nanumBarunGothic};
  color: ${"black"};
`;

// 비밀번호 변경 페이지 기본 텍스트
export const PassStandText = styled.Text`
  text-align: center;
  font-size: ${widthPercentageToDP(16)};
  font-family: ${fonts.nanumBarunGothic};
  color: ${"black"};
  margin-bottom: ${widthPercentageToDP(11)};
`;

// 비밀번호 변경 페이지 - 비밀번호 조건 만족 체크 텍스트
export const PassCheckText = styled.Text`
  text-align: center;
  font-size: ${widthPercentageToDP(8)};
  font-family: ${fonts.nanumBarunGothic};
  color: ${"red"};
  margin-bottom: ${widthPercentageToDP(26)};
`;

// 성적계산페이지

export const ResetText = styled.Text`
  color: #000;
  font-size: ${widthPercentageToDP(14)};
  font-family: ${fonts.nanumBarunGothic};
`;

export const AddText = styled.Text`
  color: #24a0fa;
  font-size: ${widthPercentageToDP(14)};
  font-family: ${fonts.nanumBarunGothic};
`;

export const CalculateText = styled.Text`
  color: #fff;
  font-size: ${widthPercentageToDP(14)};
  font-family: ${fonts.nanumBarunGothicB};
`;

export const SemesticText = styled.Text`
  color: #24a0fa;
  font-size: ${widthPercentageToDP(14)};
  font-family: ${fonts.nanumBarunGothicB};
  margin-top: ${widthPercentageToDP(15)};
  margin-bottom: ${widthPercentageToDP(11.5)};
`;

export const LabelText = styled.Text`
  color: #000;
  font-size: ${widthPercentageToDP(16)};
  font-family: ${fonts.nanumBarunGothic};
`;

export const ScoreText = styled.Text`
  color: #000;
  font-size: ${widthPercentageToDP(18)};
  font-family: ${fonts.nanumBarunGothic};
`;

export const ScoreText_sky = styled(ScoreText)`
  color: #24a0fa;
  font-family: ${fonts.nanumBarunGothicB};
  margin-left: ${widthPercentageToDP(7)};
`;

export const CalInfoText = styled.Text`
  color: #000;
  font-size: ${widthPercentageToDP(14)};
  font-family: ${fonts.nanumBarunGothicUL};
  line-height: ${widthPercentageToDP(22)};
  margin-bottom: ${widthPercentageToDP(50)};
`;

export const ModalText = props => {
  return (
    <CustomModalBlackText>
      {props.kind == 0
        ? "해당 학기의 시간표가 없습니다!"
        : "먼저 종합정보시스템 인증을 통해\n시간표를 불러와주세요!"}
    </CustomModalBlackText>
  );
};

export const GradeText = styled.Text`
  color: #000;
  font-size: ${widthPercentageToDP(22)};
  font-family: ${fonts.nanumBarunGothic};
  width: ${widthPercentageToDP(42)};
  padding: 0;
  margin: 0;
  margin-right: ${widthPercentageToDP(195)};
`;

export const GradeTriggerText = styled.Text`
  color: #000;
  font-size: ${widthPercentageToDP(14)};
  font-family: ${fonts.nanumBarunGothic};
`;
