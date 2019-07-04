import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { CText, CTText, CEText } from "../../components/common/Text";
import { widthPercentageToDP } from "../../utils/util"
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as talk from "../../store/modules/community/talk";

class TalkScreen extends Component {

  constructor(props) {
    super(props);

    this.state={
      categoryName:[
        {index:0, str:"한담", explain:"자유 주제 카테고리 입니다."},
        {index:1, str:"건의한담", explain:"건의사항 카테고리 입니다."},
        {index:2, str:"대자보", explain:"홍보 카테고리 입니다."},
        {index:3, str:"오픈마켓", explain:"상품 거래 카테고리 입니다."},
        {index:4, str:"분실물 센터", explain:"분실물 카테고리 입니다."},
      ],
      pageSelected: 0,
    }
  }

  navigateTalkAbout = () => {
    this.props.navigation.navigate('TalkAbout');
  }

  pageListPosts = () => {
    const {Talk} = this.props;
    Talk.pageListPosts();
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{ position: "absolute", backgroundColor: "#dbdbdb", width: widthPercentageToDP(375), height: widthPercentageToDP(2), marginTop: widthPercentageToDP(60) }}/>
       
        <FlatList
            ref={(ref) => {
                this.flatListRef = ref;
            }}
            style={{flexGrow: 1, backgroundColor: '#f8f8f8', width: '100%', height: '100%', paddingTop: widthPercentageToDP(16), paddingHorizontal: widthPercentageToDP(16)}}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.categoryName}
            renderItem={({item, index}) => {
                return <TouchableOpacity style={styles.category} 
                          onPress={ async ()=>{
                            // this.navigateTalkAbout();
                            // var user = new Object();
                            // user.userId = "shs0655@gmail.com";
                            // user.userPw = "qwe123!!";
                            // await api.post(`/signIn`,{body:JSON.stringify(user)});
                            // await api.get(`/posts/?filter=${`postsCategoryIndex eq 1`}&orderBy=${`createdAt DESC`}&page=${1}&count=${4}`,{token: token1});
                                            
                            this.pageListPosts();
                          }}>
                        <Image style={{ position: "absolute", width: widthPercentageToDP(343), height: widthPercentageToDP(105) }} source={require("../../../assets/images/temp.png")}/>
                        <Image style={{ width: widthPercentageToDP(20), height: widthPercentageToDP(13) }} source={require("../../../assets/images/community/quotation.png")}/>
                        <CTText>{item.str}</CTText>
                        <CEText>{item.explain}</CEText>
                      </TouchableOpacity>
            }}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: "center"
  },
  pageName: {
    width: widthPercentageToDP(79),
    height: widthPercentageToDP(18),
    textAlign: "center",
  },
  pageNameBottom: {
    backgroundColor: "#259ffa",
    height: widthPercentageToDP(2),
    marginTop: widthPercentageToDP(12)
  },
  category: { 
    width: widthPercentageToDP(343),
    height: widthPercentageToDP(105),
    marginBottom: widthPercentageToDP(12),
    paddingTop: widthPercentageToDP(12),
    paddingLeft: widthPercentageToDP(12)
  },
});

export default connect((state) => ({
}),
(dispatch) => ({
  Talk: bindActionCreators(talk, dispatch)
})
)(TalkScreen);
