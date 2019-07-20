import React from "react";
import styled from "styled-components";
import { NBGText } from "../../common/Text";
import { widthPercentageToDP } from "../../../utils/util";
import colors from "../../../configs/colors";

const SettingMenuView = styled.TouchableOpacity`
  width: 100%
  height: ${widthPercentageToDP(44)}
  flex-direction: row
  justify-content: space-between
  align-items: center
  padding-left: ${widthPercentageToDP(29)}
`;
const SettingMenuIcon = styled.Image`
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
  height: 0.5
  background-color: ${({ border = true }) =>
    border ? colors.border : "transparent"}
`;
export const SettingMenu = props => {
  return (
    <Menu>
      <SettingMenuView {...props}>
        <NBGText fontSize={18} color={"#272727"}>
          {props.title}
        </NBGText>
        {!props.right ? (
          <SettingMenuIcon
            source={require("HandamProject/assets/image/setting/grayarrow.png")}
          />
        ) : (
          <NBGText
            fontSize={16}
            color={"#646464"}
            style={{
              height: widthPercentageToDP(28),
              marginRight: widthPercentageToDP(29)
            }}
          >
            {props.rightText}
          </NBGText>
        )}
      </SettingMenuView>
      <Bar border={props.border} />
    </Menu>
  );
};
