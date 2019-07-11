import React, { Component } from "react";
import { View, StyleSheet, Text, Image, SafeAreaView, TouchableOpacity, FlatList, TextInput, ScrollView, Keyboard} from "react-native";
import { widthPercentageToDP, timeSince } from "../../utils/util"
import fonts from "../../configs/fonts";
import { connect } from "react-redux";
import { TalkActions } from "../../store/actionCreator";

// Keyboard.dismiss();  키보드 닫기

class TalkDetailScreen extends Component {

    constructor(props) {
        super(props);
    
        this.state={
            form: 'reply',
            replyIndex: null,
            reply: '',
            goodCount: this.props.getPosts.goodCount,
            isGood: this.props.getPosts.isGood,
            isScrap: this.props.getPosts.isScrap,
            emoji: false,
        }
    }
      
    navigateBack = () => {
        this.props.navigation.goBack();
    }

    navigateTalkWrite = () => {
        this.props.navigation.navigate('TalkWrite',{category: this.props.navigation.state.params.category, form: "update"});
    }

    checkSpace = (str) => { 
        if(str.replace(/(\s*)/g,"") == '') { 
            return false; 
        } else { 
            return true; 
        } 
    }

    header=()=>{
        return (
            <View style={{width: widthPercentageToDP(10)}}/>
        )
    }

    footer=()=>{
        return(
            <View style={{width: widthPercentageToDP(10)}}/>
        )
    }
    
    renderImages = () => {
        const imageData = this.props.getPosts.imagePath.length>0? eval("("+this.props.getPosts.imagePath[0].path+")").image : [];
        if(imageData.length!=0){
            return(
                <View>
                    <FlatList
                        style={imageData.length==1? styles.image_single_tle : styles.image_multi_tle}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        data={imageData}
                        ListHeaderComponent={this.header}
                        ListFooterComponent={this.footer}
                        renderItem={({item, index}) => {
                            const concept = item.substr(item.lastIndexOf('.')+1,item.length-1);
                            if(concept=='gif'){
                                item = (item.toString()).replace('gif','png')
                            }
                            return <TouchableOpacity 
                                    onPress={ async()=>{
                                        await this.imageIndexHandle(index);
                                        await this.setState({imagemodal: true});
                                    }}> 
                                        <Image style={imageData.length==1? styles.image_single : styles.image_multi}
                                                source={{uri: `${item}`}}/>
                                        {concept=='gif'? <Text style={imageData.length==1? styles.image_single_gif : styles.image_multi_gif}>GIF</Text> : null}
                                    </TouchableOpacity>
                        }}
                    />
                </View>
            );
        } else return;
    }

