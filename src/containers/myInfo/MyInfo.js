import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {widthPercentageToDP} from "../../utils/util";
import {HansungInfoActions} from "../../store/actionCreator";
import {connect} from "react-redux";

class MyInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    navigateBack = () => {
        this.props.navigation.goBack(null);
    };

    render() {
        return (
            <View>
                <View style={{flexDirection: 'row', marginLeft: widthPercentageToDP(14), marginTop: widthPercentageToDP(16)}}>
                    <TouchableOpacity onPress={() => this.navigateBack()}>
                        <Image style={{width: widthPercentageToDP(28), height: widthPercentageToDP(28)}} source={require("../../../assets/image/myInfo/back.png")} />
                    </TouchableOpacity>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text>마이페이지</Text>
                    </View>
                </View>
                {
                   this.props.hansunginfo == null?
                       null
                       :
                       this.props.hansunginfo != null && this.props.hansunginfo.status == 'FAIL'?
                           <TouchableOpacity style={{backgroundColor: '#24a0fa', width:widthPercentageToDP(200), height: widthPercentageToDP(20), borderRadius: widthPercentageToDP(10) }}
                                             onPress={ async () => { await HansungInfoActions.deleteHansungInfo(); await HansungInfoActions.nonSubjectPointHandle(false); this.navigateBack();}}>
                               <Text style={{color: 'white'}}>임시 인증 실패 버튼</Text>
                           </TouchableOpacity>
                           :
                           <TouchableOpacity style={{backgroundColor: '#24a0fa', width:widthPercentageToDP(200), height: widthPercentageToDP(20), borderRadius: widthPercentageToDP(10) }}
                                             onPress={ async () => { await HansungInfoActions.deleteHansungInfo(); await HansungInfoActions.nonSubjectPointLoadingHandle(false); await HansungInfoActions.nonSubjectPointHandle(false); this.navigateBack();}}>
                               <Text style={{color: 'white'}}>임시 인증서 삭제 버튼</Text>
                           </TouchableOpacity>
                }
            </View>
        )
    }
}

export default connect((state) => ({
    hansunginfo: state.hansung.hansunginfo,
}))(MyInfo);