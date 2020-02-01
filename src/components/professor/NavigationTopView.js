import React, { useState } from "react";
import { Keyboard } from "react-native";
import { EvaluationHeaderView } from "./View";
import navigators from "../../utils/navigators";

export const NavigationTopView = ({ props, from, navigationState }) => {
  const [title, setTitle] = useState([
    "강의수준",
    "과제만족도",
    "융통성",
    "학점 비율",
    "소통",
    "추천여부",
    "평가 리뷰 작성"
  ]);

  return (
    <EvaluationHeaderView
      title={title[navigationState.index]}
      goback={() => {
        title === "평가 리뷰 작성" ? Keyboard.dismiss() : null;

        navigationState.index !== 0
          ? navigators.navigate(`ProfessorEvaluation${navigationState.index}`)
          : navigators.navigateBack();
      }}
      close={() => {
        // props.from !== false
        //   ? props.navigation.navigate("ProfessorDetail")
        //   : props.navigation.navigate("MyWriteProfessorList");
        // redux connection 문제로 일단 임시로 첫페이지로 이동 후, goBack하는 방법으로 해결함.
        title === "평가 리뷰 작성" ? Keyboard.dismiss() : null;

        navigators.navigate(`ProfessorEvaluation${1}`);
        navigators.navigateBack();
      }}
    />
  );
};
