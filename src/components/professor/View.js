import React, {useState, useEffect} from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import {
    TrackFilterBtn,
    ProfessorFilterBtn,
    BackBtn,
    EvaluationBtn,
    CloseBtn, MyWriteProfessorBtn, GoodBtn, BadBtn, MyWriteProfessorContainer
} from "./Button";
import {SearchTI} from "./TextInput";
import {
    CurrentOrderText,
    ModalText,
    ProfessorNameText,
    ProfessorInfoText,
    AvgStarText,
    TitleNameText,
    EvaluationTitleText, StepInfoText, RecommendText, MyWriteProfessorText, NonResultText
} from "./Text";
import {View, Text, FlatList, processColor, Image, BackHandler, TouchableOpacity} from "react-native";
import fonts from "../../configs/fonts";
import {FilterImg, NonResultImg, RecommendImg, RecommendImg2, ReplyImg, SearchImg} from "./Image";
import {RadarChart} from "react-native-charts-wrapper";
import {UIActivityIndicator} from "react-native-indicators";
import {ReplyView, ReportDetailBody} from "../community/View";
import * as Progress from "react-native-progress";
import {ProfessorActions} from "../../store/actionCreator";
import {BottomMenuModal, CustomModal} from "../common/Modal";
import {AlertModal} from "../community/Modal";

export const TopView = styled.View`
  width: ${widthPercentageToDP(340)};
  height: ${widthPercentageToDP(40)};
  flex-direction: row;
  align-items: center;
  margin-left: ${widthPercentageToDP(18)};
  margin-right: ${widthPercentageToDP(17)};
  margin-vertical: ${widthPercentageToDP(16)};
  border-color: #b7b7b7;
  border-width: ${widthPercentageToDP(1.5)};
  border-radius: ${widthPercentageToDP(14)};
  background-color: #eeeeee;
`;

export const SearchView = props => {

    return (
        <TopView>
            <SearchImg/>
            <SearchTI returnKeyType={"search"}
                      placeholder={"교수명/트랙명"}
                      onChangeText={props.onChangeText}
                      value={props.value}
                      onSubmitEditing={props.onSubmitEditing}/>
        </TopView>
    )
};

const Division = styled.View`
  flex-direction: row;
  width: ${widthPercentageToDP(375)};
  margin-bottom: ${widthPercentageToDP(13)};
  padding-left: ${widthPercentageToDP(27)};
  background-color: #f8f8f8;
`;

