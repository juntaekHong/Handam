import React from "react";
import {
  View,
  Text,
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
  ProfessorTopView,
  NoticeModalView,
  NoticeFooterView
} from "../../components/professor/View";
import { BackBtn, EvaluationBtn } from "../../components/professor/Button";
import { TitleNameText, NoticModalText } from "../../components/professor/Text";
import { CustomModalBlackText } from "../../components/myInfo/Text";
import { widthPercentageToDP } from "../../utils/util";
import { ProfessorActions } from "../../store/actionCreator";
import { UIActivityIndicator } from "react-native-indicators";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { CustomModal } from "../../components/common/Modal";

class ProfessorDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      currentProfessorIndex: null,
      select: "score",
      professorInfoIndex: null,
      // 평가하기 클릭 시, 작성 유의사항 알림 모달
      noticeModal: false,
      // 평가 중복 작성 시, 알림 모달
      duplicateCheckModal: false
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
        <CustomModal
          width={295}
          height={201.9}
          children={
            <CustomModalBlackText
              style={{ marginBottom: widthPercentageToDP(5) }}
            >
              {"이미 평가한 교수님입니다."}
            </CustomModalBlackText>
          }
          visible={this.state.duplicateCheckModal}
          renderFooter={() => {
            return (
              <NoticeFooterView
                disabled={false}
                onPress={async () => {
                  this.setState({ duplicateCheckModal: false });
                }}
              >
                <NoticModalText size={20} color={"#ffffff"}>
                  확인
                </NoticModalText>
              </NoticeFooterView>
            );
          }}
          closeHandler={() => this.setState({ duplicateCheckModal: false })}
        />
        <CustomModal
          width={292}
          height={368}
          children={
            <NoticeModalView>
              <NoticModalText size={16} marginBottom={30}>
                * 교수 평가시 안내 사항
              </NoticModalText>
              <NoticModalText>
                {
                  "교수 평가는 교수님의 수업에 대한\n평가입니다. 수업 내용이 좋고 나쁨을 평가해주시고 학점, 강의수준 등에 대한 글을 작성해주세요. 외모나 개인에 대한 평가는\n모욕감과 치욕감을 드릴 우려가 있습니다.\n후배들을 위한 정보 등 한성인들의 공감을 얻어 낼 수 있는 글을 올려주세요."
                }
              </NoticModalText>
            </NoticeModalView>
          }
          visible={this.state.noticeModal}
          renderFooter={() => {
            return (
              <NoticeFooterView
                disabled={false}
                onPress={async () => {
                  this.setState({ noticeModal: false });

                  ProfessorActions.myWriteProfessorReplyInitHandle();
                  ProfessorActions.fromHandle(true);
                  this.navigateProfessorEvaluation();
                }}
              >
                <NoticModalText size={20} color={"#ffffff"}>
                  확인
                </NoticModalText>
              </NoticeFooterView>
            );
          }}
          closeHandler={() => this.setState({ noticeModal: false })}
        />
        <ProfessorTopView>
          <BackBtn goback={() => this.navigategoBack()} />
          <TitleNameText>교수평가</TitleNameText>
          <EvaluationBtn
            Evaluation={() => {
              let duplicateCheck = this.props.my_write_professor_list.findIndex(
                item => {
                  return (
                    item.professorIndex === this.state.currentProfessorIndex
                  );
                }
              );

              if (duplicateCheck !== -1) {
                this.setState({ duplicateCheckModal: true });
              } else {
                this.setState({ noticeModal: true });
              }
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
            scoreOnPress={async () => {
              this.setState({ select: "score" });
              await ProfessorActions.pageListProfessorReply(
                this.state.professorInfoIndex
              );
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
                onSwipeableLeftOpen={async () => {
                  await this.setState({ select: "score" });
                  await ProfessorActions.pageListProfessorReply(
                    this.state.professorInfoIndex
                  );
                }}
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
