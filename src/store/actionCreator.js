/**
 * bindActionCreators 모듈화
 */
import { bindActionCreators } from "redux";
import store from "./index";
import * as auth from "./modules/auth/auth";
import * as signin from "./modules/sign/signin";
import * as common from "./modules/common/common";
import * as talk from "./modules/community/talk";
import * as signup from "./modules/sign/signup";

const { dispatch } = store;

export const AuthActions = bindActionCreators(auth, dispatch);
export const SignInActions = bindActionCreators(signin, dispatch);
export const SignUpActions = bindActionCreators(signup, dispatch);
export const CommonActions = bindActionCreators(common, dispatch);
export const TalkActions = bindActionCreators(talk, dispatch);
