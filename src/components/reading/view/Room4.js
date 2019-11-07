import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { widthPercentageToDP as wp } from "../../../utils/util";
import { Seat, ActiveSeat } from "../View";
import { View } from "react-native";

const xGroup = num => {
  switch (num) {
    case 9:
      return 43;
    case 14:
      return 43;
    case 24:
      return 85;
    case 34:
      return 128;
    case 44:
      return 171;
    case 50:
      return 235;
  }
};

const yGroup = num => {
  switch (num) {
    case 9:
      return 197;
    case 14:
      return 70;
    case 24:
      return 70;
    case 34:
      return 70;
    case 44:
      return 70;
    case 50:
      return 87;
  }
};

const RoomContainer = props => <View style={{ width: wp(323), height: wp(280) }}>{props.children}</View>;

const SeatGroup = props => (
  <View
    style={{ position: "absolute", flexDirection: "row", left: wp(xGroup(props.start)), top: wp(yGroup(props.start)) }}
  >
    {props.children}
  </View>
);

const SeatLine = ({ data, start, end, row = "column" }) => {
  const [list, setList] = useState([]);
  const [order, setOrder] = useState(start > end);

  useEffect(() => {
    const arr = list;
    if (order) {
      for (let i = start; i >= end; i--) arr.push(i);
    } else {
      for (let i = start; i <= end; i++) arr.push(i);
    }
    setList(arr);
  }, [order]);
  return (
    <View style={{ marginRight: wp(3), flexDirection: row }}>
      {list.map((item, index) => {
        if (data[item])
          return <ActiveSeat style={row === "column" ? { marginBottom: wp(3) } : { marginLeft: wp(3) }} />;
        else return <Seat style={row === "column" ? { marginBottom: wp(3) } : { marginLeft: wp(3) }} />;
      })}
    </View>
  );
};

export const Room4 = ({ data }) => {
  return (
    <RoomContainer>
      <SeatGroup start={9}>
        <SeatLine start={9} end={1} data={data} row={"row"} />
      </SeatGroup>
      <SeatGroup start={14}>
        <SeatLine start={14} end={10} data={data} />
        <SeatLine start={15} end={19} data={data} />
      </SeatGroup>
      <SeatGroup start={24}>
        <SeatLine start={24} end={20} data={data} />
        <SeatLine start={25} end={29} data={data} />
      </SeatGroup>
      <SeatGroup start={34}>
        <SeatLine start={34} end={30} data={data} />
        <SeatLine start={35} end={39} data={data} />
      </SeatGroup>
      <SeatGroup start={44}>
        <SeatLine start={44} end={40} data={data} />
        <SeatLine start={45} end={49} data={data} />
      </SeatGroup>
      <SeatGroup start={50}>
        <SeatLine start={50} end={55} data={data} />
      </SeatGroup>
    </RoomContainer>
  );
};
