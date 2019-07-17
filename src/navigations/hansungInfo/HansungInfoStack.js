import {createStackNavigator} from "react-navigation";
import HansungInfoTab from '../hansungInfo/HansungInfoTab';
import CertificationStack from "../certification/CertificationStack";

// 비교과, 성적표, 종정시 인증
const HansungInfoStack = createStackNavigator(
    {
        HansungInfo : { screen: HansungInfoTab },
        Certification: {screen: CertificationStack}
    },
    {
        defaultNavigationOptions: {
            header: null
        }
    }
);

// 종정시 인증 페이지 탭바 숨기기
HansungInfoStack.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName;

    if ( routeName == "Certification" ) {
        tabBarVisible = false
    }

    return {
        tabBarVisible
    }
}

export default HansungInfoStack;