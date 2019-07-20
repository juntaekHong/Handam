import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AbstractAccountInfoScreen from "./AbstractAccountInfoScreen";
import {widthPercentageToDP} from "../../utils/util";
import fonts from "../../configs/fonts";
import {connect} from "react-redux";
import {UIActivityIndicator} from "react-native-indicators";
import {HansungInfoActions} from "../../store/actionCreator";

class GradesScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    navigateMyInfo = () => {
        return (
            this.props.navigation
        )
    };

    reCertification_Check = async () => {
        this.props.hansunginfo.status != 'FAIL' ?
            this.props.navigation.navigate("Certification")
            :
            this.props.navigation.navigate("MyInfo")
    };

    certification_check = () => {
        return (
            <View style={{alignItems: 'center', marginTop: widthPercentageToDP(133)}}>
                <Text style={{fontSize: widthPercentageToDP(15), marginBottom: widthPercentageToDP(12.5), fontFamily: fonts.nanumBarunGothicB, color: '#646464', textAlign: 'center'}}>{`한성대학교를 인증해주세요!`}</Text>
                <Text style={{fontSize: widthPercentageToDP(13), color: '#9e9e9e', fontFamily: fonts.nanumBarunGothic}}>인증을 통해 성적표를 확인할 수 있습니다.</Text>
                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', width: widthPercentageToDP(128), height: widthPercentageToDP(36), borderRadius: widthPercentageToDP(8), backgroundColor: '#24a0fa', marginTop: widthPercentageToDP(26.5)}} onPress={ async () => {
                    await this.reCertification_Check();
                }}>
                    <Text style={{fontSize: widthPercentageToDP(14), fontFamily: fonts.nanumBarunGothicB, color: '#ffffff', textAlign: 'center'}}>인증하러 가기!</Text>
                </TouchableOpacity>d
            </View>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <AbstractAccountInfoScreen move={this.navigateMyInfo()}/>

                {this.props.grades_loading == true ?
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                        <View style={{height: widthPercentageToDP(40), marginBottom: widthPercentageToDP(10)}}>
                            <UIActivityIndicator color={'grey'}/>
                        </View>
                        <Text style={{fontSize: widthPercentageToDP(12), textAlign: 'center', fontFamily: fonts.nanumBarunGothicB}}>{`성적표를 불러오는 중입니다.\n잠시만 기다려주세요.`}</Text>
                    </View>
                    :
                    // 작업 예정
                    this.props.grades_status == false ?
                        <View>
                            {/*작업 예정*/}
                            <Text>성적표 추후 구현 예정</Text>
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
    grades_status: state.hansung.grades_status,
    grades_loading: state.hansung.grades_loading,
}))(GradesScreen);