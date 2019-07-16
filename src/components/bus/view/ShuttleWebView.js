import React from "react";
import { BaseView } from "../../common/View";
import { WebView } from "react-native-webview";
import { widthPercentageToDP } from "../../../utils/util";
import config from "../../../configs/config";

export const ShuttleWebView = props => {
  return (
    <BaseView style={props.visible ? { height: "100%" } : { height: 0 }}>
      <WebView
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: "#fff"
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
