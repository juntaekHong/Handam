import React, { Component } from "react";
import { SafeAreaView, StyleSheet, KeyboardAvoidingView, View, TouchableOpacity, Image, TextInput, Text, ScrollView } from "react-native";
import { widthPercentageToDP } from "../../utils/util"
import fonts from "../../configs/fonts";
import { connect } from "react-redux";
import { TalkActions } from "../../store/actionCreator";
import {UIActivityIndicator} from 'react-native-indicators';

class TalkWriteScreen extends Component {

    constructor(props) {
        super(props);
    
        this.state={
            title: this.props.navigation.state.params.form=="update"? this.props.getPosts.title : '',
            content: this.props.navigation.state.params.form=="update"? this.props.getPosts.content : '',
            category: this.props.categoryList[this.props.navigation.state.params.category].str,
            categoryExplain: this.props.categoryList[this.props.navigation.state.params.category].explain,
            categoryIndex: this.props.categoryList[this.props.navigation.state.params.category].index,
            clicked: false,
        }
    }

    navigationBack = () => {
        this.props.navigation.goBack();
    };

    navigateTalkAbout = (index) =>{
        this.props.navigation.navigate('TalkAbout',{name: this.props.categoryList[index].str});
    };

    checkSpace = (str) => { 
        if(str.replace(/(\s*)/g,"") == '') { 
            return false; 
        } else { 
            return true; 
        } 
    }

    renderSubmit = () => {
        if(this.state.title!=''&&this.state.content!=''&&this.state.category!=''&&this.checkSpace(this.state.title)&&this.checkSpace(this.state.content)&&this.state.clicked==false){
            return (
                <TouchableOpacity style={styles.submit} activeOpacity={0.3} onPress={ async () => {
                    this.setState({clicked: true});
                    const formData = new FormData();
                    formData.append('postsCategoryIndex', this.state.categoryIndex+1);
                    formData.append('title', this.state.title);
                    formData.append('content', this.state.content);
                          
                    if(this.props.navigation.state.params.form=="update"){
                        await TalkActions.updatePosts(formData, this.props.getPosts.postsIndex);
                    } else {
                        await TalkActions.createPosts(formData);
                    }
                
                    await TalkActions.initPostList();
                    await TalkActions.handleFilter(`postsCategoryIndex eq ${this.state.categoryIndex+1}`);
                    await TalkActions.pageListPosts(this.props.filter, this.props.orderby, this.props.postsList.length + 1, 6);
                    await TalkActions.pageListPosts(this.props.filter, 'count DESC', 1, 2);
                    this.navigateTalkAbout(this.state.categoryIndex);
                }}>
                    <Text style={[styles.submitText]}>완료</Text>
                </TouchableOpacity>
            )
        } else if(this.state.clicked==true){
            return(
                <View style={styles.submitDisable}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <UIActivityIndicator size={widthPercentageToDP(20)} color={'#ffffff'}/>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.submitDisable}>
                    <Text style={[styles.submitText]}>완료</Text>
                </View>
            )
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: widthPercentageToDP(18)}}>
                    <Text style={[styles.titleview]}>글쓰기</Text>
                    <TouchableOpacity style={styles.rightIcon} onPress={this.navigationBack}>
                                {/* <IcoMoon name="close" size={18} color={'black'}/> */}
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView style={{flex: 1}} enabled>
                    <ScrollView style={{width: widthPercentageToDP(375)}} keyboardShouldPersistTaps='never' >
                        <View style={{flex:1}}>
                            <View style={{height: widthPercentageToDP(26), flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <Text style={[styles.category]}>카테고리</Text>
                                </View>
                                <Text style={[{fontSize: widthPercentageToDP(11), color:'#c2c2c2', marginRight: widthPercentageToDP(21)}]}>{this.state.categoryExplain}</Text>
                            </View>
                            <View style={styles.line}/>
                            <View style={styles.titleContainer}>  
                                <TextInput 
                                    style={{color: '#000000',
                                            width: widthPercentageToDP(335),
                                            // height: util.widthPercentageToDP(20),
                                            fontSize: widthPercentageToDP(16),
                                            padding: 0,}}
                                    underlineColorAndroid="transparent"
                                    onChangeText={(title)=> this.setState({title})}
                                    placeholder={'제목'}
                                    placeholderTextColor={'#929292'}
                                    value={this.state.title}
                                    maxLength={30}
                                    numberOfLines={1}
                                    autoCapitalize={'none'}
                                    returnKeyType={'done'}
                                    multiline={false}/>
                            </View>

                            <View style={styles.contentContainer}>                                      
                                <TextInput 
                                    style={{color: '#000000',
                                            width: widthPercentageToDP(335),
                                            //height: util.widthPercentageToDP(20),  
                                            fontSize: widthPercentageToDP(16),
                                            padding: 0,
                                            textAlignVertical: 'top',}}
                                    underlineColorAndroid="transparent"
                                    onChangeText={(content)=> this.setState({content})}
                                    value={this.state.content}
                                    placeholder="본문"
                                    placeholderTextColor={'#929292'}
                                    maxLength={1000}
                                    numberOfLines={100}
                                    autoCapitalize={'none'}
                                    multiline={true}/>
                            </View>
                        </View>
                        <View style={styles.submitView}>
                            {this.renderSubmit()}
                        </View>
                    </ScrollView> 
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: "center"
    },
    submitView: {
        // paddingTop:'4.3rem',
        // paddingBottom:'4.3rem',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: widthPercentageToDP(60),
        paddingBottom: widthPercentageToDP(60),
    },
    submitText: {
        // fontSize: '1.143rem',
        color: 'white',
        fontSize: widthPercentageToDP(16)
    },
    submit: {
        // width:'13.7857rem',
        // height:'3.2857rem',
        // borderRadius: '1.643rem',
        backgroundColor: '#4a4a4a',
        justifyContent: 'center',
        alignItems: 'center',
        width: widthPercentageToDP(193),
        height: widthPercentageToDP(46),
        borderRadius: widthPercentageToDP(23),
    },
    submitDisable: {
        // width: '13.7857rem',
        // height: '3.2857rem',
        // borderRadius: '1.643rem',
        backgroundColor: '#4a4a4a4d',
        justifyContent: 'center',
        alignItems: 'center',
        width: widthPercentageToDP(193),
        height: widthPercentageToDP(46),
        borderRadius: widthPercentageToDP(23),
    },
    titleContainer: {
        width: widthPercentageToDP(335),
        // borderTopWidth: util.widthPercentageToDP(1),
        // borderTopColor: 'rgb(200,200,200)',
        marginTop: widthPercentageToDP(10),
        marginHorizontal: widthPercentageToDP(21),
        // paddingVertical: util.widthPercentageToDP(10),
    },
    contentContainer: {
        width: widthPercentageToDP(335),
        height: widthPercentageToDP(334),
        // borderTopWidth: util.widthPercentageToDP(1),
        // borderTopColor: 'rgb(200,200,200)',
        marginHorizontal: widthPercentageToDP(21),
        marginTop: widthPercentageToDP(10),
        padding: 0,
    },
  });

export default connect((state) => ({
    categoryList: state.talk.categoryList,
    postsList: state.talk.postsList,

    getPosts: state.talk.getPosts,

    filter: state.talk.filter,
    orderby: state.talk.orderby,
  }))(TalkWriteScreen);
