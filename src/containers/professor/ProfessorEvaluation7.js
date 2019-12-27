import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
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
        setAlertMdoal(false);
        props.navigation.navigate("ProfessorDetail", {
          professorIndex: props.navigation.state.params.professorIndex
        });
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

        await setAlertMdoal(false);

        props.from === true
          ? props.navigation.navigate("ProfessorDetail")
          : props.navigation.navigate("MyWriteProfessorList");

        await ProfessorActions.fromInitHandle();
      })
      .catch(async () => {
        // 댓글 내용 변경하지 않을 시, 수정안되서 수정한 항목값들은 반영안됨.
        await setAlertMdoal(false);

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
        <EvaluationHeaderView
          title={"평가하기"}
          margin={false}
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
            backgroundColor: "#e7e7e7",
            width: "100%",
            padding: widthPercentageToDP(16),
            height: widthPercentageToDP(350)
          }}
        >
          <TouchableOpacity
            onPress={() => {
              textInput.focus();
            }}
          >
            <ImageCapInset
              style={{
                width: widthPercentageToDP(343),
                minHeight: widthPercentageToDP(310),
                maxHeight: widthPercentageToDP(310),
                paddingTop: widthPercentageToDP(16),
                paddingLeft: widthPercentageToDP(12),
                paddingRight: widthPercentageToDP(6),
                paddingBottom: widthPercentageToDP(21),
                marginBottom: widthPercentageToDP(10)
              }}
              source={
                Platform.OS === "ios"
                  ? require("../../../assets/image/community/reply.png")
                  : { uri: "reply" }
              }
              capInsets={{
                top: widthPercentageToDP(12),
                right: widthPercentageToDP(12),
                bottom: widthPercentageToDP(22),
                left: widthPercentageToDP(12)
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: widthPercentageToDP(12)
                }}
              >
                <Image
                  style={{
                    width: widthPercentageToDP(20),
                    height: widthPercentageToDP(13)
                  }}
                  source={require("../../../assets/image/community/quotation_color.png")}
                />
                <Text
                  style={{
                    fontSize: widthPercentageToDP(12),
                    fontFamily: fonts.nanumBarunGothic,
                    color: "#259ffa"
                  }}
                >
                  익명
                </Text>
              </View>
              <Text
                style={{ fontSize: widthPercentageToDP(12) }}
                numberOfLines={17}
              >
                {review === "" ? `교수평가를 10자이상 입력해주세요!` : review}
              </Text>
            </ImageCapInset>
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
        keyboardVerticalOffset={Platform.OS === "ios" ? 43 : 0}
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
    // width: widthPercentageToDP(216), //이모지 버튼 없을 경우에
    width: widthPercentageToDP(246), //이모지 버튼 있는 경우
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
