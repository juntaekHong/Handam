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
import { HomeActions, CommonActions } from "../../store/actionCreator";
import moment from "moment";
import {
  ScheduleButton,
  BusButton,
  NoticeButton
} from "../../components/home/Button";
import { ScrollView } from "react-native";

const Home = ({ navigation, noticeList }) => {
  const [time, setTime] = useState(moment().format("MM. DD (ddd)"));
  const navigateNotice = useCallback(() => {
    navigation.navigate("notice");
  }, []);
  const navigateBus = useCallback(() => {
    navigation.navigate("bus");
  }, []);
  useEffect(async () => {
    await CommonActions.handleLoading(true);
    await HomeActions.getNoticeList();
    await CommonActions.handleLoading(false);
  }, []);
  return (
    <HCenterView>
      <HomeTitle />
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

export default connect(({ home }) => ({
  noticeList: home.noticeList
}))(Home);
