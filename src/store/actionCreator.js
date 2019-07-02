/**
 * bindActionCreators 모듈화
 */
import { bindActionCreators } from "redux";
import store from "./index";
import * as auth from "./modules/auth/auth";
import * as signin from "./modules/sign/signin";

const { dispatch } = store;

export const AuthActions = bindActionCreators(auth, dispatch);
export const SignInActions = bindActionCreators(signin, dispatch);
