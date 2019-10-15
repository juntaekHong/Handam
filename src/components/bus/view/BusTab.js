import React from "react";
import styled from "styled-components";
import { widthPercentageToDP } from "../../../utils/util";
import { NBGBText } from "../../common/Text";
import colors from "../../../configs/colors";

const Tab = styled.View`
  width: 100%
  height: ${widthPercentageToDP(50)}
  flex-direction: row
`;

const TabBarView = styled.View`
  flex: 1
  height: ${widthPercentageToDP(50)}
  flex-direction: column
`;

const TabBar = styled.TouchableOpacity`
  flex: 1
  height: ${widthPercentageToDP(50)}
  justify-content: center
  align-items: center
`;
const TabLabel = styled(NBGBText)`
  color: ${({ visible }) => (visible ? colors.active : "#b2b2b2")};
`;
const TabIndicator = styled.View`
  position: absolute
  width: 100%
  height: ${widthPercentageToDP(2)}
  bottom: 0
  background-color: ${({ visible }) => (visible ? colors.active : "transparent")}
`;

export const BusTab = ({ index = 0, onPress }) => {
  return (
    <Tab>
      {/* <TabBarView>
        <TabBar onPress={() => onPress(0)}>
          <TabLabel visible={index == 0}>스쿨버스</TabLabel>
          <TabIndicator visible={index == 0} />
        </TabBar>
      </TabBarView> */}
      <TabBarView>
        <TabBar onPress={() => onPress(1)}>
          <TabLabel visible={index == 1}>성북02</TabLabel>
          <TabIndicator visible={index == 1} />
        </TabBar>
      </TabBarView>
      <TabBarView>
        <TabBar onPress={() => onPress(2)}>
          <TabLabel visible={index == 2}>종로03</TabLabel>
          <TabIndicator visible={index == 2} />
        </TabBar>
      </TabBarView>
    </Tab>
  );
};
