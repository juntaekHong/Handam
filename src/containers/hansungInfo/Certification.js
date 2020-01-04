import React from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Platform,
  View,
  Text,
  Image,
  StyleSheet,
  Keyboard
} from "react-native";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import { connect } from "react-redux";
import { HansungInfoActions } from "../../store/actionCreator";
import { CustomModal } from "../../components/common/Modal";
import encryptionImg from "../../../assets/image/hansungInfo/encryption.png";
import dotsImg from "../../../assets/image/hansungInfo/dots.png";

class Certification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hansung_id: "",
      hansung_pass: "",
      modal : false,
    };
  }

  navigationBack = () => {
    this.props.navigation.goBack(null);
  };

  renderSubmit = () => {
    if (this.state.hansung_id != "" && this.state.hansung_pass != "") {
      return (
        <TouchableOpacity
          style={styles.submit}
          onPress={async() => {Keyboard.dismiss();this.setState({modal:true})}}
        >
          <Text style={styles.submitText}>인증하기</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.submitDisable}>
          <Text style={styles.submitText}>인증하기</Text>
        </View>
      );
    }
  };

  setInputRef = ref => {
    this.inputRef = ref;

    const { getRef } = this.props;

    if (getRef) {
      getRef(ref);
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <CustomModal
            height={476}
            children={
              <View style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Image source={encryptionImg} style={{
                  width: widthPercentageToDP(280),
                  height: widthPercentageToDP(160)
                  }} 
                />
                <Image source={dotsImg} style={{
                  width:widthPercentageToDP(20), 
                  height:widthPercentageToDP(20),
                  marginBottom:widthPercentageToDP(13)
                  }} 
                />
                <Text style={{
                  color: '#259ffa', 
                  fontSize: widthPercentageToDP(20), 
                  fontFamily: fonts.nanumBarunGothicB,
                  textAlign: 'center',
                  marginBottom: widthPercentageToDP(11)}}>아이디 / 비밀번호 암호화</Text>
                <Text style={{
                  color: '#646464', 
                  fontSize: widthPercentageToDP(13), 
                  fontFamily: fonts.nanumBarunGothic,
                  lineHeight: widthPercentageToDP(22),
                  textAlign: 'center'}}>
                  {`학우님의 아이디와 비밀번호가 암호화 되었습니다.\n확인을 눌러주세요.`}
                </Text>
              </View>
            }
            visible={this.state.modal}
            footerHandler={async() => {
              Keyboard.dismiss();
              let hansunginfo = new Object();
              hansunginfo.hansungInfoId = this.state.hansung_id;
              hansunginfo.hansungInfoPw = this.state.hansung_pass;

              this.setState({ loading: true });

              await HansungInfoActions.createHansungInfo(hansunginfo);
              // await this.certification_Check();
              await HansungInfoActions.myInfoLoadingHandle(true);
              await HansungInfoActions.loadingHandle(true);
              this.props.navigation.navigate("MyInfo");
              this.setState({ modal: false });
            }}
            closeHandler={() => this.setState({ modal: false })}
          />
          <View 
            style={{
              alignItems: "flex-end",
              marginRight: widthPercentageToDP(20.9),
              marginTop: widthPercentageToDP(21.8)
            }}
          >
            <TouchableOpacity
              onPress={async () => {
                this.navigationBack();
              }}
            >
              <Image
                style={{
                  width: widthPercentageToDP(28),
                  height: widthPercentageToDP(28)
                }}
                source={require("../../../assets/image/hansungInfo/close.png")}
              />
            </TouchableOpacity>
          </View>
          <TouchableWithoutFeedback>
            <View style={styles.inner}>
              <View
                style={{
                  marginTop: widthPercentageToDP(76.9),
                  marginBottom: widthPercentageToDP(53)
                }}
              >
                <Text
                  style={{
                    position: "absolute",
                    left: widthPercentageToDP(48),
                    fontSize: widthPercentageToDP(20),
                    fontFamily: fonts.nanumBarunGothic,
                    color: "black",
                    textAlign: "center"
                  }}
                >
                  {"종합정보시스템을 통한\n인증입니다."}
                </Text>
                <View
                  style={{
                    width: widthPercentageToDP(125),
                    height: widthPercentageToDP(7),
                    position: "relative",
                    left: widthPercentageToDP(48),
                    top: widthPercentageToDP(15),
                    backgroundColor: "#2fd7ff",
                    opacity: 0.3,
                    borderRadius: widthPercentageToDP(5)
                  }}
                />
              </View>

              <Text
                style={
                  this.state.hansung_id != ""
                    ? styles.hiddenText
                    : [styles.emptyText]
                }
              >
                {this.state.hansung_id != "" ? "종합정보시스템 학번" : ""}
              </Text>
              <TextInput
                autoCapitalize={"none"}
                onChangeText={hansung_id => {
                  this.setState({ hansung_id });
                }}
                value={this.state.hansung_id}
                style={
                  this.state.hansung_id != ""
                    ? styles.inputText
                    : styles.notInputText
                }
                underlineColorAndroid="transparent"
                placeholderTextColor={"#9e9e9e"}
                placeholder={"종합정보시스템 학번"}
                selectionColor={"#24a0fa"}
                keyboardType={"number-pad"}
                returnKeyType={"next"}
                onSubmitEditing={() => {
                  this.inputRef.focus();
                }}
              />

              <Text
                style={
                  this.state.hansung_pass != ""
                    ? styles.hiddenText
                    : styles.emptyText
                }
              >
                {this.state.hansung_pass != "" ? "종합정보시스템 비밀번호" : ""}
              </Text>
              <TextInput
                autoCapitalize={"none"}
                onChangeText={hansung_pass => {
                  this.setState({ hansung_pass });
                }}
                value={this.state.hansung_pass}
                style={
                  this.state.hansung_pass != ""
                    ? styles.inputText
                    : styles.notInputText
                }
                underlineColorAndroid="transparent"
                placeholder={"종합정보시스템 비밀번호"}
                placeholderTextColor={"#9e9e9e"}
                selectionColor={"#24a0fa"}
                secureTextEntry={true}
                ref={this.setInputRef}
              />

              {this.renderSubmit()}
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
  inner: {
    marginHorizontal: widthPercentageToDP(43),
    flex: 1,
    justifyContent: "flex-end"
  },
  inputText: {
    borderColor: "#24a0fa",
    marginBottom: widthPercentageToDP(31),
    borderBottomWidth: widthPercentageToDP(1),
    fontFamily: fonts.nanumBarunGothic
  },
  notInputText: {
    borderColor: "#9e9e9e",
    marginBottom: widthPercentageToDP(31),
    borderBottomWidth: widthPercentageToDP(1),
    fontFamily: fonts.nanumBarunGothic
  },
  hiddenText: {
    fontSize: widthPercentageToDP(12),
    color: "#000000",
    fontFamily: fonts.nanumBarunGothic
  },
  emptyText: {
    fontSize: widthPercentageToDP(12)
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
  hansunginfo: state.hansung.hansunginfo
}))(Certification);
