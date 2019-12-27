import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { NextBtn, SelectBtn } from "../../components/professor/Button";
import {
  EvaluationHeaderView,
  ProgressView
} from "../../components/professor/View";
import { widthPercentageToDP } from "../../utils/util";
import { connect } from "react-redux";

const ProfessorEvalution4 = props => {
  const [objectValue, setObjectValue] =
    props.reply.length !== 0 ? useState(props.reply[0].grade) : useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <EvaluationHeaderView
          title={"학점비율"}
          goback={() => {
            props.navigation.goBack(null);
          }}
          close={() => {
            props.from !== false
              ? props.navigation.navigate("ProfessorDetail")
              : props.navigation.navigate("MyWriteProfessorList");
          }}
        />
        <View
          style={{
            width: "100%",
            marginTop: widthPercentageToDP(67),
            paddingLeft: widthPercentageToDP(48),
            paddingRight: widthPercentageToDP(47),
            marginBottom: widthPercentageToDP(65)
          }}
        >
          <SelectBtn
            value={5}
            text={"후함"}
            currentValue={objectValue}
            onPress={() => setObjectValue(5)}
          />
          <SelectBtn
            value={3}
            text={"비율 맞춤"}
            currentValue={objectValue}
            onPress={() => setObjectValue(3)}
          />
          <SelectBtn
            value={1}
            text={"짜게줌"}
            currentValue={objectValue}
            onPress={() => setObjectValue(1)}
          />
        </View>

        <ProgressView step={4} />

        {props.reply.length === 0 ? (
          <NextBtn
            text={`다음`}
            valueEmpty={objectValue !== 0 ? false : true}
            onPress={() =>
              props.navigation.navigate("ProfessorEvaluation5", {
                professorInfoIndex:
                  props.navigation.state.params.professorInfoIndex,
                professorIndex: props.navigation.state.params.professorIndex,
                LecturePower: props.navigation.state.params.LecturePower,
                Homework: props.navigation.state.params.Homework,
                Elasticity: props.navigation.state.params.Elasticity,
                Communication: objectValue
              })
            }
          />
        ) : props.from != false ? (
          <NextBtn
            text={`다음`}
            valueEmpty={objectValue !== 0 ? false : true}
            onPress={() =>
              props.navigation.navigate("ProfessorEvaluation5", {
                professorIndex: props.navigation.state.params.professorIndex,
                LecturePower: props.navigation.state.params.LecturePower,
                Homework: props.navigation.state.params.Homework,
                Elasticity: props.navigation.state.params.Elasticity,
                Communication: objectValue
              })
            }
          />
        ) : (
          <NextBtn
            text={`다음`}
            valueEmpty={objectValue !== 0 ? false : true}
            onPress={() =>
              props.navigation.navigate("ProfessorEvaluation5", {
                LecturePower: props.navigation.state.params.LecturePower,
                Homework: props.navigation.state.params.Homework,
                Elasticity: props.navigation.state.params.Elasticity,
                Communication: objectValue
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
}))(ProfessorEvalution4);
