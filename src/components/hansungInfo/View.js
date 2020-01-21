import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import { PointListText } from "./Text";
import { Text, View, ImageBackground, Image } from "react-native";
import fonts from "../../configs/fonts";
import PureChart from "react-native-pure-chart";

// 비교과, 성적표 프로그레스 영역
export const ProgressView = styled.View`
  background-color: white;
  padding-horizontal: ${widthPercentageToDP(22)};
  padding-top: ${widthPercentageToDP(17)};
`;

// 비교과, 성적표 주요 목록 값 영역
export const DetailView = styled.View`
  flex: 1;
  padding-left: ${widthPercentageToDP(16)};
  padding-right: ${widthPercentageToDP(16)};
  background-color: white;
`;

// 학기별 성적표 영역
export const GradesDetailView = styled.View`
  flex-direction: row;
  margin-top: ${widthPercentageToDP(22)};
`;

// 비교과 인증 리스트 뷰
export const PointListItem = props => {
  if (props.index % 2 == 0) {
    return (
      <View
        style={{
          position: "relative",
          left: widthPercentageToDP(0),
          flexDirection: "row",
          marginHorizontal: widthPercentageToDP(20),
          marginBottom: widthPercentageToDP(19)
        }}
      >
        <ImageBackground
          style={{
            flexDirection: "column",
            width: widthPercentageToDP(153),
            height: widthPercentageToDP(78)
          }}
          source={require("../../../assets/image/hansungInfo/square_993.png")}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginRight: widthPercentageToDP(15)
              }}
            >
              <PointListText
                style={{
                  marginTop: widthPercentageToDP(11),
                  fontFamily: fonts.nanumBarunGothic
                }}
              >
                {props.data.status}
              </PointListText>
              {
                // props.index == 0 ?
                //     <Image style={{marginTop: widthPercentageToDP(9)}} width={widthPercentageToDP(12)} height={widthPercentageToDP(12)} source={require("../../../assets/image/hansungInfo/circle_825.png")} />
                //     :
                //     null
              }
            </View>
            <PointListText
              style={{
                textAlign: "center",
                fontSize: widthPercentageToDP(20),
                color: "#24a0fa"
              }}
            >
              {props.data.score}
            </PointListText>
            <PointListText numberOfLines={2} style={{ textAlign: "center" }}>
              {props.data.item}
            </PointListText>
          </View>
        </ImageBackground>
      </View>
    );
  } else if (props.index % 2 == 1 && props.index + 1 != props.length) {
    return (
      <View
        style={{
          position: "absolute",
          bottom: widthPercentageToDP(0),
          left: widthPercentageToDP(203),
          width: widthPercentageToDP(153),
          height: widthPercentageToDP(78),
          flexDirection: "row",
          marginLeft: widthPercentageToDP(4),
          marginBottom: widthPercentageToDP(19)
        }}
      >
        <ImageBackground
          style={{
            flexDirection: "column",
            width: widthPercentageToDP(154),
            height: widthPercentageToDP(78)
          }}
          source={require("../../../assets/image/hansungInfo/square_993.png")}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginRight: widthPercentageToDP(15)
              }}
            >
              <PointListText
                style={{
                  marginTop: widthPercentageToDP(11),
                  fontFamily: fonts.nanumBarunGothic
                }}
              >
                {props.data.status}
              </PointListText>
              {props.index == 0 ? (
                <Image
                  style={{ marginTop: widthPercentageToDP(9) }}
                  width={widthPercentageToDP(12)}
                  height={widthPercentageToDP(12)}
                  source={require("../../../assets/image/hansungInfo/circle_825.png")}
                />
              ) : null}
            </View>
            <PointListText
              style={{
                textAlign: "center",
                fontSize: widthPercentageToDP(20),
                color: "#24a0fa"
              }}
            >
              {props.data.score}
            </PointListText>
            <PointListText numberOfLines={2} style={{ textAlign: "center" }}>
              {props.data.item}
            </PointListText>
          </View>
        </ImageBackground>
      </View>
    );
  } else {
    return (
      <View
        style={{
          position: "relative",
          left: widthPercentageToDP(203),
          bottom: widthPercentageToDP(97.3),
          flexDirection: "row",
          marginLeft: widthPercentageToDP(4),
          marginBottom: widthPercentageToDP(19),
          width: widthPercentageToDP(153),
          height: widthPercentageToDP(78)
        }}
      >
        <ImageBackground
          style={{
            flexDirection: "column",
            width: widthPercentageToDP(153),
            height: widthPercentageToDP(78)
          }}
          source={require("../../../assets/image/hansungInfo/square_993.png")}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginRight: widthPercentageToDP(15)
              }}
            >
              <PointListText
                style={{
                  marginTop: widthPercentageToDP(11),
                  fontFamily: fonts.nanumBarunGothic
                }}
              >
                {props.data.status}
              </PointListText>
              {props.index == 0 ? (
                <Image
                  style={{ marginTop: widthPercentageToDP(9) }}
                  width={widthPercentageToDP(12)}
                  height={widthPercentageToDP(12)}
                  source={require("../../../assets/image/hansungInfo/circle_825.png")}
                />
              ) : null}
            </View>
            <PointListText
              style={{
                textAlign: "center",
                fontSize: widthPercentageToDP(20),
                color: "#24a0fa"
              }}
            >
              {props.data.score}
            </PointListText>
            <PointListText numberOfLines={2} style={{ textAlign: "center" }}>
              {props.data.item}
            </PointListText>
          </View>
        </ImageBackground>
      </View>
    );
  }
};

