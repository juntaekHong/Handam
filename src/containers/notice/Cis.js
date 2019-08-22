import React, { useState, useCallback, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { WebView } from "react-native-webview";
import { View } from "react-native";
import { NoticeFooterView } from "../../components/notice/View";
import {
  BackButton,
  ForwardButton,
  ReloadButton
} from "../../components/notice/Button";
import { Title } from "../../components/common/View";

const Cis = ({}) => {
  const WEBVIEW_REF = useRef();
  const [state, setState] = useState({
    url: "https://info.hansung.ac.kr/",
    status: "No Page Loaded",
    backButtonEnabled: false,
    forwardButtonEnabled: false,
    loading: true,
    scalesPageToFit: true
  });
  const goBack = useCallback(() => {
    if (WEBVIEW_REF.current) WEBVIEW_REF.current.goBack();
  }, []);

  const goForward = useCallback(() => {
    if (WEBVIEW_REF.current) WEBVIEW_REF.current.goForward();
  }, []);

  const reload = useCallback(() => {
    if (WEBVIEW_REF.current) WEBVIEW_REF.current.reload();
  }, []);

  const onShouldStartLoadWithRequest = useCallback(event => {
    return true;
  }, []);
  const onNavigationStateChange = useCallback(navState => {
    setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url,
      status: navState.title,
      loading: navState.loading,
      scalesPageToFit: true
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Title title={"종합정보시스템"} rightInVisible={true} />
      <WebView
        style={{ flex: 1, backgroundColor: "#fff" }}
        ref={WEBVIEW_REF}
        source={{ uri: state.url }}
        useWebKit={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onNavigationStateChange={onNavigationStateChange}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        scalesPageToFit={state.scalesPageToFit}
        startInLoadingState={true}
        automaticallyAdjustContentInsets={true}
        decelerationRate={"normal"}
      />
      <NoticeFooterView>
        <BackButton disabled={!state.backButtonEnabled} onPress={goBack} />
        <ReloadButton onPress={reload} />
        <ForwardButton
          disabled={!state.forwardButtonEnabled}
          onPress={goForward}
        />
      </NoticeFooterView>
    </View>
  );
};

export default connect()(Cis);
