import React, { useCallback } from "react";
import styled from "styled-components";
import { FlatList } from "react-native";
import { AlarmListItem } from "../listItem/AlarmListItem";
import { AlarmActions } from "../../../store/actionCreator";
import navigators from "../../../utils/navigators";

export const AlarmList = props => {
  const onPress = useCallback(
    alarm => {
      if (props.index == 0) AlarmActions.putUpdateAlarm(alarm.alarmIndex);

      navigators.navigate("TalkDetail", {
        from: "alarm",
        postsIndex: alarm.data.postsIndex
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