// 하위 뷰 -> 비교과 메인 박스 뷰
export const SimpleView = styled.View`
  flex-direction: row;
  padding-top: ${widthPercentageToDP(19)};
  padding-left: ${widthPercentageToDP(51)};
`;

export const BlockView = styled.View`
  align-items: center;
`;

export const HansungPointProperty = styled.Text`
  font-family: ${fonts.nanumBarunGothic};
  font-size: ${widthPercentageToDP(14)};
  margin-top: ${widthPercentageToDP(8)};
  color: #000000;
`;

export const HansungPointValue = styled.Text`
  text-align: center;
  width: ${widthPercentageToDP(78)};
  height: ${widthPercentageToDP(20)};
  font-family: ${fonts.nanumBarunGothicB};
  font-size: ${widthPercentageToDP(20)};
  color: #24a0fa;
`;

export const HansungPointMainView = props => {
  return (
    <ImageBackground
      style={{
        marginTop: widthPercentageToDP(29),
        backgroundColor: "#ffffff",
        width: widthPercentageToDP(345),
        height: widthPercentageToDP(139)
      }}
      source={require("../../../assets/image/hansungInfo/square_1275.png")}
    >
      <SimpleView>
        <BlockView>
          <HansungPointValue>{props.list}</HansungPointValue>
          <HansungPointProperty>신청가능 목록</HansungPointProperty>
        </BlockView>
        <BlockView style={{ paddingLeft: widthPercentageToDP(90) }}>
          <HansungPointValue>{props.waiting}</HansungPointValue>
          <HansungPointProperty>인증대기</HansungPointProperty>
        </BlockView>
      </SimpleView>
      <SimpleView>
        <BlockView>
          <HansungPointValue>{props.completed}</HansungPointValue>
          <HansungPointProperty>인증완료</HansungPointProperty>
        </BlockView>
        <BlockView style={{ paddingLeft: widthPercentageToDP(90) }}>
          <HansungPointValue>{props.declined}</HansungPointValue>
          <HansungPointProperty>인증반려</HansungPointProperty>
        </BlockView>
      </SimpleView>
    </ImageBackground>
  );
};

// 하위 뷰 -> 비교과 서브 박스 뷰
export const Wrap = styled.View``;
export const RowBlockView = styled.View`
  flex-direction: row;
  margin-top: ${widthPercentageToDP(19)};
`;

