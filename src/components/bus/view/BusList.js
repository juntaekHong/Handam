import React, { useState, useCallback } from "react";
import { BusStationListItem } from "../listItem/BusStationListItem";
import { FlatList } from "react-native";

export const BusList = props => {
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
          <BusStationListItem
            data={item}
            barIndex={index == 0 ? 1 : index == props.list.length - 1 ? 2 : 0}
            favorite={props.favorite[item.arsId]}
            handleFavorite={() => props.handleFavorite(item.arsId)}
          />
        );
      }}
    />
  );
};