    renderReplyList = () => {
        return (
            this.props.replysList.length==0?

                null
                :
                <FlatList
                    ref={(ref) => {
                        this.flatListRef = ref;
                    }}
                    scrollEnabled={false}
                    style={{flexGrow: 1, backgroundColor:"#f2f2f2", width: '100%', height: '100%', marginTop: widthPercentageToDP(12), padding: widthPercentageToDP(16)}}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.props.replysList}
                    renderItem={({item, index}) => {
                        return (
                            <View>
                                <View style={{width: widthPercentageToDP(343), height: widthPercentageToDP(114), paddingTop: widthPercentageToDP(16), paddingHorizontal: widthPercentageToDP(12), marginBottom: widthPercentageToDP(8)}}>
                                    <Image style={{ position: "absolute", width: widthPercentageToDP(343), height: widthPercentageToDP(114) }} source={require("../../../assets/images/community/reply.png")}/>
                                    <View style={{flexDirection: "row", height: widthPercentageToDP(12), justifyContent: "space-between", alignItems: "center" }}>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            <Image style={{ width: widthPercentageToDP(16.4), height: widthPercentageToDP(10.1) }} source={require("../../../assets/images/community/quotation.png")}/>
                                            <Text style={{color: "#171717", fontSize: widthPercentageToDP(10), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(4)}}>{item.userNickName}</Text>
                                            <Text style={{color: "#9e9e9e", fontSize: widthPercentageToDP(8), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(8.5)}}>{timeSince(item.createdAt)}</Text>
                                        </View>
                                        <TouchableOpacity style={{}} onPress={async () => {
                                            await TalkActions.deletePostsReply(item.postsReplyIndex);
                                            await TalkActions.pageListPostsReply('page=1&count=100', this.props.getPosts.postsIndex);
                                        }}>
                                            <Image style={{ width: widthPercentageToDP(28), height: widthPercentageToDP(28) }} source={require("../../../assets/images/community/dots.png")}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{}} onPress={async () => {
                                            await this.setState({form:'update', reply: item.content, replyIndex: item.postsReplyIndex});
                                            this.TextInput.focus();
                                        }}>
                                            <Image style={{ width: widthPercentageToDP(28), height: widthPercentageToDP(28) }} source={require("../../../assets/images/community/dots.png")}/>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{color:"#171717", fontSize: widthPercentageToDP(13), fontFamily: fonts.nanumBarunGothicB, marginTop: widthPercentageToDP(12)}}>{item.content}</Text>
                                    <View style={{flexDirection: "row", justifyContent: "flex-end", marginTop: widthPercentageToDP(16)}}>
                                        <TouchableOpacity style={{flexDirection: "row", width: widthPercentageToDP(40), height: widthPercentageToDP(22), justifyContent:"center", alignItems: "center", marginRight: widthPercentageToDP(8), borderRadius: widthPercentageToDP(20), borderColor: "#9e9e9e", borderWidth: widthPercentageToDP(1)}}>
                                            <Text style={{color: "#171717", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicR}}>답글</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{flexDirection: "row", width: widthPercentageToDP(40), height: widthPercentageToDP(22), justifyContent:"center", alignItems: "center", borderRadius: widthPercentageToDP(20), borderColor: "#9e9e9e", borderWidth: widthPercentageToDP(1)}}>
                                            <Image style={{width: widthPercentageToDP(8.5), height: widthPercentageToDP(10.2)}} source={require("../../../assets/images/community/likes.png")}/>
                                            <Text style={{color: "#171717", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(4)}}>0</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* 대댓글자리 */}
                                {/* <View style={{paddingLeft: widthPercentageToDP(60)}}>
                                    <Image style={{position: "absolute", width: widthPercentageToDP(14), height: widthPercentageToDP(17), marginTop: widthPercentageToDP(10), marginLeft: widthPercentageToDP(39)}} source={require("../../../assets/images/community/reply_arrow.png")}/>
                                    <View style={{width: widthPercentageToDP(283), height: widthPercentageToDP(100), marginTop: widthPercentageToDP(8), paddingTop: widthPercentageToDP(12), paddingHorizontal: widthPercentageToDP(12) }}>
                                        <Image style={{ position: "absolute", width: widthPercentageToDP(283), height: widthPercentageToDP(100) }} source={require("../../../assets/images/community/re_reply.png")}/>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <View style={{flexDirection: "row"}}>
                                                <Image style={{ width: widthPercentageToDP(20), height: widthPercentageToDP(13) }} source={require("../../../assets/images/community/quotation.png")}/>
                                                <Text style={{color: "#171717", fontSize: widthPercentageToDP(10), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(4)}}>익명</Text>
                                                <Text style={{color: "#9e9e9e", fontSize: widthPercentageToDP(8), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(8.5)}}>59분전</Text>
                                            </View>
                                            <Image style={{ width: widthPercentageToDP(3), height: widthPercentageToDP(16) }} source={require("../../../assets/images/community/dots.png")}/>
                                        </View>
                                        <Text style={{color:"#171717", fontSize: widthPercentageToDP(13), fontFamily: fonts.nanumBarunGothicB, marginTop: widthPercentageToDP(12)}}>이번 축제 기대된다.</Text>
                                        <View style={{flexDirection: "row", justifyContent: "flex-end", marginTop: widthPercentageToDP(10)}}>
                                            <TouchableOpacity style={{flexDirection: "row", width: widthPercentageToDP(40), height: widthPercentageToDP(22), justifyContent:"center", alignItems: "center", marginRight: widthPercentageToDP(8), borderRadius: widthPercentageToDP(20), borderColor: "#9e9e9e", borderWidth: widthPercentageToDP(1)}}>
                                                <Text style={{color: "#171717", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicR}}>답글</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{flexDirection: "row", width: widthPercentageToDP(40), height: widthPercentageToDP(22), justifyContent:"center", alignItems: "center", borderRadius: widthPercentageToDP(20), borderColor: "#9e9e9e", borderWidth: widthPercentageToDP(1)}}>
                                                <Image style={{width: widthPercentageToDP(8.5), height: widthPercentageToDP(10.2)}} source={require("../../../assets/images/community/likes.png")}/>
                                                <Text style={{color: "#171717", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(4)}}>0</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View> */}
                                {/* /// */}
                            </View>
                        )
                                
                    }}
                />
        )
    }
    
    render() {
        return (
            <SafeAreaView style={styles.container}>

                <View style={{flexDirection: "row", width: widthPercentageToDP(375), height: widthPercentageToDP(53), justifyContent: "space-between", alignItems: "center", paddingTop: widthPercentageToDP(11), paddingBottom: widthPercentageToDP(14)}}>
                <Text style={{position: "absolute", width: widthPercentageToDP(375),  color: "#000000", fontSize: widthPercentageToDP(17), fontFamily: fonts.nanumSquareB, textAlign: "center"}}>{this.props.categoryList[this.props.navigation.state.params.category].str}</Text>
                    <TouchableOpacity style={{marginLeft: widthPercentageToDP(8)}} onPress={()=>this.navigateBack()}>
                        <Image style={{width: widthPercentageToDP(28), height: widthPercentageToDP(28)}} source={require("../../../assets/images/community/back.png")}/>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{width: widthPercentageToDP(375)}} keyboardShouldPersistTaps='never' >
                    
                    <View style={{width: widthPercentageToDP(375), paddingLeft: widthPercentageToDP(16)}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                            <View style={{flexDirection: "row"}}>
                                <Image style={{width: widthPercentageToDP(19.3), height: widthPercentageToDP(11.9)}} source={require("../../../assets/images/community/quotation_color.png")}/>
                                <Text style={{color: "#171717", fontSize: widthPercentageToDP(12), fontFamily: fonts.nanumBarunGothicB, marginLeft: widthPercentageToDP(9)}}>{this.props.getPosts.userNickName}</Text>
                                <Text style={{color: "#929292", fontSize: widthPercentageToDP(8), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(4)}}>{timeSince(this.props.getPosts.createdAt)}</Text>
                            </View>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <TouchableOpacity style={{width: widthPercentageToDP(62.5), height: widthPercentageToDP(22), justifyContent: "center", alignItems: "center", borderRadius: widthPercentageToDP(20), borderColor: "#9e9e9e", borderWidth: widthPercentageToDP(1)}}
                                onPress={ async ()=>{
                                    var posts = new Object();
                                    posts.postsIndex = this.props.getPosts.postsIndex;
                                    posts.isScrap = this.state.isScrap==true? 0:1; //스크랩:1 취소:0

                                    TalkActions.putPostsSubscriber(posts);
                                    this.state.isScrap==true? await this.setState({isScrap: false}): await this.setState({isScrap: true});

                                }}>
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Image style={{width: widthPercentageToDP(10.3), height: widthPercentageToDP(10.3)}} source={this.state.isScrap==false? require("../../../assets/images/community/star.png"):require("../../../assets/images/community/star_color.png")}/>
                                        <Text style={{color: "#171717", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(4)}}>스크랩</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginLeft: widthPercentageToDP(4)}}
                                onPress={ async ()=>{
                                    await TalkActions.deletePosts(this.props.getPosts.postsIndex);
                                    await TalkActions.initPostList();
                                    await TalkActions.pageListPosts(this.props.filter, this.props.orderby, this.props.postsList.length + 1, 6);
                                    await TalkActions.pageListPosts(this.props.filter, 'count DESC', 1, 2);
                                    this.navigateBack();
                                }}>
                                    <Image style={{width: widthPercentageToDP(28), height: widthPercentageToDP(28)}} source={require("../../../assets/images/community/dots.png")}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginLeft: widthPercentageToDP(4)}}
                                onPress={ ()=>{
                                    this.navigateTalkWrite();
                                }}>
                                    <Image style={{width: widthPercentageToDP(28), height: widthPercentageToDP(28)}} source={require("../../../assets/images/community/dots.png")}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={{color: "#000000", fontSize: widthPercentageToDP(16), fontFamily: fonts.nanumBarunGothicB, marginTop: widthPercentageToDP(15)}}>{this.props.getPosts.title}</Text>
                        <Text style={{color: "#000000", fontSize: widthPercentageToDP(13), fontFamily: fonts.nanumBarunGothicR, marginTop: widthPercentageToDP(7)}}>{this.props.getPosts.content}</Text>
                        <View style={{flexDirection: "row", marginTop: widthPercentageToDP(33), marginBottom: widthPercentageToDP(12)}}>
                            <TouchableOpacity style={{flexDirection: "row", width: widthPercentageToDP(40), height: widthPercentageToDP(22), justifyContent:"center", alignItems: "center", borderRadius: widthPercentageToDP(20), borderColor: "#9e9e9e", borderWidth: widthPercentageToDP(1)}}
                            onPress={ async()=>{
                                var posts = new Object();
                                    posts.postsIndex = this.props.getPosts.postsIndex;
                                    posts.isGood = this.state.isGood==true? 0:1; //좋아요:1 취소:0

                                    TalkActions.putPostsSubscriber(posts);
                                    this.state.isGood==true? await this.setState({isGood: false, goodCount: this.state.goodCount-1}): await this.setState({isGood: true, goodCount: this.state.goodCount+1});
                            }}>
                                <Image style={{width: widthPercentageToDP(8.5), height: widthPercentageToDP(10.2)}} source={this.state.isGood==true? require("../../../assets/images/community/likes_color.png") : require("../../../assets/images/community/likes.png")}/>
                                <Text style={{color: "#171717", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(4)}}>{this.state.goodCount}</Text>
                            </TouchableOpacity>
                            <View style={{flexDirection: "row", width: widthPercentageToDP(40), height: widthPercentageToDP(22), justifyContent:"center", alignItems: "center", marginLeft: widthPercentageToDP(8), borderRadius: widthPercentageToDP(20), borderColor: "#9e9e9e", borderWidth: widthPercentageToDP(1)}}>
                                <Image style={{width: widthPercentageToDP(10.2), height: widthPercentageToDP(10)}} source={require("../../../assets/images/community/replys.png")}/>
                                <Text style={{color: "#171717", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(4)}}>{this.props.getPosts.postsReplyCount}</Text>
                            </View>
                        </View>
                    </View>

                    {this.renderImages()}

                    {this.renderReplyList()}
                
                </ScrollView>

                <View style={{flexDirection: "row", height: widthPercentageToDP(56), alignItems: "center"}}>
                    <View style={{  flexDirection: "row",
                                    width: widthPercentageToDP(324),
                                    height: widthPercentageToDP(40),
                                    alignItems: "center",
                                    borderRadius: widthPercentageToDP(50),
                                    borderWidth: widthPercentageToDP(1),
                                    borderColor: "#dbdbdb"  }}>
                        <TextInput
                            ref={(input) => { this.TextInput = input; }}
                            style={{color: '#000000',
                                    width: widthPercentageToDP(265),
                                    fontSize: widthPercentageToDP(14),
                                    fontFamily: fonts.nanumBarunGothic,
                                    marginLeft: widthPercentageToDP(13)
                                    }}
                            underlineColorAndroid="transparent"
                            onChangeText={(reply)=> this.setState({reply})}
                            placeholder={'댓글을 입력하세요.'}
                            placeholderTextColor={'#929292'}
                            value={this.state.reply}
                            maxLength={500}
                            numberOfLines={100}
                            autoCapitalize={'none'}
                            returnKeyType={'none'}
                            multiline={true}/>
                        <TouchableOpacity onPress={ () => {
                            this.state.emoji==false? this.setState({emoji: true}):this.setState({emoji: false})
                        }}>
                            <Image style={{width: widthPercentageToDP(21), height: widthPercentageToDP(21), marginLeft: widthPercentageToDP(9.5)}} source={this.state.emoji==false? require("../../../assets/images/community/emoji.png") : require("../../../assets/images/community/emoji_color.png")}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={ async () => {
                        if(this.state.reply!=''&&this.checkSpace(this.state.reply)){
                            var reply = new Object();
                                reply.content = this.state.reply;
                                reply.postsIndex = this.props.getPosts.postsIndex;
                            if(this.state.form=='reply'){
                                await TalkActions.createPostsReply(reply);
                            } else {
                                reply.postsReplyIndex = this.state.replyIndex;
                                await TalkActions.updatePostsReply(reply);
                                await this.setState({form:'reply'});
                            }
                            Keyboard.dismiss();
                            await this.setState({reply:''});
                            await TalkActions.pageListPostsReply('page=1&count=100', this.props.getPosts.postsIndex);
                        }
                    }}>
                        <Image style={{width: widthPercentageToDP(28), height: widthPercentageToDP(28), marginLeft: widthPercentageToDP(5)}} source={require("../../../assets/images/community/reply_write.png")}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: "center",
    },
    image_single:{
        width: widthPercentageToDP(375), 
        height: widthPercentageToDP(235), 
        // borderRadius: widthPercentageToDP(4),
        resizeMode: 'cover',
        overlayColor: 'white',
    },
    image_multi:{
        width: widthPercentageToDP(130), 
        height: widthPercentageToDP(130), 
        borderRadius: widthPercentageToDP(4),
        resizeMode: 'cover',
        overlayColor: 'white',
        marginHorizontal: widthPercentageToDP(6),
    },
    image_single_tle:{
        flexGrow: 1,
        backgroundColor: '#ffffff', 
        // width: '100%', 
        height: widthPercentageToDP(235), 
    },
    image_multi_tle:{
        flexGrow: 1, 
        backgroundColor: '#ffffff', 
        // width: '100%', 
        height: widthPercentageToDP(130), 
        // paddingHorizontal: widthPercentageToDP(16)
    },
    image_single_gif:{
        position:'absolute',
        width: widthPercentageToDP(45),
        height: widthPercentageToDP(22),
        fontSize: widthPercentageToDP(14),
        borderRadius: widthPercentageToDP(4),
        textAlign: 'center',
        backgroundColor:'#4a4a4a',
        color: "white"
    },
    image_multi_gif:{
        position: "absolute",
        width: widthPercentageToDP(31),
        height: widthPercentageToDP(15),
        fontSize: widthPercentageToDP(10),
        borderRadius: widthPercentageToDP(4),
        textAlign: 'center',
        backgroundColor:'#4a4a4a',
        color: 'white'
    }
});

export default connect((state) => ({
    categoryList: state.talk.categoryList,
    postsList: state.talk.postsList,
    getPosts: state.talk.getPosts,

    replysList: state.talk.replysList,

    filter: state.talk.filter,
    orderby: state.talk.orderby,
}))(TalkDetailScreen);