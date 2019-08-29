import React, { useRef, useCallback } from "react";
import styled from "styled-components";
import { NBGText } from "../../common/Text";
import { widthPercentageToDP } from "../../../utils/util";
import colors from "../../../configs/colors";
import Switch from "react-native-switch-pro";
import { Platform } from "react-native";

const LockMenuView = styled.TouchableOpacity`
  width: 100%
  padding-top: ${widthPercentageToDP(13.5)}
  padding-bottom: ${widthPercentageToDP(11.5)}
  flex-direction: row
  justify-content: space-between
  align-items: center
  padding-left: ${widthPercentageToDP(29)}
`;
const LockMenuIcon = styled.Image`
  width: ${widthPercentageToDP(28)}
  height: ${widthPercentageToDP(28)}
  margin-right: ${widthPercentageToDP(18)}
`;
const Menu = styled.View`
  width: 100%
  align-items: center
`;
const Bar = styled.View`
  width: ${widthPercentageToDP(316.9)}
  height: ${widthPercentageToDP(0.5)}
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
export const LockMenu = props => {
  return (
    <Menu>
      <LockMenuView {...props}>
        <NBGText
          fontSize={16}
          color={props.menuDisable ? "#d9d9d9" : "#272727"}
        >
          {props.title}
        </NBGText>
        {!props.switch ? (
          <LockMenuIcon
            source={require("HandamProject/assets/image/setting/grayarrow.png")}
          />
        ) : (
          <Switch
            ref={props.switchRef}
            width={widthPercentageToDP(40)}
            height={widthPercentageToDP(24)}
            value={props.value}
            disabled={props.menuDisable}
            onAsyncPress={callback => {
              callback(true, value => props.toggle(value));
            }}
            style={[
              { marginRight: widthPercentageToDP(29) },
              props.value
                ? {}
                : {
                    borderWidth: widthPercentageToDP(1),
                    borderColor: "#d9d9d9"
                  }
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
        )}
      </LockMenuView>
      <Bar border={props.border} />
    </Menu>
  );
};
