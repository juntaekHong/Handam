import React from "react";
import { HCenterView, Title, Scroll } from "../../components/common/View";
import HTML from "react-native-render-html";
import { widthPercentageToDP } from "../../utils/util";
const TermInfo = ({ navigation }) => {
  return (
    <HCenterView>
      <Title
        title={navigation.getParam("title", "약관")}
        rightInVisible={true}
      />
      <Scroll
        contentContainerStyle={{
          paddingLeft: widthPercentageToDP(29),
          paddingRight: widthPercentageToDP(29)
        }}
      >
        <HTML html={navigation.getParam("content", "<h1></h1>")} />
      </Scroll>
    </HCenterView>
  );
};

export default TermInfo;
