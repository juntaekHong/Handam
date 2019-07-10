import React, { Component } from "react";
import { View, StyleSheet, Text, Image, SafeAreaView, TouchableOpacity, FlatList} from "react-native";
import { widthPercentageToDP, timeSince } from "../../utils/util"
import fonts from "../../configs/fonts";
import { connect } from "react-redux";
import { TalkActions } from "../../store/actionCreator";

class TalkDetailScreen extends Component {

    constructor(props) {
        super(props);
    
        this.state={
            goodCount: this.props.getPosts.goodCount,
            isGood: this.props.getPosts.isGood,
            isScrap: this.props.getPosts.isScrap,
        }
    }
      
    navigateBack = () => {
        this.props.navigation.goBack();
    }

    navigateTalkWrite = () => {
        this.props.navigation.navigate('TalkWrite',{category: this.props.navigation.state.params.category, form: "update"});
    }
    
    render() {
        return (
            <SafeAreaView style={styles.container}>

                <View style={{flexDirection: "row", width: widthPercentageToDP(375), height: widthPercentageToDP(21), justifyContent:"space-between", alignItems: "center", marginTop: widthPercentageToDP(19), marginBottom: widthPercentageToDP(15)}}>
                    <Text style={{position: "absolute", width: widthPercentageToDP(375), textAlign: "center", color: "#000000", fontSize: widthPercentageToDP(17), fontFamily: fonts.nanumSquareB}}>{this.props.categoryList[this.props.navigation.state.params.category].str}</Text>
                    <TouchableOpacity onPress={()=>this.navigateBack()}>
                        <Image style={{width:widthPercentageToDP(12), height:widthPercentageToDP(20.5), marginLeft: widthPercentageToDP(16)}} source={require("../../../assets/images/community/back.png")}/>
                    </TouchableOpacity>
                </View>

                <View style={{width: widthPercentageToDP(375), paddingHorizontal: widthPercentageToDP(16)}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View style={{flexDirection: "row", height: widthPercentageToDP(12)}}>
                            <Image style={{width: widthPercentageToDP(19), height: widthPercentageToDP(12)}} source={require("../../../assets/images/community/quotation_color.png")}/>
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
                            <TouchableOpacity style={{marginLeft: widthPercentageToDP(15)}}
                            onPress={ async ()=>{
                                await TalkActions.deletePosts(this.props.getPosts.postsIndex);
                                await TalkActions.initPostList();
                                await TalkActions.pageListPosts(this.props.filter, this.props.orderby, this.props.postsList.length + 1, 6);
                                await TalkActions.pageListPosts(this.props.filter, 'count DESC', 1, 2);
                                this.navigateBack();
                            }}>
                                <Image style={{width: widthPercentageToDP(3), height: widthPercentageToDP(16)}} source={require("../../../assets/images/community/dots.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft: widthPercentageToDP(15)}}
                            onPress={ ()=>{
                                this.navigateTalkWrite();
                            }}>
                                <Image style={{width: widthPercentageToDP(3), height: widthPercentageToDP(16)}} source={require("../../../assets/images/community/dots.png")}/>
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
                            {/* <Image style={{width: widthPercentageToDP(8.5), height: widthPercentageToDP(10.2)}} source={this.state.isGood==true? require("../../../assets/images/community/likes.png"):require("../../../assets/images/community/likes_color.png")}/> */}
                            <Text style={{color: "#171717", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(4)}}>{this.state.goodCount}</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection: "row", width: widthPercentageToDP(40), height: widthPercentageToDP(22), justifyContent:"center", alignItems: "center", marginLeft: widthPercentageToDP(8), borderRadius: widthPercentageToDP(20), borderColor: "#9e9e9e", borderWidth: widthPercentageToDP(1)}}>
                            <Image style={{width: widthPercentageToDP(10.2), height: widthPercentageToDP(10)}} source={require("../../../assets/images/community/replys.png")}/>
                            <Text style={{color: "#171717", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(4)}}>{this.props.getPosts.postsReplyCount}</Text>
                        </View>
                    </View>
                </View>

                {/* 댓글 리스트 */} 
                <FlatList
                    ref={(ref) => {
                        this.flatListRef = ref;
                    }}
                    style={{flexGrow: 1, backgroundColor:"#f2f2f2", width: '100%', height: this.props.replysList.length * widthPercentageToDP(114), padding: widthPercentageToDP(16)}}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.props.replysList}
                    renderItem={({item, index}) => {
                        return (
                            <View>
                                <View style={{width: widthPercentageToDP(343), height: widthPercentageToDP(114), paddingTop: widthPercentageToDP(16), paddingHorizontal: widthPercentageToDP(12), marginBottom: widthPercentageToDP(8)}}>
                                    <Image style={{ position: "absolute", width: widthPercentageToDP(343), height: widthPercentageToDP(114) }} source={require("../../../assets/images/community/reply.png")}/>
                                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <View style={{flexDirection: "row"}}>
                                            <Image style={{ width: widthPercentageToDP(20), height: widthPercentageToDP(13) }} source={require("../../../assets/images/community/quotation.png")}/>
                                            <Text style={{color: "#171717", fontSize: widthPercentageToDP(10), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(4)}}>{item.userNickName}</Text>
                                            <Text style={{color: "#9e9e9e", fontSize: widthPercentageToDP(8), fontFamily: fonts.nanumBarunGothicR, marginLeft: widthPercentageToDP(8.5)}}>{timeSince(item.createdAt)}</Text>
                                        </View>
                                        <Image style={{ width: widthPercentageToDP(3), height: widthPercentageToDP(16) }} source={require("../../../assets/images/community/dots.png")}/>
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
    getPosts: state.talk.getPosts,

    replysList: state.talk.replysList,

    filter: state.talk.filter,
    orderby: state.talk.orderby,
}))(TalkDetailScreen);