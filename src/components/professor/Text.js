import React from "react";
import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

// 최근 순 텍스트
export const CurrentOrderText = styled.Text`
  font-size: ${widthPercentageToDP(12)};
  font-family: ${fonts.nanumBarunGothic};
  color: #565a61;
`;

// 모달 텍스트
export const ModalText = styled.Text`
  font-size: ${widthPercentageToDP(16)};
  font-family: ${fonts.nanumBarunGothicB};
  color: #646464;
`;

export const ProfessorNameText = styled.Text`
  color: #000000;
  font-size: ${widthPercentageToDP(15)};
  font-family: ${fonts.nanumBarunGothicB};
  margin-bottom: ${widthPercentageToDP(9)};
`;

export const ProfessorInfoText = styled.Text`
  color: #565a61;
  font-size: ${widthPercentageToDP(12)};
  font-family: ${fonts.nanumBarunGothic};
`;

export const AvgStarText = styled.Text`
  color: #ff3400;
  font-size: ${widthPercentageToDP(10)};
  font-family: ${fonts.nanumBarunGothicB};
`;

export const TitleNameText = styled.Text`
  width: ${widthPercentageToDP(245.7)};
  margin-left: ${widthPercentageToDP(27)};
  text-align: center;
  font-family: ${fonts.nanumBarunGothicB};
  font-size: ${widthPercentageToDP(16)};
  color: #000000;
`;

export const EvaluationText = styled.Text`
  text-align: center;
  color: #259ffa;
  font-size: ${widthPercentageToDP(12)};
  font-family: ${fonts.nanumBarunGothicB};
`;

// 교수평각 각 항목 타이틀 텍스트
export const EvaluationTitleText = styled.Text`
  width: 100%;
  text-align: center;
  font-size: ${widthPercentageToDP(16)};
  font-family: ${fonts.nanumBarunGothicB};
  color: #000000;
`;

export const StepInfoText = styled.Text`
  position: relative;
  font-size: ${widthPercentageToDP(8)};
  font-family: ${fonts.nanumBarunGothicL};
  color: #000000;
  margin-top: ${widthPercentageToDP(5)};
`;

export const RecommendText = styled.Text`
  font-size: ${widthPercentageToDP(10)};
  font-family: ${fonts.nanumBarunGothicUL};
  text-align: center;
  color: #565a61;
`;

//
export const MyWriteProfessorText = styled.Text`
  font-size: ${props =>
    props.fontSize ? widthPercentageToDP(props.fontSize) : null};
  color: ${props => (props.color ? props.color : "#000000")};
  font-family: ${props =>
    props.fontFamily ? fonts.nanumBarunGothicUL : fonts.nanumBarunGothic};
`;

// 데이터 결과 없을 때
export const NonResultText = styled.Text`
  text-align: center;
  font-size: ${widthPercentageToDP(11)};
  color: #707070;
  font-family: ${fonts.nanumBarunGothic};
`;

// 상세 페이지 알림 모달 텍스트
export const NoticModalText = styled.Text`
  font-family: ${fonts.nanumBarunGothic};
  font-size: ${props =>
    props.size ? widthPercentageToDP(props.size) : widthPercentageToDP(13)};
  color: ${props => (props.color ? props.color : "#646464")};
  line-height: ${widthPercentageToDP(22)};
  margin-bottom: ${props =>
    props.marginBottom ? widthPercentageToDP(props.marginBottom) : 0};
`;
