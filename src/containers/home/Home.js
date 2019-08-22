import React, { useState, useCallback, useEffect } from "react";
import { CenterScroll, HCenterView } from "../../components/common/View";
import { connect } from "react-redux";
import {
  HomeTitle,
  AboutHandam,
  HomeAd,
  HomeNavigateView,
  TodayLectureTitle,
  TodayLine
} from "../../components/home/View";
import {
  HomeActions,
  CommonActions,
  AlarmActions,
  HansungInfoActions,
  LockActions
} from "../../store/actionCreator";
import moment from "moment";
import {
  ScheduleButton,
  BusButton,
  NoticeButton,
  CisButton
} from "../../components/home/Button";
import TodayLecture from "../../components/home/view/TodayLecture";
import { dayToString, widthPercentageToDP } from "../../utils/util";
import { CertModal } from "../../components/home/modal/CertModal";
import { ScheduleModal } from "../../components/schedule/modal/ScheduleModal";
import { CertLoadModal } from "../../components/home/modal/CertLoadModal";
import { CertFailModal } from "../../components/home/modal/CertFailModal";
import { View } from "react-native";

const Home = ({
  navigation,
  noticeList,
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

  const navigateNotice = useCallback(() => {
    navigation.navigate("notice");
  }, []);
  const navigateCis = useCallback(() => {
    navigation.navigate("cis");
  }, []);

  const navigateBus = useCallback(() => {
    navigation.navigate("busstack");
  }, []);

  const navigateSchedule = useCallback(() => {
    if (hansunginfo === null) return setCertModal(true);
    if (hansunginfo !== null && hansunginfo.status === "UNVERIFIED")
      return setCertLoadModal(true);
    if (hansunginfo !== null && hansunginfo.status === "FAIL")
      return setCertFailModal(true);
    navigation.navigate("schedule");
  }, [hansunginfo]);

  const navigateCert = useCallback(() => {
    setCertModal(false);
    navigation.navigate("Certification");
  }, []);

  const initCall = useCallback(async () => {
    await AlarmActions.alarmInit();
    await LockActions.lockInit();
    await CommonActions.handleLoading(true);
    await HomeActions.getNoticeList();
    await AlarmActions.alarmIsPostsAction(
      user.isPostsAlarm == 1 ? true : false
    );
    await AlarmActions.getAlarmList(false, 0);
    await CommonActions.handleLoading(false);
  }, [count]);

  const onPressRefresh = useCallback(() => {
    if (schedule_loading) return;
    if (hansunginfo !== null && hansunginfo.status === "UNVERIFIED")
      return setCertLoadModal(true);
    if (hansunginfo !== null && hansunginfo.status === "FAIL")
      return setCertFailModal(true);

    if (hansunginfo !== null && hansunginfo.schedule.monday === undefined) {
      return setScheduleModal(true);
    } else if (
      hansunginfo !== null &&
      hansunginfo.schedule.monday !== undefined
    ) {
      setScheduleModal(true);
    } else {
      setCertModal(true);
    }
  }, [hansunginfo, schedule_loading]);

  const callSchedule = useCallback(async () => {
    await setScheduleModal(false);
    await HansungInfoActions.scheduleCallAction(true);
  }, []);

  const getSchedule = useCallback(async () => {
    if (hansunginfo !== null && hansunginfo.schedule.monday === undefined) {
      await HansungInfoActions.getHansungInfo();
      setCall(call => call + 1);
    } else if (
      hansunginfo !== null &&
      hansunginfo.schedule.monday !== undefined
    ) {
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
  return (
    <HCenterView>
      <HomeTitle alarm={count > 0} />
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
            <BusButton onPress={navigateBus} />
            <NoticeButton onPress={navigateNotice} />
            <CisButton onPress={navigateCis} />
            <ScheduleButton onPress={navigateSchedule} />
          </HomeNavigateView>
        </View>
        <TodayLectureTitle onPress={onPressRefresh} />
        <TodayLine time={moment(time).format("MM. DD (ddd)")} />
        <TodayLecture
          day={dayToString(moment(time).day())}
          goCertificate={navigateCert}
        />
      </CenterScroll>
    </HCenterView>
  );
};

export default connect(({ home, alarm, hansung, signin }) => ({
  noticeList: home.noticeList,
  count: alarm.count,
  hansunginfo: hansung.hansunginfo,
  schedule_call: hansung.schedule_call,
  schedule_loading: hansung.schedule_loading,
  user: signin.user
}))(Home);