export const DivisionView = props => {
  return (
      <View>
          {
              props.searching === true ?
                  <Division>
                      <CurrentOrderText>
                          검색중
                      </CurrentOrderText>
                  </Division>
                  :
                  <Division>
                      {
                          props.filterSearch === true?
                              <CurrentOrderText>
                                  검색결과 (
                              </CurrentOrderText>
                              :
                              <CurrentOrderText>
                                  최근 교수평가 (
                              </CurrentOrderText>
                      }
                      <CurrentOrderText style={{color: '#259ffa'}}>
                          {props.count}
                      </CurrentOrderText>
                      <CurrentOrderText>
                          )
                      </CurrentOrderText>
                  </Division>
          }
      </View>
  )
};

const ModalTitleView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: ${widthPercentageToDP(60)};
`;

export const FilterView = props => {
    return (
        <View style={{position: 'absolute', top: widthPercentageToDP(-14), width: widthPercentageToDP(250), height: widthPercentageToDP(210)}}>
            <ModalTitleView>
                <FilterImg/>
                <ModalText style={{paddingLeft: widthPercentageToDP(4.3), fontFamily: fonts.nanumBarunGothic, color: '#000000'}}>필터링 검색</ModalText>
            </ModalTitleView>
            <View>
                <TrackFilterBtn handler={() => props.trackList()} track={props.selectTrack}/>
                <ProfessorFilterBtn disabled={props.professorListDisabled} handler={() => props.professorList()} professor={props.selectProfessor}/>
            </View>
        </View>
    )
};

const FooterView = styled.TouchableOpacity`
  width: 100%
  height: ${widthPercentageToDP(64)}
  justify-content: center
  align-items: center
  border-bottom-left-radius: ${widthPercentageToDP(14)}
  border-bottom-right-radius: ${widthPercentageToDP(14)}
`;

export const ModalFooterView = props => {
    return (
        <FooterView disabled={props.selectTrack == "해당없음" ? true : false}
                    style={props.selectTrack == "해당없음" ? {backgroundColor: '#b7b7b7'} : {backgroundColor: '#24a0fa'}}
                    onPress={() => props.onPress()}>
            <Text style={{fontFamily: fonts.nanumBarunGothic, fontSize: widthPercentageToDP(20), color: '#ffffff'}}>검색하기</Text>
        </FooterView>
    )
};

// 내가 쓴 교수평가페이지 이동 버튼
const MyWriteProfessor = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${widthPercentageToDP(5)};
  margin-right: ${widthPercentageToDP(5)};
`;

const MyWrite = props => {
    return (
        <MyWriteProfessor>
            {props.children}
        </MyWriteProfessor>
    )
};

// 내가 쓴 교수평가 View
export const MyProfessorView = props => {
  return (
      <MyWriteProfessorContainer {...props}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View style={{paddingLeft: widthPercentageToDP(16), paddingTop: widthPercentageToDP(16), marginBottom: widthPercentageToDP(10)}}>
                  <MyWriteProfessorText fontSize={15}>내가 쓴 교수평가</MyWriteProfessorText>
              </View>
              <MyWrite>
                  <MyWriteProfessorText style={{justifyContent: 'center'}} fontSize={10} color={'#259ffa'}>자세히 보기</MyWriteProfessorText>
                  <Image style={{width: widthPercentageToDP(28), height: widthPercentageToDP(28)}} source={require("../../../assets/image/professor/look.png")} />
              </MyWrite>
          </View>
          {
              props.refreshing == true || props.MyEvaluationCount !== 0 ?
                  <MyWriteProfessorText style={{paddingLeft: widthPercentageToDP(16)}} fontSize={12} fontFamily={'light'} color={'#707070'}>총 {props.MyEvaluationCount}명의 교수님을 평가하였습니다.</MyWriteProfessorText>
                  :
                  <MyWriteProfessorText style={{paddingLeft: widthPercentageToDP(16)}} fontSize={12} fontFamily={'light'} color={'#707070'}>아직 확인할 수 있는 평가가 없습니다.</MyWriteProfessorText>
          }
      </MyWriteProfessorContainer>
  )
};

// 교수평가 메인(첫) 페이지 교수 데이터 리스트 목록
const ListView = styled.TouchableOpacity`
  flex-direction: row;
  width: ${widthPercentageToDP(340)};
  height: ${widthPercentageToDP(155)};
  background-color: #ffffff;
  margin-left: ${widthPercentageToDP(18)};
  margin-right: ${widthPercentageToDP(17)};
  border-width: ${widthPercentageToDP(0.5)};
  border-style: solid;
  border-color: #dbdbdb;
  
`;

const ProfessorInfoView = styled.View`
  padding-top: ${widthPercentageToDP(27)};
  padding-left: ${widthPercentageToDP(20)};
  width: ${widthPercentageToDP(170)};
`;

const DetailView = styled.View`
  justify-content: space-around;
  margin-top: ${widthPercentageToDP(7)};
`;

const AvgGradeStarView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProfessorListView = props => {

    const [loading, setLoading] = useState(true);

    const _renderItem = ({ item, index }) => {
        return (
            <ListView
                key={index}
                style={props.detail.length === 1 ? {borderRadius: widthPercentageToDP(17)} : index === 0 ? {borderTopLeftRadius: widthPercentageToDP(17), borderTopRightRadius: widthPercentageToDP(17)} : (index + 1) === props.detail.length ? {borderBottomLeftRadius: widthPercentageToDP(17), borderBottomRightRadius: widthPercentageToDP(17), marginBottom: widthPercentageToDP(8)} : null}
                onPress={() => {ProfessorActions.professorLoadingHandle(true); props.professorDetail.navigate("ProfessorDetail", {professorIndex: item.professorIndex, professorInfoIndex: item.professorInfoIndex})}}
            >
                <ProfessorInfoView>
                    <ProfessorNameText>{item.professorName} 교수님</ProfessorNameText>
                    <AvgGradeStarView>
                        <Text>평균평점공간</Text>
                        <AvgStarText style={{marginLeft: widthPercentageToDP(3)}}>{parseFloat(item.avgScore).toFixed(1)}</AvgStarText>
                        <AvgStarText style={{fontSize: widthPercentageToDP(7), fontFamily: fonts.nanumBarunGothicUL, color: '#565a61'}}> / 5.0</AvgStarText>
                    </AvgGradeStarView>
                    <DetailView>
                        <ProfessorInfoText>트랙: {item.department}</ProfessorInfoText>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: widthPercentageToDP(14)}}>
                            <ProfessorInfoText style={{fontSize: widthPercentageToDP(11), color: '#171717'}}>{item.isGood === true ? <RecommendImg/> : <RecommendImg2/>} {" " + item.goodCount + " "} </ProfessorInfoText>
                            <ProfessorInfoText style={{fontSize: widthPercentageToDP(11), color: '#171717'}}><ReplyImg />{"  " + item.professorInfoReplyCount+ " "}</ProfessorInfoText>
                        </View>
                    </DetailView>
                </ProfessorInfoView>
                <View style={{width: widthPercentageToDP(152), height: widthPercentageToDP(152)}}>
                    <RadarChart
                        textSize={widthPercentageToDP(15)}
                        style={{width: '100%', height: '100%'}}
                        rotationEnabled={false}
                        touchEnabled={false}
                        chartDescription={{text : ''}}
                        xAxis={{valueFormatter: ["강의수준","과제만족도","학점비율","융통성","소통"]}}
                        yAxis={{enabled: false, granularity: 1, axisMinimum: 0, axisMaximum: 3}}
                        skipWebLineCount={5}
                        legend={{ enabled: false }}
                        data={{
                            dataSets: [
                                {
                                    values: [item.avgLecturePower, item.avgHomework, item.avgGrade, item.avgElasticity, item.avgCommunication],
                                    label: "교수평가 지표", // required
                                    config: {
                                        color: processColor("rgba(13, 207, 224, 0.6)"),
                                        drawFilled: true,
                                        fillAlpha: 100,
                                        fillColor: processColor("rgba(13, 207, 224, 0.6)"),
                                        drawValues: false,
                                    }
                                },
                            ],
                        }}
                    />
                </View>
            </ListView>
        );
    };

    const refreshControl = () => {
        let timeout = setInterval(async () => {
            setLoading(false);
            clearInterval(timeout);
        }, 1000);

        return (
            <View style={{alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                <UIActivityIndicator color={"grey"} />
            </View>
        )
    };

    return (
        loading === true ?
            refreshControl()
            :
            <View style={{backgroundColor: '#f8f8f8'}}>
                <FlatList data={props.detail}
                          style={{flexGrow: 1, width: '100%', height: '100%'}}
                          keyExtractor={(item, index) => index.toString()}
                          refreshControl={props.refreshControl}
                          renderItem={_renderItem}
                          ListHeaderComponent={props.ListHeaderComponent}
                          ListFooterComponent={props.ListFooterComponent}
                          onEndReached={props.onEndReached}
                          onEndReachedThreshold={0.01}
                />
            </View>
    )
};

// 상세페이지 교수 상세 목록
const ProfessorDetail = styled.View`
  width: 100%;
  height: ${widthPercentageToDP(393)};
`;

const ProfessorTopView = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: ${widthPercentageToDP(60)};
  padding-left: ${widthPercentageToDP(10)};
  padding-right: ${widthPercentageToDP(23)};
  border-bottom-width: ${widthPercentageToDP(1)};
  border-bottom-color: #ebebeb;
`;

const DetailDataView = styled.View`
  flex-direction: row;
  width: 100%;
  padding-top: ${widthPercentageToDP(16)};
  height: ${widthPercentageToDP(124)};
  border-bottom-width: ${widthPercentageToDP(1)};
  border-bottom-color: #ebebeb;
`;

const ReviewResultCount = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${widthPercentageToDP(20)};
  background-color: #ebebeb;
  height: ${widthPercentageToDP(45)};
`;

 // 교수님 정보들 태그뷰
const TagView = styled.View`
  justify-content: center;
  height: ${widthPercentageToDP(24)};
  border-radius: ${widthPercentageToDP(13)};
  border-width ${widthPercentageToDP(1)};
  border-color: #b7b7b7;
  background-color: #eeeeee;
  padding-left: ${widthPercentageToDP(8)};
`;

export const ProfessorDetailView = props => {

    const [isGood, setIsGood] = useState(null);
    const [goodCount, setGoodCount] = useState(0);
    const [badCount, setBadCount] = useState(0);
    // 내가 평가한 교수 추천 상태 변경 시, 중복 클릭 방지
    const [checkLoading, setCheckLoading] = useState(false);

    // 해당 페이지에서 댓글 삭제 시, 교수 평가 항목 리프레쉬
    const [evaluationUpdate, setEvaluationUpdate] = useState(false);

    useEffect(() => {
        if(props.data.length === 0) {
            setEvaluationUpdate(true);
        } else {
            setEvaluationUpdate(false);
        }
    }, [props.data]);

    const _renderListHeader = () => {
        return (
            <ProfessorTopView>
                <BackBtn goback={() => props.handler()}/>
                <TitleNameText>교수평가</TitleNameText>
                <EvaluationBtn Evaluation={() => {ProfessorActions.myWriteProfessorReplyInitHandle(); ProfessorActions.fromHandle(true); props.evaluation();}}/>
            </ProfessorTopView>
        )
    };

    const GoodBadUpdate = async (professorInfoIndex) => {
        await setCheckLoading(true);
        let value = props.myWriteReplySearch.findIndex(i => i.userNickName === props.myNickName);

        if(value !== -1) {
            let replyIndex = props.myWriteReplySearch[value].professorReplyIndex;

            let updateInfo = await ProfessorActions.getProfessorReply(replyIndex);

            if(updateInfo[0].recommendation === 1) {
                setIsGood(0);
                setGoodCount(goodCount - 1);
                setBadCount(badCount + 1);
            } else {
                setIsGood(1);
                setGoodCount(goodCount + 1);
                setBadCount(badCount - 1);
            }

            const updateInfoData = {
                professorInfoIndex: professorInfoIndex,
                lecturePower: updateInfo[0].LecturePower,
                homework: updateInfo[0].Homework,
                elasticity: updateInfo[0].Elasticity,
                communication: updateInfo[0].Communication,
                recommendation: updateInfo[0].recommendation === 1 ? 0 : 1,
                grade: updateInfo[0].Grade,
                content: updateInfo[0].content
            };

            await ProfessorActions.updateProfessorReply(replyIndex, updateInfoData);

            await ProfessorActions.myWriteProfessorReplyInitHandle();

            await setCheckLoading(false);
        }
    };

    return (
        evaluationUpdate === true ?
        <ProfessorDetail style={{justifyContent: 'center', alignItems: 'center'}}>
            <UIActivityIndicator color="grey" size={widthPercentageToDP(40)} />
        </ProfessorDetail>
        :
        <FlatList scrollEnabled={false}
                  data={props.data}
                  keyExtractor={(item, index) => index.toString()}
                  ListHeaderComponent={_renderListHeader}
                  renderItem={({ item, index }) => {

                      return (
                          <ProfessorDetail key={index}>
                              <DetailDataView style={{flexDirection: 'column', paddingLeft: widthPercentageToDP(23)}}>
                                  <View>
                                      <Text style={{fontSize: widthPercentageToDP(16), fontFamily: fonts.nanumBarunGothicB, color: '#000000'}}>{item.professorName} 교수님</Text>
                                  </View>
                                  <View style={{marginTop: widthPercentageToDP(13)}}>
                                      <View style={{flexDirection: 'row'}}>
                                          <TagView style={{width: widthPercentageToDP(156), marginRight: widthPercentageToDP(8)}}>
                                              <ProfessorInfoText numberOfLines={1} style={{width: widthPercentageToDP(140), color: '#000000', textAlign: 'center'}}># {item.department}</ProfessorInfoText>
                                          </TagView>
                                          <TagView style={{width: widthPercentageToDP(136)}}>
                                            <ProfessorInfoText style={{width: widthPercentageToDP(120), color: '#000000', textAlign: 'center'}}># {item.address.length === 0 ? `데이터 없음` : item.address}</ProfessorInfoText>
                                          </TagView>
                                      </View>
                                      <View style={{flexDirection: 'row', marginTop: widthPercentageToDP(6)}}>
                                          <TagView style={{width: widthPercentageToDP(196), marginRight: widthPercentageToDP(8)}}>
                                              <ProfessorInfoText numberOfLines={1} style={{width: widthPercentageToDP(180), color: '#000000', textAlign: 'center'}}># {item.email}</ProfessorInfoText>
                                          </TagView>
                                          <TagView style={{width: widthPercentageToDP(116)}}>
                                              <ProfessorInfoText style={{width: widthPercentageToDP(100), color: '#000000', textAlign: 'center'}}># {item.tel}</ProfessorInfoText>
                                          </TagView>
                                      </View>
                                  </View>
                              </DetailDataView>
                              <DetailDataView style={{paddingTop: widthPercentageToDP(0), height: widthPercentageToDP(224)}}>
                                  <RadarChart
                                      style={{width: widthPercentageToDP(218), height: '100%'}}
                                      rotationEnabled={false}
                                      touchEnabled={false}
                                      chartDescription={{text : ''}}
                                      xAxis={{valueFormatter: ["강의수준","과제 만족도","학점비율","융통성","소통"]}}
                                      yAxis={{enabled: false, granularity: 1, axisMinimum: 0, axisMaximum: 3}}
                                      skipWebLineCount={5}
                                      legend={{ enabled: false }}
                                      data={{
                                          dataSets: [
                                              {
                                                  values: [item.avgLecturePower, item.avgHomework, item.avgGrade, item.avgElasticity, item.avgCommunication],
                                                  label: "교수평가 지표", // required
                                                  config: {
                                                      color: processColor("rgba(13, 207, 224, 0.6)"),
                                                      drawFilled: true,
                                                      fillAlpha: 100,
                                                      fillColor: processColor("rgba(13, 207, 224, 0.6)"),
                                                      drawValues: true,
                                                  }
                                              },
                                          ],
                                      }}
                                  />
                                  <View style={{paddingTop: widthPercentageToDP(72), paddingLeft: widthPercentageToDP(45)}}>
                                      <ProfessorInfoText style={{color: '#777777'}}>총점</ProfessorInfoText>
                                      <View style={{marginBottom: widthPercentageToDP(51)}}>
                                          <View style={{flexDirection: 'row'}}>
                                              <AvgStarText style={{fontSize: widthPercentageToDP(12)}}>{parseFloat(item.avgScore).toFixed(1)}</AvgStarText>
                                              <AvgStarText style={{fontSize: widthPercentageToDP(10), fontFamily: fonts.nanumBarunGothicUL, color: '#565a61'}}> / 5.0</AvgStarText>
                                          </View>
                                          <Text>평균평점 공간</Text>
                                      </View>
                                      <View style={{flexDirection: 'row'}}>
                                          <View style={{justifyContent: 'center', marginRight: widthPercentageToDP(19)}}>
                                              {
                                                  isGood === null ?
                                                      item.isGood === 1 ?
                                                          <GoodBtn check={true} disabled={true} />
                                                          :
                                                          <GoodBtn check={false} disabled={item.isGood === -1 || checkLoading === true ? true : false} handler={() => {
                                                              GoodBadUpdate(item.professorInfoIndex);
                                                          }}/>
                                                      :
                                                      isGood ===  1 ?
                                                          <GoodBtn check={true} disabled={true} />
                                                          :
                                                          <GoodBtn check={false} disabled={item.isGood === -1 || checkLoading === true ? true : false} handler={() => {
                                                              GoodBadUpdate(item.professorInfoIndex);
                                                          }}/>
                                              }
                                              <RecommendText>{item.goodCount + goodCount}</RecommendText>
                                          </View>
                                          <View style={{justifyContent: 'center'}}>
                                              {
                                                  isGood === null ?
                                                      item.isGood === 0 ?
                                                          <BadBtn check={true} disabled={true} />
                                                          :
                                                          <BadBtn check={false} disabled={item.isGood === -1 || checkLoading === true ? true : false} handler={() => {
                                                              GoodBadUpdate(item.professorInfoIndex);
                                                          }}/>
                                                      :
                                                      isGood === 0 ?
                                                          <BadBtn check={true} disabled={true} />
                                                          :
                                                          <BadBtn check={false} disabled={item.isGood === -1 || checkLoading === true ? true : false} handler={() => {
                                                              GoodBadUpdate(item.professorInfoIndex);
                                                          }}/>
                                              }
                                              <RecommendText>{item.badCount + badCount}</RecommendText>
                                          </View>
                                      </View>
                                  </View>
                              </DetailDataView>
                              <ReviewResultCount>
                                  <CurrentOrderText style={{color: '#565a61'}}>평가 리뷰 결과</CurrentOrderText>
                                  <CurrentOrderText style={{color: '#565a61'}}> (</CurrentOrderText>
                                  <CurrentOrderText style={{color: '#259ffa'}}>{item.ProfessorReplyCount}</CurrentOrderText>
                                  <CurrentOrderText style={{color: '#565a61'}}>)</CurrentOrderText>
                              </ReviewResultCount>
                          </ProfessorDetail>
                      )
                  }}
        />
    )
};

// 댓글 리스트
export const ProfessorReplyListView = props => {

    const [bottomModal, setBottomModal] = useState(false);
    const [alertModal, setAlertModal] = useState(false);
    const [alertText, setAlertText] = useState(null);
    const [who, setWho] = useState(null);
    const [professorInfoIndex, setProfessorInfoIndex] = useState(null);
    const [reportModal, setReportModal] = useState(false);
    const [replyIndex, setReplyIndex] = useState(null);
    const [reportReason, setReportReason] = useState([
        { str: "토픽(주제)에 부적절함" },
        { str: "욕설/비하" },
        { str: "음란성" },
        { str: "상업적 광고 및 판매" },
        { str: "게시글/댓글 도배" },
        { str: "기타" }
    ]);
    const [reportIndex, setReportIndex] = useState(null);
    // 댓글 좋아요 변경위해 필요.
    const [isGoodList, setIsGoodList] = useState(props.reply);
    const [checkLoading, setCheckLoading] = useState(false);

    useEffect(() => {
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            // 수정 시, 이동페이지 지정 초기화
            ProfessorActions.fromInitHandle();

            setBottomModal(false);
            setProfessorInfoIndex(null);
            props.handler();
            return true;
        });
        // this.backHandler.remove();
        this._didFocusSubscription && this._didFocusSubscription.remove();

    }, []);

    useEffect(() => {
        setIsGoodList(props.reply);
    }, [props.reply]);

    const checkUser = (nickName) => {
        nickName === props.myNickName ?
            setWho("me")
            :
            setWho("you")
    };

    const updateReply = async () => {
        await ProfessorActions.myWriteProfessorReplyInitHandle();
        const promise1 =  ProfessorActions.getProfessorReply(replyIndex);

        await ProfessorActions.fromHandle(true);

        Promise.all([promise1]).then( () => {
            props.navigateEvaluation();
        });
    };

    const deleteReply = async () => {
        setAlertText("해당 댓글를 삭제하였습니다.");
        setAlertModal(true);

        await ProfessorActions.deleteProfessorReply(replyIndex);
        await ProfessorActions.professorDetailListInitHandle();
        await ProfessorActions.getProfessorInfo(props.professorIndex);
        await ProfessorActions.pageListProfessorReply(professorInfoIndex);
        await ProfessorActions.myProfessorReplyPostList();

        setReplyIndex(null);
        setAlertModal(false);
        setAlertText(null);
    };

    const reportReply = () => {
    };

    const handleReportIndex = index => {
        setReportIndex(index);
    };

    const replyLikeUpdate = async (professorReplyIndex) => {

        await setCheckLoading(true);

        setIsGoodList(isGoodList.map((item) => {
            if(item.professorReplyIndex === professorReplyIndex) {
                if(item.isGood === true ) {
                    return ({...item, isGood: !item.isGood, goodCount: item.goodCount - 1});
                } else {
                    return ({...item, isGood: !item.isGood, goodCount: item.goodCount + 1});
                }
            } else {
                return item;
            }
        }));

        await setCheckLoading(false);
    };

    return (
        <View>
            <BottomMenuModal
                visible={bottomModal}
                handler={() => {setBottomModal(false)}}
                updateHandler={() => {updateReply();}}
                deleteHandler={() => {deleteReply();}}
                reportHandler={() => {setReportModal(true);}}
                who={who}
                activeOpacity={0.8}
            />
            <AlertModal
                visible={alertModal}
                text={alertText}
            />
            <CustomModal
                height={381}
                children={
                    <ReportDetailBody
                        handler={handleReportIndex}
                        reportEUindex={reportIndex}
                        reportEU={reportReason}
                    />
                }
                visible={reportModal}
                footerDisabled={reportIndex == null ? true : false}
                footerHandler={async () => {
                    setReportModal(false);
                    setReportIndex(null);
                }}
                closeHandler={() => {
                    setReportModal(false);
                    setReportIndex(null);
                }}
            />
            <FlatList
                scrollEnabled={false}
                style={{
                    flexGrow: 1,
                    width: '100%',
                    padding: widthPercentageToDP(16),
                    backgroundColor: '#f8f8f8'
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                data={props.reply}
                renderItem={({ item, index }) => {
                    item.status = "ACTIVE";
                    item.displayName = "익명";
                    return (
                        <View>
                            {/* 댓글 */}
                            <ReplyView
                                key={index}
                                isGoodButton={true}
                                noClick={checkLoading}
                                isGood={item.isGood === isGoodList[index].isGood ? item.isGood : isGoodList[index].isGood}
                                goodCount={item.goodCount === isGoodList[index].goodCount ? item.goodCount : isGoodList[index].goodCount}
                                handleLike={async () => {
                                    let replyData = {
                                        professorReplyIndex: item.professorReplyIndex,
                                        isGood: isGoodList[index].isGood === true ? false : true,
                                    };

                                    let promise1 = ProfessorActions.putProfessorReplySubscriber(replyData);

                                    Promise.all([promise1]).then(async () => {
                                        await replyLikeUpdate(item.professorReplyIndex);
                                    });
                                }}
                                isReplyButton={false}
                                isdotsButton={
                                    item.userNickName === props.myNickName ?
                                        true
                                        :
                                        false
                                }
                                handler={async () => {
                                    // dotsButton 이벤트
                                    checkUser(item.userNickName);

                                    let ReplyData = await ProfessorActions.getProfessorReply(item.professorReplyIndex);

                                    await setReplyIndex(item.professorReplyIndex);
                                    await setProfessorInfoIndex(ReplyData[0].professorInfoIndex);
                                    await setBottomModal(true);
                                }}
                                writerName={props.myNickName}
                                data={item}
                            />
                        </View>
                    );
                }}
            />
        </View>
    )
};

// 교수평가 각 항목 평가 헤더뷰
const HeaderView = styled.View`
  margin-bottom: ${widthPercentageToDP(26)};
  padding-bottom: ${widthPercentageToDP(12)};
  border-bottom-width: ${widthPercentageToDP(1)};
  border-bottom-color: #e7e7e7;
`;

const CloseBackView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${widthPercentageToDP(12)};
  padding-left: ${widthPercentageToDP(14)};
  padding-right: ${widthPercentageToDP(22)};
  margin-bottom: ${widthPercentageToDP(44)};
`;

export const EvaluationHeaderView = props => {

    return (
        <HeaderView style={props.margin === false ? {marginBottom: widthPercentageToDP(0)} : null}>
            <CloseBackView>
                <BackBtn goback={() => props.goback()}/>
                <CloseBtn close={() => props.close()}/>
            </CloseBackView>
            <EvaluationTitleText>{props.title}</EvaluationTitleText>
        </HeaderView>
    )
};

// 평가 단계별 프로그레스 바 진행상태
const StepView = styled.View`
  margin-top: ${widthPercentageToDP(38)};
  margin-bottom: ${ widthPercentageToDP(34)};
  margin-left: ${widthPercentageToDP(58)};
  margin-right: ${widthPercentageToDP(57)};
`;

export const ProgressView = props => {
    return (
        <StepView>
            <Progress.Bar
                progress={((260 / 7) * props.step)/260}
                width={ widthPercentageToDP(260)}
                height={ widthPercentageToDP(8)}
                color={'#259ffa'}
                unfilledColor={'#dbdbdb'}
                borderColor={'#f8f8f8'}
                borderRadius={ widthPercentageToDP(6)}/>
            {props.step !== 7 ?
                <StepInfoText style={{left: widthPercentageToDP(((260/7) * props.step))}}>{props.step}단계!{props.step === 5 || props.step === 6 ? `거의 다 왔다` : null}</StepInfoText>
                :
                <StepInfoText style={{left: widthPercentageToDP(((260/7) * props.step))}}>다했다!</StepInfoText>
            }
        </StepView>
    )
};

// 검색결과 & 댓글 없을 때
const NonResultContainer = styled.View`
  justify-content: center;
  width: 100%;
  margin-top: ${widthPercentageToDP(155)};
  marginBottom: ${widthPercentageToDP(155)};
`;

export const NonResultView = props => {
  return (
      <NonResultContainer>
          <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: widthPercentageToDP(26.3)}}>
              <NonResultImg/>
          </View>
          <NonResultText>{props.text}</NonResultText>
      </NonResultContainer>
  )
};

export const MyWriteProfessorListView = props => {

    const [bottomModal, setBottomModal] = useState(false);
    const [replyIndex, setReplyIndex] = useState(null);
    const who = "me";
    const alertText = "내가 쓴 교수평가를 삭제하였습니다.";
    const [alertModal, setAletModal] = useState(false);
    const [isGoodList, setIsGoodList] = useState(props.data);

    useEffect(() => {
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            setBottomModal(false);
            props.handler();
            return true;
        });
        // this.backHandler.remove();
        this._didFocusSubscription && this._didFocusSubscription.remove();
    }, []);

    const replyLikeUpdate = (professorReplyIndex) => {

        setIsGoodList(isGoodList.map((item) => {
            if(item.professorReplyIndex === professorReplyIndex) {
                if(item.isGood === true ) {
                    return ({...item, isGood: !item.isGood, goodCount: item.goodCount - 1});
                } else {
                    return ({...item, isGood: !item.isGood, goodCount: item.goodCount + 1});
                }
            } else {
                return item;
            }
        }));
    };

    const _renderListHeader = () => {
        return (
            <View>
                <View style={{flexDirection: 'row', alignItems: 'center', height: widthPercentageToDP(60), paddingLeft: widthPercentageToDP(14), backgroundColor: '#ffffff'}}>
                    <BackBtn goback={() => props.handler()}/>
                    <EvaluationTitleText style={{width: widthPercentageToDP(245.7), marginLeft: widthPercentageToDP(23)}}>내가 쓴 교수평가</EvaluationTitleText>
                </View>
                <View style={{flexDirection: 'row', backgroundColor: '#f8f8f8', paddingLeft: widthPercentageToDP(23), paddingVertical: widthPercentageToDP(16)}}>
                    <CurrentOrderText>
                        내가 쓴 교수평가 (
                    </CurrentOrderText>
                    <CurrentOrderText style={{color: '#259ffa'}}>
                        {props.data.length}
                    </CurrentOrderText>
                    <CurrentOrderText>
                        )
                    </CurrentOrderText>
                </View>
                {
                    props.data.length === 0 ?
                        <NonResultView text={"내가 작성한 교수평가가 없습니다."} />
                        :
                        null
                }
            </View>
        )
    };

    const _renderItem = ({ item, index }) => {
        item.status = "ACTIVE";
        item.displayName = "익명";
        item.userNickName = props.myNickName;

        return (
            <TouchableOpacity
                onPress={async () => {
                    let professor = await ProfessorActions.getProfessorReply(item.professorReplyIndex);
                    await ProfessorActions.professorLoadingHandle(true);
                    props.professorDetail.navigate("ProfessorDetail", {professorIndex: item.professorIndex, professorInfoIndex: professor[0].professorInfoIndex});
                }}
                style={{marginLeft: widthPercentageToDP(14), marginRight: widthPercentageToDP(13)}}>
                {/* 댓글 */}
                <ReplyView
                    key={index}
                    isGoodButton={false}
                    noClick={true}
                    isGood={item.isGood === isGoodList[index].isGood ? item.isGood : isGoodList[index].isGood}
                    goodCount={item.goodCount === isGoodList[index].goodCount ? item.goodCount : isGoodList[index].goodCount}
                    handleLike={async () => {
                        let replyData = {
                            professorReplyIndex: item.professorReplyIndex,
                            isGood: isGoodList[index].isGood === true ? false : true,
                        };

                        let promise1 = ProfessorActions.putProfessorReplySubscriber(replyData);

                        Promise.all([promise1]).then(async () => {
                            await replyLikeUpdate(item.professorReplyIndex);
                        });
                    }}
                    isReplyButton={false}
                    isdotsButton={true}
                    handler={() => {
                        // dotsButton 이벤트
                        setBottomModal(true);
                        setReplyIndex(item.professorReplyIndex);
                    }}
                    writerName={props.myNickName}
                    data={item}
                />
            </TouchableOpacity>
        );
    };

    const deleteReply = async () => {
        setAletModal(true);

        await ProfessorActions.deleteProfessorReply(replyIndex);
        await ProfessorActions.myProfessorReplyPostList();

        setReplyIndex(null);
        setAletModal(false);
    };

    const updateReplyData = async () => {
        await ProfessorActions.myWriteProfessorReplyInitHandle();
        const promise1 =  ProfessorActions.getProfessorReply(replyIndex);

        Promise.all([promise1]).then( () => {
            props.navigateEvaluation();
        });
    };

    return (
        <View>
            <BottomMenuModal
                visible={bottomModal}
                handler={() => {setReplyIndex(null); setBottomModal(false);}}
                updateHandler={() => updateReplyData()}
                deleteHandler={() => deleteReply()}
                who={who}
                activeOpacity={0.8}
            />
            <AlertModal
                visible={alertModal}
                text={alertText}
            />
            <FlatList data={props.data}
                      keyExtractor={(item, index) => index.toString()}
                      ListHeaderComponent={_renderListHeader}
                      renderItem={_renderItem}
            />
        </View>
    )
};