import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { Title, BaseView } from "../../components/common/View";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Dimensions, View } from "react-native";
import Shuttle from "./Shuttle";
import colors from "../../configs/colors";
import { NBGBText } from "../../components/common/Text";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import { TimeTable } from "../../components/bus/view/TimeTable";
import { BusActions, CommonActions } from "../../store/actionCreator";
import moment from "moment";
import Seongbuk from "./Seongbuk";
import { BusStationListItem } from "../../components/bus/listItem/BusStationListItem";
import { BusView } from "../../components/bus/view/BusView";
import Jongro from "./Jongro";

const FirstRoute = () => (
  <View style={[{ flex: 1, backgroundColor: "#ff4081" }]} />
);

const SecondRoute = () => (
  <View style={[{ flex: 1, backgroundColor: "#673ab7" }]} />
);

const Bus = ({ navigation, jongro_text, seongbuk_text, seongbuk_list }) => {
  const [state, setState] = useState({
    index: 0,
    routes: [
      { key: "shuttle", title: "셔틀버스" },
      { key: "sungbuk", title: "성북02" },
      { key: "jongro", title: "종로03" }
    ]
  });
  const [time, setTime] = useState("");

  const navigateTimeTable = useCallback(() => {
    navigation.navigate("bustime");
  }, []);

  const onIndexChange = useCallback(index => {
    setState({ ...state, index });
    switch (index) {
      case 0:
        setTime(moment().format("hh:mm"));
        break;
      case 1:
        setTime(seongbuk_text);
        break;
      case 2:
        setTime(jongro_text);
        break;
    }
  }, []);

  const getBusList = useCallback(async type => {
    await BusActions.getBusList(type);
  }, []);

  const initCall = useCallback(async () => {
    setTime(moment().format("hh:mm"));
    CommonActions.handleLoading(true);
    await getBusList("jongro");
    await getBusList("seongbuk");
    CommonActions.handleLoading(false);
  }, []);
  const goBack = useCallback(() => {
    navigation.navigate("home");
  }, []);
  useEffect(() => {
    initCall();
  }, []);
  return (
    <BaseView>
      <Title title={"스쿨버스"} rightInVisible={true} leftHandler={goBack} />
      <TimeTable time={time} onPress={navigateTimeTable} />
      <TabView
        navigationState={state}
        renderScene={SceneMap({
          shuttle: () => <Shuttle />,
          sungbuk: () => <Seongbuk />,
          jongro: () => <Jongro />
        })}
        renderTabBar={props => (
          <TabBar
            {...props}
            labelStyle={{
              fontSize: widthPercentageToDP(14),
              fontFamily: fonts.nanumBarunGothicB
            }}
            activeColor={colors.active}
            inactiveColor={colors.disable}
            indicatorStyle={{ backgroundColor: colors.active, height: 2 }}
            style={{
              backgroundColor: colors.white,
              height: widthPercentageToDP(50)
            }}
          />
        )}
        onIndexChange={onIndexChange}
        initialLayout={{ width: Dimensions.get("window").width }}
      />
    </BaseView>
  );
};

export default connect(({ bus }) => ({
  jongro_text: bus.jongro_text,
  seongbuk_text: bus.seongbuk_text,
  seongbuk_list: bus.seongbuk_list
}))(Bus);
