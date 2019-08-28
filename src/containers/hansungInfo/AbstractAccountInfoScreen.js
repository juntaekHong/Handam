import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {widthPercentageToDP} from "../../utils/util";
import fonts from "../../configs/fonts";
import React from "react";
import {connect} from "react-redux";

class AbstractAccountInfoScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.member}>
                <View style={{marginTop: widthPercentageToDP(35), marginLeft: widthPercentageToDP(26), flexDirection: 'row'}}>
                    <TouchableOpacity onPress={ async () => {this.props.move.navigate("MyInfo")}}>
                        {
                            this.props.userAvatar ?
                                <Image
                                    style={styles.profile}
                                    source={{uri: this.props.userAvatar}}
                                />
                                :
                                this.props.avatarDelete == false && this.props.avatar ?
                                    <Image
                                        style={styles.profile}
                                        source={{uri: this.props.avatar}}
                                    />
                                    :
                                    <Image
                                        style={styles.nonProfile}
                                        source={require("../../../assets/image/myInfo/group_1455.png")}
                                    />
                        }
                    </TouchableOpacity>
                    <View style={{marginLeft: widthPercentageToDP(12.8), flexDirection: 'column'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: widthPercentageToDP(15), fontFamily: fonts.nanumBarunGothicB, color: 'black'}}>{this.props.hansunginfo == null || this.props.hansunginfo.status != "SUCCESS" || this.props.hansunginfo.name == undefined ? `학우` : this.props.hansunginfo.name}님 </Text>
                            {
                                this.props.selected == true && this.props.professor_text == true ?
                                    // 교수평가 페이지 완성시 텍스트 변경 예정
                                    <Text style={{fontSize: widthPercentageToDP(15), fontFamily: fonts.nanumBarunGothic, color: 'black'}}>안녕하세요!</Text>
                                    :
                                    <Text style={{fontSize: widthPercentageToDP(15), fontFamily: fonts.nanumBarunGothic, color: 'black'}}>안녕하세요!</Text>
                            }
                        </View>
                        <Text style={{marginTop: widthPercentageToDP(5), fontSize: widthPercentageToDP(12), fontFamily: fonts.nanumBarunGothic, color: '#888888'}}>{this.props.hansunginfo == null || this.props.hansunginfo.status != "SUCCESS" ? `` : this.props.hansunginfo.department == undefined ? `마이페이지에서 인증서 삭제후 다시 등록해주세요` : this.props.hansunginfo.department}</Text>
                        <TouchableOpacity style={{position: 'relative', left: widthPercentageToDP(-5), marginTop: widthPercentageToDP(5.9), width: widthPercentageToDP(46), height: widthPercentageToDP(26)}}
                                          onPress={ async () => {this.props.move.navigate("MyInfo")}}>
                            <Image width={widthPercentageToDP(46)} height={widthPercentageToDP(26)} source={require("../../../assets/image/hansungInfo/my.png")}/>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    this.props.selected == true && this.props.professor_text == true ?
                        // 교수평가 페이지 만들어지면 작업 예정.
                        <View style={{position: 'relative', bottom: widthPercentageToDP(20), alignItems: 'flex-end'}}>
                            {/*<TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', width: widthPercentageToDP(120), height: widthPercentageToDP(20), marginRight: widthPercentageToDP(12.4)}}*/}
                            {/*                  onPress = { () => {}}>*/}
                            {/*    <Text style={{color: '#259ffa', fontSize: widthPercentageToDP(12)}}>교수평가 남기러 가기</Text>*/}
                            {/*    <Image width={widthPercentageToDP(20)} height={widthPercentageToDP(20)} source={require("../../../assets/image/hansungInfo/arrow.png")}/>*/}
                            {/*</TouchableOpacity>*/}
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
    profile: {
        marginTop: widthPercentageToDP(3),
        width: widthPercentageToDP(60),
        height: widthPercentageToDP(60),
        borderRadius: widthPercentageToDP(30),
    },
    nonProfile: {
        position: 'relative',
        bottom: widthPercentageToDP(3),
        width: widthPercentageToDP(72),
        height: widthPercentageToDP(72),
        borderRadius: widthPercentageToDP(27.5),
    }
});

export default connect(state => ({
    hansunginfo: state.hansung.hansunginfo,

    professor_text: state.hansung.professor_text,

    userNickName: state.signin.user.userNickName,
    major: state.signin.user.major,
    changeMajor: state.myInfo.userMajor,

    userAvatar: state.myInfo.userAvatar,
    avatar: state.signin.user.avatar,
    avatarDelete: state.myInfo.avatarDelete,
}))(AbstractAccountInfoScreen);