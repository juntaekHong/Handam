import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Animated,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import {
  NonResultView,
  ProfessorDetailView,
  ProfessorReplyListView,
  ProfessorTopView
} from "../../components/professor/View";
import { BackBtn, EvaluationBtn } from "../../components/professor/Button";
import { TitleNameText } from "../../components/professor/Text";
import { widthPercentageToDP } from "../../utils/util";
import { ProfessorActions } from "../../store/actionCreator";
import { UIActivityIndicator } from "react-native-indicators";
import Swipeable from "react-native-gesture-handler/Swipeable";

class ProfessorDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      currentProfessorIndex: null,
      select: "score",
      professorInfoIndex: null
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
      this.setState({
        professorInfoIndex: this.props.navigation.state.params
          .professorInfoIndex
      });
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

  // 교수님 평가 리스트 보이게 스와이프 기능
  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });

    return (
      <TouchableOpacity style={styles.leftAction}>
        <Animated.View
          style={[
            {
              transform: [{ translateX: trans }]
            }
          ]}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return this.props.professor_loading === true ? (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <UIActivityIndicator color={"grey"} size={widthPercentageToDP(30)} />
      </View>
    ) : (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
        <ProfessorTopView>
          <BackBtn goback={() => this.navigategoBack()} />
          <TitleNameText>교수평가</TitleNameText>
          <EvaluationBtn
            Evaluation={() => {
              ProfessorActions.myWriteProfessorReplyInitHandle();
              ProfessorActions.fromHandle(true);
              this.navigateProfessorEvaluation();
            }}
          />
        </ProfessorTopView>
        <ScrollView>
          <ProfessorDetailView
            data={this.props.professor_detail_list}
            handler={() => this.navigategoBack()}
            evaluation={() => this.navigateProfessorEvaluation()}
            myWriteReplySearch={this.props.professor_reply_list}
            myNickName={this.props.userNickName}
            select={this.state.select}
            scoreOnPress={() => {
              this.setState({ select: "score" });
            }}
            replyOnPress={() => {
              this.setState({ select: "reply" });
            }}
            renderLeftActions={this.renderLeftActions}
          />
          {this.state.select === "reply" ? (
            this.props.professor_reply_list.length === 0 ? (
              <Swipeable
                renderLeftActions={this.renderLeftActions}
                onSwipeableLeftOpen={() => this.setState({ select: "score" })}
              >
                <NonResultView
                  text={"첫 번째로 교수평가를 작성해보세요!"}
                  style={{ backgroundColor: "#f8f8f8" }}
                />
              </Swipeable>
            ) : (
              <Swipeable
                renderLeftActions={this.renderLeftActions}
                onSwipeableLeftOpen={() => this.setState({ select: "score" })}
              >
                <ProfessorReplyListView
                  reply={this.props.professor_reply_list}
                  myNickName={this.props.userNickName}
                  professorIndex={this.state.currentProfessorIndex}
                  professorInfoIndex={this.state.professorInfoIndex}
                  navigateEvaluation={() => this.navigateEvaluation()}
                  handler={() => this.navigategoBack()}
                />
              </Swipeable>
            )
          ) : null}
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

  userNickName: state.signin.user.userNickName,

  select: state.professor.select
}))(ProfessorDetail);

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    justifyContent: "center",
    // flex: 1,
    alignItems: "flex-start"
  }
});
