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
  HansungInfoActions
} from "../../store/actionCreator";
import moment from "moment";
import {
  ScheduleButton,
  BusButton,
  NoticeButton
} from "../../components/home/Button";
import TodayLecture from "../../components/home/view/TodayLecture";
import { dayToString } from "../../utils/util";
import { CertModal } from "../../components/home/modal/CertModal";

const Home = ({
  navigation,
  noticeList,
  count,
  hansunginfo = null,
  schedule_call
}) => {
  const [time, setTime] = useState(moment());
  const [certModal, setCertModal] = useState(false);
  const [call, setCall] = useState(0);

  const navigateNotice = useCallback(() => {
    navigation.navigate("notice");
  }, []);

  const navigateBus = useCallback(() => {
    navigation.navigate("busstack");
  }, []);

  const navigateSchedule = useCallback(() => {
    if (hansunginfo === null) setCertModal(true);
    else navigation.navigate("schedule");
  }, [hansunginfo]);

  const navigateCert = useCallback(() => {
    setCertModal(false);
    navigation.navigate("Certification");
  }, []);

  const initCall = useCallback(async () => {
    await AlarmActions.alarmInit();
    await CommonActions.handleLoading(true);
    await HomeActions.getNoticeList();
    await AlarmActions.getAlarmList(false, 0);
    await CommonActions.handleLoading(false);
  }, [count]);

  const getSchedule = useCallback(async () => {
    if (hansunginfo !== null && hansunginfo.schedule.monday === undefined) {
      await HansungInfoActions.getHansungInfo();
      setCall(call => call + 1);
    } else if (
      hansunginfo !== null &&
      hansunginfo.schedule.monday !== undefined
    ) {
      console.log("end call");
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
      <CenterScroll
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center"
        }}
      >
        <AboutHandam />
        <HomeAd list={noticeList} />
        <HomeNavigateView>
          <ScheduleButton onPress={navigateSchedule} />
          <BusButton onPress={navigateBus} />
          <NoticeButton onPress={navigateNotice} />
        </HomeNavigateView>
        <TodayLectureTitle />
        <TodayLine time={moment(time).format("MM. DD (ddd)")} />
        <TodayLecture
          day={dayToString(moment(time).day())}
          goCertificate={navigateCert}
        />
      </CenterScroll>
    </HCenterView>
  );
};

export default connect(({ home, alarm, hansung }) => ({
  noticeList: home.noticeList,
  count: alarm.count,
  hansunginfo: hansung.hansunginfo,
  schedule_call: hansung.schedule_call
}))(Home);
