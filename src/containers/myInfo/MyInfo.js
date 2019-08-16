import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  StyleSheet
} from "react-native";
import {
  removeData,
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
import { connect } from "react-redux";
import {
  CustomModalBlackSmallText,
  CustomModalBlackText
} from "../../components/myInfo/Text";
import { UIActivityIndicator } from "react-native-indicators";
import { HansungInfoActions } from "../../store/actionCreator";
import { myInfoLoadingHandle } from "../../store/modules/hansungInfo/hansungInfo";

class MyInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // 인증서 삭제, 로그아웃, 회원탈퇴 모달
      deletemodal: false,
      logoutmodal: false,
      secessionmodal: false,
      certCheck: this.props.loading
    };
  }

  certification_Check = async () => {
    await HansungInfoActions.getHansungInfo();

    let timeout = setInterval(async () => {
      if (
          this.props.hansunginfo != null &&
          this.props.hansunginfo.status == "UNVERIFIED" &&
          this.state.certCheck == true
      ) {
        await HansungInfoActions.getHansungInfo();
      } else if (this.props.hansunginfo.status == "SUCCESS") {
        await this.setState({ certCheck: false });
        await HansungInfoActions.loadingHandle(false);
        await HansungInfoActions.myInfoLoadingHandle(false);
        // 시간표 호출
        // await HansungInfoActions.scheduleCallAction(true);

        clearInterval(timeout);
      } else if (this.props.hansunginfo.status == "FAIL") {
        await this.setState({ certCheck: false });
        await HansungInfoActions.loadingHandle(false);
        await HansungInfoActions.myInfoLoadingHandle(false);
        clearInterval(timeout);
      }
    }, 5000);
  };

  componentWillMount = async () => {
    this.setState({ logoutmodal: false });

    if (this.state.certCheck == true && this.props.myInfo_loading == true) {
      await this.certification_Check();
    }
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

  navigateTeamInfo = () => {
    this.props.navigation.navigate("TeamInfo");
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
        await HansungInfoActions.myInfoLoadingHandle(false);
        clearInterval(timeout);
      } else {
        await HansungInfoActions.deleteHansungInfo();
      }
    }, 500);
  };

  renderLogout = async () => {
    await removeAllData();
    this.props.navigation.navigate("signIn");
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
                    인증을 삭제하시겠습니까?
                  </CustomModalBlackText>
                }
                visible={this.state.deletemodal}
                footerHandler={async () => {
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
              <Image
                  style={{
                    position: "absolute",
                    width: widthPercentageToDP(66),
                    height: widthPercentageToDP(66)
                  }}
                  source={require("../../../assets/image/hansungInfo/myicon.png")}
              />
              {/* 클릭시 사진 추가 기능 */}
              <TouchableOpacity
                  style={{
                    position: "relative",
                    left: widthPercentageToDP(20.3),
                    top: widthPercentageToDP(33.2)
                  }}
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
                    <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "white"
                        }}
                    >
                      <UIActivityIndicator color={"grey"} />
                    </View>
                  </View>
              ) : this.props.hansunginfo == null ? (
                  <View style={[styles.certView, styles.myinfoShadow]}>
                    <TouchableOpacity
                        onPress={() => {
                          this.navigateCertification();
                        }}
                    >
                      <Image
                          style={{
                            width: widthPercentageToDP(65),
                            height: widthPercentageToDP(65)
                          }}
                          source={require("../../../assets/image/myInfo/plus.png")}
                      />
                    </TouchableOpacity>
                  </View>
              ) : this.props.hansunginfo.status == "FAIL" ? (
                  <View style={[styles.failView, styles.myinfoShadow]}>
                    <View
                        style={{
                          flexDirection: "row",
                          paddingTop: widthPercentageToDP(31),
                          paddingBottom: widthPercentageToDP(21),
                          paddingLeft: widthPercentageToDP(17),
                          backgroundColor: "white"
                        }}
                    >
                      <StandText>학번과 비밀번호를 다시 확인해주세요</StandText>
                      <StandText
                          style={{
                            marginLeft: widthPercentageToDP(18),
                            fontFamily: fonts.nanumBarunGothicB,
                            color: "#ff6464"
                          }}
                      >
                        인증실패
                      </StandText>
                    </View>
                    <View
                        style={{
                          alignItems: "flex-end",
                          paddingTop: widthPercentageToDP(12),
                          paddingRight: widthPercentageToDP(10)
                        }}
                    >
                      <TouchableOpacity
                          style={{ flexDirection: "row", alignItems: "center" }}
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
              ) : this.props.hansunginfo.status == "SUCCESS" ? (
                  <View style={[styles.failView, styles.myinfoShadow]}>
                    <View
                        style={{
                          flexDirection: "row",
                          paddingTop: widthPercentageToDP(25),
                          paddingBottom: widthPercentageToDP(21),
                          paddingLeft: widthPercentageToDP(17),
                          backgroundColor: "white"
                        }}
                    >
                      <View
                          style={{
                            flexDirection: "column",
                            width: widthPercentageToDP(169)
                          }}
                      >
                        <StandText>
                          {this.props.hansunginfo.hansungInfoId}
                        </StandText>
                      </View>
                      <StandText
                          style={{
                            marginLeft: widthPercentageToDP(60),
                            fontFamily: fonts.nanumBarunGothicB,
                            color: "#259ffa"
                          }}
                      >
                        인증완료
                      </StandText>
                    </View>
                    <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingTop: widthPercentageToDP(12),
                          paddingRight: widthPercentageToDP(10)
                        }}
                    >
                      <StandText
                          style={{
                            marginLeft: widthPercentageToDP(19),
                            fontSize: widthPercentageToDP(10),
                            color: "#9e9e9e"
                          }}
                      >
                        {this.props.hansunginfo.department}
                      </StandText>
                      <TouchableOpacity
                          style={{ flexDirection: "row", alignItems: "center" }}
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
              ) : (
                  <View style={[styles.failView, styles.myinfoShadow]}>
                    <View
                        style={{
                          flexDirection: "row",
                          paddingTop: widthPercentageToDP(25),
                          paddingBottom: widthPercentageToDP(6),
                          paddingLeft: widthPercentageToDP(17),
                          backgroundColor: "white"
                        }}
                    >
                      <View
                          style={{
                            flexDirection: "column",
                            width: widthPercentageToDP(211)
                          }}
                      >
                        <StandText>서버오류로 인하여 잠시뒤</StandText>
                        <StandText>다시 시도해주세요</StandText>
                      </View>
                      <StandText
                          style={{
                            marginLeft: widthPercentageToDP(18),
                            fontFamily: fonts.nanumBarunGothicB,
                            color: "#ff6464"
                          }}
                      >
                        인증실패
                      </StandText>
                    </View>
                    <View
                        style={{
                          alignItems: "flex-end",
                          paddingTop: widthPercentageToDP(12),
                          paddingRight: widthPercentageToDP(10)
                        }}
                    >
                      <TouchableOpacity
                          style={{ flexDirection: "row", alignItems: "center" }}
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
              )}
            </CertificationView>

            <SubTitleView>
              <StandText>Account</StandText>
            </SubTitleView>
            <AccountDetailView>
              <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
              >
                <TouchableOpacity
                    onPress={() => {
                      this.navigateMyPost();
                    }}
                >
                  <AccountDetailText>내가 쓴 글</AccountDetailText>
                </TouchableOpacity>
                <TouchableOpacity
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
                </TouchableOpacity>
              </View>
              <View style={styles.devisionLine} />
              <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
              >
                <TouchableOpacity
                    onPress={() => {
                      this.navigateMyScrap();
                    }}
                >
                  <AccountDetailText>내가 스크랩한 글</AccountDetailText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => {
                      this.navigateMyScrap();
                    }}
                >
                  <Image
                      style={{
                        width: widthPercentageToDP(28),
                        height: widthPercentageToDP(28)
                      }}
                      source={require("../../../assets/image/myInfo/grayarrow.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.devisionLine} />
              <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
              >
                <TouchableOpacity
                    onPress={() => {
                      this.navigateAccountInfo();
                    }}
                >
                  <AccountDetailText>계정정보</AccountDetailText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => {
                      this.navigateAccountInfo();
                    }}
                >
                  <Image
                      style={{
                        width: widthPercentageToDP(28),
                        height: widthPercentageToDP(28)
                      }}
                      source={require("../../../assets/image/myInfo/grayarrow.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.devisionLine} />
              <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
              >
                <TouchableOpacity
                    onPress={() => {
                      this.setState({ logoutmodal: true });
                    }}
                >
                  <AccountDetailText>로그아웃</AccountDetailText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => {
                      this.setState({ logoutmodal: true });
                    }}
                >
                  <Image
                      style={{
                        width: widthPercentageToDP(28),
                        height: widthPercentageToDP(28)
                      }}
                      source={require("../../../assets/image/myInfo/grayarrow.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.devisionLine} />
              <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
              >
                <TouchableOpacity
                    onPress={() => {
                      this.setState({ secessionmodal: true });
                    }}
                >
                  <AccountDetailText>회원탈퇴</AccountDetailText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => {
                      this.setState({ secessionmodal: true });
                    }}
                >
                  <Image
                      style={{
                        width: widthPercentageToDP(28),
                        height: widthPercentageToDP(28)
                      }}
                      source={require("../../../assets/image/myInfo/grayarrow.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.devisionLine} />
              <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
              >
                <TouchableOpacity
                    onPress={() => {
                      this.navigateTeamInfo();
                    }}
                >
                  <AccountDetailText>팀 정보</AccountDetailText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => {
                      this.navigateTeamInfo();
                    }}
                >
                  <Image
                      style={{
                        width: widthPercentageToDP(28),
                        height: widthPercentageToDP(28)
                      }}
                      source={require("../../../assets/image/myInfo/grayarrow.png")}
                  />
                </TouchableOpacity>
              </View>
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
  }
});

export default connect(state => ({
  hansunginfo: state.hansung.hansunginfo,
  myInfo_loading: state.hansung.myInfo_loading,
  loading: state.hansung.loading,
  professor_text: state.hansung.professor_text,

  userNickName: state.signin.user.userNickName,
  userId: state.signin.user.userId,
  major: state.signin.user.major
}))(MyInfo);
