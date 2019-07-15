import React from "react";
import styled from "styled-components";
import { FlatList } from "react-native";
import { widthPercentageToDP } from "../../../utils/util";

export const BusView = props => {
  return (
    <FlatList
      style={{
        marginTop: widthPercentageToDP(47.5)
      }}
      contentContainerStyle={{
        flexGrow: 1,
        width: "100%",
        backgroundColor: "#fff"
      }}
      keyExtractor={(item, index) => index.toString()}
      {...props}
    />
  );
};
