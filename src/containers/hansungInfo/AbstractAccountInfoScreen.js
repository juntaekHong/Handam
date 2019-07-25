import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {widthPercentageToDP} from "../../utils/util";
import fonts from "../../configs/fonts";
import React from "react";
import {HansungInfoActions} from "../../store/actionCreator";

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
                            <Text style={{fontSize: widthPercentageToDP(15), fontFamily: fonts.nanumBarunGothicB}}>{'XXX'}님 </Text>
                            {/*인증후 성적표에서만 강의평가~어때요? 보이게 추후 예정*/}
                            <Text style={{fontSize: widthPercentageToDP(15), fontFamily: fonts.nanumBarunGothic}}>안녕하세요!</Text>
                        </View>
                        <Text style={{marginTop: widthPercentageToDP(5), fontSize: widthPercentageToDP(12), fontFamily: fonts.nanumBarunGothic, color: '#888888'}}>{'미디어컨텐츠 디자인학부 시각영상디자인'}</Text>
                        <TouchableOpacity style={{marginTop: widthPercentageToDP(5.9), width: widthPercentageToDP(46), height: widthPercentageToDP(26)}}
                                          onPress={ async () => {this.props.move.navigate("MyInfo")}}>
                            <Image source={require("../../../assets/image/hansungInfo/my.png")}/>
                        </TouchableOpacity>
                    </View>
                </View>

                {/*인증후 성적표페이지에서만 보이게 할 예정*/}
                {/*<View style={{alignItems: 'flex-end'}}>*/}
                {/*    <TouchableOpacity style={{width: widthPercentageToDP(120), height: widthPercentageToDP(20), marginRight: widthPercentageToDP(12.4)}}*/}
                {/*                      onPress = { async () => {}}>*/}
                {/*        <Text style={{color: '#259ffa', fontSize: widthPercentageToDP(12)}}>강의평가 남기러 가기 ></Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
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

export default AbstractAccountInfoScreen;