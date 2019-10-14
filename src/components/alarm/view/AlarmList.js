import React, { useCallback } from "react";
import styled from "styled-components";
import { FlatList } from "react-native";
import { AlarmListItem } from "../listItem/AlarmListItem";
import { AlarmActions, TalkActions } from "../../../store/actionCreator";
import navigators from "../../../utils/navigators";

export const AlarmList = props => {
  const onPress = useCallback(
    alarm => {
      if (props.index == 0) AlarmActions.putUpdateAlarm(alarm.alarmIndex);
      TalkActions.handleDetailloading(true);
      const postsIndex = JSON.parse(alarm.data).postsIndex;
      navigators.navigate("TalkDetail", {
        from: "alarm",
        postsIndex
      });
    },
    [props.index]
  );
  return (
    <FlatList
      contentContainerStyle={[
        {
          flexGrow: 1,
          width: "100%",
          backgroundColor: "#fff"
        }
      ]}
      keyExtractor={(item, index) => index.toString()}
      data={props.list}
      extraData={props}
      renderItem={({ item, index }) => {
        return <AlarmListItem item={item} onPress={() => onPress(item)} />;
      }}
    />
  );
};
