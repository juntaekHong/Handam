import React, { useState, useCallback, useEffect } from "react";
import { HCenterView } from "../../components/common/View";
import { connect } from "react-redux";
import {
  HomeTitle,
  AboutHandam,
  HomeAd,
  HomeNavigateView,
  TodayLectureTitle,
  TodayLine
} from "../../components/home/View";
import { HomeActions, CommonActions } from "../../store/actionCreator";
import {
  ScheduleButton,
  BusButton,
  NoticeButton
} from "../../components/home/Button";

const Home = ({ noticeList }) => {
  useEffect(async () => {
    await CommonActions.handleLoading(true);
    await HomeActions.getNoticeList();
    await CommonActions.handleLoading(false);
  }, []);
  return (
    <HCenterView>
      <HomeTitle />
      <AboutHandam />
      <HomeAd list={noticeList} />
      <HomeNavigateView>
        <ScheduleButton />
        <BusButton />
        <NoticeButton />
      </HomeNavigateView>
      <TodayLectureTitle />
      <TodayLine />
    </HCenterView>
  );
};

export default connect(({ home }) => ({
  noticeList: home.noticeList
}))(Home);
