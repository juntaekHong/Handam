import React from 'react';
import {ScrollView, Image, View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import { widthPercentageToDP} from "../../utils/util";
import { connect } from "react-redux";
import Hyperlink from 'react-native-hyperlink';
import fonts from '../../configs/fonts';
import { HansungInfoActions } from "../../store/actionCreator";
import { ProgressView, DetailView, PointListItem } from "../../components/hansungInfo/View";
import { BTText, SUBTText, VALText } from "../../components/hansungInfo/Text";
import AbstractAccountInfoScreen from "./AbstractAccountInfo";
import {UIActivityIndicator} from "react-native-indicators";
import * as Progress from 'react-native-progress';
import {NonSubjectPointModal} from "../../components/hansungInfo/Modal";

class HansungPoint extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            refreshModal: false,
        }

        this.props.hansunginfo!=null&&this.props.hansunginfo.nonSubjectPoint.semester!=undefined&&this.props.hansunginfo.nonSubjectPoint.semester.semester!=undefined?
            HansungInfoActions.nonSubjectPointHandle(true)
            :
            null
    }

    navigateMyInfo = () => {
        return (
            this.props.navigation
        )
    };

    nonSubjectPoint_check = async () => {
        await HansungInfoActions.nonSubjectPointLoadingHandle(true);
        await HansungInfoActions.createHansungInfoNonSubjectPoint();
        await HansungInfoActions.getHansungInfo();

        let timeout = setInterval(async ()=>{
            if(this.props.hansunginfo!=null && this.props.hansunginfo.nonSubjectPoint.semester == undefined || this.props.hansunginfo.nonSubjectPoint.semester.semester == undefined){
                await HansungInfoActions.getHansungInfo();
            }
            else if(this.props.hansunginfo!=null&&this.props.hansunginfo.nonSubjectPoint.semester.semester == '0'){
                await HansungInfoActions.nonSubjectPointLoadingHandle(false); clearInterval(timeout);
            }
            else if(this.props.hansunginfo!=null&&this.props.hansunginfo.nonSubjectPoint.semester.semester != '0'){
                await HansungInfoActions.nonSubjectPointLoadingHandle(false);
                await HansungInfoActions.nonSubjectPointHandle(true);

                clearInterval(timeout);
            }
        } , 5000);
    };

    reCertification_Check = async () => {
        await HansungInfoActions.getHansungInfo();

        this.props.hansunginfo == null?
            this.props.navigation.navigate("Certification")
            :
            this.props.navigation.navigate("MyInfo")
    };

    certification_check = () => {
        return (
            <View style={{alignItems: 'center', marginTop: widthPercentageToDP(133)}}>
                <Text style={{fontSize: widthPercentageToDP(15), marginBottom: widthPercentageToDP(12.5), lineHeight: widthPercentageToDP(20), fontFamily: fonts.nanumBarunGothicB, color: '#646464', textAlign: 'center'}}>{`한성 e-포트폴리오(HOPE)를 통해\n개인정보 동의를 해야 불러올 수 있습니다.`}</Text>
                <Hyperlink linkDefault={true} linkStyle={{color:'#2980b9'}}>
                    <Text style={{fontSize: widthPercentageToDP(13), fontFamily: fonts.nanumBarunGothic, color: '#24a0fa'}}>https://hope.hansung.ac.kr/</Text>
                </Hyperlink>
                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', width: widthPercentageToDP(128), height: widthPercentageToDP(36), borderRadius: widthPercentageToDP(8), backgroundColor: '#24a0fa', marginTop: widthPercentageToDP(26.5)}} onPress={ async () => {
                    await this.reCertification_Check();
                }}>
                    <Text style={{fontSize: widthPercentageToDP(14), fontFamily: fonts.nanumBarunGothicB, color: '#ffffff', textAlign: 'center'}}>인증하러 가기!</Text>
                </TouchableOpacity>
            </View>
        )
    };

    refreshBtn = async () => {
        await HansungInfoActions.nonSubjectPointLoadingHandle(true);
        await HansungInfoActions.createHansungInfoNonSubjectPoint();
        await HansungInfoActions.getHansungInfo();

        let timeout = setInterval(async ()=>{
            if(this.props.hansunginfo!=null && this.props.hansunginfo.nonSubjectPoint.semester == undefined || this.props.hansunginfo.nonSubjectPoint.semester.semester == undefined){
                await HansungInfoActions.getHansungInfo();
            }
            else if(this.props.hansunginfo!=null&&this.props.hansunginfo.nonSubjectPoint.semester.semester == '0'){
                await HansungInfoActions.nonSubjectPointLoadingHandle(false); clearInterval(timeout);
            }
            else if(this.props.hansunginfo!=null&&this.props.hansunginfo.nonSubjectPoint.semester.semester != '0'){
                await HansungInfoActions.nonSubjectPointLoadingHandle(false);
                await HansungInfoActions.nonSubjectPointHandle(true);

                clearInterval(timeout);
            }
        } , 5000);
    };

    render() {
        return (
            <View style={styles.container}>
                <NonSubjectPointModal
                    visible={this.state.refreshModal}
                    footerHandler={async () => {
                        this.setState({refreshModal: false});
                        await this.refreshBtn();
                    }}
                    closeHandler={() => this.setState({ refreshModal: false })}
                />
                <ScrollView style={this.props.nonSubjectPoint_loading == true ? {backgroundColor: 'white'} : null}>
                    <AbstractAccountInfoScreen move={this.navigateMyInfo()}/>

                    {this.props.nonSubjectPoint_loading == true ?
                        <View style={{flex:1, marginTop: widthPercentageToDP(151), alignItems: 'center', backgroundColor: 'white'}}>
                            <View style={{height: widthPercentageToDP(40), marginBottom: widthPercentageToDP(10)}}>
                                <UIActivityIndicator color={'grey'}/>
                            </View>
                            <Text style={{fontSize: widthPercentageToDP(12), textAlign: 'center', fontFamily: fonts.nanumBarunGothicB}}>{`비교과포인트를 불러오는 중입니다.\n수 분 정도 소요될 수 있습니다.`}</Text>
                        </View>
                        :
                        this.props.nonSubjectPoint_status == true ?
                            <View style={{flex:1}}>
                                <ProgressView>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: widthPercentageToDP(321)}}>
                                        <View style={{flexDirection: 'row'}}>
                                            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                                                <BTText>내 비교과 포인트</BTText>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={ () => {this.setState({refreshModal: true})}}>
                                            <Image style={{width: widthPercentageToDP(50), height: widthPercentageToDP(50)}} source={require("../../../assets/image/hansungInfo/refresh.png")}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{marginTop: widthPercentageToDP(10)}}>
                                        <Progress.Bar
                                            progress={(this.props.hansunginfo.nonSubjectPoint.myTotalPoint*1)/800}
                                            width={ widthPercentageToDP(321)}
                                            height={ widthPercentageToDP(17)}
                                            color={'#24a0fa'}
                                            unfilledColor={'#ebebeb'}
                                            borderColor={'#f8f8f8'}
                                            borderRadius={ widthPercentageToDP(9)}/>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: widthPercentageToDP(10), width: widthPercentageToDP(321)}}>
                                            <Text style={{fontSize: widthPercentageToDP(15), fontFamily: fonts.nanumBarunGothicB, color: 'black'}}>{this.props.hansunginfo.nonSubjectPoint.myTotalPoint}</Text>
                                            <Text style={{fontSize: widthPercentageToDP(15), fontFamily: fonts.nanumBarunGothicB, color: 'black'}}>800</Text>
                                        </View>
                                    </View>
                                </ProgressView>
                                <View style={{width: widthPercentageToDP(375), height: widthPercentageToDP(7), backgroundColor: '#f8f8f8'}}/>
                                <DetailView style={{paddingHorizontal:widthPercentageToDP(20)}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{flexDirection: 'column', justifyContent: 'center', marginTop: widthPercentageToDP(20.6)}}>
                                            <BTText>주요 통계치</BTText>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', marginTop: widthPercentageToDP(17), marginBottom: widthPercentageToDP(15.5)}}>
                                        <View style={{flexDirection: 'column', marginLeft: widthPercentageToDP(6)}}>
                                            <SUBTText>신청가능 목록</SUBTText>
                                            <VALText>{this.props.hansunginfo.nonSubjectPoint.applyAvailableList}</VALText>
                                        </View>
                                        <View style={{flexDirection: 'column', marginLeft: widthPercentageToDP(27)}}>
                                            <SUBTText>인증대기</SUBTText>
                                            <VALText>{this.props.hansunginfo.nonSubjectPoint.waitingCertification}</VALText>
                                        </View>
                                        <View style={{flexDirection: 'column', marginLeft: widthPercentageToDP(27)}}>
                                            <SUBTText>인증완료</SUBTText>
                                            <VALText>{this.props.hansunginfo.nonSubjectPoint.completedCertification}</VALText>
                                        </View>
                                        <View style={{flexDirection: 'column', marginLeft: widthPercentageToDP(27)}}>
                                            <SUBTText>인증반려</SUBTText>
                                            <VALText>{this.props.hansunginfo.nonSubjectPoint.declinedCertification}</VALText>
                                        </View>
                                    </View>
                                    <View style={styles.devisionLine}/>
                                    <View style={{flexDirection: 'row', paddingHorizontal: widthPercentageToDP(12), marginBottom: widthPercentageToDP(16)}}>
                                        <View>
                                            <SUBTText>다음학기 이월 예정 포인트</SUBTText>
                                            <VALText style={{fontSize: widthPercentageToDP(14), color: 'black', fontFamily: fonts.nanumBarunGothic}}>{this.props.hansunginfo.nonSubjectPoint.carryOverPoint}</VALText>
                                        </View>
                                        <View style={{marginLeft: widthPercentageToDP(38)}}>
                                            <SUBTText>{`${this.props.hansunginfo.nonSubjectPoint.semester.semester}학기 포인트`}</SUBTText>
                                            <VALText style={{fontSize: widthPercentageToDP(14), color: 'black', fontFamily: fonts.nanumBarunGothic}}>{this.props.hansunginfo.nonSubjectPoint.semester.semesterPoint}</VALText>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingHorizontal: widthPercentageToDP(14)}}>
                                        <View>
                                            <SUBTText>학과 평균</SUBTText>
                                            <VALText style={{fontSize: widthPercentageToDP(14), color: 'black', fontFamily: fonts.nanumBarunGothic}}>{this.props.hansunginfo.nonSubjectPoint.departmentAverage}</VALText>
                                        </View>
                                        <View style={{marginLeft: widthPercentageToDP(25)}}>
                                            <SUBTText>학과 최대</SUBTText>
                                            <VALText style={{fontSize: widthPercentageToDP(14), color: 'black', fontFamily: fonts.nanumBarunGothic}}>{this.props.hansunginfo.nonSubjectPoint.departmentMaximum}</VALText>
                                        </View>
                                        <View style={{marginLeft: widthPercentageToDP(25)}}>
                                            <SUBTText>학년 평균</SUBTText>
                                            <VALText style={{fontSize: widthPercentageToDP(14), color: 'black', fontFamily: fonts.nanumBarunGothic}}>{this.props.hansunginfo.nonSubjectPoint.gradeAverage}</VALText>
                                        </View>
                                        <View style={{marginLeft: widthPercentageToDP(25)}}>
                                            <SUBTText>학년 최대</SUBTText>
                                            <VALText style={{fontSize: widthPercentageToDP(14), color: 'black', fontFamily: fonts.nanumBarunGothic}}>{this.props.hansunginfo.nonSubjectPoint.gradeMaximum}</VALText>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', marginTop: widthPercentageToDP(57), marginBottom: widthPercentageToDP(29)}}>
                                        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                                            <BTText>세부 통계치</BTText>
                                        </View>
                                    </View>
                                </DetailView>
                                <DetailView style={{paddingTop: widthPercentageToDP(0)}}>
                                    {
                                        this.props.hansunginfo.nonSubjectPointDetail == null ?
                                            <View style={{height: widthPercentageToDP(300), alignItems: 'center', justifyContent: 'center'}}>
                                                <Image width={widthPercentageToDP(55)} height={widthPercentageToDP(55)} source={require("../../../assets/image/hansungInfo/certificationimage_1.png")}/>
                                                <Text style={{fontSize: widthPercentageToDP(15), marginBottom: widthPercentageToDP(7.5), fontFamily: fonts.nanumBarunGothicB, color: '#646464', textAlign: 'center'}}>{`새로고침을 해주세요!`}</Text>
                                                <Text style={{fontSize: widthPercentageToDP(13), color: '#9e9e9e', fontFamily: fonts.nanumBarunGothic}}>새로고침을 통해 세부 통계치를 확인하세요!</Text>
                                            </View>
                                            :
                                            this.props.hansunginfo.nonSubjectPointDetail == undefined ?
                                                <View style={{height: widthPercentageToDP(300), alignItems: 'center', justifyContent: 'center'}}>
                                                    <Image width={widthPercentageToDP(73)} height={widthPercentageToDP(76)} source={require("../../../assets/image/hansungInfo/certificationimage_2.png")}/>
                                                    <Text style={{fontSize: widthPercentageToDP(15), fontFamily: fonts.nanumBarunGothicB, color: '#646464', textAlign: 'center'}}>{`세부통계치가 없습니다!`}</Text>
                                                </View>
                                                :
                                                <FlatList data={this.props.hansunginfo.nonSubjectPointDetail} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) => {
                                                    return (
                                                        <PointListItem data={item} length={this.props.hansunginfo.nonSubjectPointDetail.length} index={index} />
                                                    )
                                                }}
                                                />
                                    }
                                </DetailView>
                            </View>
                            :
                            this.props.hansunginfo == null || this.props.hansunginfo.status != "SUCCESS" ?
                                this.certification_check()
                                :
                                <View style={{flex: 1, alignItems: 'center', marginTop: widthPercentageToDP(151)}}>
                                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', width: widthPercentageToDP(128), height: widthPercentageToDP(36), borderRadius: widthPercentageToDP(8), backgroundColor: '#24a0fa', marginTop: widthPercentageToDP(26.5)}} onPress={ async () => {
                                        await this.nonSubjectPoint_check();
                                    }}>
                                        <Text style={{fontSize: widthPercentageToDP(14), fontFamily: fonts.nanumBarunGothicB, color: '#ffffff', textAlign: 'center'}}>불러오기</Text>
                                    </TouchableOpacity>
                                </View>
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f8f8f8'
    },
    devisionLine: {
        height: widthPercentageToDP(1),
        marginBottom: widthPercentageToDP(15.5),
        backgroundColor: '#f8f8f8'
    }
});

export default connect((state) => ({
    hansunginfo: state.hansung.hansunginfo,
    nonSubjectPoint_status: state.hansung.nonSubjectPoint_status,
    nonSubjectPoint_loading: state.hansung.nonSubjectPoint_loading,
    grades_status: state.hansung.grades_status,
}))(HansungPoint);