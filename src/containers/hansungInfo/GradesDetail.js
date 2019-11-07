import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { widthPercentageToDP } from "../../utils/util";
import { BYSEMESText, SEMESVALText } from "../../components/hansungInfo/Text";
import { GradesDetailView } from "../../components/hansungInfo/View";
import fonts from "../../configs/fonts";
import { connect } from "react-redux";

class GradesDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  // 학기별 성적표
  gradesDetailView = () => {
    return (
      <FlatList
        data={this.props.gradedetail}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                marginTop: widthPercentageToDP(6.5),
                marginLeft: widthPercentageToDP(7)
              }}
            >
              <SEMESVALText
                style={{
                  fontSize: widthPercentageToDP(12),
                  width: widthPercentageToDP(45),
                  textAlign: "center",
                  fontFamily: fonts.nanumBarunGothic,
                  color: "#848484"
                }}
              >
                {item.division}
              </SEMESVALText>
              <SEMESVALText
                style={{
                  fontSize: widthPercentageToDP(12),
                  marginLeft: widthPercentageToDP(27),
                  width: widthPercentageToDP(159.4),
                  textAlign: "center",
                  fontFamily: fonts.nanumBarunGothic,
                  color: "#848484"
                }}
              >
                {item.subjectName}
              </SEMESVALText>
              <SEMESVALText
                style={{
                  fontSize: widthPercentageToDP(12),
                  width: widthPercentageToDP(24),
                  marginLeft: widthPercentageToDP(16.6),
                  fontFamily: fonts.nanumBarunGothic,
                  color: "#848484"
                }}
              >
                {item.acquisitionGrades.substring(0, 1)}
              </SEMESVALText>
              <SEMESVALText
                style={{
                  fontSize: widthPercentageToDP(12),
                  width: widthPercentageToDP(24),
                  marginLeft: widthPercentageToDP(11),
                  fontFamily: fonts.nanumBarunGothic,
                  color: "#848484"
                }}
              >
                {item.record}
              </SEMESVALText>
            </View>
          );
        }}
      />
    );
  };

  render() {
    return (
      <View style={{ marginLeft: widthPercentageToDP(5) }}>
        <Text
          style={{
            marginTop: widthPercentageToDP(21),
            fontSize: widthPercentageToDP(13),
            fontFamily: fonts.nanumBarunGothicB,
            color: "black",
            textAlign: "center"
          }}
        >
          {this.props.semester}
        </Text>
        <GradesDetailView>
          <View style={{ width: widthPercentageToDP(54) }}>
            <BYSEMESText>신청학점</BYSEMESText>
            <SEMESVALText>{this.props.applyGrades}</SEMESVALText>
          </View>
          <View
            style={{
              width: widthPercentageToDP(54),
              marginLeft: widthPercentageToDP(12)
            }}
          >
            <BYSEMESText style={{ color: "#3ca9fa" }}>취득학점</BYSEMESText>
            <SEMESVALText>{this.props.acquisitionGrades}</SEMESVALText>
          </View>
          <View
            style={{
              width: widthPercentageToDP(54),
              marginLeft: widthPercentageToDP(12)
            }}
          >
            <BYSEMESText>평점총계</BYSEMESText>
            <SEMESVALText>{this.props.totalScore}</SEMESVALText>
          </View>
          <View
            style={{
              width: widthPercentageToDP(54),
              marginLeft: widthPercentageToDP(12)
            }}
          >
            <BYSEMESText style={{ color: "#3ca9fa" }}>평균평점</BYSEMESText>
            <SEMESVALText>{this.props.averageScore}</SEMESVALText>
          </View>
          <View
            style={{
              width: widthPercentageToDP(54),
              marginLeft: widthPercentageToDP(12)
            }}
          >
            <BYSEMESText>백분위</BYSEMESText>
            <SEMESVALText>{this.props.percentage}</SEMESVALText>
          </View>
        </GradesDetailView>
        <View style={styles.devisionLine} />
        <View
          style={{
            flexDirection: "row",
            marginTop: widthPercentageToDP(6.5),
            marginLeft: widthPercentageToDP(7)
          }}
        >
          <BYSEMESText
            style={{
              fontSize: widthPercentageToDP(12),
              width: widthPercentageToDP(45),
              textAlign: "center"
            }}
          >
            구분
          </BYSEMESText>
          <BYSEMESText
            style={{
              fontSize: widthPercentageToDP(12),
              marginLeft: widthPercentageToDP(27),
              width: widthPercentageToDP(159.4),
              textAlign: "center"
            }}
          >
            교과명
          </BYSEMESText>
          <BYSEMESText
            style={{
              fontSize: widthPercentageToDP(12),
              width: widthPercentageToDP(24),
              marginLeft: widthPercentageToDP(16.6)
            }}
          >
            학점
          </BYSEMESText>
          <BYSEMESText
            style={{
              fontSize: widthPercentageToDP(12),
              width: widthPercentageToDP(24),
              marginLeft: widthPercentageToDP(11)
            }}
          >
            성적
          </BYSEMESText>
        </View>
        <View style={styles.devisionLine} />
        {this.gradesDetailView()}
        <View
          style={{
            width: "100%",
            height: widthPercentageToDP(1),
            backgroundColor: "#f8f8f8",
            marginTop: widthPercentageToDP(23),
            marginBottom: widthPercentageToDP(20)
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  devisionLine: {
    marginTop: widthPercentageToDP(8.5),
    marginHorizontal: widthPercentageToDP(8),
    height: widthPercentageToDP(1),
    backgroundColor: "#f8f8f8"
  }
});

export default connect(state => ({
  hansunginfo: state.hansung.hansunginfo,
  grades_status: state.hansung.grades_status,
  grades_loading: state.hansung.grades_loading,
  grades_value_loading: state.hansung.grades_value_loading
}))(GradesDetail);
