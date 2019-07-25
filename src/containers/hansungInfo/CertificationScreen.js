import React from 'react';
import {KeyboardAvoidingView, TextInput, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, Platform, View, Text, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP} from "../../utils/util";
import fonts from "../../configs/fonts";
import { connect } from "react-redux";
import { HansungInfoActions } from "../../store/actionCreator";
import {UIActivityIndicator} from 'react-native-indicators';

class CertificationScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hansung_id: '',
            hansung_pass: '',

            loading: false,
        }

        this.props.hansunginfo != null && this.props.hansunginfo.status == 'UNVERIFIED' ?
            this.props.navigation.goBack(null)
            :
            null
    }

    navigationBack = () => {
        this.props.navigation.goBack(null);
    };

    certification_Check = async () => {
        await HansungInfoActions.getHansungInfo();

        let timeout = setInterval(async () => {
            if(this.props.hansunginfo != null && this.props.hansunginfo.status == 'UNVERIFIED') {
                await HansungInfoActions.getHansungInfo();
            } else if(this.props.hansunginfo.status == 'SUCCESS') {

                await HansungInfoActions.gradesLoadingHandle(true);
                await HansungInfoActions.gradesValueLoadingHandle(true);
                await HansungInfoActions.nonSubjectPointLoadingHandle(true);
                await HansungInfoActions.nonSubjectPointValueLoadingHandle(true);

                await this.navigationBack();

                clearInterval(timeout);
            } else if(this.props.hansunginfo.status == 'FAIL') {
                // 마이 페이지에서 재인증 작업 예정
                this.setState({loading: false});
                this.props.navigation.navigate("MyInfo");
                clearInterval(timeout);
            }
        }, 5000);
    };

    renderSubmit = () => {
        if(this.state.hansung_id!=''&&this.state.hansung_pass!=''){
            return (
                <TouchableOpacity style={styles.submit} onPress={async()=>{
                    let hansunginfo = new Object();
                    hansunginfo.hansungInfoId = this.state.hansung_id;
                    hansunginfo.hansungInfoPw = this.state.hansung_pass;

                    this.setState({loading: true});

                    await HansungInfoActions.createHansungInfo(hansunginfo);

                    await this.certification_Check();
                }}>
                    <Text style={styles.submitText}>인증하기</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={styles.submitDisable}>
                    <Text style={styles.submitText}>인증하기</Text>
                </View>
            )
        }
    };

    render() {
        return (
            this.state.loading == false ?
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
                    <TouchableOpacity onPress={async () => {this.navigationBack()}} style={[{alignItems: 'flex-end', marginRight: widthPercentageToDP(20.9), marginTop: widthPercentageToDP(21.8)}]}>
                        <Image style={{width: widthPercentageToDP(28), height: widthPercentageToDP(28)}} source={require("../../../assets/image/hansungInfo/close.png")} />
                    </TouchableOpacity>
                    <SafeAreaView style={styles.container}>
                        <TouchableWithoutFeedback >
                            <View style={styles.inner}>
                                <View style={{ marginTop: widthPercentageToDP(76.9), marginBottom: widthPercentageToDP(53)}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{backgroundColor: '#24f7ff',marginLeft: widthPercentageToDP(51),fontSize: widthPercentageToDP(20), color: '#000000', textAlign: 'center', fontFamily: fonts.nanumBarunGothic}}>{'종합정보시스템'}</Text>
                                        <Text style={{fontSize: widthPercentageToDP(20), color: '#000000', fontFamily: fonts.nanumBarunGothic}}>을 통한</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontSize: widthPercentageToDP(20), color: '#000000', textAlign: 'center', fontFamily: fonts.nanumBarunGothic}}>인증입니다.</Text>
                                    </View>
                                </View>

                                <Text style={this.state.hansung_id != '' ? styles.hiddenText : [styles.emptyText]}>
                                    {this.state.hansung_id != '' ? '종합정보시스템 학번' : ''}
                                </Text>
                                <TextInput autoCapitalize={'none'}
                                           onChangeText={(hansung_id)=>{this.setState({hansung_id})}}
                                           value={this.state.hansung_id}
                                           style={this.state.hansung_id != '' ? styles.inputText : styles.notInputText}
                                           underlineColorAndroid='transparent'
                                           placeholderTextColor={'#9e9e9e'}
                                           placeholder={'종합정보시스템 학번'}
                                           selectionColor={'#24a0fa'}
                                           keyboardType={"number-pad"}
                                />

                                <Text style={this.state.hansung_pass != '' ? styles.hiddenText : styles.emptyText}>
                                    {this.state.hansung_pass != '' ? '종합정보시스템 비밀번호' : ''}
                                </Text>
                                <TextInput
                                    autoCapitalize={'none'}
                                    onChangeText={(hansung_pass)=>{this.setState({hansung_pass})}}
                                    value={this.state.hansung_pass}
                                    style={this.state.hansung_pass != '' ? styles.inputText : styles.notInputText}
                                    underlineColorAndroid="transparent"
                                    placeholder={'종합정보시스템 비밀번호'}
                                    placeholderTextColor={'#9e9e9e'}
                                    selectionColor={'#24a0fa'}
                                    secureTextEntry={true}
                                />

                                {this.renderSubmit()}
                                <View style={{ flex : 1 }} />
                            </View>
                        </TouchableWithoutFeedback>
                    </SafeAreaView>
                </KeyboardAvoidingView>
                :
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                    <View style={{height: widthPercentageToDP(40), marginBottom: widthPercentageToDP(10)}}>
                        <UIActivityIndicator color={'grey'}/>
                    </View>
                    <Text style={{fontSize: widthPercentageToDP(12), textAlign: 'center', fontFamily: fonts.nanumBarunGothicB}}>{`인증을 확인중입니다.\n잠시만 기다려주세요.`}</Text>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        marginLeft: widthPercentageToDP(43),
        marginRight: widthPercentageToDP(43),
        flex: 1,
        justifyContent: "flex-end",
    },
    inputText:{
        borderColor: '#24a0fa',
        marginBottom: widthPercentageToDP(31),
        borderBottomWidth: widthPercentageToDP(1),
        fontFamily: fonts.nanumBarunGothic
    },
    notInputText:{
        borderColor: '#9e9e9e',
        marginBottom: widthPercentageToDP(31),
        borderBottomWidth: widthPercentageToDP(1),
        fontFamily: fonts.nanumBarunGothic
    },
    hiddenText:{
        fontSize: widthPercentageToDP(12),
        color: '#000000',
        fontFamily: fonts.nanumBarunGothic
    },
    emptyText:{
        fontSize: widthPercentageToDP(12),
    },
    submitText: {
        color: 'white',
        fontSize: widthPercentageToDP(14),
        fontFamily: fonts.nanumBarunGothic
    },
    submitDisable: {
        backgroundColor: '#4a4a4a4d',
        justifyContent: 'center',
        alignItems: 'center',
        width: widthPercentageToDP(289),
        height: widthPercentageToDP(53),
        borderRadius: widthPercentageToDP(8),
        marginTop: widthPercentageToDP(5),
    },
    submit: {
        backgroundColor: '#24a0fa',
        justifyContent: 'center',
        alignItems: 'center',
        width: widthPercentageToDP(289),
        height: widthPercentageToDP(53),
        borderRadius: widthPercentageToDP(8),
        marginTop: widthPercentageToDP(5),
    }
});

export default connect((state) => ({
    hansunginfo: state.hansung.hansunginfo,
    nonSubjectPoint_status: state.hansung.nonSubjectPoint_status,
    nonSubjectPoint_loading: state.hansung.nonSubjectPoint_loading,
    nonSubjectPoint_value_loading: state.hansung.nonSubjectPoint_value_loading,
    grades_status: state.hansung.grades_status,
    grades_loading: state.hansung.grades_loading,
    grades_value_loading: state.hansung.grades_value_loading,
}))(CertificationScreen);