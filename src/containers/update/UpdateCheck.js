import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Text } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import {
  AuthActions,
  SignInActions,
  CommonActions,
  AlarmActions,
  LockActions,
  HansungInfoActions,
  HomeActions
} from "../../store/actionCreator";
import OneSignal from "react-native-onesignal";

class UpdateCheck extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progress: true
    };
  }

  async componentDidMount() {
    try {
      const result = await Promise.all([
        AuthActions.checkIntro(),
        CommonActions.commonInit(),
        LockActions.lockInit(),
        AlarmActions.alarmInit()
      ]);
      const auth = result[0];
      HomeActions.initHomeMenu();
      CommonActions.getAppVersion();
      CommonActions.getTrack();
      CommonActions.getAdmissionYear();
      CommonActions.getTerm1();
      CommonActions.getTerm2();

      OneSignal.getPermissionSubscriptionState(async status => {
        const result = await SignInActions.checkToken(status.userId);
        if (result) await HansungInfoActions.getHansungInfo();
        if (auth) {
          if (this.props.passLock) this.props.navigation.navigate("locksolve");
          else this.props.navigation.navigate(this.props.signin_navigate);
        } else {
          this.props.navigation.navigate("intro");
        }
      });
    } catch (e) {}
  }

  render() {
    return (
      <View style={styles.container}>
        <UIActivityIndicator color={"grey"} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }
});

export default connect(({ auth, signin, lock, vote }) => ({
  passLock: lock.passLock,
  signin_navigate: signin.signin_navigate,
  getVote: vote.getVote
}))(UpdateCheck);
