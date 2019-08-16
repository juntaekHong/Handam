import React from 'react';
import {ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, FlatList} from 'react-native';
import { ProgressView, DetailView } from "../../components/hansungInfo/View";
import { BTText, SUBTText, VALText } from "../../components/hansungInfo/Text";
import AbstractAccountInfoScreen from "./AbstractAccountInfoScreen";
import {widthPercentageToDP} from "../../utils/util";
import fonts from "../../configs/fonts";
import {connect} from "react-redux";
import {UIActivityIndicator} from "react-native-indicators";
import {HansungInfoActions} from "../../store/actionCreator";
import * as Progress from "react-native-progress";
import GradesDetailScreen from "./GradesDetailScreen";
import {GradesModal} from "../../components/hansungInfo/Modal";

class GradesScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: true,
            refreshModal: false,
        }
    }

    grades_check = async () => {
        await HansungInfoActions.gradesLoadingHandle(true);
        await HansungInfoActions.createHansungInfoGrades();
        await HansungInfoActions.getHansungInfo();

        let timeout = setInterval( async () => {
            if(this.props.hansunginfo.summaryGrades.ratedTotal==undefined){
                await HansungInfoActions.getHansungInfo();
            }
            else if(this.props.hansunginfo.summaryGrades.ratedTotal!=undefined){
                await HansungInfoActions.gradesLoadingHandle(false); await HansungInfoActions.gradesHandle(true); await HansungInfoActions.professorTextHandle(true); clearInterval(timeout);
            }
        }, 5000);
    };

    navigateMyInfo = () => {
        return (
            this.props.navigation
        )
    };

    refreshBtn = async () => {
        await HansungInfoActions.gradesLoadingHandle(true);
        await HansungInfoActions.createHansungInfoGrades();
        await HansungInfoActions.getHansungInfo();

        let timeout = setInterval( async () => {
            if(this.props.hansunginfo.summaryGrades.ratedTotal==undefined){
                await HansungInfoActions.getHansungInfo();
            }
            else if(this.props.hansunginfo.summaryGrades.ratedTotal!=undefined){
                await HansungInfoActions.gradesLoadingHandle(false); await HansungInfoActions.gradesHandle(true); clearInterval(timeout);
            }
        }, 5000);
    };

    reCertification_Check = async () => {
        await HansungInfoActions.getHansungInfo();

        this.props.hansunginfo == null?
            this.props.navigation.navigate("Certification")
            :
            this.props.navigation.navigate("MyInfo")
    };

    // 학기별 세부 성적표 가져오기
    bySemesterView = () => {
        return (
            this.props.hansunginfo.summaryGrades.ratedTotal != 0?
                <FlatList data={this.props.hansunginfo.detailGrades} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) => {
                    return (
                        <GradesDetailScreen
                            semester={item.semester}
                            applyGrades={item['gradesSummary'].applyGrades}
                            acquisitionGrades={item['gradesSummary'].acquisitionGrades}
                            totalScore={item['gradesSummary'].totalScore}
                            averageScore={item['gradesSummary'].averageScore}
                            percentage={item['gradesSummary'].percentage}
                            gradedetail={item['gradesDetail']}
                            key={index}/>
                    )
                }} />
                :
                <Text   key={'text'}
                        style={{
                            height:widthPercentageToDP(13),
                            textAlign:'center',
                            fontSize: widthPercentageToDP(12),
                            marginTop: widthPercentageToDP(24),
                            color:'black',
                            fontFamily: fonts.nanumBarunGothicB}}>이전 학기 성적이 없습니다.</Text>
        )
    };

    certification_check = () => {
        return (
            <View style={{alignItems: 'center', marginTop: widthPercentageToDP(133)}}>
                <Text style={{fontSize: widthPercentageToDP(15), marginBottom: widthPercentageToDP(12.5), fontFamily: fonts.nanumBarunGothicB, color: '#646464', textAlign: 'center'}}>{`한성대학교를 인증해주세요!`}</Text>
                <Text style={{fontSize: widthPercentageToDP(13), color: '#9e9e9e', fontFamily: fonts.nanumBarunGothicB}}>인증을 통해 성적표를 확인할 수 있습니다.</Text>
                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', width: widthPercentageToDP(128), height: widthPercentageToDP(36), borderRadius: widthPercentageToDP(8), backgroundColor: '#24a0fa', marginTop: widthPercentageToDP(26.5)}} onPress={ async () => {
                    await this.reCertification_Check();
                }}>
                    <Text style={{fontSize: widthPercentageToDP(14), fontFamily: fonts.nanumBarunGothicB, color: '#ffffff', textAlign: 'center'}}>인증하러 가기!</Text>
                </TouchableOpacity>
            </View>
        )
    };

    // 인증 후 재실행시 성적표 정보 가져오기
    componentDidMount = async () => {
        let timeout = setInterval( async () => {
            if(this.props.hansunginfo == null) {
                clearInterval(timeout);
            }
            else if(this.props.hansunginfo!=null&&this.props.hansunginfo.summaryGrades.ratedTotal!=undefined &&this.props.hansunginfo.detailGrades!=undefined) {
                await HansungInfoActions.gradesHandle(true);
                await HansungInfoActions.professorTextHandle(true);
                clearInterval(timeout);
            }
        }, 700);
    }

    render() {
        return (
            <View style={styles.container}>
                <GradesModal
                    visible={this.state.refreshModal}
                    footerHandler={async () => {
                        this.setState({refreshModal: false});
                        await this.refreshBtn();
                    }}
                    closeHandler={() => this.setState({ refreshModal: false })}
                />
                <AbstractAccountInfoScreen move={this.navigateMyInfo()} selected={this.state.selected}/>

                {this.props.grades_loading == true ?
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                        <View style={{height: widthPercentageToDP(40), marginBottom: widthPercentageToDP(10)}}>
                            <UIActivityIndicator color={'grey'}/>
                        </View>
                        <Text style={{fontSize: widthPercentageToDP(12), textAlign: 'center', fontFamily: fonts.nanumBarunGothicB}}>{`성적표를 불러오는 중입니다.\n수 분 정도 소요될 수 있습니다.`}</Text>
                    </View>
                    :
                    this.props.grades_status == true ?
                        <ScrollView>
                            <ProgressView>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: widthPercentageToDP(321)}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                                            <Image style={{width: widthPercentageToDP(25), height: widthPercentageToDP(25)}} source={require("../../../assets/image/hansungInfo/apoint.png")}/>
                                        </View>
                                        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                                            <BTText>총 학점</BTText>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={ () => {this.setState({refreshModal: true})}}>
                                        <Image style={{width: widthPercentageToDP(36.3), height: widthPercentageToDP(36.3)}} source={require("../../../assets/image/hansungInfo/refresh.png")}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{marginTop: widthPercentageToDP(25)}}>
                                    <Progress.Bar
                                        progress={(this.props.hansunginfo.summaryGrades.acquisitionGrades*1)/(this.props.hansunginfo.hansungInfoId.substring(0,2)>15? 130:140)}
                                        width={ widthPercentageToDP(321)}
                                        height={ widthPercentageToDP(17)}
                                        color={'#24a0fa'}
                                        unfilledColor={'#ebebeb'}
                                        borderColor={'#f8f8f8'}
                                        borderRadius={ widthPercentageToDP(9)}/>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: widthPercentageToDP(10), width: widthPercentageToDP(321)}}>
                                        <Text style={{fontSize: widthPercentageToDP(15), fontFamily: fonts.nanumBarunGothicB, color: 'black'}}>{this.props.hansunginfo.summaryGrades.acquisitionGrades}</Text>
                                        <Text style={{fontSize: widthPercentageToDP(15), fontFamily: fonts.nanumBarunGothicB, color: 'black'}}>{this.props.hansunginfo.hansungInfoId.substring(0,2)>15?130:140}</Text>
                                    </View>
                                </View>
                            </ProgressView>
                            <View style={{width: widthPercentageToDP(375), height: widthPercentageToDP(7), backgroundColor: '#f8f8f8'}}/>
                            <DetailView style={{paddingBottom: widthPercentageToDP(31)}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Image style={{width: widthPercentageToDP(25), height: widthPercentageToDP(25)}} source={require("../../../assets/image/hansungInfo/grid.png")}/>
                                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                                        <BTText>내 성적</BTText>
                                    </View>
                                </View>
                                <View style={styles.mainPoint}>
                                    <View style={{width: widthPercentageToDP(56)}}>
                                        <SUBTText style={{textAlign: 'center',color: 'white', fontFamily: fonts.nanumBarunGothic}}>신청학점</SUBTText>
                                        <VALText style={{color: 'white'}}>{this.props.hansunginfo.summaryGrades.applyGrades}</VALText>
                                    </View>
                                    <View style={styles.devisionLine} />
                                    <View style={{width: widthPercentageToDP(56)}}>
                                        <SUBTText style={{textAlign: 'center',color: 'white', fontFamily: fonts.nanumBarunGothic}}>취득학점</SUBTText>
                                        <VALText style={{color: 'white'}}>{this.props.hansunginfo.summaryGrades.acquisitionGrades}</VALText>
                                    </View>
                                    <View style={styles.devisionLine} />
                                    <View style={{width: widthPercentageToDP(56)}}>
                                        <SUBTText style={{textAlign: 'center',color: 'white', fontFamily: fonts.nanumBarunGothic}}>평균총계</SUBTText>
                                        <VALText style={{color: 'white'}}>{this.props.hansunginfo.summaryGrades.ratedTotal}</VALText>
                                    </View>
                                    <View style={styles.devisionLine} />
                                    <View style={{width: widthPercentageToDP(56)}}>
                                        <SUBTText style={{textAlign: 'center',color: 'white', fontFamily: fonts.nanumBarunGothic}}>평균학점</SUBTText>
                                        <VALText style={{color: 'white'}}>{this.props.hansunginfo.summaryGrades.averageRating}</VALText>
                                    </View>
                                    <View style={styles.devisionLine} />
                                    <View>
                                        <SUBTText style={{color: 'white', fontFamily: fonts.nanumBarunGothic}}>백분위</SUBTText>
                                        <VALText style={{color: 'white'}}>{this.props.hansunginfo.summaryGrades.percentile}</VALText>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', marginTop: widthPercentageToDP(18), paddingLeft: widthPercentageToDP(15)}}>
                                    <View style={styles.detailView}>
                                        <SUBTText style={{textAlign: 'center'}}>교필</SUBTText>
                                        <VALText style={styles.valTextChange}>{this.props.hansunginfo.summaryGrades.requiredAccomplishments}</VALText>
                                    </View>
                                    <View style={styles.detailView}>
                                        <SUBTText style={{textAlign: 'center'}}>토대</SUBTText>
                                        <VALText style={styles.valTextChange}>{this.props.hansunginfo.summaryGrades.foundationAccomplishments}</VALText>
                                    </View>
                                    <View style={styles.detailView}>
                                        <SUBTText style={{textAlign: 'center'}}>인재</SUBTText>
                                        <VALText style={styles.valTextChange}>{this.props.hansunginfo.summaryGrades.hansungHumanResources}</VALText>
                                    </View>
                                    <View style={styles.detailView}>
                                        <SUBTText style={{textAlign: 'center'}}>자율</SUBTText>
                                        <VALText style={styles.valTextChange}>{this.props.hansunginfo.summaryGrades.autonomy}</VALText>
                                    </View>
                                    <View style={styles.detailView}>
                                        <SUBTText style={{textAlign: 'center'}}>전공</SUBTText>
                                        <VALText style={styles.valTextChange}>{parseInt(this.props.hansunginfo.summaryGrades.requiredMajor) +  parseInt(this.props.hansunginfo.summaryGrades.optionalMajor) + parseInt( this.props.hansunginfo.summaryGrades.foundationMajor)}</VALText>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', marginTop: widthPercentageToDP(18), paddingLeft: widthPercentageToDP(15)}}>
                                    <View style={styles.detailView}>
                                        <SUBTText style={{textAlign: 'center'}}>소양</SUBTText>
                                        <VALText style={styles.valTextChange}>{this.props.hansunginfo.summaryGrades.knowledge}</VALText>
                                    </View>
                                    <View style={styles.detailView}>
                                        <SUBTText style={{textAlign: 'center'}}>핵심</SUBTText>
                                        <VALText style={styles.valTextChange}>{this.props.hansunginfo.summaryGrades.core}</VALText>
                                    </View>
                                    <View style={styles.detailView}>
                                        <SUBTText style={{textAlign: 'center'}}>일선</SUBTText>
                                        <VALText style={styles.valTextChange}>{this.props.hansunginfo.summaryGrades.generalSelection}</VALText>
                                    </View>
                                    <View style={styles.detailView}>
                                        <SUBTText style={{textAlign: 'center'}}>교직</SUBTText>
                                        <VALText style={styles.valTextChange}>{this.props.hansunginfo.summaryGrades.requiredTeaching}</VALText>
                                    </View>
                                    <View style={styles.detailView}>
                                        <SUBTText style={{textAlign: 'center'}}>부전</SUBTText>
                                        <VALText style={styles.valTextChange}>{parseInt(this.props.hansunginfo.summaryGrades.requiredMinor) + parseInt(this.props.hansunginfo.summaryGrades.optionalMinor) + parseInt(this.props.hansunginfo.summaryGrades.foundationMinor)}</VALText>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', marginTop: widthPercentageToDP(18), paddingLeft: widthPercentageToDP(15)}}>
                                    <View style={styles.detailView}>
                                        <SUBTText style={{textAlign: 'center'}}>복전</SUBTText>
                                        <VALText style={styles.valTextChange}>{parseInt(this.props.hansunginfo.summaryGrades.requiredDoubleMajor)+ parseInt(this.props.hansunginfo.summaryGrades.optionalDoubleMajor) + parseInt(this.props.hansunginfo.summaryGrades.foundationDoubleMajor)}</VALText>
                                    </View>
                                    <View style={styles.detailView}>
                                        <SUBTText style={{textAlign: 'center'}}>연전</SUBTText>
                                        <VALText style={styles.valTextChange}>{parseInt(this.props.hansunginfo.summaryGrades.requiredConnectedMajor) + parseInt(this.props.hansunginfo.summaryGrades.optionalConnectedMajor) + parseInt(this.props.hansunginfo.summaryGrades.foundationConnectedMajor)}</VALText>
                                    </View>
                                </View>
                            </DetailView>
                            <View style={{width: widthPercentageToDP(375), height: widthPercentageToDP(7), backgroundColor: '#f8f8f8'}}/>
                            <DetailView>
                                <View style={{marginTop: widthPercentageToDP(18)}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Image style={{width: widthPercentageToDP(25), height: widthPercentageToDP(25)}} source={require("../../../assets/image/hansungInfo/grid.png")}/>
                                        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                                            <BTText>이전 학기 성적</BTText>
                                        </View>
                                    </View>
                                    {this.bySemesterView()}
                                </View>
                            </DetailView>
                        </ScrollView>
                        :
                        this.props.hansunginfo == null || this.props.hansunginfo.status != "SUCCESS"  ?
                            this.certification_check()
                            :
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', width: widthPercentageToDP(128), height: widthPercentageToDP(36), borderRadius: widthPercentageToDP(8), backgroundColor: '#24a0fa', marginTop: widthPercentageToDP(26.5)}} onPress={ async () => {
                                    await this.grades_check();
                                }}>
                                    <Text style={{fontSize: widthPercentageToDP(14), fontFamily: fonts.nanumBarunGothicB, color: '#ffffff', textAlign: 'center'}}>불러오기</Text>
                                </TouchableOpacity>
                            </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f8f8f8'
    },
    mainPoint: {
        flexDirection: 'row',
        marginTop: widthPercentageToDP(19),
        paddingTop: widthPercentageToDP(18),
        paddingLeft: widthPercentageToDP(8),
        width: '100%',
        height: widthPercentageToDP(72),
        borderRadius: widthPercentageToDP(8),
        backgroundColor: '#24a0fa'
    },
    devisionLine: {
        width: widthPercentageToDP(1),
        marginTop: widthPercentageToDP(7),
        marginBottom: widthPercentageToDP(25),
        // 간격 조정 필요
        marginLeft: widthPercentageToDP(6.5),
        marginRight: widthPercentageToDP(6.5),
        backgroundColor: 'white',
    },
    detailView: {
        width: widthPercentageToDP(38),
        height: widthPercentageToDP(48),
        marginRight: widthPercentageToDP(31),
    },
    valTextChange: {
        fontSize: widthPercentageToDP(14),
        fontFamily: fonts.nanumBarunGothic,
        color: 'black'
    },
    devisionLine2: {
        height: widthPercentageToDP(1),
        marginTop: widthPercentageToDP(15.5),
        marginBottom: widthPercentageToDP(15.5),
        backgroundColor: '#f8f8f8'
    }
});

export default connect((state) => ({
    hansunginfo: state.hansung.hansunginfo,
    grades_status: state.hansung.grades_status,
    grades_loading: state.hansung.grades_loading,
    professor_text: state.hansung.professor_text,
}))(GradesScreen);