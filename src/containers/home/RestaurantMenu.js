import React, { useState, useCallback, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { WebView } from "react-native-webview";
import { HCenterView, Title } from "../../components/common/View";
import { View } from "react-native";
import { NoticeFooterView } from "../../components/notice/View";
import { BackButton, ForwardButton, ReloadButton } from "../../components/notice/Button";

const RestaurantMenu = ({}) => {
  const WEBVIEW_REF = useRef();
  const [state, setState] = useState({
    url: "http://www.hansung.ac.kr/web/www/life_03_01_t1",
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
      <Title title={"학식메뉴"} rightInVisible={true} />
      <WebView
        style={{ flex: 1, backgroundColor: "#fff" }}
        ref={WEBVIEW_REF}
        source={{ uri: state.url }}
        useWebKit={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={`javascript:document.getElementsByTagName('header')[0].style.display='none';document.getElementsByClassName('scrumb_wrap')[0].style.pointerEvents='none';document.getElementById('footer').style.pointerEvents='none';if(document.getElementsByClassName('optionWrap type2 clearfix').length!=0) document.getElementsByClassName('optionWrap type2 clearfix')[0].style.display='none';;`}
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
        <ForwardButton disabled={!state.forwardButtonEnabled} onPress={goForward} />
      </NoticeFooterView>
    </View>
  );
};

export default connect()(RestaurantMenu);
