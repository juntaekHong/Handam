import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../../utils/util";
import { NBGText } from "../../common/Text";
import colors from "../../../configs/colors";

const SettingMenuView = styled.View`
  width: 100%
  height: ${widthPercentageToDP(51)}
  padding-left: ${widthPercentageToDP(29)}
  padding-bottom: ${widthPercentageToDP(10)}
  justify-content: flex-end
  background-color: #f8f8f8
  border-top-width: 0.5
  border-bottom-width: 0.5
  border-color: ${colors.border}
`;
export const SettingMenuTitle = props => {
  return (
    <SettingMenuView>
      <NBGText color={"#272727"}>{props.title}</NBGText>
    </SettingMenuView>
  );
};
