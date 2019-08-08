import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {widthPercentageToDP} from "../../utils/util";
import fonts from "../../configs/fonts";
import React from "react";
import {HansungInfoActions} from "../../store/actionCreator";
import {connect} from "react-redux";

class AbstractAccountInfoScreen extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.member}>
                <View style={{marginTop: widthPercentageToDP(35), marginLeft: widthPercentageToDP(26), flexDirection: 'row'}}>
                    <View>
                        <Image style={{width: widthPercentageToDP(60), height: widthPercentageToDP(60)}} source={require("../../../assets/image/hansungInfo/myicon.png")}/>
                    </View>
                    <View style={{marginLeft: widthPercentageToDP(12.8), flexDirection: 'column'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: widthPercentageToDP(15), fontFamily: fonts.nanumBarunGothicB, color: 'black'}}>{this.props.userNickName}님 </Text>
                            {
                                this.props.selected == true && this.props.professor_text == true ?
                                    <Text style={{fontSize: widthPercentageToDP(15), fontFamily: fonts.nanumBarunGothic, color: 'black'}}>교수평가를 남겨보는건 어때요?</Text>
                                    :
                                    <Text style={{fontSize: widthPercentageToDP(15), fontFamily: fonts.nanumBarunGothic, color: 'black'}}>안녕하세요!</Text>
                            }
                        </View>
                        <Text style={{marginTop: widthPercentageToDP(5), fontSize: widthPercentageToDP(12), fontFamily: fonts.nanumBarunGothic, color: '#888888'}}>{this.props.major}</Text>
                        <TouchableOpacity style={{marginTop: widthPercentageToDP(5.9), width: widthPercentageToDP(46), height: widthPercentageToDP(26)}}
                                          onPress={ async () => {this.props.move.navigate("MyInfo")}}>
                            <Image source={require("../../../assets/image/hansungInfo/my.png")}/>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    this.props.selected == true && this.props.professor_text == true ?
                        <View style={{position: 'relative', bottom: widthPercentageToDP(12.5), alignItems: 'flex-end'}}>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', width: widthPercentageToDP(120), height: widthPercentageToDP(20), marginRight: widthPercentageToDP(12.4)}}
                                              onPress = { () => {}}>
                                <Text style={{color: '#259ffa', fontSize: widthPercentageToDP(12)}}>교수평가 남기러 가기</Text>
                                <Image width={widthPercentageToDP(20)} height={widthPercentageToDP(20)} source={require("../../../assets/image/hansungInfo/arrow.png")}/>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    member: {
        width: '100%',
        height: widthPercentageToDP(115),
        backgroundColor: '#f8f8f8',
    },
});

export default connect(state => ({
    hansunginfo: state.hansung.hansunginfo,

    professor_text: state.hansung.professor_text,

    userNickName: state.signin.user.userNickName,
    major: state.signin.user.major
}))(AbstractAccountInfoScreen);