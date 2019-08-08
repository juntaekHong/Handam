import React, { useRef, useCallback } from "react";
import styled from "styled-components";
import { NBGText } from "../../common/Text";
import { widthPercentageToDP } from "../../../utils/util";
import colors from "../../../configs/colors";
import Switch from "react-native-switch-pro";
import { Platform } from "react-native";

const AlarmSetMenuView = styled.TouchableOpacity`
  width: 100%
  height: ${({ height = 69 }) => widthPercentageToDP(height)}
  flex-direction: row
  justify-content: space-between
  align-items: center
  padding-left: ${widthPercentageToDP(29)}
`;
const Menu = styled.View`
  width: 100%
  align-items: center
`;
export const Bar = styled.View`
  width: ${widthPercentageToDP(316.9)}
  height: 0.5
  background-color: ${({ border = true }) =>
    border ? colors.border : "transparent"}
`;

const shadow = {
  ...Platform.select({
    ios: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.15,
      shadowRadius: 6
    },
    android: {
      elevation: 1
    }
  })
};

const AlarmSetSubjectView = styled.View`
  width: 100%
  height: ${({ height = 51 }) => widthPercentageToDP(height)}
  align-items: flex-start
  justify-content: flex-end
  padding-left: ${widthPercentageToDP(29)}
  padding-bottom: ${widthPercentageToDP(10)}
  background-color: #f8f8f8
  border-color: ${colors.border}
  border-top-width: ${widthPercentageToDP(1)}
  border-bottom-width: ${widthPercentageToDP(1)}
`;

export const AlarmSetSubject = ({ title = "" }) => {
  return (
    <AlarmSetSubjectView>
      <NBGText color={"#272727"}>{title}</NBGText>
    </AlarmSetSubjectView>
  );
};
export const AlarmSetMenu = props => {
  return (
    <Menu>
      <AlarmSetMenuView {...props}>
        <NBGText
          fontSize={16}
          color={props.menuDisable ? "#d9d9d9" : "#272727"}
        >
          {props.title}
        </NBGText>
        <Switch
          width={widthPercentageToDP(40)}
          height={widthPercentageToDP(24)}
          value={props.value}
          disabled={props.menuDisable}
          onAsyncPress={callback => {
            callback(true, value => props.toggle(value));
          }}
          style={[
            {
              marginRight: widthPercentageToDP(29),
              borderWidth: widthPercentageToDP(1)
            },
            { borderColor: props.value ? colors.active : "#d9d9d9" }
          ]}
          circleStyle={[
            {
              width: widthPercentageToDP(22),
              height: widthPercentageToDP(22),
              borderRadius: widthPercentageToDP(11)
            },
            props.value ? {} : shadow
          ]}
          backgroundActive={colors.active}
          backgroundInactive={colors.white}
        />
      </AlarmSetMenuView>
    </Menu>
  );
};
