import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  processColor
} from "react-native";
import {
  ProgressView,
  DetailView,
  GradeMainView,
  GradeSubView,
  MajorUnitView,
  TeachingUnitView,
  MinorUnitView,
  DoubleMajorUnitView,
  ConnectedMajorUnitView,
  SemesterAvgGradeChart
} from "../../components/hansungInfo/View";
import { BTText } from "../../components/hansungInfo/Text";
import AbstractAccountInfoScreen from "./AbstractAccountInfo";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import { connect } from "react-redux";
import { UIActivityIndicator } from "react-native-indicators";
import { HansungInfoActions } from "../../store/actionCreator";
import * as Progress from "react-native-progress";
import GradesDetailScreen from "./GradesDetail";
import { GradesModal } from "../../components/hansungInfo/Modal";
import navigators from "../../utils/navigators";
import { getData } from "../../utils/util";

class Grades extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: true,
      refreshModal: false
    };
  }

  grades_check = async () => {
    await HansungInfoActions.gradesLoadingHandle(true);
    await HansungInfoActions.createHansungInfoGrades();
    await HansungInfoActions.getHansungInfo();

    let timeout = setInterval(async () => {
      if (this.props.hansunginfo.summaryGrades.ratedTotal == undefined) {
        await HansungInfoActions.getHansungInfo();
      } else if (this.props.hansunginfo.summaryGrades.ratedTotal != undefined) {
        await HansungInfoActions.gradesLoadingHandle(false);
        await HansungInfoActions.gradesHandle(true);
        await HansungInfoActions.professorTextHandle(true);
        clearInterval(timeout);
      }
    }, 5000);
  };

  navigateMyInfo = () => {
    return this.props.navigation;
  };

  refreshBtn = async () => {
    this.setState({ refreshModal: false });
    await HansungInfoActions.gradesLoadingHandle(true);
    await HansungInfoActions.createHansungInfoGrades();
    await HansungInfoActions.getHansungInfo();

    let timeout = setInterval(async () => {
      if (this.props.hansunginfo.summaryGrades.ratedTotal == undefined) {
        await HansungInfoActions.getHansungInfo();
      } else if (this.props.hansunginfo.summaryGrades.ratedTotal != undefined) {
        await HansungInfoActions.gradesLoadingHandle(false);
        await HansungInfoActions.gradesHandle(true);
        clearInterval(timeout);
      }
    }, 5000);
  };

  reCertification_Check = async () => {
    await HansungInfoActions.getHansungInfo();

    this.props.hansunginfo == null
      ? this.props.navigation.navigate("Certification")
      : this.props.navigation.navigate("MyInfo");
  };

  // 학기별 세부 성적표 가져오기
  bySemesterView = () => {
    return this.props.hansunginfo.summaryGrades.ratedTotal != 0 ? (
      <FlatList
        data={this.props.hansunginfo.detailGrades}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <GradesDetailScreen
              semester={item.semester}
              applyGrades={item["gradesSummary"].applyGrades}
              acquisitionGrades={item["gradesSummary"].acquisitionGrades}
              totalScore={item["gradesSummary"].totalScore}
              averageScore={item["gradesSummary"].averageScore}
              percentage={item["gradesSummary"].percentage}
              gradedetail={item["gradesDetail"]}
              key={index}
            />
          );
        }}
      />
    ) : (
      <Text
        key={"text"}
        style={{
          height: widthPercentageToDP(13),
          textAlign: "center",
          fontSize: widthPercentageToDP(12),
          marginTop: widthPercentageToDP(24),
          color: "black",
          fontFamily: fonts.nanumBarunGothicB
        }}
      >
        이전 학기 성적이 없습니다.
      </Text>
    );
  };

  certification_check = () => {
    return (
      <View
        style={{ alignItems: "center", marginTop: widthPercentageToDP(133) }}
      >
        <Text
          style={{
            fontSize: widthPercentageToDP(15),
            marginBottom: widthPercentageToDP(12.5),
            fontFamily: fonts.nanumBarunGothicB,
            color: "#646464",
            textAlign: "center"
          }}
        >{`한성대학교를 인증해주세요!`}</Text>
        <Text
          style={{
            fontSize: widthPercentageToDP(13),
            color: "#9e9e9e",
            fontFamily: fonts.nanumBarunGothicB
          }}
        >
          인증을 통해 성적표를 확인할 수 있습니다.
        </Text>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: widthPercentageToDP(128),
            height: widthPercentageToDP(36),
            borderRadius: widthPercentageToDP(8),
            backgroundColor: "#24a0fa",
            marginTop: widthPercentageToDP(26.5)
          }}
          onPress={async () => {
            await this.reCertification_Check();
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(14),
              fontFamily: fonts.nanumBarunGothicB,
              color: "#ffffff",
              textAlign: "center"
            }}
          >
            인증하러 가기!
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // 인증 후 재실행시 성적표 정보 가져오기
  componentDidMount = async () => {
    let timeout = setInterval(async () => {
      if (this.props.hansunginfo == null) {
        clearInterval(timeout);
      } else if (
        this.props.hansunginfo != null &&
        this.props.hansunginfo.summaryGrades.ratedTotal != undefined &&
        this.props.hansunginfo.detailGrades != undefined
      ) {
        await HansungInfoActions.gradesHandle(true);
        await HansungInfoActions.professorTextHandle(true);
        clearInterval(timeout);
      }
    }, 700);
  };

  // chartDataRender
  chartDataRender = data => {
    let avgData = [];
    let semesterData = [];
    let chartData = [];

    if (data.length === 0) {
      chartData.push({ x: "해당없음", y: 0 });
    }

    data.map(Data => {
      avgData.push(parseFloat(Data["gradesSummary"].averageScore));
    });
    avgData.reverse();

    let grade = 0;

    for (let semester = 1; semester <= avgData.length; semester++) {
      if (semester % 2 === 1) {
        grade++;
      }

      semesterData.push(
        grade + "학년 " + (semester % 2 === 0 ? 2 : 1) + "학기"
      );
    }

    for (let i = 0; i < avgData.length; i++) {
      if (i >= 8) break;
      else chartData.push({ x: semesterData[i], y: avgData[i] });
    }

    return chartData;
  };

  render() {
    return (
      <View style={styles.container}>
        <GradesModal
          visible={this.state.refreshModal}
          children={"성적표를 불러오는데\n최대 수 분 정도 소요될 수 있습니다."}
          footerHandler={async () => await this.refreshBtn()}
          closeHandler={() => this.setState({ refreshModal: false })}
        />

        <ScrollView
          style={
            this.props.grades_loading == true
              ? { backgroundColor: "white" }
              : null
          }
        >
          <AbstractAccountInfoScreen
            move={this.navigateMyInfo()}
            selected={this.state.selected}
          />

          {this.props.grades_loading == true ? (
            <View
              style={{
                flex: 1,
                marginTop: widthPercentageToDP(151),
                alignItems: "center",
                backgroundColor: "white"
              }}
            >
              <View
                style={{
                  height: widthPercentageToDP(40),
                  marginBottom: widthPercentageToDP(10)
                }}
              >
                <UIActivityIndicator color={"grey"} />
              </View>
              <Text
                style={{
                  fontSize: widthPercentageToDP(12),
                  textAlign: "center",
                  fontFamily: fonts.nanumBarunGothicB
                }}
              >{`성적표를 불러오는 중입니다.\n수 분 정도 소요될 수 있습니다.`}</Text>
            </View>
          ) : this.props.grades_status == true ? (
            <View style={{ backgroundColor: "#ffffff" }}>
              <View
                style={{
                  backgroundColor: "#ffffff",
                  marginTop: widthPercentageToDP(4),
                  marginLeft: widthPercentageToDP(22)
                }}
              >
                <Image
                  style={{
                    width: widthPercentageToDP(331),
                    height: widthPercentageToDP(63)
                  }}
                  source={require("../../../assets/image/hansungInfo/ad_1.png")}
                />
              </View>
              <ProgressView style={{ paddingTop: widthPercentageToDP(13) }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "center"
                      }}
                    >
                      <BTText>{this.props.hansunginfo.name}님의 학점</BTText>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ refreshModal: true });
                    }}
                  >
                    <Image
                      style={{
                        width: widthPercentageToDP(50),
                        height: widthPercentageToDP(50)
                      }}
                      source={require("../../../assets/image/hansungInfo/refresh.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: widthPercentageToDP(10) }}>
                  <Progress.Bar
                    progress={
                      (this.props.hansunginfo.summaryGrades.acquisitionGrades *
                        1) /
                      (this.props.hansunginfo.hansungInfoId.substring(0, 2) > 15
                        ? 130
                        : 140)
                    }
                    width={widthPercentageToDP(331)}
                    height={widthPercentageToDP(17)}
                    color={"#24a0fa"}
                    unfilledColor={"#ebebeb"}
                    borderColor={"#f8f8f8"}
                    borderRadius={widthPercentageToDP(9)}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: widthPercentageToDP(10)
                    }}
                  >
                    <Text
                      style={{
                        fontSize: widthPercentageToDP(15),
                        fontFamily: fonts.nanumBarunGothicB,
                        color: "black"
                      }}
                    >
                      {this.props.hansunginfo.summaryGrades.acquisitionGrades}
                    </Text>
                    <Text
                      style={{
                        fontSize: widthPercentageToDP(15),
                        fontFamily: fonts.nanumBarunGothicB,
                        color: "black"
                      }}
                    >
                      {this.props.hansunginfo.hansungInfoId.substring(0, 2) > 15
                        ? 130
                        : 140}
                    </Text>
                  </View>
                </View>
              </ProgressView>
              <DetailView>
                <GradeMainView
                  applyGrades={this.props.hansunginfo.summaryGrades.applyGrades}
                  acquisitionGrades={
                    this.props.hansunginfo.summaryGrades.acquisitionGrades
                  }
                  ratedTotal={this.props.hansunginfo.summaryGrades.ratedTotal}
                  averageRating={
                    this.props.hansunginfo.summaryGrades.averageRating
                  }
                  percentile={this.props.hansunginfo.summaryGrades.percentile}
                  // 전공 평점(평균) 부분 작업중
                  // MajorAvgScore={this.props}
                />
                <View
                  style={{
                    marginTop: widthPercentageToDP(25),
                    marginBottom: widthPercentageToDP(26)
                  }}
                >
                  {this.props.hansunginfo.summaryGrades.ratedTotal != 0 ? (
                    <SemesterAvgGradeChart
                      data={this.chartDataRender(
                        this.props.hansunginfo.detailGrades
                      )}
                    />
                  ) : null}
                </View>

                <TouchableOpacity
                  onPress={() => {
                    navigators.navigate("calculation");
                  }}
                >
                  <Image
                    style={{
                      backgroundColor: "#ffffff",
                      width: widthPercentageToDP(345),
                      height: widthPercentageToDP(58)
                    }}
                    source={require("../../../assets/image/hansungInfo/calculation_of_credit.png")}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    marginTop: widthPercentageToDP(28),
                    marginLeft: widthPercentageToDP(7),
                    marginBottom: widthPercentageToDP(12)
                  }}
                >
                  <BTText>세부 학점</BTText>
                </View>
                <GradeSubView
                  requiredAccomplishments={
                    this.props.hansunginfo.summaryGrades.requiredAccomplishments
                  }
                  foundationAccomplishments={
                    this.props.hansunginfo.summaryGrades
                      .foundationAccomplishments
                  }
                  hansungHumanResources={
                    this.props.hansunginfo.summaryGrades.hansungHumanResources
                  }
                  autonomy={this.props.hansunginfo.summaryGrades.autonomy}
                  knowledge={this.props.hansunginfo.summaryGrades.knowledge}
                  core={this.props.hansunginfo.summaryGrades.core}
                  generalSelection={
                    this.props.hansunginfo.summaryGrades.generalSelection
                  }
                />

                <View
                  style={{
                    marginTop: widthPercentageToDP(30),
                    marginLeft: widthPercentageToDP(7),
                    marginBottom: widthPercentageToDP(8)
                  }}
                >
                  <BTText>전공</BTText>
                </View>
                <MajorUnitView
                  requiredMajor={
                    this.props.hansunginfo.summaryGrades.requiredMajor
                  }
                  optionalMajor={
                    this.props.hansunginfo.summaryGrades.optionalMajor
                  }
                  foundationMajor={
                    this.props.hansunginfo.summaryGrades.foundationMajor
                  }
                />

                <View
                  style={{
                    marginTop: widthPercentageToDP(30),
                    marginLeft: widthPercentageToDP(7),
                    marginBottom: widthPercentageToDP(8)
                  }}
                >
                  <BTText>교직</BTText>
                </View>
                <TeachingUnitView
                  requiredTeaching={
                    this.props.hansunginfo.summaryGrades.requiredTeaching
                  }
                  optionalTeaching={
                    this.props.hansunginfo.summaryGrades.optionalTeaching
                  }
                />

                <View
                  style={{
                    marginTop: widthPercentageToDP(30),
                    marginLeft: widthPercentageToDP(7),
                    marginBottom: widthPercentageToDP(8)
                  }}
                >
                  <BTText>부전공</BTText>
                </View>
                <MinorUnitView
                  requiredMinor={
                    this.props.hansunginfo.summaryGrades.requiredMinor
                  }
                  optionalMinor={
                    this.props.hansunginfo.summaryGrades.optionalMinor
                  }
                  foundationMinor={
                    this.props.hansunginfo.summaryGrades.foundationMinor
                  }
                />

                <View
                  style={{
                    marginTop: widthPercentageToDP(30),
                    marginLeft: widthPercentageToDP(7),
                    marginBottom: widthPercentageToDP(8)
                  }}
                >
                  <BTText>복수전공</BTText>
                </View>
                <DoubleMajorUnitView
                  requiredDoubleMajor={
                    this.props.hansunginfo.summaryGrades.requiredDoubleMajor
                  }
                  optionalDoubleMajor={
                    this.props.hansunginfo.summaryGrades.optionalDoubleMajor
                  }
                  foundationDoubleMajor={
                    this.props.hansunginfo.summaryGrades.foundationDoubleMajor
                  }
                />

                <View
                  style={{
                    marginTop: widthPercentageToDP(30),
                    marginLeft: widthPercentageToDP(7),
                    marginBottom: widthPercentageToDP(8)
                  }}
                >
                  <BTText>연계전공</BTText>
                </View>
                <ConnectedMajorUnitView
                  requiredConnectedMajor={
                    this.props.hansunginfo.summaryGrades.requiredConnectedMajor
                  }
                  optionalConnectedMajor={
                    this.props.hansunginfo.summaryGrades.optionalConnectedMajor
                  }
                  foundationConnectedMajor={
                    this.props.hansunginfo.summaryGrades
                      .foundationConnectedMajor
                  }
                />
              </DetailView>

              <DetailView>
                <View
                  style={{
                    width: widthPercentageToDP(310),
                    marginLeft: widthPercentageToDP(6),
                    marginTop: widthPercentageToDP(46)
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "center"
                      }}
                    >
                      <BTText>이전 학기 성적</BTText>
                    </View>
                  </View>
                </View>
                {this.bySemesterView()}
              </DetailView>
            </View>
          ) : this.props.hansunginfo == null ||
            this.props.hansunginfo.status != "SUCCESS" ? (
            this.certification_check()
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: widthPercentageToDP(151)
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: widthPercentageToDP(128),
                  height: widthPercentageToDP(36),
                  borderRadius: widthPercentageToDP(8),
                  backgroundColor: "#24a0fa",
                  marginTop: widthPercentageToDP(26.5)
                }}
                onPress={async () => {
                  await this.grades_check();
                }}
              >
                <Text
                  style={{
                    fontSize: widthPercentageToDP(14),
                    fontFamily: fonts.nanumBarunGothicB,
                    color: "#ffffff",
                    textAlign: "center"
                  }}
                >
                  불러오기
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8"
  },
  mainPoint: {
    flexDirection: "row",
    // width: widthPercentageToDP(351),
    marginTop: widthPercentageToDP(19),
    paddingTop: widthPercentageToDP(18),
    paddingHorizontal: widthPercentageToDP(8),
    width: "100%",
    height: widthPercentageToDP(72),
    borderRadius: widthPercentageToDP(8),
    backgroundColor: "#24a0fa"
  },
  devisionLine: {
    width: widthPercentageToDP(1),
    marginTop: widthPercentageToDP(7),
    marginBottom: widthPercentageToDP(25),
    // 간격 조정 필요
    marginLeft: widthPercentageToDP(6.5),
    marginRight: widthPercentageToDP(6.5),
    backgroundColor: "white"
  },
  detailView: {
    width: widthPercentageToDP(38),
    height: widthPercentageToDP(48),
    marginRight: widthPercentageToDP(31)
  },
  valTextChange: {
    fontSize: widthPercentageToDP(14),
    fontFamily: fonts.nanumBarunGothic,
    color: "black"
  },
  devisionLine2: {
    height: widthPercentageToDP(1),
    marginTop: widthPercentageToDP(15.5),
    marginBottom: widthPercentageToDP(15.5),
    backgroundColor: "#f8f8f8"
  }
});

export default connect(state => ({
  hansunginfo: state.hansung.hansunginfo,
  grades_status: state.hansung.grades_status,
  grades_loading: state.hansung.grades_loading,
  professor_text: state.hansung.professor_text
}))(Grades);
