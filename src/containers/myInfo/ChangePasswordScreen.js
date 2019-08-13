import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Platform, ScrollView, SafeAreaView} from 'react-native';
import {widthPercentageToDP} from "../../utils/util";
import {SECText} from "../../components/myInfo/Text";
import {connect} from "react-redux";

class ChangePasswordScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    navigategoBack = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={{height: widthPercentageToDP(120.5), borderBottomWidth: widthPercentageToDP(0.5), borderBottomColor: '#888888'}}>
                        <TouchableOpacity style={{alignItems: 'flex-end', marginTop: widthPercentageToDP(16), marginRight: widthPercentageToDP(14)}}
                                          onPress={ () => {this.navigategoBack()}}>
                            <Image width={widthPercentageToDP(28)} height={widthPercentageToDP(28)} source={require("../../../assets/image/myInfo/close.png")}/>
                        </TouchableOpacity>
                        <View style={{alignItems: 'flex-start', marginTop: widthPercentageToDP(45), marginLeft: widthPercentageToDP(25)}}>
                            <SECText>비밀번호 변경</SECText>
                        </View>
                    </View>
                    {/*비밀번호 변경 뷰*/}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

});

export default connect(state => ({
}))(ChangePasswordScreen);