export const WithInView = styled.View`
  align-items: center;
  margin-top: ${widthPercentageToDP(18)};
  margin-left: ${widthPercentageToDP(15)};
  width: ${widthPercentageToDP(124)};
`;

export const HansungPointSubView = props => {
  return (
    <Wrap>
      <RowBlockView style={{ marginTop: widthPercentageToDP(30) }}>
        <ImageBackground
          style={{
            width: widthPercentageToDP(153),
            height: widthPercentageToDP(78)
          }}
          source={require("../../../assets/image/hansungInfo/square_1026.png")}
        >
          <WithInView>
            <HansungPointValue>{props.carryOverPoint}</HansungPointValue>
            <HansungPointProperty
              style={{
                marginTop: widthPercentageToDP(10),
                fontSize: widthPercentageToDP(11)
              }}
            >
              다음학기 이월예정 포인트
            </HansungPointProperty>
          </WithInView>
        </ImageBackground>
        <ImageBackground
          style={{
            marginLeft: widthPercentageToDP(37),
            width: widthPercentageToDP(154),
            height: widthPercentageToDP(78)
          }}
          source={require("../../../assets/image/hansungInfo/square_1026.png")}
        >
          <WithInView>
            <HansungPointValue>{props.currentSemesterPoint}</HansungPointValue>
            <HansungPointProperty
              style={{
                marginTop: widthPercentageToDP(10),
                fontSize: widthPercentageToDP(11)
              }}
            >
              {props.currentSemester}학기 포인트
            </HansungPointProperty>
          </WithInView>
        </ImageBackground>
      </RowBlockView>
      <RowBlockView>
        <ImageBackground
          style={{
            width: widthPercentageToDP(154),
            height: widthPercentageToDP(78)
          }}
          source={require("../../../assets/image/hansungInfo/square_1026.png")}
        >
          <WithInView>
            <HansungPointValue>{props.departmentAverage}</HansungPointValue>
            <HansungPointProperty
              style={{
                marginTop: widthPercentageToDP(10),
                fontSize: widthPercentageToDP(11)
              }}
            >
              학과 평균
            </HansungPointProperty>
          </WithInView>
        </ImageBackground>
        <ImageBackground
          style={{
            marginLeft: widthPercentageToDP(37),
            width: widthPercentageToDP(154),
            height: widthPercentageToDP(78)
          }}
          source={require("../../../assets/image/hansungInfo/square_1026.png")}
        >
          <WithInView>
            <HansungPointValue>{props.departmentMaximum}</HansungPointValue>
            <HansungPointProperty
              style={{
                marginTop: widthPercentageToDP(10),
                fontSize: widthPercentageToDP(11)
              }}
            >
              학과 최대
            </HansungPointProperty>
          </WithInView>
        </ImageBackground>
      </RowBlockView>
      <RowBlockView>
        <ImageBackground
          style={{
            width: widthPercentageToDP(154),
            height: widthPercentageToDP(78)
          }}
          source={require("../../../assets/image/hansungInfo/square_1026.png")}
        >
          <WithInView>
            <HansungPointValue>{props.gradeAverage}</HansungPointValue>
            <HansungPointProperty
              style={{
                marginTop: widthPercentageToDP(10),
                fontSize: widthPercentageToDP(11)
              }}
            >
              학년 평균
            </HansungPointProperty>
          </WithInView>
        </ImageBackground>
        <ImageBackground
          style={{
            marginLeft: widthPercentageToDP(37),
            width: widthPercentageToDP(154),
            height: widthPercentageToDP(78)
          }}
          source={require("../../../assets/image/hansungInfo/square_1026.png")}
        >
          <WithInView>
            <HansungPointValue>{props.gradeMaximum}</HansungPointValue>
            <HansungPointProperty
              style={{
                marginTop: widthPercentageToDP(10),
                fontSize: widthPercentageToDP(11)
              }}
            >
              학년 최대
            </HansungPointProperty>
          </WithInView>
        </ImageBackground>
      </RowBlockView>
    </Wrap>
  );
};

