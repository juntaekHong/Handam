import React from 'react';
import {SafeAreaView, View, TouchableOpacity, Text, Image, TextInput, StyleSheet} from 'react-native';
import { widthPercentageToDP} from "../../utils/util";
import fonts from "../../configs/fonts";
import {SECText} from '../../components/myInfo/Text';
import { CustomModal } from "../../components/common/Modal";

class SecessionScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            failmodal: false,
            passwordCheck: '',
        }
    }

    secessionBtn = () => {
        return (
            this.state.passwordCheck == '' ?
                <View style={styles.secessionBtn}>
                    <Text style={{textAlign: 'center', fontSize: widthPercentageToDP(14), fontFamily: fonts.nanumBarunGothicB, color: 'white' }}>한담탈퇴하기</Text>
                </View>
                :
                <TouchableOpacity style={styles.secessionBtnOk} onPress={ () => {this.setState({failmodal: true})}}>
                    <Text style={{textAlign: 'center', fontSize: widthPercentageToDP(14), fontFamily: fonts.nanumBarunGothicB, color: 'white' }}>한담탈퇴하기</Text>
                </TouchableOpacity>
        )
    };

    navigategoBack = () => {
      this.props.navigation.goBack();
    };

    render() {
        return (
            // 작업중
            <SafeAreaView>
                <View style={{height: widthPercentageToDP(120.5), borderBottomWidth: widthPercentageToDP(0.5), borderBottomColor: '#888888'}}>
                    <TouchableOpacity style={{alignItems: 'flex-end', marginTop: widthPercentageToDP(16), marginRight: widthPercentageToDP(14)}}
                      onPress={ () => {this.navigategoBack()}}>
                        <Image width={widthPercentageToDP(28)} height={widthPercentageToDP(28)} source={require("../../../assets/image/myInfo/close.png")}/>
                    </TouchableOpacity>
                    <View style={{alignItems: 'flex-start', marginTop: widthPercentageToDP(45), marginLeft: widthPercentageToDP(25)}}>
                        <SECText>회원탈퇴</SECText>
                    </View>
                </View>
                <View style={{paddingTop: widthPercentageToDP(106.5)}}>
                    <SECText style={{textAlign: 'center', marginBottom: widthPercentageToDP(31)}}>본인 확인을 위해 비밀번호를 확인합니다</SECText>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.passwordCheck}
                        onChangeText={passwordCheck => {
                            this.setState({ passwordCheck });}}
                        maxLength={16}
                        underlineColorAndroid={'transparent'}
                        secureTextEntry={true}
                        placeholder={'비밀번호'}
                    />
                    {this.secessionBtn()}
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
   textInput: {
       marginHorizontal: widthPercentageToDP(48),
       paddingLeft: widthPercentageToDP(13),
       marginBottom: widthPercentageToDP(206),
       borderWidth: widthPercentageToDP(1),
       borderRadius: widthPercentageToDP(8),
       borderColor: '#dbdbdb'
   },
    secessionBtn: {
       justifyContent: 'center',
       marginHorizontal: widthPercentageToDP(43),
       height: widthPercentageToDP(53),
       borderRadius: widthPercentageToDP(8),
       backgroundColor: '#cad5dd'
    },
    secessionBtnOk: {
        justifyContent: 'center',
        marginHorizontal: widthPercentageToDP(43),
        height: widthPercentageToDP(53),
        borderRadius: widthPercentageToDP(8),
        backgroundColor: '#24a0fa'
    }
});

export default SecessionScreen;