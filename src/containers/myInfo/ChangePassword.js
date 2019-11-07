import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import { checkPass, checkPassCompare } from "../../utils/validation";
import { showMessage, widthPercentageToDP } from "../../utils/util";
import {
  SECText,
  PassStandText,
  PassCheckText,
  CustomModalBlackText
} from "../../components/myInfo/Text";
import { connect } from "react-redux";
import fonts from "../../configs/fonts";
import { MyInfoActions } from "../../store/actionCreator";
import { CustomModal } from "../../components/common/Modal";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      successModal: false,
      nowPass: "",
      changePass: "",
      passCheck: ""
    };
  }

  navigategoBack = () => {
    this.props.navigation.goBack();
  };

  setInputRef = ref => {
    this.inputRef = ref;

    const { getRef } = this.props;

    if (getRef) {
      getRef(ref);
    }
  };

  renderSubmit = () => {
    if (
      this.state.nowPass != "" &&
      this.state.changePass != "" &&
      this.state.passCheck != ""
    ) {
      return (
        <TouchableOpacity
          style={styles.submit}
          onPress={async () => {
            // 현재 비밀번호 체크, 새로운 비밀번호 일치 비교, 현재 비밀번호와 새로운 비밀번호 비교 체크
            let check = await MyInfoActions.passwordCheck(this.state.nowPass);
            let comparePass = checkPassCompare(
              this.state.changePass,
              this.state.passCheck
            );
            let compareChange = checkPassCompare(
              this.state.nowPass,
              this.state.passCheck
            );

            if (
              check &&
              checkPass(this.state.passCheck) &&
              comparePass &&
              !compareChange
            ) {
              this.setState({ successModal: true });
            } else {
              switch (true) {
                case check == false:
                  showMessage("현재 비밀번호가 틀립니다.");
                  break;
                case checkPass(this.state.passCheck) == false:
                  showMessage("비밀번호 조건에 만족하지 않습니다.");
                  break;
                case comparePass == false:
                  showMessage("새로운 비밀번호가 일치하지 않습니다.");
                  break;
                case compareChange == true:
                  showMessage("현재 비밀번호와 동일합니다.");
                  break;
              }
            }
          }}
        >
          <Text style={styles.submitText}>저장하기</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.submitDisable}>
          <Text style={styles.submitText}>저장하기</Text>
        </View>
      );
    }
  };

  validCheck = () => {
    if (
      this.state.changePass != "" &&
      checkPass(this.state.changePass) == true
    ) {
      return (
        <PassCheckText style={{ color: "#5ec133" }}>
          비밀번호 조건에 만족합니다.
        </PassCheckText>
      );
    } else {
      return this.state.changePass == "" ? null : (
        <PassCheckText>비밀번호 조건을 만족하지 않습니다.</PassCheckText>
      );
    }
  };

  compareCheck = () => {
    if (this.state.passCheck == "") {
      return null;
    } else {
      return checkPassCompare(this.state.changePass, this.state.passCheck) ==
        false ? (
        <PassCheckText>비밀번호가 일치하지않습니다.</PassCheckText>
      ) : (
        <PassCheckText style={{ color: "#5ec133" }}>
          비밀번호가 일치합니다.
        </PassCheckText>
      );
    }
  };

  render() {
    return (
      <SafeAreaView>
        <CustomModal
          width={295}
          height={311}
          children={
            <CustomModalBlackText>
              비밀번호 수정되었습니다.
            </CustomModalBlackText>
          }
          visible={this.state.successModal}
          footerHandler={async () => {
            await MyInfoActions.changePassHandle(
              this.state.nowPass,
              this.state.changePass
            );
            this.setState({ successModal: false });
            this.navigategoBack();
          }}
          closeHandler={() => this.setState({ successModal: false })}
        />
        <ScrollView>
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
              <SECText>비밀번호 변경</SECText>
            </View>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={styles.container}
          >
            <PassStandText style={{ marginBottom: widthPercentageToDP(17) }}>
              {"소중한 정보 보호를 위해\n현재 비밀번호를 확인해 주세요"}
            </PassStandText>
            <TextInput
              autoCapitalize={"none"}
              onChangeText={nowPass => {
                this.setState({ nowPass });
              }}
              value={this.state.nowPass}
              style={styles.inputBorder}
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              placeholderTextColor={"#9e9e9e"}
              selectionColor={"#24a0fa"}
              // returnKeyType={"next"}
            />
            <PassStandText>{"새로운 비밀번호"}</PassStandText>
            <TextInput
              autoCapitalize={"none"}
              onChangeText={changePass => {
                this.setState({ changePass });
              }}
              value={this.state.changePass}
              style={
                this.state.changePass == ""
                  ? styles.inputBorder
                  : styles.notInputBorder
              }
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              placeholderTextColor={"#9e9e9e"}
              selectionColor={"#24a0fa"}
              returnKeyType={"next"}
              onSubmitEditing={() => {
                this.inputRef.focus();
              }}
              ref={this.setInputRef}
            />
            {this.validCheck()}
            <PassStandText>{"새로운 비밀번호 확인"}</PassStandText>
            <TextInput
              autoCapitalize={"none"}
              onChangeText={passCheck => {
                this.setState({ passCheck });
              }}
              value={this.state.passCheck}
              style={
                this.state.passCheck == ""
                  ? styles.inputBorder
                  : styles.notInputBorder
              }
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              placeholderTextColor={"#9e9e9e"}
              selectionColor={"#24a0fa"}
              ref={this.setInputRef}
            />
            {this.compareCheck()}

            {this.renderSubmit()}
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: widthPercentageToDP(43),
    marginTop: widthPercentageToDP(35.5),
    marginBottom: widthPercentageToDP(65)
  },
  // 값 비었을 때
  inputBorder: {
    borderColor: "#dbdbdb",
    width: widthPercentageToDP(279),
    height: widthPercentageToDP(44),
    marginBottom: widthPercentageToDP(40),
    borderWidth: widthPercentageToDP(1),
    borderRadius: widthPercentageToDP(8),
    paddingLeft: widthPercentageToDP(13),
    fontFamily: fonts.nanumBarunGothic
  },
  // 값 있을 때
  notInputBorder: {
    borderColor: "#dbdbdb",
    width: widthPercentageToDP(279),
    height: widthPercentageToDP(44),
    marginBottom: widthPercentageToDP(5),
    borderWidth: widthPercentageToDP(1),
    borderRadius: widthPercentageToDP(8),
    paddingLeft: widthPercentageToDP(13),
    fontFamily: fonts.nanumBarunGothic
  },
  submitText: {
    color: "white",
    fontSize: widthPercentageToDP(14),
    fontFamily: fonts.nanumBarunGothic
  },
  submitDisable: {
    backgroundColor: "#4a4a4a4d",
    justifyContent: "center",
    alignItems: "center",
    width: widthPercentageToDP(289),
    height: widthPercentageToDP(53),
    borderRadius: widthPercentageToDP(8),
    marginTop: widthPercentageToDP(5)
  },
  submit: {
    backgroundColor: "#24a0fa",
    justifyContent: "center",
    alignItems: "center",
    width: widthPercentageToDP(289),
    height: widthPercentageToDP(53),
    borderRadius: widthPercentageToDP(8),
    marginTop: widthPercentageToDP(5)
  }
});

export default connect(state => ({
  ChangePassword: state.myInfo.userPass
}))(ChangePassword);
