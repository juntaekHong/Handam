import React from "react";
import { View, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { ProfessorActions } from "../../store/actionCreator";
import { widthPercentageToDP } from "../../utils/util";
import {
  MyWriteProfessorListView,
  NonResultView
} from "../../components/professor/View";
import { BackBtn } from "../../components/professor/Button";
import {
  CurrentOrderText,
  EvaluationTitleText
} from "../../components/professor/Text";

class MyWriteProfessorList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  navigategoBack = () => {
    this.props.navigation.goBack(null);
  };

  navigateEvaluation = () => {
    this.props.navigation.navigate("ProfessorEvaluation1");
  };

  async componentWillUnmount() {
    await ProfessorActions.myWriteProfessorReplyInitHandle();
  }

  _renderListHeader = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: widthPercentageToDP(60),
            paddingLeft: widthPercentageToDP(14),
            backgroundColor: "#ffffff"
          }}
        >
          <BackBtn goback={() => this.navigategoBack()} />
          <EvaluationTitleText
            style={{
              width: widthPercentageToDP(245.7),
              marginLeft: widthPercentageToDP(23)
            }}
          >
            내가 쓴 교수평가
          </EvaluationTitleText>
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#f8f8f8"
        }}
      >
        {this._renderListHeader()}
        <MyWriteProfessorListView
          data={this.props.my_write_professor_list}
          myNickName={this.props.userNickName}
          count={this.props.my_write_professor_list.length}
          handler={() => this.navigategoBack()}
          professorDetail={this.props.navigation}
          navigateEvaluation={() => this.navigateEvaluation()}
        />
      </SafeAreaView>
    );
  }
}

export default connect(state => ({
  my_write_professor_list: state.professor.my_write_professor_list,
  userNickName: state.signin.user.userNickName
}))(MyWriteProfessorList);