// 하위 뷰, 성적표 박스 메인뷰
export const GradeSimpleView = styled.View`
  flex-direction: row;
  padding-top: ${widthPercentageToDP(19)};
  padding-left: ${widthPercentageToDP(22)};
`;

export const GradeProperty = styled.Text`
  font-family: ${fonts.nanumBarunGothic};
  font-size: ${widthPercentageToDP(14)};
  margin-top: ${widthPercentageToDP(8)};
  color: #000000;
`;

export const GradeValue = styled.Text`
  text-align: center;
  width: ${widthPercentageToDP(74)};
  height: ${widthPercentageToDP(20)};
  font-family: ${fonts.nanumBarunGothicB};
  font-size: ${widthPercentageToDP(20)};
  color: #24a0fa;
`;

export const GradeMainView = props => {
  return (
    <ImageBackground
      style={{
        marginTop: widthPercentageToDP(29),
        backgroundColor: "#ffffff",
        width: widthPercentageToDP(345),
        height: widthPercentageToDP(139)
      }}
      source={require("../../../assets/image/hansungInfo/square_1275.png")}
    >
      <GradeSimpleView>
        <BlockView>
          <GradeValue>{props.applyGrades}</GradeValue>
          <GradeProperty>신청학점</GradeProperty>
        </BlockView>
        <BlockView style={{ paddingLeft: widthPercentageToDP(38) }}>
          <GradeValue>{props.acquisitionGrades}</GradeValue>
          <GradeProperty>취득학점</GradeProperty>
        </BlockView>
        <BlockView style={{ paddingLeft: widthPercentageToDP(38) }}>
          <GradeValue>{props.averageRating}</GradeValue>
          <GradeProperty>평균학점</GradeProperty>
        </BlockView>
      </GradeSimpleView>
      <GradeSimpleView>
        <BlockView>
          <GradeValue>{props.percentile}</GradeValue>
          <GradeProperty>백분위</GradeProperty>
        </BlockView>
        <BlockView style={{ paddingLeft: widthPercentageToDP(38) }}>
          <GradeValue>{props.ratedTotal}</GradeValue>
          <GradeProperty>평균총계</GradeProperty>
        </BlockView>
      </GradeSimpleView>
    </ImageBackground>
  );
};

// 하위 뷰, 세부 학점 뷰

export const GradeSubView = props => {
  return (
    <ImageBackground
      style={{
        backgroundColor: "#ffffff",
        width: widthPercentageToDP(345),
        height: widthPercentageToDP(220)
      }}
      source={require("../../../assets/image/hansungInfo/square_1061.png")}
    >
      <GradeSimpleView style={{ marginTop: widthPercentageToDP(-4) }}>
        <BlockView>
          <GradeValue style={{ color: "#2e2e2e" }}>
            {props.requiredAccomplishments}
          </GradeValue>
          <GradeProperty>교필</GradeProperty>
        </BlockView>
        <BlockView style={{ paddingLeft: widthPercentageToDP(38) }}>
          <GradeValue style={{ color: "#2e2e2e" }}>
            {props.foundationAccomplishments}
          </GradeValue>
          <GradeProperty>토대</GradeProperty>
        </BlockView>
        <BlockView style={{ paddingLeft: widthPercentageToDP(37) }}>
          <GradeValue style={{ color: "#2e2e2e" }}>
            {props.hansungHumanResources}
          </GradeValue>
          <GradeProperty>한성인재</GradeProperty>
        </BlockView>
      </GradeSimpleView>
      <GradeSimpleView style={{ marginTop: widthPercentageToDP(10) }}>
        <BlockView>
          <GradeValue style={{ color: "#2e2e2e" }}>{props.autonomy}</GradeValue>
          <GradeProperty>자율</GradeProperty>
        </BlockView>
        <BlockView style={{ paddingLeft: widthPercentageToDP(38) }}>
          <GradeValue style={{ color: "#2e2e2e" }}>
            {props.knowledge}
          </GradeValue>
          <GradeProperty>소양</GradeProperty>
        </BlockView>
        <BlockView style={{ paddingLeft: widthPercentageToDP(37) }}>
          <GradeValue style={{ color: "#2e2e2e" }}>{props.core}</GradeValue>
          <GradeProperty>핵심</GradeProperty>
        </BlockView>
      </GradeSimpleView>
      <GradeSimpleView style={{ marginTop: widthPercentageToDP(10) }}>
        <BlockView>
          <GradeValue style={{ color: "#2e2e2e" }}>
            {props.generalSelection}
          </GradeValue>
          <GradeProperty>일선</GradeProperty>
        </BlockView>
      </GradeSimpleView>
    </ImageBackground>
  );
};

