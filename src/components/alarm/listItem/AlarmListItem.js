import React from "react";
import styled from "styled-components";
import { widthPercentageToDP, timeSince } from "../../../utils/util";
import { NBGText, NBGBText } from "../../common/Text";
import colors from "../../../configs/colors";

const ListItemView = styled.TouchableOpacity`
  width: 100%
  height: ${widthPercentageToDP(81)}
  padding-left: ${widthPercentageToDP(16)}
  justify-content: center
  border-bottom-width: 0.5
  border-color: ${colors.disable}
`;
export const AlarmListItem = props => {
  const data = JSON.parse(props.item.data);
  return (
    <ListItemView {...props}>
      <NBGText
        style={{ height: widthPercentageToDP(13) }}
        fontSize={11}
        marginBottom={8}
      >
        {data.postsCategoryName}
      </NBGText>
      <NBGBText fontSize={13} color={"#101010"} marginBottom={10}>
        {data.postsTitle}
      </NBGBText>
      <NBGText
        style={{ height: widthPercentageToDP(13) }}
        fontSize={11}
        color={"#646464"}
      >
        {timeSince(props.item.readAt)}
      </NBGText>
    </ListItemView>
  );
};
