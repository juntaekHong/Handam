import React, { useCallback } from "react";
import styled from "styled-components";
import { FlatList } from "react-native";
import { AlarmListItem } from "../listItem/AlarmListItem";
import { AlarmActions } from "../../../store/actionCreator";

export const AlarmList = props => {
  const onPress = useCallback(
    alarmIndex => {
      if (props.index == 0) AlarmActions.putUpdateAlarm(alarmIndex);
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
        return (
          <AlarmListItem item={item} onPress={() => onPress(item.alarmIndex)} />
        );
      }}
    />
  );
};
