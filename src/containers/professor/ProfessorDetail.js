import React from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { connect } from "react-redux";
import {
  NonResultView,
  ProfessorDetailView,
  ProfessorReplyListView
} from "../../components/professor/View";
import { widthPercentageToDP } from "../../utils/util";
import { ProfessorActions } from "../../store/actionCreator";
import { UIActivityIndicator } from "react-native-indicators";

class ProfessorDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      currentProfessorIndex: null
    };
  }

  async componentDidMount() {
    await ProfessorActions.professorDetailListInitHandle();

    await this.setState({
      currentProfessorIndex: this.props.navigation.state.params.professorIndex
    });

    const promise1 = ProfessorActions.getProfessorInfo(
      this.props.navigation.state.params.professorIndex
    );

    const promise2 = ProfessorActions.pageListProfessorReply(
      this.props.navigation.state.params.professorInfoIndex
    );

    Promise.all([promise1, promise2]).then(() => {
      ProfessorActions.professorLoadingHandle(false);
    });
  }

  navigategoBack = () => {
    this.props.navigation.goBack(null);
  };

  navigateProfessorEvaluation = () => {
    this.props.navigation.navigate("ProfessorEvaluation1", {
      professorInfoIndex: this.props.navigation.state.params.professorInfoIndex,
      professorIndex: this.props.navigation.state.params.professorIndex
    });
  };

  navigateEvaluation = () => {
    this.props.navigation.navigate("ProfessorEvaluation1", {
      professorIndex: this.props.navigation.state.params.professorIndex
    });
  };

  async componentWillUnmount() {
    await ProfessorActions.fromInitHandle();
  }

  render() {
    return this.props.professor_loading === true ? (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <UIActivityIndicator color={"grey"} size={widthPercentageToDP(30)} />
      </View>
    ) : (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
        <ScrollView>
          <ProfessorDetailView
            data={this.props.professor_detail_list}
            handler={() => this.navigategoBack()}
            evaluation={() => this.navigateProfessorEvaluation()}
            myWriteReplySearch={this.props.professor_reply_list}
            myNickName={this.props.userNickName}
          />
          {this.props.professor_reply_list.length === 0 ? (
            <NonResultView
              text={"첫 번째로 교수평가를 작성해보세요!"}
              style={{ backgroundColor: "#f8f8f8" }}
            />
          ) : (
            <ProfessorReplyListView
              reply={this.props.professor_reply_list}
              myNickName={this.props.userNickName}
              professorIndex={this.state.currentProfessorIndex}
              navigateEvaluation={() => this.navigateEvaluation()}
              handler={() => this.navigategoBack()}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(state => ({
  professor_loading: state.professor.professor_loading,
  professor_detail_list: state.professor.professor_detail_list,

  professor_reply_list: state.professor.professor_reply_list,
  my_write_professor_list: state.professor.my_write_professor_list,

  userNickName: state.signin.user.userNickName
}))(ProfessorDetail);