// 전공 세부 학점 뷰
export const MajorUnitView = props => {
  return (
    <ImageBackground
      style={{
        backgroundColor: "#ffffff",
        width: widthPercentageToDP(345),
        height: widthPercentageToDP(74)
      }}
      source={require("../../../assets/image/hansungInfo/square_1296.png")}
    >
      <GradeSimpleView style={{ marginTop: widthPercentageToDP(-4) }}>
        <BlockView>
          <GradeValue style={{ color: "#2e2e2e" }}>
            {props.foundationMajor}
          </GradeValue>
          <GradeProperty
            style={{
              width: widthPercentageToDP(82),
              height: widthPercentageToDP(16),
              fontSize: widthPercentageToDP(13)
            }}
          >
            전기(트랙1,2)
          </GradeProperty>
        </BlockView>
        <BlockView style={{ paddingLeft: widthPercentageToDP(30) }}>
          <GradeValue style={{ color: "#2e2e2e" }}>
            {props.requiredMajor}
          </GradeValue>
          <GradeProperty
            style={{
              width: widthPercentageToDP(82),
              height: widthPercentageToDP(16),
              fontSize: widthPercentageToDP(13)
            }}
          >
            전지(트랙1,2)
          </GradeProperty>
        </BlockView>
        <BlockView style={{ paddingLeft: widthPercentageToDP(29) }}>
          <GradeValue style={{ color: "#2e2e2e" }}>
            {props.optionalMajor}
          </GradeValue>
          <GradeProperty
            style={{
              width: widthPercentageToDP(82),
              height: widthPercentageToDP(16),
              fontSize: widthPercentageToDP(13)
            }}
          >
            전선(트랙1,2)
          </GradeProperty>
        </BlockView>
      </GradeSimpleView>
    </ImageBackground>
  );
};

// 교직 세부 학점 뷰
export const TeachingUnitView = props => {
  return (
    <ImageBackground
      style={{
        backgroundColor: "#ffffff",
        width: widthPercentageToDP(228),
        height: widthPercentageToDP(74)
      }}
      source={require("../../../assets/image/hansungInfo/square_1301.png")}
    >
      <GradeSimpleView>
        <BlockView>
          <GradeValue style={{ color: "#2e2e2e" }}>
            {props.requiredTeaching}
          </GradeValue>
          <GradeProperty>교직</GradeProperty>
        </BlockView>
        <BlockView style={{ marginLeft: widthPercentageToDP(38) }}>
          <GradeValue style={{ color: "#2e2e2e" }}>
            {props.optionalTeaching}
          </GradeValue>
          <GradeProperty>교직선</GradeProperty>
        </BlockView>
      </GradeSimpleView>
    </ImageBackground>
  );
};

