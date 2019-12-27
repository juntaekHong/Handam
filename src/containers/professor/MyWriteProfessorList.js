import React from "react";
import { SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { MyWriteProfessorListView } from "../../components/professor/View";
import { ProfessorActions } from "../../store/actionCreator";

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

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
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
