import React, { useState, useCallback, useEffect } from "react";
import { HCenterView } from "../../components/common/View";
import { connect } from "react-redux";
import { HomeTitle, AboutHandam, HomeAd } from "../../components/home/View";
import { HomeActions, CommonActions } from "../../store/actionCreator";
import { Image } from "react-native";

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
    </HCenterView>
  );
};

export default connect(({ home }) => ({
  noticeList: home.noticeList
}))(Home);
