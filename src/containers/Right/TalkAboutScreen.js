import React, { Component } from "react";
import { View, StyleSheet, Text, Image, SafeAreaView} from "react-native";
import { widthPercentageToDP } from "../../utils/util"
import fonts from "../../configs/fonts";

export default class TalkAboutScreen extends Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{flexDirection: "row", width: widthPercentageToDP(375), height: widthPercentageToDP(21), justifyContent:"space-between", alignItems: "center", marginTop: widthPercentageToDP(19), marginBottom: widthPercentageToDP(28)}}>
                    <Image style={{width:widthPercentageToDP(12), height:widthPercentageToDP(20.5), marginLeft: widthPercentageToDP(16)}} source={require("../../../assets/images/community/back.png")}/>
                    <Text style={{color: "#000000", fontSize: widthPercentageToDP(17), fontFamily: fonts.nanumSquareB}}>자유톡방</Text>
                    <Image style={{width:widthPercentageToDP(21), height:widthPercentageToDP(21), marginRight: widthPercentageToDP(16)}} source={require("../../../assets/images/community/search.png")}/>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: "center"
    },
});