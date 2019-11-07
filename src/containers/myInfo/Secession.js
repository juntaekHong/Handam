import React from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import {
  CustomModalBlackSmallText,
  SECText
} from "../../components/myInfo/Text";
import { showMessage } from "../../utils/util";
import { MyInfoActions } from "../../store/actionCreator";
import { connect } from "react-redux";
import { CustomModal } from "../../components/common/Modal";

class Secession extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordCheck: "",
      paddingNull: false
    };
  }

  secessionBtn = () => {
    return this.state.passwordCheck == "" ? (
      <View style={styles.secessionBtn}>
        <Text
          style={{
            textAlign: "center",
            fontSize: widthPercentageToDP(14),
            fontFamily: fonts.nanumBarunGothicB,
            color: "white"
          }}
        >
          한담탈퇴하기
        </Text>
      </View>
    ) : (
      <TouchableOpacity
        style={styles.secessionBtnOk}
        onPress={async () => {
          let check = await MyInfoActions.passwordCheck(
            this.state.passwordCheck
          );

          if (check) {
            await MyInfoActions.failModalHandle(true);
          } else {
            await MyInfoActions.failModalHandle(false);
            await this.setState({ passwordCheck: "" });
            showMessage(
              "한담탈퇴를 실패하였습니다.\n비밀번호를 다시 입력하세요."
            );
          }
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: widthPercentageToDP(14),
            fontFamily: fonts.nanumBarunGothicB,
            color: "white"
          }}
        >
          한담탈퇴하기
        </Text>
      </TouchableOpacity>
    );
  };

  navigategoBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <CustomModal
          width={295}
          height={311}
          children={
            <CustomModalBlackSmallText>
              한담을 이용해주셔서 감사합니다. 탈퇴 절차가 완료되었습니다
            </CustomModalBlackSmallText>
          }
          visible={this.props.failmodal}
          footerHandler={async () => {
            await MyInfoActions.secessionDeleteHandle();
            await MyInfoActions.failModalHandle(false);
            this.props.navigation.navigate("signIn");
          }}
          closeHandler={async () => {
            await MyInfoActions.failModalHandle(false);
          }}
        />
        <View
          style={{
            height: widthPercentageToDP(120.5),
            borderBottomWidth: widthPercentageToDP(0.5),
            borderBottomColor: "#888888"
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "flex-end",
              marginTop: widthPercentageToDP(16),
              marginRight: widthPercentageToDP(14)
            }}
            onPress={() => {
              this.navigategoBack();
            }}
          >
            <Image
              width={widthPercentageToDP(28)}
              height={widthPercentageToDP(28)}
              source={require("../../../assets/image/myInfo/close.png")}
            />
          </TouchableOpacity>
          <View
            style={{
              alignItems: "flex-start",
              marginTop: widthPercentageToDP(45),
              marginLeft: widthPercentageToDP(25)
            }}
          >
            <SECText>회원탈퇴</SECText>
          </View>
        </View>
        <View style={{ paddingTop: widthPercentageToDP(106.5) }} />
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.inner}>
              <SECText
                style={{
                  textAlign: "center",
                  marginBottom: widthPercentageToDP(31)
                }}
              >
                본인 확인을 위해 비밀번호를 확인합니다
              </SECText>
              <TextInput
                style={
                  this.state.paddingNull == false
                    ? styles.textInput
                    : styles.textInput2
                }
                value={this.state.passwordCheck}
                onChangeText={passwordCheck => {
                  this.setState({ passwordCheck });
                }}
                maxLength={16}
                underlineColorAndroid={"transparent"}
                secureTextEntry={true}
                placeholder={"비밀번호"}
                onFocus={() => {
                  this.setState({ paddingNull: true });
                }}
                onEndEditing={() => {
                  this.setState({ paddingNull: false });
                }}
              />
              {this.secessionBtn()}
              <View style={{ flex: 1 }} />
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInput: {
    marginHorizontal: widthPercentageToDP(48),
    paddingLeft: widthPercentageToDP(13),
    marginBottom: widthPercentageToDP(206),
    borderWidth: widthPercentageToDP(1),
    borderRadius: widthPercentageToDP(8),
    borderColor: "#dbdbdb"
  },
  textInput2: {
    marginHorizontal: widthPercentageToDP(48),
    paddingLeft: widthPercentageToDP(13),
    marginBottom: widthPercentageToDP(50),
    borderWidth: widthPercentageToDP(1),
    borderRadius: widthPercentageToDP(8),
    borderColor: "#dbdbdb"
  },
  secessionBtn: {
    justifyContent: "center",
    marginHorizontal: widthPercentageToDP(43),
    height: widthPercentageToDP(53),
    borderRadius: widthPercentageToDP(8),
    backgroundColor: "#cad5dd"
  },
  secessionBtnOk: {
    justifyContent: "center",
    marginHorizontal: widthPercentageToDP(43),
    height: widthPercentageToDP(53),
    borderRadius: widthPercentageToDP(8),
    backgroundColor: "#24a0fa"
  },

  inner: {
    justifyContent: "flex-end"
  }
});

export default connect(state => ({
  failmodal: state.myInfo.failmodal
}))(Secession);
