import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import {
  FilterImg,
  ProfessorSelectionImg,
  TrackSelectionImg,
  BackImg,
  CloseImg,
  FilterImg2,
  GoodImg,
  BadImg,
  GoodCheckImg,
  BadCheckImg,
  RefreshImg
} from "./Image";
import fonts from "../../configs/fonts";
import { View, Text } from "react-native";
import { EvaluationText, ModalText } from "./Text";

export const Container = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: ${widthPercentageToDP(6)};
  margin-right: ${widthPercentageToDP(23)};
`;

const Filter = styled.TouchableOpacity``;

export const FilterBtn = props => {
  return (
    <Filter onPress={() => props.handler()}>
      <FilterImg2 />
    </Filter>
  );
};

export const RefreshBtn = props => {
  return (
    <Filter onPress={() => props.handler()}>
      <RefreshImg />
    </Filter>
  );
};

const TrackFilter = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const TrackFilterBtn = props => {
  return (
    <TrackFilter onPress={() => props.handler()}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",

          paddingBottom: widthPercentageToDP(1.1),
          borderBottomWidth: widthPercentageToDP(1),
          borderBottomColor: "#707070"
        }}
      >
        {props.track === "해당없음" ? (
          <ModalText
            style={{
              width: "100%",
              position: "absolute",
              textAlign: "center"
            }}
          >
            트랙명(필수)
          </ModalText>
        ) : (
          <Text
            numberOfLines={1}
            style={{
              width: "100%",
              position: "absolute",
              textAlign: "center",
              fontSize: widthPercentageToDP(16),
              fontFamily: fonts.nanumBarunGothicB,
              color: "#000000",
              paddingLeft: widthPercentageToDP(20),
              paddingRight: widthPercentageToDP(20)
            }}
          >
            {props.track == "해당없음" ? "" : props.track}
          </Text>
        )}
        <View
          style={{
            position: "relative",
            width: "100%",
            alignItems: "flex-end"
          }}
        >
          <TrackSelectionImg select={props.track} />
        </View>
      </View>
    </TrackFilter>
  );
};

const ProfessorFilter = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: ${widthPercentageToDP(36.5)};
`;

export const ProfessorFilterBtn = props => {
  return (
    <ProfessorFilter
      disabled={props.disabled == "해당없음" ? true : false}
      onPress={() => {
        props.handler();
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",

          paddingBottom: widthPercentageToDP(1.1),
          borderBottomWidth: widthPercentageToDP(1),
          borderBottomColor: "#707070"
        }}
      >
        {props.professor === "해당없음" ? (
          <ModalText
            style={{
              width: "100%",
              position: "absolute",
              textAlign: "center"
            }}
          >
            교수님 명
          </ModalText>
        ) : (
          <Text
            numberOfLines={1}
            style={{
              width: "100%",
              position: "absolute",
              textAlign: "center",
              fontSize: widthPercentageToDP(16),
              fontFamily: fonts.nanumBarunGothicB,
              color: "#000000",
              paddingLeft: widthPercentageToDP(20),
              paddingRight: widthPercentageToDP(20)
            }}
          >
            {props.professor == "해당없음" ? "" : props.professor}
          </Text>
        )}
        <View
          style={{
            position: "relative",
            width: "100%",
            alignItems: "flex-end"
          }}
        >
          <ProfessorSelectionImg select={props.professor} />
        </View>
      </View>
    </ProfessorFilter>
  );
};

const Back = styled.TouchableOpacity`
  width: ${widthPercentageToDP(28)};
  height: ${widthPercentageToDP(28)};
`;

export const BackBtn = props => {
  return (
    <Back
      onPress={() => {
        props.goback();
      }}
    >
      <BackImg />
    </Back>
  );
};

const Close = styled.TouchableOpacity`
  width: ${widthPercentageToDP(28)};
  height: ${widthPercentageToDP(28)};
`;

export const CloseBtn = props => {
  return (
    <Close
      onPress={() => {
        props.close();
      }}
    >
      <CloseImg />
    </Close>
  );
};

const ProfessorEvaluation = styled.TouchableOpacity`
  position: relative;
  left: ${widthPercentageToDP(-28.7)};
  width: ${widthPercentageToDP(70)};
  height: ${widthPercentageToDP(25)};
  justify-content: center;
  border-style: solid;
  border-width: ${widthPercentageToDP(1)};
  border-color: #259ffa;
  border-radius: ${widthPercentageToDP(15)};
`;

export const EvaluationBtn = props => {
  return (
    <ProfessorEvaluation
      onPress={() => {
        props.Evaluation();
      }}
    >
      <EvaluationText>평가하기</EvaluationText>
    </ProfessorEvaluation>
  );
};

// 각 항목 평가 페이지 다음 버튼
const Next = styled.TouchableOpacity`
  height: ${widthPercentageToDP(50)};
  justify-content: center;
  align-items: center;
  border-radius: ${widthPercentageToDP(49)};
  background-color: #b7b7b7;
  margin-horizontal: ${widthPercentageToDP(86)};
  margin-bottom: ${widthPercentageToDP(49)};
`;

export const NextBtn = props => {
  return (
    <Next
      {...props}
      disabled={!props.valueEmpty ? false : true}
      style={!props.valueEmpty ? { backgroundColor: "#259ffa" } : null}
    >
      <Text
        style={{
          fontSize: widthPercentageToDP(20),
          fontFamily: fonts.nanumBarunGothic,
          color: "#ffffff"
        }}
      >
        {props.text}
      </Text>
    </Next>
  );
};

// 평가 값 버튼
const EvaluationValue = styled.TouchableOpacity`
  width: ${widthPercentageToDP(280)};
  height: ${widthPercentageToDP(52)};
  margin-bottom: ${widthPercentageToDP(13)};
  justify-content: center;
  align-items: center;
  border-radius: ${widthPercentageToDP(18)};
  background-color: #e7e7e7;
`;

export const SelectBtn = props => {
  return (
    <EvaluationValue
      {...props}
      select={props.value}
      style={
        props.value === props.currentValue
          ? { backgroundColor: "rgba(13, 207, 224, 0.57)" }
          : null
      }
    >
      <Text
        style={{
          fontSize: widthPercentageToDP(14),
          fontFamily: fonts.nanumBarunGothic,
          textAlign: "center",
          color: "#000000"
        }}
      >
        {props.text}
      </Text>
    </EvaluationValue>
  );
};

// 추천 비추천 버튼
const Good = styled.TouchableOpacity`
  margin-bottom: ${widthPercentageToDP(4)};
`;

export const GoodBtn = props => {
  return (
    <Good {...props} onPress={() => props.handler()}>
      {props.check === true ? <GoodCheckImg /> : <GoodImg />}
    </Good>
  );
};

// 추천 비추천 버튼
const Bad = styled.TouchableOpacity`
  margin-bottom: ${widthPercentageToDP(4)};
`;

export const BadBtn = props => {
  return (
    <Bad {...props} onPress={() => props.handler()}>
      {props.check === true ? <BadCheckImg /> : <BadImg />}
    </Bad>
  );
};

// 내가 쓴 교수평가 container
export const MyWriteProfessorContainer = styled.TouchableOpacity`
  margin-left: ${widthPercentageToDP(18)};
  margin-right: ${widthPercentageToDP(17)};
  width: ${widthPercentageToDP(340)};
  height: ${widthPercentageToDP(84)};
  border-radius: ${widthPercentageToDP(14)};
  border-width: ${widthPercentageToDP(0.5)};
  border-style: solid;
  border-color: #dbdbdb;
  background-color: #ffffff;
`;
