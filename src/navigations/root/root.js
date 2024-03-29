import { createStackNavigator } from "react-navigation";
import MainTab from "../main/MainTab";
import Notice from "../../containers/notice/Notice";
import BusStack from "../bus/BusStack";
import Alarm from "../../containers/alarm/Alarm";
import CertificationStack from "../certification/CertificationStack";
import SettingStack from "../setting/SettingStack";
import TalkStack from "../talk/TalkStack";
import Schedule from "../../containers/schedule/Schedule";
import RestaurantStack_noTab from "../restaurant/RestaurantStack_noTab";
import Cis from "../../containers/notice/Cis";
import HomeMenu from "../../containers/home/HomeMenu";
import Calculation from "../../containers/myInfo/Calculation";
import ReadingRoom from "../../containers/reading/ReadingRoom";
import RestaurantMenu from "../../containers/home/RestaurantMenu";
import ProfessorDetail_noTab from "../professor/ProfessorStack_noTab";
import MyWriteProfessorList from "../../containers/professor/MyWriteProfessorList";
import ProfessorDetail from "../../containers/professor/ProfessorDetail";
import MapStack from "../map/MapStack";

const RootStack = createStackNavigator(
  {
    main: { screen: MainTab },
    notice: { screen: Notice },
    cis: { screen: Cis },
    busstack: { screen: BusStack },
    alarm: { screen: Alarm },
    Certification: { screen: CertificationStack },
    settingstack: { screen: SettingStack },
    talk: { screen: TalkStack },
    schedule: { screen: Schedule },
    RestaurantStack_noTab: { screen: RestaurantStack_noTab },
    homemenu: { screen: HomeMenu },
    calculation: { screen: Calculation },
    reading: ReadingRoom,
    restaurantmenu: RestaurantMenu,
    ProfessorDetail_noTab: { screen: ProfessorDetail_noTab },
    ProfessorDetail: { screen: ProfessorDetail },
    MyWriteProfessorList: { screen: MyWriteProfessorList },
    mapstack: { screen: MapStack }
  },
  {
    initialRouteName: "main",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default RootStack;
