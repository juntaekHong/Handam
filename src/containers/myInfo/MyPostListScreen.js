import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Platform, ScrollView, SafeAreaView} from 'react-native';
import {widthPercentageToDP} from "../../utils/util";
import {SECText} from "../../components/myInfo/Text";
import {connect} from "react-redux";

class MyPostListScreen extends React.Component {
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
                            <SECText>내가 쓴 글</SECText>
                        </View>
                    </View>
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
}))(MyPostListScreen);