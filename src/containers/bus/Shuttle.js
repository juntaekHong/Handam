import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { BaseView } from "../../components/common/View";
import { WebView } from "react-native-webview";
import config from "../../configs/config";
import { widthPercentageToDP } from "../../utils/util";

const Shuttle = props => {
  return (
    <BaseView>
      <WebView
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: "#fff",
          marginTop: widthPercentageToDP(47.5)
        }}
        source={{ uri: config.shuttleWebView }}
        useWebKit={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        automaticallyAdjustContentInsets={true}
        decelerationRate={"normal"}
      />
    </BaseView>
  );
};

export default connect()(Shuttle);