// 부전공 세부 학점 뷰
export const MinorUnitView = props => {
  return (
    <ImageBackground
      style={{
        backgroundColor: "#ffffff",
        width: widthPercentageToDP(345),
        height: widthPercentageToDP(74)
      }}
      source={require("../../../assets/image/hansungInfo/square_1296.png")}
    >
      <GradeSimpleView style={{ marginTop: widthPercentageToDP(-4) }}>
        <BlockView>
          <GradeValue style={{ color: "#2e2e2e" }}>
            {props.foundationMinor}
          </GradeValue>
          <GradeProperty>부전기</GradeProperty>
        </BlockView>
        <BlockView style={{ paddingLeft: widthPercentageToDP(38) }}>
          <GradeValue style={{ color: "#2e2e2e" }}>
            {props.requiredMinor}
          </GradeValue>
          <GradeProperty>부전지</GradeProperty>
        </BlockView>
        <BlockView style={{ paddingLeft: widthPercentageToDP(37) }}>
          <GradeValue style={{ color: "#2e2e2e" }}>
            {props.optionalMinor}
          </GradeValue>
          <GradeProperty>부전선</GradeProperty>
        </BlockView>
      </GradeSimpleView>
    </ImageBackground>
  );
};

// 복수전공 세부 학점 뷰
export const DoubleMajorUnitView = props => {
  return (
    <ImageBackground
      style={{
        backgroundColor: "#ffffff",
        width: widthPercentageToDP(345),
        height: widthPercentageToDP(74)
      }}
      source={require("../../../assets/image/hansungInfo/square_1296.png")}
    >
      <GradeSimpleView style={{ marginTop: widthPercentageToDP(-4) }}>
        <BlockView>
          <GradeValue style={{ color: "#2e2e2e" }}>
            {props.foundationDoubleMajor}
          </GradeValue>
          <GradeProperty>복전기</GradeProperty>
        </BlockView>
        <BlockView style={{ paddingLeft: widthPercentageToDP(38) }}>
          <GradeValue style={{ color: "#2e2e2e" }}>
            {props.requiredDoubleMajor}
          </GradeValue>
          <GradeProperty>복전지</GradeProperty>
        </BlockView>
        <BlockView style={{ paddingLeft: widthPercentageToDP(37) }}>
          <GradeValue style={{ color: "#2e2e2e" }}>
            {props.optionalDoubleMajor}
          </GradeValue>
          <GradeProperty>복전선</GradeProperty>
        </BlockView>
      </GradeSimpleView>
    </ImageBackground>
  );
};

export const ConnectedMajorUnitView = props => {
  return (
    <ImageBackground
      style={{
        backgroundColor: "#ffffff",
        width: widthPercentageToDP(345),
        height: widthPercentageToDP(74)
      }}
      source={require("../../../assets/image/hansungInfo/square_1296.png")}
    >
      <GradeSimpleView style={{ marginTop: widthPercentageToDP(-4) }}>
        <BlockView>
          <GradeValue style={{ color: "#2e2e2e" }}>
            {props.foundationConnectedMajor}
          </GradeValue>
          <GradeProperty>연전기</GradeProperty>
        </BlockView>
        <BlockView style={{ paddingLeft: widthPercentageToDP(38) }}>
          <GradeValue style={{ color: "#2e2e2e" }}>
            {props.requiredConnectedMajor}
          </GradeValue>
          <GradeProperty>연전지</GradeProperty>
        </BlockView>
        <BlockView style={{ paddingLeft: widthPercentageToDP(37) }}>
          <GradeValue style={{ color: "#2e2e2e" }}>
            {props.optionalConnectedMajor}
          </GradeValue>
          <GradeProperty>연전선</GradeProperty>
        </BlockView>
      </GradeSimpleView>
    </ImageBackground>
  );
};

// 학기별 평균학점 그래프
export const SemesterAvgGradeChart = props => {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(data);
  }, [props.data]);

  return (
    <View style={{ position: "relative", left: widthPercentageToDP(-18) }}>
      <PureChart
        type={"line"}
        data={data}
        width={"100%"}
        height={widthPercentageToDP(188)}
        gap={widthPercentageToDP(300 / data.length)}
        customValueRenderer={(index, point) => {
          return (
            <Text
              style={{
                fontSize: widthPercentageToDP(8),
                fontFamily: fonts.nanumBarunGothicB,
                textAlign: "center",
                color: "#24a0fa"
              }}
            >
              {point.y}
            </Text>
          );
        }}
      />
    </View>
  );
};
