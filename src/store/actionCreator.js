/**
 * bindActionCreators 모듈화
 */
import { bindActionCreators } from "redux";
import store from "./index";
import * as auth from "./modules/auth/auth";
import * as signin from "./modules/sign/signin";
import * as common from "./modules/common/common";
import * as talk from "./modules/community/talk";
import * as vote from "./modules/community/vote";
import * as restaurant from "./modules/community/restaurant";
import * as signup from "./modules/sign/signup";
import * as home from "./modules/home/home";
import * as bus from "./modules/bus/bus";
import * as alarm from "./modules/alarm/alarm";
import * as lock from "./modules/lock/lock";
import * as hansungInfo from "./modules/hansungInfo/hansungInfo";
import * as myInfo from "./modules/myInfo/myInfo";
import * as reading from "./modules/reading/reading";
import * as professor from "./modules/professor/professor";

const { dispatch } = store;

export const AuthActions = bindActionCreators(auth, dispatch);
export const SignInActions = bindActionCreators(signin, dispatch);
export const SignUpActions = bindActionCreators(signup, dispatch);
export const CommonActions = bindActionCreators(common, dispatch);
export const TalkActions = bindActionCreators(talk, dispatch);
export const VoteActions = bindActionCreators(vote, dispatch);
export const RestaurantActions = bindActionCreators(restaurant, dispatch);
export const HomeActions = bindActionCreators(home, dispatch);
export const BusActions = bindActionCreators(bus, dispatch);
export const AlarmActions = bindActionCreators(alarm, dispatch);
export const LockActions = bindActionCreators(lock, dispatch);
export const HansungInfoActions = bindActionCreators(hansungInfo, dispatch);
export const MyInfoActions = bindActionCreators(myInfo, dispatch);
export const ReadingActions = bindActionCreators(reading, dispatch);
export const ProfessorActions = bindActionCreators(professor, dispatch);
