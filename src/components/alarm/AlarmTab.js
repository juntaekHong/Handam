import React from "react";
import styled from "styled-components";
import { widthPercentageToDP } from "../../utils/util";
import { BaseView } from "../common/View";
import colors from "../../configs/colors";
import { NBGBText } from "../common/Text";

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

export const AlarmTab = props => {
  return (
    <AlarmTabView>
      <BaseView>
        <AlarmTabBar onPress={props.handleUnread}>
          <NBGBText
            fontSize={18}
            color={props.index == 0 ? colors.black : colors.disable}
          >
            안읽음
          </NBGBText>
        </AlarmTabBar>
        <Indicator indicate={props.index == 0} />
      </BaseView>
      <BaseView>
        <AlarmTabBar onPress={props.handleRead}>
          <NBGBText
            fontSize={18}
            color={props.index == 1 ? colors.black : colors.disable}
          >
            읽음
          </NBGBText>
        </AlarmTabBar>
        <Indicator indicate={props.index == 1} />
      </BaseView>
    </AlarmTabView>
  );
};
