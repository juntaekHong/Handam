import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {widthPercentageToDP} from "../../utils/util";
import fonts from "../../configs/fonts";
import React from "react";

class AbstractAccountInfoScreen extends React.Component {

    render() {
        return (
            <View style={styles.member}>
                <View style={{marginTop: widthPercentageToDP(35), marginLeft: widthPercentageToDP(26), flexDirection: 'row'}}>
                    <View style={{width: widthPercentageToDP(55), height: widthPercentageToDP(55), backgroundColor: 'blue', borderRadius: widthPercentageToDP(90)}}>

                    </View>
                    <View style={{marginLeft: widthPercentageToDP(12.8), flexDirection: 'column'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: widthPercentageToDP(15), fontFamily: fonts.nanumBarunGothicB}}>{'XXX'}님 </Text>
                            <Text style={{fontSize: widthPercentageToDP(15), fontFamily: fonts.nanumBarunGothic}}>안녕하세요!</Text>
                        </View>
                        <Text style={{marginTop: widthPercentageToDP(5), fontSize: widthPercentageToDP(12), fontFamily: fonts.nanumBarunGothic, color: '#888888'}}>{'미디어컨텐츠 디자인학부 시각영상디자인'}</Text>

                        {/*이미지로 넣을 예정*/}
                        <TouchableOpacity style={{marginTop: widthPercentageToDP(5.9), width: widthPercentageToDP(34), height: widthPercentageToDP(20), borderRadius:widthPercentageToDP(10), borderColor: '#9e9e9e', borderWidth: widthPercentageToDP(1), textAlign: 'center'}}>
                            <Text style={{textAlign: 'center'}}>MY</Text>
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
        backgroundColor: '#f8f8f8'
    },
});

export default AbstractAccountInfoScreen;