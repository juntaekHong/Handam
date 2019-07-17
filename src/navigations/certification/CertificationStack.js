import { createStackNavigator } from "react-navigation";
import CertificationScreen from "../../containers/hansungInfo/CertificationScreen";

const CertificationStack = createStackNavigator(
    {
        Certification: { screen: CertificationScreen },
    },
    {
        initialRouteName: null,
        defaultNavigationOptions: {
            header: null
        }
    }
);

export default CertificationStack;
