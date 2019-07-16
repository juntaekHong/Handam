import React, { useState, useCallback } from "react";
import { BusStationListItem } from "../listItem/BusStationListItem";
import { FlatList } from "react-native";
import { widthPercentageToDP } from "../../../utils/util";

export const BusList = props => {
  return (
    <FlatList
      style={{ marginTop: widthPercentageToDP(47.5) }}
      contentContainerStyle={[
        {
          flexGrow: 1,
          width: "100%",
          backgroundColor: "#fff"
        },
        props.visible ? { height: "100%" } : { height: 0 }
      ]}
      keyExtractor={(item, index) => index.toString()}
      data={props.list}
      extraData={props}
      renderItem={({ item, index }) => {
        return (
          <BusStationListItem
            data={item}
            barIndex={index == 0 ? 1 : index == props.list.length - 1 ? 2 : 0}
          />
        );
      }}
    />
  );
};
