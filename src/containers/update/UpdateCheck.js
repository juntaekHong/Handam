import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { AuthActions, SignInActions } from "../../store/actionCreator";
import OneSignal from "react-native-onesignal";

class UpdateCheck extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progress: true
    };
  }

  async componentDidMount() {
    const auth = await AuthActions.checkIntro();
    OneSignal.getPermissionSubscriptionState(async status => {
      await SignInActions.checkToken(status.userId);
      if (auth) {
        this.props.navigation.navigate(this.props.signin_navigate);
      } else {
        this.props.navigation.navigate("intro");
      }
    });
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

export default connect(({ auth, signin }) => ({
  signin_navigate: signin.signin_navigate
}))(UpdateCheck);
