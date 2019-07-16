import React from "react";
import { BaseView } from "../../common/View";
import { WebView } from "react-native-webview";
import { widthPercentageToDP } from "../../../utils/util";
import config from "../../../configs/config";

export const ShuttleWebView = props => {
  return (
    <WebView
      style={[
        {
          height: "100%",
          backgroundColor: "#fff"
        }
      ]}
      source={{ uri: config.shuttleWebView }}
      useWebKit={true}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      automaticallyAdjustContentInsets={true}
      decelerationRate={"normal"}
    />
  );
};
