import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import {DropdownImg, HandamonImg} from "./Image";
import {ResetText, ScoreText, ScoreText_sky, SemesticText, LabelText, CalInfoText} from "./Text";
import {ResetBtn, ListBtn, AddBtn, CalculateBtn} from "./Button";

export const TitleView = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: ${widthPercentageToDP(60)};
  background-color: white;
  margin-left: ${widthPercentageToDP(14)};
`;

export const AccountInfoView = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: ${widthPercentageToDP(115.5)};
  background-color: white;
`;

export const SubTitleView = styled.View`
  flex-direction: row;
  width: 100%;
  height: ${widthPercentageToDP(51)};
  padding-left: ${widthPercentageToDP(29)};
  padding-top: ${widthPercentageToDP(29)};
  background-color: ${'#f8f8f8'};
`;

export const CertificationView = styled.View`
  flex-direction: row;
  height: ${widthPercentageToDP(157)};
  background-color: white;
`;

export const AccountDetailView = styled.View`
  background-color: white;
  padding-top: ${widthPercentageToDP(21)};
  padding-left: ${widthPercentageToDP(29)};
  padding-right: ${widthPercentageToDP(18)};
  margin-bottom: ${widthPercentageToDP(51)};
`;

// 계정정보 페이지 뷰
export const AccountView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  margin-top: ${widthPercentageToDP(17.5)};
  margin-horizontal: ${widthPercentageToDP(29)};
`;



// 성적계산 페이지

export const LineView = styled.View`
  background-color:#dbdbdb; 
  width: 100%; 
  height: ${widthPercentageToDP(0.5)};
`;

export const GradeLineView = styled.View`
  background-color:#dbdbdb; 
  width: ${widthPercentageToDP(262)};
  height: ${widthPercentageToDP(1)};
  margin-vertical: ${widthPercentageToDP(10)};
`;

const Caltop = styled.View`
  background-color: #fff;
  flex-direction: row;
  height: ${widthPercentageToDP(57)};
  justify-content: flex-end;
  align-items: center;
  padding-right:${widthPercentageToDP(26-11.6)};
`;

export const CaltopView = props => {
  return (
    <Caltop>
      <ResetBtn handler={()=>props.reset()}/>
      <ListBtn handler={()=>props.lists()}/>
    </Caltop>
  )
}

const Calbottom = styled.View`
  width: ${widthPercentageToDP(375)};
  height: 100%;
  padding-horizontal: ${widthPercentageToDP(28)};
`;

const Label = styled.View`
  flex-direction: row;
  margin-top: ${widthPercentageToDP(14.5)};
`;

const LabelView = ()=>{
  return(
    <Label>
        <LabelText style={{marginRight: widthPercentageToDP(193)}}>과목</LabelText>
        <LabelText style={{ marginRight: widthPercentageToDP(28)}}>학점</LabelText>
        <LabelText>성적</LabelText>
    </Label>
  )
}

export const CalbottomView = props => {
  return (
    <Calbottom>
      <SemesticText>{"학기"}</SemesticText>
      <LineView/>
      <LabelView/>

      {props.renderBoxComponents()}
      
      <AddBtn 
        handler={()=>{
          props.add();
        }}/>

      {props.renderCalresult()}

      <CalculateBtn handler={()=>{
          props.calculate()
        }}
      />

      <HandamonImg />
      <CalInfoText>시간표를 불러와 성적을 계산하실때 종합정보시스템 인증을 통한 시간표 불러오기를 먼저 해주셔야 합니다.</CalInfoText>

    </Calbottom>
  )
}

const Calresult = styled.View`
  flex-direction:row;
  width: 100%;
  justify-content: center;
  margin-top: ${widthPercentageToDP(30)};
`;

const Empty = styled.View`
  width:${widthPercentageToDP(28)};
`;

export const CalresultView = props => {
  return(
    <Calresult>
      <ScoreText>취득학점</ScoreText>
      <ScoreText_sky>{props.addScore}</ScoreText_sky>
      <Empty/>
      <ScoreText>학점</ScoreText>
      <ScoreText_sky>{props.averScore}</ScoreText_sky>
    </Calresult>
  )
}

const Radio_Out = styled.View`
  width: ${widthPercentageToDP(20)};
  height: ${widthPercentageToDP(20)};
  justify-content: center;
  align-items: center;
  border-width: ${widthPercentageToDP(1.5)};
  border-color: #24a0fa;
  border-radius: ${widthPercentageToDP(10)};
`;

export const Radio_Out_Un = styled(Radio_Out)`
  border-color: #a3a3a3;
`;

const Radio_In = styled.View`
  background-color: #24a0fa;
  width: ${widthPercentageToDP(14)};
  height: ${widthPercentageToDP(14)};
  border-width: ${widthPercentageToDP(0.5)};
  border-color: #24a0fa;
  border-radius: ${widthPercentageToDP(7)};
`;

export const Radio_Selected = () => {
  return (
    <Radio_Out><Radio_In/></Radio_Out>
  )
}