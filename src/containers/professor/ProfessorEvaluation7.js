import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";
import { NextBtn } from "../../components/professor/Button";
import {
  EvaluationHeaderView,
  ProgressView
} from "../../components/professor/View";
import { timeSince, widthPercentageToDP } from "../../utils/util";
import {
  TextInputContainer,
  WriteContainer
} from "../../components/community/View";
import {
  AnonymousButton,
  WriteButton
} from "../../components/community/Button";
import { AnonymousOFFText, AnonymousONText } from "../../components/talk/Text";
import fonts from "../../configs/fonts";
import {
  C_ContentText,
  C_CreatedAtText
} from "../../components/community/Text";
import Hyperlink from "react-native-hyperlink";
import ImageCapInset from "rn-imagecapinsets";
import { ProfessorActions } from "../../store/actionCreator";
import { connect } from "react-redux";
import { AlertModal } from "../../components/community/Modal";

const ProfessorEvalution7 = props => {
  const [anonymous, setAnonymous] = useState(1);
  const [index, setIndex] =
    props.reply.length !== 0
      ? useState(props.reply[0].professorInfoIndex)
      : useState(props.navigation.state.params.professorInfoIndex);
  const [review, setReview] =
    props.reply.length !== 0 ? useState(props.reply[0].content) : useState("");
  const [reviewLength, setReviewLength] = useState(0);
  const [professorInfoData, setProfessorInfoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState(props);
  const [alertModal, setAlertMdoal] = useState(false);
  const [alertText, setAlertText] = useState("");

  useEffect(() => {
    setReviewLength(review.length);
    if (reviewLength > 10) {
      setProfessorInfoData({
        professorInfoIndex: index,
        lecturePower: props.navigation.state.params.LecturePower,
        homework: props.navigation.state.params.Homework,
        elasticity: props.navigation.state.params.Elasticity,
        communication: props.navigation.state.params.Communication,
        recommendation: props.navigation.state.params.Recommendation,
        grade: props.navigation.state.params.Grade,
        content: review
      });
    }
  }, [review]);
  // 교수평가 데이터 insert
  const professorInfoInsert = () => {
    setAlertText("교수평가를 작성하였습니다.");
    setAlertMdoal(true);
    // setLoading(true);
    const promise1 = ProfessorActions.createProfessorReply(
      index,
      professorInfoData
    );

    Promise.all([promise1]).then(() => {
      const inner_promise1 = ProfessorActions.professorReplyListInitHandle();
      const inner_promise2 = ProfessorActions.professorDetailListInitHandle();
      const inner_promise3 = ProfessorActions.getProfessorInfo(
        props.navigation.state.params.professorIndex
      );
      const inner_promise4 = ProfessorActions.pageListProfessorReply(index);

      Promise.all([
        inner_promise1,
        inner_promise2,
        inner_promise3,
        inner_promise4
      ]).then(() => {
        props.navigation.navigate("ProfessorDetail", {
          professorIndex: props.navigation.state.params.professorIndex
        });

        let timeout = setInterval(() => {
          setAlertMdoal(false);
          clearTimeout(timeout);
        }, 1500);
        // setLoading(false);
      });
    });
  };

  // 교수평가 평가 수정
  const professorInfoUpdate = async () => {
    await setAlertText("내가 쓴 교수평가를 수정하였습니다.");
    await setAlertMdoal(true);

    const promise1 = ProfessorActions.updateProfessorReply(
      props.reply[0].professorReplyIndex,
      professorInfoData
    );

    Promise.all([promise1])
      .then(async () => {
        await ProfessorActions.myProfessorReplyPostList();
        await ProfessorActions.professorDetailListInitHandle();
        await ProfessorActions.getProfessorInfo(
          props.navigation.state.params.professorIndex
        );
        await ProfessorActions.pageListProfessorReply(index);

        let timeout = setInterval(() => {
          setAlertMdoal(false);
          clearTimeout(timeout);
        }, 1500);

        props.from === true
          ? props.navigation.navigate("ProfessorDetail")
          : props.navigation.navigate("MyWriteProfessorList");

        await ProfessorActions.fromInitHandle();
      })
      .catch(async () => {
        // 댓글 내용 변경하지 않을 시, 수정안되서 수정한 항목값들은 반영안됨.
        let timeout = setInterval(() => {
          setAlertMdoal(false);
          clearTimeout(timeout);
        }, 1500);

        props.from === true
          ? props.navigation.navigate("ProfessorDetail")
          : props.navigation.navigate("MyWriteProfessorList");

        await ProfessorActions.fromInitHandle();
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AlertModal visible={alertModal} text={alertText} />
      <ScrollView>
        <View
          style={{
            backgroundColor: "#ffffff",
            width: "100%",
            paddingHorizontal: widthPercentageToDP(22),
            paddingTop: widthPercentageToDP(33),
            height: widthPercentageToDP(331)
          }}
        >
          <TouchableOpacity
            style={{ height: "100%" }}
            onPress={() => {
              textInput.focus();
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: widthPercentageToDP(16),
                  height: widthPercentageToDP(10)
                }}
                source={require("../../../assets/image/community/quotation_color.png")}
              />
              <Text
                style={{ fontSize: widthPercentageToDP(12), color: "#0076ff" }}
              >
                익명
              </Text>
            </View>
            <Text
              style={{
                marginTop: widthPercentageToDP(11),
                fontSize: widthPercentageToDP(14),
                fontFamily:
                  review === ""
                    ? fonts.nanumBarunGothicUL
                    : fonts.nanumBarunGothic,
                color: review === "" ? "#707070" : "#000000"
              }}
            >
              {review === "" ? `교수 평가를 10자 이상 작성해주세요!` : review}
            </Text>
          </TouchableOpacity>
        </View>

        <ProgressView step={7} />

        <NextBtn
          text={`완료`}
          valueEmpty={reviewLength > 10 ? false : true}
          onPress={() => {
            props.reply.length === 0
              ? professorInfoInsert()
              : professorInfoUpdate();
          }}
        />
      </ScrollView>

      {/* 테스트 필요 */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : ""}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? widthPercentageToDP(150) : 0
        }
        enabled
      >
        <WriteContainer>
          <TextInputContainer>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AnonymousButton disabled={true} anonymous={anonymous} />
              {anonymous == 0 ? (
                <AnonymousOFFText>익명</AnonymousOFFText>
              ) : (
                <AnonymousONText>익명</AnonymousONText>
              )}
            </View>
            <TextInput
              ref={input => {
                setTextInput(input);
              }}
              style={styles.textInput}
              underlineColorAndroid="transparent"
              onChangeText={review => setReview(review)}
              // onFocus={() => this.setState({ emoji: false })}
              placeholder={`댓글을 작성해주세요.`}
              placeholderTextColor={"#929292"}
              value={review}
              maxLength={1000}
              numberOfLines={1}
              autoCapitalize={"none"}
              multiline={true}
            />
          </TextInputContainer>
          <WriteButton
            // no_click={this.state.no_click}
            handler={async () => {
              Keyboard.dismiss();
            }}
          />
        </WriteContainer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: "#000000",
    width: widthPercentageToDP(216), //이모지 버튼 없을 경우에
    // width: widthPercentageToDP(246), //이모지 버튼 있는 경우
    maxHeight: widthPercentageToDP(30),
    padding: widthPercentageToDP(0),
    paddingBottom: Platform.OS === "ios" ? widthPercentageToDP(5) : 0,
    marginLeft: widthPercentageToDP(5),
    fontSize: widthPercentageToDP(15),
    fontFamily: fonts.nanumBarunGothic,
    alignItems: "center"
  }
});

export default connect(state => ({
  reply: state.professor.reply,
  from: state.professor.from
}))(ProfessorEvalution7);
