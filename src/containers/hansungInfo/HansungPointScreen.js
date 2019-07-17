import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { widthPercentageToDP} from "../../utils/util";
import { connect } from "react-redux";
import Hyperlink from 'react-native-hyperlink';
import fonts from '../../configs/fonts';
// import { HansungInfoActions } from "../../store/actionCreator";
import AbstractAccountInfoScreen from "./AbstractAccountInfoScreen";
import {UIActivityIndicator} from "react-native-indicators";

class HansungPointScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }


    }

    certification_check = () => {
        return (
            <View style={{alignItems: 'center', marginTop: widthPercentageToDP(133)}}>
                <Text style={{fontSize: widthPercentageToDP(15), marginBottom: widthPercentageToDP(12.5), fontFamily: fonts.nanumBarunGothicB, color: '#646464', textAlign: 'center'}}>{`한성 e-포트폴리오(HOPE)를 통해\n개인정보 동의를 해야 불러올 수 있습니다.`}</Text>
                <Hyperlink linkDefault={true} linkStyle={{color:'#2980b9'}}>
                    <Text style={{fontSize: widthPercentageToDP(13), fontFamily: fonts.nanumBarunGothic, color: '#24a0fa'}}>https://hope.hansung.ac.kr/</Text>
                </Hyperlink>
                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', width: widthPercentageToDP(128), height: widthPercentageToDP(36), borderRadius: widthPercentageToDP(8), backgroundColor: '#24a0fa', marginTop: widthPercentageToDP(26.5)}} onPress={ () => {
                    this.props.navigation.navigate("Certification");
                }}>
                    <Text style={{fontSize: widthPercentageToDP(14), fontFamily: fonts.nanumBarunGothic, color: '#ffffff', textAlign: 'center'}}>인증하러 가기!</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <AbstractAccountInfoScreen />

                {this.props.nonSubjectPoint_status == true ?
                    <View>
                        {/*작업 예정*/}
                        <Text>인증후 비교과</Text>
                    </View>
                    :
                    this.props.nonSubjectPoint_loading == true ?
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                            <View style={{height: widthPercentageToDP(40), marginBottom: widthPercentageToDP(10)}}>
                                <UIActivityIndicator color={'grey'}/>
                            </View>
                            <Text style={{fontSize: widthPercentageToDP(12), textAlign: 'center', fontFamily: fonts.nanumBarunGothicB}}>{`비교과포인트를 불러오는 중입니다.\n잠시만 기다려주세요.`}</Text>
                        </View>
                        :
                        this.certification_check()
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f8f8f8'
    }
});

export default connect((state) => ({
    hansunginfo: state.hansung.hansunginfo,
    nonSubjectPoint_status: state.hansung.nonSubjectPoint_status,
    nonSubjectPoint_loading: state.hansung.nonSubjectPoint_loading,
}))(HansungPointScreen);