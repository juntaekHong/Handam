import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { Title, BaseView } from "../../components/common/View";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Dimensions, View } from "react-native";
import Shuttle from "./Shuttle";
import colors from "../../configs/colors";
import { NBGBText } from "../../components/common/Text";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import { TimeTable } from "../../components/bus/View";

const FirstRoute = () => (
  <View style={[{ flex: 1, backgroundColor: "#ff4081" }]} />
);

const SecondRoute = () => (
  <View style={[{ flex: 1, backgroundColor: "#673ab7" }]} />
);

const Bus = ({ navigation }) => {
  const [state, setState] = useState({
    index: 0,
    routes: [
      { key: "shuttle", title: "셔틀버스" },
      { key: "sungbuk", title: "성북02" },
      { key: "jongro", title: "종로03" }
    ]
  });

  return (
    <BaseView>
      <Title title={"스쿨버스"} rightInVisible={true} />
      <TimeTable />
      <TabView
        navigationState={state}
        renderScene={SceneMap({
          shuttle: () => <Shuttle />,
          sungbuk: SecondRoute,
          jongro: FirstRoute
        })}
        renderTabBar={props => (
          <TabBar
            {...props}
            labelStyle={{
              fontSize: widthPercentageToDP(14),
              fontFamily: fonts.nanumBarunGothicB
            }}
            activeColor={colors.active}
            inactiveColor={colors.disable}
            indicatorStyle={{ backgroundColor: colors.active, height: 2 }}
            style={{
              backgroundColor: colors.white,
              height: widthPercentageToDP(50)
            }}
          />
        )}
        onIndexChange={index => setState({ ...state, index })}
        initialLayout={{ width: Dimensions.get("window").width }}
      />
    </BaseView>
  );
};

export default connect()(Bus);
