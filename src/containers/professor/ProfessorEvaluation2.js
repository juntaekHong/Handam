import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { NextBtn, SelectBtn } from "../../components/professor/Button";
import {
  EvaluationHeaderView,
  ProgressView
} from "../../components/professor/View";
import { widthPercentageToDP } from "../../utils/util";
import { connect } from "react-redux";

const ProfessorEvalution2 = props => {
  const [objectValue, setObjectValue] =
    props.reply.length !== 0 ? useState(props.reply[0].homework) : useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            width: "100%",
            paddingLeft: widthPercentageToDP(48),
            paddingRight: widthPercentageToDP(47),
            marginTop: widthPercentageToDP(26)
          }}
        >
          <SelectBtn
            value={5}
            text={"만족한다"}
            currentValue={objectValue}
            onPress={() => setObjectValue(5)}
          />
          <SelectBtn
            value={4}
            text={"조금 만족한다"}
            currentValue={objectValue}
            onPress={() => setObjectValue(4)}
          />
          <SelectBtn
            value={3}
            text={"보통이다"}
            currentValue={objectValue}
            onPress={() => setObjectValue(3)}
          />
          <SelectBtn
            value={2}
            text={"조금 불만족한다"}
            currentValue={objectValue}
            onPress={() => setObjectValue(2)}
          />
          <SelectBtn
            value={1}
            text={"불만족한다"}
            currentValue={objectValue}
            onPress={() => setObjectValue(1)}
          />
        </View>

        <ProgressView step={2} />

        {props.reply.length === 0 ? (
          <NextBtn
            text={`다음`}
            valueEmpty={objectValue !== 0 ? false : true}
            onPress={() =>
              props.navigation.navigate("ProfessorEvaluation3", {
                professorInfoIndex:
                  props.navigation.state.params.professorInfoIndex,
                professorIndex: props.navigation.state.params.professorIndex,
                LecturePower: props.navigation.state.params.LecturePower,
                Homework: objectValue
              })
            }
          />
        ) : props.from != false ? (
          <NextBtn
            text={`다음`}
            valueEmpty={objectValue !== 0 ? false : true}
            onPress={() =>
              props.navigation.navigate("ProfessorEvaluation3", {
                professorIndex: props.navigation.state.params.professorIndex,
                LecturePower: props.navigation.state.params.LecturePower,
                Homework: objectValue
              })
            }
          />
        ) : (
          <NextBtn
            text={`다음`}
            valueEmpty={objectValue !== 0 ? false : true}
            onPress={() =>
              props.navigation.navigate("ProfessorEvaluation3", {
                LecturePower: props.navigation.state.params.LecturePower,
                Homework: objectValue
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
}))(ProfessorEvalution2);
