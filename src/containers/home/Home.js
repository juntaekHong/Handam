import React, { useState, useCallback, useEffect } from "react";
import { CenterScroll, HCenterView } from "../../components/common/View";
import { connect } from "react-redux";
import {
  HomeTitle,
  AboutHandam,
  HomeAd,
  HomeNavigateView,
  TodayLectureTitle,
  TodayLine,
  TodayLecture
} from "../../components/home/View";
import {
  HomeActions,
  CommonActions,
  HansungInfoActions,
  AlarmActions
} from "../../store/actionCreator";
import moment from "moment";
import {
  ScheduleButton,
  BusButton,
  NoticeButton
} from "../../components/home/Button";

const Home = ({ navigation, noticeList, count }) => {
  const [time, setTime] = useState(moment().format("MM. DD (ddd)"));
  const navigateNotice = useCallback(() => {
    navigation.navigate("notice");
  }, []);
  const navigateBus = useCallback(() => {
    navigation.navigate("busstack");
  }, []);
  const initCall = useCallback(async () => {
    await CommonActions.handleLoading(true);
    await HomeActions.getNoticeList();
    await HansungInfoActions.getHansungInfo();
    await AlarmActions.getAlarmList(false, 0);
    await CommonActions.handleLoading(false);
    console.log(count);
  }, [count]);
  useEffect(() => {
    initCall();
  }, []);
  return (
    <HCenterView>
      <HomeTitle alarm={count > 0} />
      <CenterScroll
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center"
        }}
      >
        <AboutHandam />
        <HomeAd list={noticeList} />
        <HomeNavigateView>
          <ScheduleButton />
          <BusButton onPress={navigateBus} />
          <NoticeButton onPress={navigateNotice} />
        </HomeNavigateView>
        <TodayLectureTitle />
        <TodayLine time={time} />
        <TodayLecture />
      </CenterScroll>
    </HCenterView>
  );
};

export default connect(({ home, alarm }) => ({
  noticeList: home.noticeList,
  count: alarm.count
}))(Home);
