import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Platform, ScrollView, SafeAreaView} from 'react-native';
import {widthPercentageToDP} from "../../utils/util";
import {SECText, ACCOUNTINFOText} from "../../components/myInfo/Text";
import {AccountView} from "../../components/myInfo/View";
import {timeFormat} from "../../utils/util";
import {connect} from "react-redux";
import {WheelPicker} from "../../components/signup/Modal";
import {CommonActions, MyInfoActions, SignUpActions} from "../../store/actionCreator";

class AccountInfoScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            majorModal: false,
            doublemajorModal: false,
            minorModal: false,
            connectedMajorModal:false,
            admissionYearModal: false,
        }

        CommonActions.getTrack();
        CommonActions.getAdmissionYear();
        CommonActions.getAppVersion();
    }

    navigategoBack = () => {
        this.props.navigation.goBack();
    };

    navigateChangePass = () => {
        this.props.navigation.navigate("ChangePass");
    };

    // render 전에 major_list, 앱 버전 불러오기
    // componentWillMount = async () => {
    //     await CommonActions.getTrack();
    //     await CommonActions.getAdmissionYear();
    //     await CommonActions.getAppVersion();
    // };

    // 전공(1트랙) 항목 값 변경
    major_value_change = async (major) => {
        await MyInfoActions.changeMajorHandle(major);

        let timeout = setInterval( async () => {
            if(this.props.changeMajor != major) {
                await MyInfoActions.changeMajorHandle(major);
                await SignUpActions.majorAction(major);
            } else {
                clearInterval(timeout);
            }
        }, 300);
        this.setState({majorModal: false});
    };

    // 복수 전공(2트랙) 항목 값 변경
    doublemajor_value_change = async (doublemajor) => {
        await MyInfoActions.changedoubleMajorHandle(doublemajor);

        let timeout = setInterval( async () => {
            if(this.props.changeDoubleMajor != doublemajor) {
                await MyInfoActions.changedoubleMajorHandle(doublemajor);
                await SignUpActions.doubleMajorAction(doublemajor);
            } else {
                clearInterval(timeout);
            }
        }, 300);

        this.setState({doublemajorModal: false});
    }

    // 부전공 항목 값 변경
    minor_value_change = async (minor) => {
        await MyInfoActions.changeMinorHandle(minor);

        let timeout = setInterval( async () => {
            if(this.props.changeMinor != minor) {
                await MyInfoActions.changeMinorHandle(minor);
                await SignUpActions.minorAction(minor);
            } else {
                clearInterval(timeout);
            }
        }, 300);

        this.setState({minorModal: false});
    };

    // 연계전공 항목 값 변경
    connectedMajor_value_change = async (connectedMajor) => {
        await MyInfoActions.changeConnectedMajorHandle(connectedMajor);

        let timeout = setInterval( async () => {
            if(this.props.changeConnectedMajor != connectedMajor) {
                await MyInfoActions.changeConnectedMajorHandle(connectedMajor);
                await SignUpActions.connectedMajorAction(connectedMajor);
            } else {
                clearInterval(timeout);
            }
        }, 300);

        this.setState({connectedMajorModal: false});
    };

    // 입학년도 항목 값 변경
    admissionYear_value_change = async (admissionYear) => {
        await MyInfoActions.changeAdmissionYearHandle(admissionYear);

        let timeout = setInterval( async () => {
            if(this.props.changeAdmissionYear != admissionYear) {
                await MyInfoActions.changeAdmissionYearHandle(admissionYear);
                await SignUpActions.admissionYearAction(admissionYear);
            } else {
                clearInterval(timeout);
            }
        }, 300);

        this.setState({admissionYearModal: false});
    };

    lengthCheck = (aboutLength) => {
        if (aboutLength == null) return "해당없음";


        let charactors = aboutLength.length > 8 ? aboutLength.slice(0,8) + ".." : aboutLength;

        return charactors;
    };

    render() {
        return (
            <SafeAreaView>
                <WheelPicker
                    visible={this.state.majorModal}
                    data={this.props.major_list}
                    value={this.props.changeMajor == null ? this.props.major : this.props.changeMajor}
                    closeHandler={() => {this.setState({majorModal: false})}}
                    footerHandler={this.major_value_change}
                />
                <WheelPicker
                    visible={this.state.doublemajorModal}
                    data={this.props.track_list}
                    value={this.props.changeDoubleMajor == null ? this.props.doubleMajor : this.props.changeDoubleMajor}
                    closeHandler={() => {this.setState({doublemajorModal: false})}}
                    footerHandler={this.doublemajor_value_change}
                />
                <WheelPicker
                    visible={this.state.minorModal}
                    data={this.props.track_list}
                    value={this.props.changeMinor == null ? this.props.minor : this.props.changeMinor}
                    closeHandler={() => {this.setState({minorModal: false})}}
                    footerHandler={this.minor_value_change}
                />
                <WheelPicker
                    visible={this.state.connectedMajorModal}
                    data={this.props.track_list}
                    value={this.props.changeConnectedMajor == null ? this.props.connectedMajor : this.props.changeConnectedMajor }
                    closeHandler={() => {this.setState({connectedMajorModal: false})}}
                    footerHandler={this.connectedMajor_value_change}
                />
                <WheelPicker
                    visible={this.state.admissionYearModal}
                    data={this.props.admission_list}
                    value={this.props.changeAdmissionYear == null ? this.props.admissionYear : this.props.changeAdmissionYear}
                    closeHandler={() => {this.setState({admissionYearModal: false})}}
                    footerHandler={this.admissionYear_value_change}
                />
                <ScrollView>
                    <View style={{height: widthPercentageToDP(120.5), borderBottomWidth: widthPercentageToDP(0.5), borderBottomColor: '#888888'}}>
                        <TouchableOpacity style={{alignItems: 'flex-end', marginTop: widthPercentageToDP(16), marginRight: widthPercentageToDP(14)}}
                                          onPress={ () => {this.navigategoBack()}}>
                            <Image width={widthPercentageToDP(28)} height={widthPercentageToDP(28)} source={require("../../../assets/image/myInfo/close.png")}/>
                        </TouchableOpacity>
                        <View style={{alignItems: 'flex-start', marginTop: widthPercentageToDP(45), marginLeft: widthPercentageToDP(25)}}>
                            <SECText>계정정보</SECText>
                        </View>
                    </View>

                    <AccountView>
                        <ACCOUNTINFOText>이메일</ACCOUNTINFOText>
                        <ACCOUNTINFOText style={{color: '#646464'}}>{this.props.userId}</ACCOUNTINFOText>
                    </AccountView>
                    <View style={styles.divisionLine}/>
                    <AccountView>
                        <ACCOUNTINFOText>닉네임</ACCOUNTINFOText>
                        <ACCOUNTINFOText style={{color: '#646464'}}>{this.props.userNickName}</ACCOUNTINFOText>
                    </AccountView>
                    <View style={styles.divisionLine}/>
                    <AccountView>
                        <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => {this.navigateChangePass()}}>
                            <ACCOUNTINFOText>비밀번호 변경</ACCOUNTINFOText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.navigateChangePass()}}>
                            <Image width={widthPercentageToDP(28)} height={widthPercentageToDP(28)} source={require("../../../assets/image/myInfo/grayarrow.png")}/>
                        </TouchableOpacity>
                    </AccountView>
                    <View style={styles.divisionLine}/>
                    <AccountView>
                        <ACCOUNTINFOText>앱 버전</ACCOUNTINFOText>
                        <ACCOUNTINFOText style={{color: '#646464'}}>{Platform.OS === 'ios' ? this.props.appVersion.ios : this.props.appVersion.android}({timeFormat(this.props.appVersion.updatedAt, 'YYYYMMDD')})</ACCOUNTINFOText>
                    </AccountView>
                    <View style={{marginVertical: widthPercentageToDP(18), height: widthPercentageToDP(9), backgroundColor: '#f8f8f8'}}/>
                    <AccountView>
                        <View style={{justifyContent: 'center'}}>
                            <ACCOUNTINFOText>전공(제 1트랙)</ACCOUNTINFOText>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => {this.setState({majorModal: true})}}>
                                <ACCOUNTINFOText style={{color: '#646464'}}>{this.props.changeMajor != null ? this.lengthCheck(this.props.changeMajor) : this.lengthCheck(this.props.major)}</ACCOUNTINFOText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this.setState({majorModal: true})}}>
                                <Image width={widthPercentageToDP(28)} height={widthPercentageToDP(28)} source={require("../../../assets/image/myInfo/grayarrow.png")}/>
                            </TouchableOpacity>
                        </View>
                    </AccountView>
                    <View style={styles.divisionLine}/>
                    <AccountView>
                        <View style={{justifyContent: 'center'}}>
                            <ACCOUNTINFOText>복수전공(제 2트랙)</ACCOUNTINFOText>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => this.setState({doublemajorModal: true})}>
                                <ACCOUNTINFOText style={{color: '#646464'}}>{this.props.changeDoubleMajor != null ? this.lengthCheck(this.props.changeDoubleMajor) : this.lengthCheck(this.props.doubleMajor)}</ACCOUNTINFOText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({doublemajorModal: true})}>
                                <Image width={widthPercentageToDP(28)} height={widthPercentageToDP(28)} source={require("../../../assets/image/myInfo/grayarrow.png")}/>
                            </TouchableOpacity>
                        </View>
                    </AccountView>
                    <View style={styles.divisionLine}/>
                    <AccountView>
                        <View style={{justifyContent: 'center'}}>
                            <ACCOUNTINFOText>부전공</ACCOUNTINFOText>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => {this.setState({minorModal: true})}}>
                                <ACCOUNTINFOText style={{color: '#646464'}}>{this.props.changeMinor != null ? this.lengthCheck(this.props.changeMinor) : this.lengthCheck(this.props.minor)}</ACCOUNTINFOText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this.setState({minorModal: true})}}>
                                <Image width={widthPercentageToDP(28)} height={widthPercentageToDP(28)} source={require("../../../assets/image/myInfo/grayarrow.png")}/>
                            </TouchableOpacity>
                        </View>
                    </AccountView>
                    <View style={styles.divisionLine}/>
                    <AccountView>
                        <View style={{justifyContent: 'center'}}>
                            <ACCOUNTINFOText>연계전공</ACCOUNTINFOText>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => {this.setState({connectedMajorModal: true})}}>
                                <ACCOUNTINFOText style={{color: '#646464'}}>{this.props.changeConnectedMajor != null ? this.lengthCheck(this.props.changeConnectedMajor) : this.lengthCheck(this.props.connectedMajor)}</ACCOUNTINFOText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this.setState({connectedMajorModal: true})}}>
                                <Image width={widthPercentageToDP(28)} height={widthPercentageToDP(28)} source={require("../../../assets/image/myInfo/grayarrow.png")}/>
                            </TouchableOpacity>
                        </View>
                    </AccountView>
                    <View style={styles.divisionLine}/>
                    <AccountView style={{marginBottom: widthPercentageToDP(118)}}>
                        <View style={{justifyContent: 'center'}}>
                            <ACCOUNTINFOText>입학년도</ACCOUNTINFOText>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => {this.setState({admissionYearModal: true})}}>
                                <ACCOUNTINFOText style={{color: '#646464'}}>{this.props.changeAdmissionYear != null ? this.props.changeAdmissionYear : this.props.admissionYear}</ACCOUNTINFOText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this.setState({admissionYearModal: true})}}>
                                <Image width={widthPercentageToDP(28)} height={widthPercentageToDP(28)} source={require("../../../assets/image/myInfo/grayarrow.png")}/>
                            </TouchableOpacity>
                        </View>
                    </AccountView>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    divisionLine: {
        marginHorizontal: widthPercentageToDP(29),
        marginTop: widthPercentageToDP(11.5),
        height: widthPercentageToDP(1),
        backgroundColor: '#f8f8f8'
    }
});

export default connect(state => ({
    userNickName: state.signin.user.userNickName,
    userId: state.signin.user.userId,
    appVersion: state.common.appVersion,

    major_list: state.common.major_list,
    major: state.signin.user.major,
    changeMajor: state.myInfo.userMajor,

    track_list: state.common.track_list,
    doubleMajor: state.signin.user.doubleMajor,
    changeDoubleMajor: state.myInfo.userDoubleMajor,

    minor: state.signin.user.minor,
    changeMinor: state.myInfo.userMinor,

    connectedMajor: state.signin.user.connectedMajor,
    changeConnectedMajor: state.myInfo.userConnectedMajor,

    admission_list: state.common.admission_list,
    admissionYear: state.signin.user.admissionYear,
    changeAdmissionYear: state.myInfo.userAdmissionYear,
}))(AccountInfoScreen);