import React, { useState, useCallback, useEffect, useRef } from "react";
import { CenterScroll, HCenterView } from "../../components/common/View";
import { connect } from "react-redux";
import { HomeTitle, HomeAd, HomeNavigateView, TodayLectureTitle, TodayLine } from "../../components/home/View";
import { HomeActions, CommonActions, AlarmActions, HansungInfoActions, LockActions } from "../../store/actionCreator";
import moment from "moment";
import { HomeNavigateButton } from "../../components/home/Button";
import TodayLecture from "../../components/home/view/TodayLecture";
import { dayToString, widthPercentageToDP } from "../../utils/util";
import { CertModal } from "../../components/home/modal/CertModal";
import { ScheduleModal } from "../../components/schedule/modal/ScheduleModal";
import { CertLoadModal } from "../../components/home/modal/CertLoadModal";
import { CertFailModal } from "../../components/home/modal/CertFailModal";
import { View } from "react-native";
import { NavigationEvents } from "react-navigation";
import LottieView from "lottie-react-native";
import values from "../../configs/values";

const Home = ({
  navigation,
  noticeList,
  homeMenu,
  count,
  hansunginfo = null,
  schedule_call,
  schedule_loading,
  user
}) => {
  const [time, setTime] = useState(moment());
  const [certModal, setCertModal] = useState(false);
  const [call, setCall] = useState(0);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [certLoadModal, setCertLoadModal] = useState(false);
  const [certFailModal, setCertFailModal] = useState(false);
  const lottie = useRef(null);

  const navigateAction = useCallback(title => {
    switch (title) {
      case values.homeMenuTitle.SCHEDULE:
        navigateSchedule();
        break;
      case values.homeMenuTitle.NOTICE:
        navigateNotice();
        break;
      case values.homeMenuTitle.CIS:
        navigateCis();
        break;
      case values.homeMenuTitle.BUS:
        navigateBus();
        break;
      case values.homeMenuTitle.READING:
        navigateReading();
        break;
      case values.homeMenuTitle.RESTAURANT:
        navigateRestaurant();
        break;
      case values.homeMenuTitle.CALCULATE:
        navigateCalculation();
        break;
    }
  }, []);
  const navigateNotice = useCallback(() => {
    navigation.navigate("notice");
  }, []);
  const navigateCis = useCallback(() => {
    navigation.navigate("cis");
  }, []);

  const navigateBus = useCallback(() => {
    navigation.navigate("busstack");
  }, []);

  const navigateReading = useCallback(() => {
    navigation.navigate("reading");
  }, []);

  const navigateRestaurant = useCallback(() => {
    navigation.navigate("restaurantmenu");
  }, []);

  const navigateCalculation = useCallback(() => {
    navigation.navigate("calculation");
  }, []);

  const navigateSchedule = useCallback(() => {
    if (hansunginfo === null) return setCertModal(true);
    if (hansunginfo !== null && hansunginfo.status === "UNVERIFIED") return setCertLoadModal(true);
    if (hansunginfo !== null && hansunginfo.status === "FAIL") return setCertFailModal(true);
    navigation.navigate("schedule");
  }, [hansunginfo]);

  const navigateCert = useCallback(() => {
    setCertModal(false);
    navigation.navigate("Certification");
  }, []);

  const initCall = useCallback(async () => {
    await Promise.all([AlarmActions.alarmInit(), LockActions.lockInit()]);
    await CommonActions.handleLoading(true);
    await Promise.all([
      HomeActions.getNoticeList(),
      AlarmActions.alarmIsPostsAction(user.isPostsAlarm == 1 ? true : false),
      AlarmActions.alarmIsNonSubjectAction(user.isNonSubjectPointAlarm == 1 ? true : false),
      AlarmActions.getAlarmList(false, 0)
    ]);
    await CommonActions.handleLoading(false);
  }, [count]);

  const onPressRefresh = useCallback(() => {
    if (schedule_loading) return;
    if (hansunginfo !== null && hansunginfo.status === "UNVERIFIED") return setCertLoadModal(true);
    if (hansunginfo !== null && hansunginfo.status === "FAIL") return setCertFailModal(true);

    if (hansunginfo !== null && hansunginfo.schedule.monday === undefined) {
      return setScheduleModal(true);
    } else if (hansunginfo !== null && hansunginfo.schedule.monday !== undefined) {
      setScheduleModal(true);
    } else {
      setCertModal(true);
    }
  }, [hansunginfo, schedule_loading]);

  const callSchedule = useCallback(() => {
    setScheduleModal(false);
    HansungInfoActions.scheduleCallAction(true);
  }, []);

  const getSchedule = useCallback(async () => {
    if (hansunginfo !== null && hansunginfo.schedule.monday === undefined) {
      await HansungInfoActions.getHansungInfo();
      setCall(call => call + 1);
    } else if (hansunginfo !== null && hansunginfo.schedule.monday !== undefined) {
      await HansungInfoActions.scheduleLoadingAction(false);
      setCall(0);
    }
  }, [hansunginfo]);

  scheduleCall = async () => {
    await HansungInfoActions.scheduleCallAction(false);
    await HansungInfoActions.scheduleLoadingAction(true);
    await HansungInfoActions.createHansungInfoSchedule();
    await HansungInfoActions.getHansungInfo();
    setCall(call => call + 1);
  };
  useEffect(() => {
    initCall();
  }, []);
  useEffect(() => {
    if (schedule_call) {
      scheduleCall();
    }
  }, [schedule_call]);
  useEffect(() => {
    if (call > 0) {
      setTimeout(getSchedule, 5000);
    }
  }, [call]);
  useEffect(() => {
    if (navigation.isFocused()) {
      try {
        if (lottie.current) lottie.current.play();
      } catch (e) {}
    }
  }, [navigation.isFocused()]);
  return (
    <HCenterView>
      <HomeTitle alarm={count > 0} />
      <NavigationEvents
        onWillFocus={() => {
          try {
            if (lottie.current) lottie.current.play();
          } catch (e) {}
        }}
        onWillBlur={() => {
          try {
            if (lottie.current) lottie.current.play();
          } catch (e) {}
        }}
      />
      <CertModal
        height={201.9}
        visible={certModal}
        closeHandler={() => setCertModal(false)}
        footerHandler={navigateCert}
      />
      <CertLoadModal
        height={201.9}
        visible={certLoadModal}
        closeHandler={() => setCertLoadModal(false)}
        footerHandler={() => setCertLoadModal(false)}
      />
      <CertFailModal
        height={201.9}
        visible={certFailModal}
        closeHandler={() => setCertFailModal(false)}
        footerHandler={() => setCertFailModal(false)}
      />
      <ScheduleModal
        closeHandler={() => setScheduleModal(false)}
        visible={scheduleModal}
        footerHandler={callSchedule}
      />
      <CenterScroll
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center"
        }}
      >
        <HomeAd list={noticeList} />
        <View style={{ width: "100%" }}>
          <HomeNavigateView>
            {homeMenu.map((item, index) => {
              if (index > 3) return null;
              return (
                <HomeNavigateButton
                  style={{ marginRight: widthPercentageToDP(18) }}
                  title={item.title}
                  image={item.image}
                  onPress={() => navigateAction(item.title)}
                />
              );
            })}
            {homeMenu.length < 4 ? (
              <HomeNavigateButton
                image={require("HandamProject/assets/image/home/plusbox.png")}
                onPress={() => navigation.navigate("homemenu")}
              />
            ) : null}
          </HomeNavigateView>
          {homeMenu.length >= 4 ? (
            <HomeNavigateView>
              {homeMenu.map((item, index) => {
                if (index < 4) return null;
                return (
                  <HomeNavigateButton
                    style={{ marginRight: widthPercentageToDP(18) }}
                    title={item.title}
                    image={item.image}
                    onPress={() => navigateAction(item.title)}
                  />
                );
              })}
              <HomeNavigateButton
                image={require("HandamProject/assets/image/home/plusbox.png")}
                onPress={() => navigation.navigate("homemenu")}
              />
            </HomeNavigateView>
          ) : null}
        </View>
        <TodayLectureTitle onPress={onPressRefresh} />
        <TodayLine time={moment(time).format("MM. DD (ddd)")} />
        <TodayLecture
          day={dayToString(moment(time).day())}
          goCertificate={navigateCert}
          loadSchedule={callSchedule}
          Loading={
            <LottieView
              ref={lottie}
              style={{
                width: widthPercentageToDP(82),
                height: widthPercentageToDP(82)
              }}
              source={require("HandamProject/assets/animation/loading.json")}
              autoPlay={true}
              loop={true}
              useNativeDriver={true}
              hardwareAccelerationAndroid={true}
            />
          }
        />
      </CenterScroll>
    </HCenterView>
  );
};

export default connect(({ home, alarm, hansung, signin }) => ({
  noticeList: home.noticeList,
  homeMenu: home.homeMenu,
  count: alarm.count,
  hansunginfo: hansung.hansunginfo,
  schedule_call: hansung.schedule_call,
  schedule_loading: hansung.schedule_loading,
  user: signin.user
}))(Home);
