import React, { Component } from "react";
import { View, StyleSheet, Text, Image, SafeAreaView, TouchableOpacity, FlatList} from "react-native";
import { widthPercentageToDP, timeSince } from "../../utils/util"
import fonts from "../../configs/fonts";
import { connect } from "react-redux";
import { TalkActions } from "../../store/actionCreator";
import {UIActivityIndicator} from 'react-native-indicators';

class TalkAboutScreen extends Component {

    constructor(props) {
        super(props);

        didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            async payload => {
                TalkActions.initGetPosts();
            }
        );

        this.state={
        
        }
        
      }

    navigateBack = () => {
        this.props.navigation.goBack();
    }

    navigateTalkDetail = () => {
        this.props.navigation.navigate('TalkDetail',{category: this.props.navigation.state.params.category});
    }

    navigateTalkWrite = () => {
        this.props.navigation.navigate('TalkWrite',{category: this.props.navigation.state.params.category, form: "upload"});
    }

    renderListHeader = () => {
        return (
            <FlatList
                    ref={(ref) => {
                        this.flatListRef = ref;
                    }}
                    style={{backgroundColor: '#ffffff', width: '100%'}}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.props.hotpostsList}
                    renderItem={({item, index}) => {
                        return <TouchableOpacity style={{flexDirection: "row", width: widthPercentageToDP(375), height: widthPercentageToDP(81), borderBottomWidth: widthPercentageToDP(1), borderBottomColor: "#dbdbdb"}}
                                onPress={ async ()=>{
                                    await TalkActions.getPosts(item.postsIndex);
                                    await TalkActions.pageListPostsReply('page=1&count=100',item.postsIndex);
                                    this.navigateTalkDetail();
                                }}>
                                <Text style={{color: "#0c81ff", fontSize: widthPercentageToDP(16), fontFamily: fonts.nanumBarunGothicB, width: widthPercentageToDP(35), height: widthPercentageToDP(81), textAlign: "center", textAlignVertical: "center"}}>{index+1}</Text>
                                <View style={{width: widthPercentageToDP(340), paddingRight: widthPercentageToDP(16)}}>
                                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: widthPercentageToDP(13)}}>
                                        <Text style={{color: "#000000", fontSize: widthPercentageToDP(13), fontFamily: fonts.nanumBarunGothicB}} ellipsizeMode={'tail'} numberOfLines={1}>{item.title}</Text>
                                        <Text style={{backgroundColor: "#259ffa", color: "white", fontSize: widthPercentageToDP(10), fontFamily: fonts.nanumBarunGothicB, textAlign: "center", textAlignVertical: "center", width: widthPercentageToDP(32), height: widthPercentageToDP(14), lineHeight: widthPercentageToDP(12), borderRadius: widthPercentageToDP(10)}}>HOT</Text>
                                    </View>
                                    <Text style={{color: "#000000", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicR, marginTop: widthPercentageToDP(8)}} ellipsizeMode={'tail'} numberOfLines={1}>{item.content}</Text>
                                    <View style={{flexDirection: "row", height: widthPercentageToDP(12), justifyContent: "space-between", alignItems: "center", marginTop: widthPercentageToDP(10)}}>
                                        {/* <Text style={{color: "#646464", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicB}}>{timeSince(item.createdAt)}</Text> */}
                                        <Text style={{color: "#646464", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicB}}>{timeSince(item.createdAt)}</Text>
                                        <View style={{flexDirection: "row", height: widthPercentageToDP(12), alignItems: "center"}}>
                                            <Image style={{width: widthPercentageToDP(11), height: widthPercentageToDP(11)}} source={require("../../../assets/images/community/images.png")}/>
                                            <Text style={{color: "#171717", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(5)}}>{item.imageCount}</Text>
                                            <Image style={{width: widthPercentageToDP(8.5), height: widthPercentageToDP(10.2), marginLeft: widthPercentageToDP(10.5)}} source={require("../../../assets/images/community/likes.png")}/>
                                            <Text style={{color: "#171717", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(5)}}>{item.goodCount}</Text>
                                            <Image style={{width: widthPercentageToDP(10.2), height: widthPercentageToDP(9.9), marginLeft: widthPercentageToDP(10.5)}} source={require("../../../assets/images/community/replys.png")}/>
                                            <Text style={{color: "#171717", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(4.3)}}>{item.postsReplyCount}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                    }}
            />
        )
    }

    renderListFooter = () => {
        return (
            this.props.loading ?
                <View style={styles.listFooterContainer}>
                    <UIActivityIndicator size={util.widthPercentageToDP(20)} color={'#727272'}/>
                </View> : <View>{null}</View>
        )
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{flexDirection: "row", width: widthPercentageToDP(375), height: widthPercentageToDP(53), justifyContent: "space-between", alignItems: "center", paddingTop: widthPercentageToDP(11), paddingBottom: widthPercentageToDP(14)}}>
                    <TouchableOpacity style={{marginLeft: widthPercentageToDP(8)}} onPress={()=>this.navigateBack()}>
                        <Image style={{width: widthPercentageToDP(28), height: widthPercentageToDP(28)}} source={require("../../../assets/images/community/back.png")}/>
                    </TouchableOpacity>
                    <Text style={{color: "#000000", fontSize: widthPercentageToDP(17), fontFamily: fonts.nanumSquareB}}>{this.props.categoryList[this.props.navigation.state.params.category].str}</Text>
                    <TouchableOpacity onPress={()=>this.navigateBack()}>
                        <Image style={{width:widthPercentageToDP(21), height:widthPercentageToDP(21), marginRight: widthPercentageToDP(16)}} source={require("../../../assets/images/community/search.png")}/>
                    </TouchableOpacity>
                </View>

                <View style={{backgroundColor: "#dbdbdb", width: widthPercentageToDP(375), height: widthPercentageToDP(1)}}/>

                <FlatList
                    ref={(ref) => {
                        this.flatListRef = ref;
                    }}
                    style={{flexGrow: 1, backgroundColor: '#ffffff', width: '100%', height: '100%'}}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.01}
                    onEndReached={()=>TalkActions.pageListPosts(this.props.filter, this.props.orderby, this.props.postsList.length / 6 + 1, 6)}
                    ListHeaderComponent={this.renderListHeader}
                    ListFooterComponent={this.renderListFooter}
                    data={this.props.postsList}
                    renderItem={({item, index}) => {
                        return <TouchableOpacity style={styles.posts} 
                                onPress={ async ()=>{
                                    await TalkActions.getPosts(item.postsIndex);
                                    await TalkActions.pageListPostsReply('page=1&count=100',item.postsIndex);
                                    this.navigateTalkDetail();
                                }}>
                                    <Text style={{color: "#000000", fontSize: widthPercentageToDP(13), fontFamily: fonts.nanumBarunGothicB, marginTop: widthPercentageToDP(12)}} ellipsizeMode={'tail'} numberOfLines={1}>{item.title}</Text>
                                    <Text style={{color: "#000000", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicR, marginTop: widthPercentageToDP(8)}} ellipsizeMode={'tail'} numberOfLines={1}>{item.content}</Text>
                                    <View style={{flexDirection: "row", height: widthPercentageToDP(12), justifyContent: "space-between", alignItems: "center", marginTop: widthPercentageToDP(10)}}>
                                        <Text style={{color: "#646464", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicB}}>{timeSince(item.createdAt)}</Text>
                                        <View style={{flexDirection: "row", height: widthPercentageToDP(12), alignItems: "center"}}>
                                            <Image style={{width: widthPercentageToDP(11), height: widthPercentageToDP(11)}} source={require("../../../assets/images/community/images.png")}/>
                                            <Text style={{color: "#171717", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(5)}}>{item.imageCount}</Text>
                                            <Image style={{width: widthPercentageToDP(8.5), height: widthPercentageToDP(10.2), marginLeft: widthPercentageToDP(10.5)}} source={require("../../../assets/images/community/likes.png")}/>
                                            <Text style={{color: "#171717", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(5)}}>{item.goodCount}</Text>
                                            <Image style={{width: widthPercentageToDP(10.2), height: widthPercentageToDP(9.9), marginLeft: widthPercentageToDP(10.5)}} source={require("../../../assets/images/community/replys.png")}/>
                                            <Text style={{color: "#171717", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(4.3)}}>{item.postsReplyCount}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                    }}
                />
                <TouchableOpacity style={{position: "absolute", width: widthPercentageToDP(87), height: widthPercentageToDP(37), marginTop: widthPercentageToDP(520) }} activeOpacity={0.5} 
                onPress={()=>{
                    this.navigateTalkWrite();
                }} >
                    <Image style={{width: widthPercentageToDP(87), height: widthPercentageToDP(37)}} source={require("../../../assets/images/community/write.png")}/>
                    <Text style={{position: "absolute", color: "white", fontSize: widthPercentageToDP(15), fontFamily: fonts.nanumBarunGothicB, marginTop: widthPercentageToDP(10), marginLeft: widthPercentageToDP(23) }}>글쓰기</Text>
                </TouchableOpacity>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: "center",
    },
    posts: {
      width: widthPercentageToDP(375),
      height: widthPercentageToDP(81),
      paddingHorizontal: widthPercentageToDP(16),
      borderBottomWidth: widthPercentageToDP(1),
      borderBottomColor: "#dbdbdb",
    },
});

export default connect((state) => ({
    categoryList: state.talk.categoryList,
    postsList: state.talk.postsList,
    hotpostsList: state.talk.hotpostsList,
    filter: state.talk.filter,
    orderby: state.talk.orderby,
}))(TalkAboutScreen);