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
  AlarmActions
} from "../../store/actionCreator";
import moment from "moment";
import {
  ScheduleButton,
  BusButton,
  NoticeButton
} from "../../components/home/Button";
import TodayLecture from "../../components/home/view/TodayLecture";
import { dayToString } from "../../utils/util";

const Home = ({ navigation, noticeList, count }) => {
  const [time, setTime] = useState(moment());
  const navigateNotice = useCallback(() => {
    navigation.navigate("notice");
  }, []);
  const navigateBus = useCallback(() => {
    navigation.navigate("busstack");
  }, []);
  const initCall = useCallback(async () => {
    await AlarmActions.alarmInit();
    await CommonActions.handleLoading(true);
    await HomeActions.getNoticeList();
    await AlarmActions.getAlarmList(false, 0);
    await CommonActions.handleLoading(false);
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
        <TodayLine time={moment(time).format("MM. DD (ddd)")} />
        <TodayLecture day={dayToString(moment(time).day())} />
      </CenterScroll>
    </HCenterView>
  );
};

export default connect(({ home, alarm, hansung }) => ({
  noticeList: home.noticeList,
  count: alarm.count
}))(Home);
