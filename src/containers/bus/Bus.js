import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { Title, BaseView } from "../../components/common/View";
import { TimeTable } from "../../components/bus/view/TimeTable";
import { BusActions, CommonActions } from "../../store/actionCreator";
import moment from "moment";
import { ShuttleWebView } from "../../components/bus/view/ShuttleWebView";
import { BusList } from "../../components/bus/view/BusList";
import { BusTab } from "../../components/bus/view/BusTab";

const Bus = ({
  navigation,
  jongro_text,
  seongbuk_text,
  seongbuk_list,
  jongro_list
}) => {
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState("");

  const navigateTimeTable = useCallback(() => {
    navigation.navigate("bustime");
  }, []);

  const onIndexChange = useCallback(value => {
    setIndex(value);
    switch (value) {
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

  const initCall = async () => {
    setTime(moment().format("hh:mm"));
    CommonActions.handleLoading(true);
    await getBusList("jongro");
    await getBusList("seongbuk");
    CommonActions.handleLoading(false);
  };
  const goBack = useCallback(() => {
    navigation.navigate("home");
  }, []);
  useEffect(() => {
    initCall();
  }, []);
  return (
    <BaseView>
      <Title title={"스쿨버스"} rightInVisible={true} leftHandler={goBack} />
      <BusTab />
      <TimeTable time={time} onPress={navigateTimeTable} />
      <ShuttleWebView visible={index == 0} />
      <BusList list={seongbuk_list} visible={index == 1} />
      <BusList list={jongro_list} visible={index == 2} />
      {/*       
      <TabView
        navigationState={state}
        renderScene={SceneMap({
          shuttle: renderShuttle,
          seungbuk: renderSeongbuk,
          jongro: renderJongro
        })}
        renderTabBar={props => (
          <TabBar
            {...props}
            labelStyle={{
              fontSize: widthPercentageToDP(14),
              fontFamily: fonts.nanumBarunGothicB
            }}
            swipeEnabled={false}
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
      /> */}
    </BaseView>
  );
};

export default connect(({ bus }) => ({
  jongro_text: bus.jongro_text,
  jongro_list: bus.jongro_list,
  seongbuk_text: bus.seongbuk_text,
  seongbuk_list: bus.seongbuk_list
}))(Bus);
