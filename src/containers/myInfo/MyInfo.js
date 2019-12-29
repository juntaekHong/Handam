import React from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
    Platform,
    StyleSheet, BackHandler
} from "react-native";
import {
    widthPercentageToDP,
    removeAllData
} from "../../utils/util";
import {
    TitleView,
    AccountInfoView,
    SubTitleView,
    CertificationView,
    AccountDetailView
} from "../../components/myInfo/View";
import { StandText, AccountDetailText } from "../../components/myInfo/Text";
import fonts from "../../configs/fonts";
import { CustomModal } from "../../components/common/Modal";
import {BottomMenuModal} from "../../components/myInfo/Modal";
import { connect } from "react-redux";
import {
    CustomModalBlackSmallText,
    CustomModalBlackText
} from "../../components/myInfo/Text";
import { UIActivityIndicator } from "react-native-indicators";
import {HansungInfoActions, MyInfoActions, TalkActions} from "../../store/actionCreator";
import ImageCropPicker from 'react-native-image-crop-picker';
 
class MyInfo extends React.Component {

    _didFocusSubscription;

    constructor(props) {
        super(props);

        this.state = {
            // 인증서 삭제, 로그아웃, 회원탈퇴 모달,
            deletemodal: false,
            logoutmodal: false,
            secessionmodal: false,
            certCheck: false,
            bottomModal: false,
        };

        didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            async payload => {
                if(this.props.hansunginfo != null) {
                    this.certification_Check();
                }
            }
        );
    }

    // 여기서 네비게이션을 뒤로 이동 안하면 이후 백프레스 작동 안함.
    async componentDidMount() {
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            this.setState({bottomModal:false});
            this.navigateBack();
            return true;
        });
    }

    componentWillUnmount = async () => {
        this.backHandler.remove();

        this._didFocusSubscription && this._didFocusSubscription.remove();
    }

    certification_Check = async () => {
        await HansungInfoActions.getHansungInfo();
        await HansungInfoActions.loadingHandle(false);

        let timeout = setInterval(async () => {
            if (
                this.props.hansunginfo != null &&
                this.props.hansunginfo.status == "UNVERIFIED"
            ) {
                await HansungInfoActions.getHansungInfo();
            } else if (this.props.hansunginfo != null && this.props.hansunginfo.status == "SUCCESS") {
                await HansungInfoActions.loadingHandle(false);
                await HansungInfoActions.myInfoLoadingHandle(false);
                clearInterval(timeout);
            } else if (this.props.hansunginfo != null && this.props.hansunginfo.status == "FAIL") {
                await HansungInfoActions.loadingHandle(false);
                await HansungInfoActions.myInfoLoadingHandle(false);
                clearInterval(timeout);
            }
        }, 5000);
    };

    componentWillMount = async () => {
        this.setState({ logoutmodal: false });
    };

    navigateCertification = () => {
        this.props.navigation.navigate("Certification");
    };

    navigateAccountInfo = () => {
        this.props.navigation.navigate("AccountInfo");
    };

    navigateMyPost = () => {
        this.props.navigation.navigate("MyPost");
    };

    navigateMyScrap = () => {
        this.props.navigation.navigate("MyScrap");
    };

    navigateBack = () => {
        this.props.navigation.goBack(null);
    };

    deletehansungInfo = async () => {
        await HansungInfoActions.gradesHandle(false);
        await HansungInfoActions.nonSubjectPointHandle(false);

        await HansungInfoActions.gradesLoadingHandle(false);
        await HansungInfoActions.nonSubjectPointLoadingHandle(false);

        await HansungInfoActions.deleteHansungInfo();

        let timeout = setInterval(async () => {
            if (this.props.hansunginfo == null) {
                await HansungInfoActions.loadingHandle(false);
                await HansungInfoActions.myInfoLoadingHandle(false);
                clearInterval(timeout);
            } else {
                await HansungInfoActions.deleteHansungInfo();
            }
        }, 1000);
    };

    renderLogout = async () => {
        await HansungInfoActions.deleteHansungInfo();
        await removeAllData();
        this.props.navigation.navigate("signIn");
    };

    // 사진찍고 선택
    takePicture = async () => {
        try {
            let image = await ImageCropPicker.openCamera({
                width: 200,
                height: 200,
                cropping: true,
                cropperToolbarTitle: '',
            });

            const formData = new FormData();
            formData.append('avatar', {
                uri: image.path,
                type: 'image/png',
                name: 'avatar.png',
            });
            await MyInfoActions.deleteAvatar();
            await MyInfoActions.uploadAvatar(formData);
        } catch (err) {
            console.log(err);
        } finally {
            await ImageCropPicker.clean();
        }

    };

    // 앨범에서 선택
    SelectedPicture = async () => {
        try {
            let image = await ImageCropPicker.openPicker({
                width: 200,
                height: 200,
                mediaType: 'photo',
                // cropping: true,
                cropperToolbarTitle: '',
            });

            let crop = await ImageCropPicker.openCropper({
                path: image.path,
                width: 200,
                height: 200,
                cropperToolbarTitle: '',
            });

            const formData = new FormData();
            formData.append('avatar', {
                uri: crop.path,
                type: 'image/png',
                name: 'avatar.png',
            });
            await MyInfoActions.deleteAvatar();
            await MyInfoActions.uploadAvatar(formData);
        } catch (err) {

        } finally {
            await ImageCropPicker.clean();
        }
    };

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <CustomModal
                        width={295}
                        height={311}
                        children={
                            <CustomModalBlackText>
                                인증서를 삭제하시겠습니까?
                            </CustomModalBlackText>
                        }
                        visible={this.state.deletemodal}
                        footerHandler={async () => {
                            await HansungInfoActions.loadingHandle(true);
                            await HansungInfoActions.myInfoLoadingHandle(true);
                            await HansungInfoActions.professorTextHandle(false);
                            this.setState({ deletemodal: false });
                            await this.deletehansungInfo();
                        }}
                        closeHandler={() => this.setState({ deletemodal: false })}
                    />
                    <CustomModal
                        width={295}
                        height={311}
                        children={
                            <CustomModalBlackText>
                                로그아웃 하시겠습니까?
                            </CustomModalBlackText>
                        }
                        visible={this.state.logoutmodal}
                        footerHandler={async () => {
                            await this.renderLogout();
                            this.setState({ logoutmodal: false });
                        }}
                        closeHandler={() => this.setState({ logoutmodal: false })}
                    />
                    <CustomModal
                        width={325}
                        height={311}
                        children={
                            <CustomModalBlackSmallText>
                                탈퇴 시 모든 정보가 즉시 삭제되며 복구할 수 없습니다. 모든 정보
                                삭제에 동의하시면 탈퇴를 진행하세요.
                            </CustomModalBlackSmallText>
                        }
                        visible={this.state.secessionmodal}
                        footerHandler={async () => {
                            this.setState({ secessionmodal: false });
                            this.props.navigation.navigate("Secession");
                        }}
                        footerText={"계속하기"}
                        closeHandler={() => this.setState({ secessionmodal: false })}
                    />
                    <BottomMenuModal
                        visible={this.state.bottomModal}
                        handler={() => {this.setState({bottomModal: false})}}
                        takeHandler={async () => {
                            await this.takePicture();
                            this.setState({bottomModal: false});
                        }}
                        uploadHandler={async () => {
                            await this.SelectedPicture();
                            await MyInfoActions.avatarDeleteHandle(false);
                            this.setState({bottomModal: false})
                        }}
                        deleteHandler={ async () => {
                            await MyInfoActions.avatarDeleteHandle(true);
                            await MyInfoActions.deleteAvatar();
                            this.setState({bottomModal: false});
                        }}
                    />
                    <TitleView>
                        <TouchableOpacity onPress={() => this.navigateBack()}>
                            <Image
                                style={{
                                    width: widthPercentageToDP(28),
                                    height: widthPercentageToDP(28)
                                }}
                                source={require("../../../assets/image/myInfo/back.png")}
                            />
                        </TouchableOpacity>
                        <View
                            style={{ position: "relative", left: widthPercentageToDP(106) }}
                        >
                            <Text
                                style={{
                                    fontSize: widthPercentageToDP(18),
                                    fontFamily: fonts.nanumBarunGothic,
                                    color: "black"
                                }}
                            >
                                마이페이지
                            </Text>
                        </View>
                    </TitleView>

                    <AccountInfoView>
                        {
                            this.props.userAvatar ?
                                <Image
                                    style={styles.profile}
                                    source={{uri: this.props.userAvatar}}
                                />
                                :
                                this.props.avatarDelete == false && this.props.avatar ?
                                    <Image
                                        style={styles.profile}
                                        source={{uri: this.props.avatar}}
                                    />
                                    :
                                    <Image
                                        style={styles.nonProfile}
                                        source={require("../../../assets/image/myInfo/group_1455.png")}
                                    />
                        }
                        <TouchableOpacity
                            style={{
                                position: "relative",
                                left: widthPercentageToDP(20.3),
                                top: widthPercentageToDP(33.2)
                            }}
                            onPress={ () => {this.setState({bottomModal: true})}}
                        >
                            <Image
                                style={{
                                    width: widthPercentageToDP(22),
                                    height: widthPercentageToDP(22)
                                }}
                                source={require("../../../assets/image/myInfo/write.png")}
                            />
                        </TouchableOpacity>
                        <View
                            style={{ position: "absolute", top: widthPercentageToDP(66) }}
                        >
                            <Text
                                style={{
                                    fontSize: widthPercentageToDP(15),
                                    fontFamily: fonts.nanumBarunGothicB,
                                    color: "black"
                                }}
                            >
                                {this.props.userNickName}
                            </Text>
                        </View>
                        <View
                            style={{ position: "absolute", top: widthPercentageToDP(85) }}
                        >
                            <Text
                                style={{
                                    fontSize: widthPercentageToDP(12),
                                    fontFamily: fonts.nanumBarunGothic,
                                    color: "#888888"
                                }}
                            >
                                {this.props.userId}
                            </Text>
                        </View>
                    </AccountInfoView>

                    <SubTitleView>
                        <StandText>종합정보시스템 인증</StandText>
                    </SubTitleView>
                    <CertificationView>
                        {this.props.myInfo_loading == true ? (
                            <View style={[styles.certView, styles.myinfoShadow]}>
                                <UIActivityIndicator size={20} style={{zIndex: 1, position: 'relative', top: widthPercentageToDP(78.5)}} color={"grey"} />
                                <Image style={{
                                    width: widthPercentageToDP(375),
                                    height: widthPercentageToDP(157)
                                }}
                                       source={require("../../../assets/image/myInfo/box_0.png")} />
                            </View>
                        ) : this.props.hansunginfo == null ? (
                            <TouchableOpacity onPress={() => {
                                this.navigateCertification();
                            }}>
                                <Image style={{
                                    width: widthPercentageToDP(375),
                                    height: widthPercentageToDP(157)
                                }}
                                       source={require("../../../assets/image/myInfo/box_1.png")} />
                            </TouchableOpacity>
                        ) : this.props.hansunginfo != null && this.props.hansunginfo.status == "FAIL" ? (
                            <View>
                                <View style={{zIndex: 1, position: "relative", left: widthPercentageToDP(46), top: widthPercentageToDP(54)}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <StandText style={{width: widthPercentageToDP(211), height: widthPercentageToDP(19)}}>
                                            학번과 비밀번호를 다시 확인해주세요
                                        </StandText>
                                        <StandText style={{
                                            marginLeft: widthPercentageToDP(18),
                                            fontFamily: fonts.nanumBarunGothicB,
                                            color: "#ff6464"}}>인증실패</StandText>
                                    </View>
                                    <View style={{alignItems: 'flex-end' , width: widthPercentageToDP(298), marginTop: widthPercentageToDP(28)}}>
                                        <TouchableOpacity
                                            style={{flexDirection: "row", alignItems: "center"}}
                                            onPress={() => {
                                                this.setState({ deletemodal: true });
                                            }}
                                        >
                                            <StandText
                                                style={{
                                                    fontSize: widthPercentageToDP(10),
                                                    color: "#9e9e9e"
                                                }}
                                            >
                                                다시 인증하기
                                            </StandText>
                                            <Image
                                                style={{
                                                    width: widthPercentageToDP(28),
                                                    height: widthPercentageToDP(28)
                                                }}
                                                source={require("../../../assets/image/myInfo/grayarrow.png")}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Image style={{
                                    zIndex:0,
                                    position: 'absolute',
                                    width: widthPercentageToDP(375),
                                    height: widthPercentageToDP(157)
                                }}
                                       source={require("../../../assets/image/myInfo/box_2.png")} />
                            </View>
                        ) : this.props.hansunginfo != null && this.props.hansunginfo.status == "SUCCESS" ? (
                            <View>
                                <View style={{zIndex: 1, position: "relative", left: widthPercentageToDP(46), top: widthPercentageToDP(54)}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <StandText style={{width: widthPercentageToDP(211), height: widthPercentageToDP(19)}}>
                                            {this.props.hansunginfo.hansungInfoId}
                                        </StandText>
                                        <StandText style={{
                                            marginLeft: widthPercentageToDP(18),
                                            fontFamily: fonts.nanumBarunGothicB,
                                            color: "#259ffa"}}>인증완료</StandText>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' , width: widthPercentageToDP(298), marginTop: widthPercentageToDP(28)}}>
                                        <StandText
                                            style={{
                                                fontSize: widthPercentageToDP(10),
                                                color: "#9e9e9e",
                                                height: widthPercentageToDP(28),
                                                paddingTop: widthPercentageToDP(9),
                                            }}
                                        >
                                            {this.props.hansunginfo.department}
                                        </StandText>
                                        <TouchableOpacity
                                            style={{flexDirection: "row", alignItems: "center"}}
                                            onPress={() => {
                                                this.setState({ deletemodal: true });
                                            }}
                                        >
                                            <StandText
                                                style={{
                                                    fontSize: widthPercentageToDP(10),
                                                    color: "#9e9e9e"
                                                }}
                                            >
                                                인증서 삭제
                                            </StandText>
                                            <Image
                                                style={{
                                                    width: widthPercentageToDP(28),
                                                    height: widthPercentageToDP(28)
                                                }}
                                                source={require("../../../assets/image/myInfo/grayarrow.png")}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Image style={{
                                    zIndex:0,
                                    position: 'absolute',
                                    width: widthPercentageToDP(375),
                                    height: widthPercentageToDP(157)
                                }}
                                       source={require("../../../assets/image/myInfo/box_2.png")} />
                            </View>
                        ) : (
                            <View>
                                <View style={{zIndex: 1, position: "relative", left: widthPercentageToDP(46), top: widthPercentageToDP(54)}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View
                                            style={{
                                                flexDirection: "column",
                                                width: widthPercentageToDP(211)
                                            }}
                                        >
                                            <StandText>서버오류로 인하여 잠시뒤</StandText>
                                            <StandText>다시 시도해주세요</StandText>
                                        </View>
                                        <StandText style={{
                                            marginLeft: widthPercentageToDP(18),
                                            fontFamily: fonts.nanumBarunGothicB,
                                            color: "#ff6464"}}>인증실패</StandText>
                                    </View>
                                    <View style={{alignItems: 'flex-end' , width: widthPercentageToDP(298), marginTop: widthPercentageToDP(15)}}>
                                        <TouchableOpacity
                                            style={{flexDirection: "row", alignItems: "center"}}
                                            onPress={() => {
                                                this.setState({ deletemodal: true });
                                            }}
                                        >
                                            <StandText
                                                style={{
                                                    fontSize: widthPercentageToDP(10),
                                                    color: "#9e9e9e"
                                                }}
                                            >
                                                다시 인증하기
                                            </StandText>
                                            <Image
                                                style={{
                                                    width: widthPercentageToDP(28),
                                                    height: widthPercentageToDP(28)
                                                }}
                                                source={require("../../../assets/image/myInfo/grayarrow.png")}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Image style={{
                                    zIndex:0,
                                    position: 'absolute',
                                    width: widthPercentageToDP(375),
                                    height: widthPercentageToDP(157)
                                }}
                                       source={require("../../../assets/image/myInfo/box_2.png")} />
                            </View>
                        )}
                    </CertificationView>

                    <SubTitleView>
                        <StandText>Account</StandText>
                    </SubTitleView>
                    <AccountDetailView>
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                            onPress={() => {
                                this.navigateMyPost();
                            }}
                        >
                            <AccountDetailText>내가 쓴 글</AccountDetailText>
                            <View
                                style={{ flexDirection: "row", alignItems: "center" }}
                                onPress={() => {
                                    this.navigateMyPost();
                                }}
                            >
                                <Image
                                    style={{
                                        width: widthPercentageToDP(28),
                                        height: widthPercentageToDP(28)
                                    }}
                                    source={require("../../../assets/image/myInfo/grayarrow.png")}
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.devisionLine} />
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                            onPress={() => {
                                this.navigateMyScrap();
                            }}
                        >
                            <AccountDetailText>내가 스크랩한 글</AccountDetailText>
                            <View
                                style={{ flexDirection: "row", alignItems: "center" }}
                            >
                                <Image
                                    style={{
                                        width: widthPercentageToDP(28),
                                        height: widthPercentageToDP(28)
                                    }}
                                    source={require("../../../assets/image/myInfo/grayarrow.png")}
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.devisionLine} />
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                            onPress={() => {
                                this.navigateAccountInfo();
                            }}
                        >
                            <AccountDetailText>계정정보</AccountDetailText>
                            <View
                                style={{ flexDirection: "row", alignItems: "center" }}
                            >
                                <Image
                                    style={{
                                        width: widthPercentageToDP(28),
                                        height: widthPercentageToDP(28)
                                    }}
                                    source={require("../../../assets/image/myInfo/grayarrow.png")}
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.devisionLine} />
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                            onPress={() => {
                                this.setState({ logoutmodal: true });
                            }}
                        >
                            <AccountDetailText>로그아웃</AccountDetailText>
                            <View
                                style={{ flexDirection: "row", alignItems: "center" }}
                            >
                                <Image
                                    style={{
                                        width: widthPercentageToDP(28),
                                        height: widthPercentageToDP(28)
                                    }}
                                    source={require("../../../assets/image/myInfo/grayarrow.png")}
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.devisionLine} />
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                            onPress={() => {
                                this.setState({ secessionmodal: true });
                            }}
                        >
                            <AccountDetailText>회원탈퇴</AccountDetailText>
                            <View
                                style={{ flexDirection: "row", alignItems: "center" }}
                            >
                                <Image
                                    style={{
                                        width: widthPercentageToDP(28),
                                        height: widthPercentageToDP(28)
                                    }}
                                    source={require("../../../assets/image/myInfo/grayarrow.png")}
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.devisionLine} />
                    </AccountDetailView>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    certView: {
        justifyContent: "center",
        alignItems: "center",
        width: widthPercentageToDP(317),
        height: widthPercentageToDP(111),
        backgroundColor: "white",
        borderRadius: widthPercentageToDP(6),
        marginHorizontal: widthPercentageToDP(29),
        marginVertical: widthPercentageToDP(22.5)
    },
    failView: {
        width: widthPercentageToDP(317),
        height: widthPercentageToDP(111),
        backgroundColor: "#f8f8f8",
        borderRadius: widthPercentageToDP(6),
        marginHorizontal: widthPercentageToDP(29),
        marginVertical: widthPercentageToDP(22.5)
    },
    myinfoShadow: {
        ...Platform.select({
            ios: {
                shadowColor: "rgba(80, 80, 80, 0.16)",
                shadowRadius: 6,
                shadowOffset: { height: 4 },
                shadowOpacity: 0.3
            },
            android: {
                elevation: 1
            }
        })
    },
    devisionLine: {
        height: widthPercentageToDP(1),
        marginRight: widthPercentageToDP(11.1),
        marginTop: widthPercentageToDP(11.5),
        marginBottom: widthPercentageToDP(13.5),
        backgroundColor: "#f8f8f8"
    },
    profile: {
        position: "absolute",
        width: widthPercentageToDP(60),
        height: widthPercentageToDP(60),
        borderRadius: widthPercentageToDP(30)
    },
    nonProfile: {
        position: "absolute",
        top: widthPercentageToDP(-6),
        width: widthPercentageToDP(72),
        height: widthPercentageToDP(72),
        borderRadius: widthPercentageToDP(27.5),

    }
});

export default connect(state => ({
    hansunginfo: state.hansung.hansunginfo,
    myInfo_loading: state.hansung.myInfo_loading,
    loading: state.hansung.loading,
    professor_text: state.hansung.professor_text,

    userNickName: state.signin.user.userNickName,
    userId: state.signin.user.userId,
    major: state.signin.user.major,

    userAvatar: state.myInfo.userAvatar,
    avatar: state.signin.user.avatar,
    avatarDelete: state.myInfo.avatarDelete,
}))(MyInfo);
