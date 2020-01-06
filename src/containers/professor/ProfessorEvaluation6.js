import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { NextBtn, SelectBtn } from "../../components/professor/Button";
import {
  EvaluationHeaderView,
  ProgressView
} from "../../components/professor/View";
import { widthPercentageToDP } from "../../utils/util";
import { connect } from "react-redux";

const ProfessorEvalution6 = props => {
  const [objectValue, setObjectValue] =
    props.reply.length !== 0
      ? useState(props.reply[0].recommendation)
      : useState(-1);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            width: "100%",
            paddingLeft: widthPercentageToDP(48),
            paddingRight: widthPercentageToDP(47),
            marginTop: widthPercentageToDP(149),
            marginBottom: widthPercentageToDP(68)
          }}
        >
          <SelectBtn
            value={1}
            text={"추천"}
            currentValue={objectValue}
            onPress={() => setObjectValue(1)}
          />
          <SelectBtn
            value={0}
            text={"비추천"}
            currentValue={objectValue}
            onPress={() => setObjectValue(0)}
          />
        </View>

        <ProgressView step={6} />

        {props.reply.length === 0 ? (
          <NextBtn
            text={`다음`}
            valueEmpty={objectValue !== -1 ? false : true}
            replyLength={objectValue.length}
            onPress={() =>
              props.navigation.navigate("ProfessorEvaluation7", {
                professorInfoIndex:
                  props.navigation.state.params.professorInfoIndex,
                professorIndex: props.navigation.state.params.professorIndex,
                LecturePower: props.navigation.state.params.LecturePower,
                Homework: props.navigation.state.params.Homework,
                Elasticity: props.navigation.state.params.Elasticity,
                Communication: props.navigation.state.params.Communication,
                Grade: props.navigation.state.params.Grade,
                Recommendation: objectValue
              })
            }
          />
        ) : props.from != false ? (
          <NextBtn
            text={`다음`}
            valueEmpty={objectValue !== -1 ? false : true}
            replyLength={objectValue.length}
            onPress={() =>
              props.navigation.navigate("ProfessorEvaluation7", {
                professorIndex: props.navigation.state.params.professorIndex,
                LecturePower: props.navigation.state.params.LecturePower,
                Homework: props.navigation.state.params.Homework,
                Elasticity: props.navigation.state.params.Elasticity,
                Communication: props.navigation.state.params.Communication,
                Grade: props.navigation.state.params.Grade,
                Recommendation: objectValue
              })
            }
          />
        ) : (
          <NextBtn
            text={`다음`}
            valueEmpty={objectValue !== -1 ? false : true}
            replyLength={objectValue.length}
            onPress={() =>
              props.navigation.navigate("ProfessorEvaluation7", {
                LecturePower: props.navigation.state.params.LecturePower,
                Homework: props.navigation.state.params.Homework,
                Elasticity: props.navigation.state.params.Elasticity,
                Communication: props.navigation.state.params.Communication,
                Grade: props.navigation.state.params.Grade,
                Recommendation: objectValue
              })
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(state => ({
  reply: state.professor.reply,
  from: state.professor.from
}))(ProfessorEvalution6);
