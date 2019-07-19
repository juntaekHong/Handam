import React from "react";
import styled from "styled-components";
import { widthPercentageToDP } from "../../../utils/util";
import { BaseView } from "../../common/View";
import colors from "../../../configs/colors";
import { NBGBText } from "../../common/Text";
import { View } from "react-native";

const AlarmTabView = styled.View`
  width: 100%
  height: ${widthPercentageToDP(34)}
  flex-direction: row
`;
const AlarmTabBar = styled.TouchableOpacity`
  flex: 1
  align-items: center
  justify-content: flex-end
  padding-bottom: ${widthPercentageToDP(9)}
`;

const Indicator = styled.View`
  width: 100%
  height: ${widthPercentageToDP(2)}
  background-color: ${({ indicate = false }) =>
    indicate ? colors.active : colors.disable}
`;

const Badge = styled.View`
  position: absolute
  width: ${widthPercentageToDP(14)}
  height: ${widthPercentageToDP(14)}
  border-radius: ${widthPercentageToDP(7)}
  background-color: ${({ count = 0 }) => (count > 0 ? "#ff9595" : colors.white)}
  top: ${widthPercentageToDP(3)}
  right: ${widthPercentageToDP(-19)}
`;

export const AlarmTab = props => {
  return (
    <AlarmTabView>
      <BaseView>
        <AlarmTabBar onPress={props.handleUnread}>
          <View>
            <NBGBText fontSize={18} color={colors.black}>
              안읽음
            </NBGBText>
            <Badge count={props.count} />
          </View>
        </AlarmTabBar>
        <Indicator indicate={props.index == 0} />
      </BaseView>
      <BaseView>
        <AlarmTabBar onPress={props.handleRead}>
          <NBGBText fontSize={18} color={colors.black}>
            읽음
          </NBGBText>
        </AlarmTabBar>
        <Indicator indicate={props.index == 1} />
      </BaseView>
    </AlarmTabView>
  );
};
