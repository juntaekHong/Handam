import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { widthPercentageToDP as wp } from "../../../utils/util";
import { Seat, ActiveSeat } from "../View";
import { View } from "react-native";

const xGroup = num => {
  switch (num) {
    case 1:
      return 16;
    case 9:
      return 58;
    case 17:
      return 101;
    case 25:
      return 144;
    case 35:
      return 187;
    case 47:
      return 230;
    case 59:
      return 273;
    case 71:
      return 316;
    case 83:
      return 359;
    case 101:
      return 359;
    case 113:
      return 316;
    case 125:
      return 273;
    case 137:
      return 230;
    case 149:
      return 187;
    case 160:
      return 144;
    case 171:
      return 101;
    case 183:
      return 58;
    case 194:
      return 16;
  }
};

const yGroup = num => {
  switch (num) {
    case 1:
      return 62;
    case 9:
      return 62;
    case 17:
      return 62;
    case 25:
      return 45;
    case 35:
      return 28;
    case 47:
      return 28;
    case 59:
      return 28;
    case 71:
      return 28;
    case 83:
      return 28;
    case 101:
      return 164;
    case 113:
      return 164;
    case 125:
      return 164;
    case 137:
      return 164;
    case 149:
      return 164;
    case 160:
      return 164;
    case 171:
      return 164;
    case 183:
      return 164;
    case 194:
      return 164;
  }
};

const RoomContainer = props => <View style={{ width: wp(426), height: wp(280) }}>{props.children}</View>;

const SeatGroup = props => (
  <View
    style={{ position: "absolute", flexDirection: "row", left: wp(xGroup(props.start)), top: wp(yGroup(props.start)) }}
  >
    {props.children}
  </View>
);

const SeatLine = ({ data, start, end }) => {
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
    <View style={{ marginRight: wp(3) }}>
      {list.map((item, index) => {
        if (data[item]) return <ActiveSeat style={{ marginBottom: wp(3) }} />;
        else return <Seat style={{ marginBottom: wp(3) }} />;
      })}
    </View>
  );
};

export const Room1 = ({ data }) => {
  return (
    <RoomContainer>
      <View style={{ flex: 1 }} />
      <SeatGroup start={1}>
        <SeatLine start={1} end={4} data={data} />
        <SeatLine start={8} end={5} data={data} />
      </SeatGroup>
      <SeatGroup start={9}>
        <SeatLine start={9} end={12} data={data} />
        <SeatLine start={16} end={13} data={data} />
      </SeatGroup>
      <SeatGroup start={17}>
        <SeatLine start={17} end={20} data={data} />
        <SeatLine start={24} end={21} data={data} />
      </SeatGroup>
      <SeatGroup start={25}>
        <SeatLine start={25} end={29} data={data} />
        <SeatLine start={34} end={30} data={data} />
      </SeatGroup>
      <SeatGroup start={35}>
        <SeatLine start={35} end={40} data={data} />
        <SeatLine start={46} end={41} data={data} />
      </SeatGroup>
      <SeatGroup start={47}>
        <SeatLine start={47} end={52} data={data} />
        <SeatLine start={58} end={53} data={data} />
      </SeatGroup>
      <SeatGroup start={59}>
        <SeatLine start={59} end={64} data={data} />
        <SeatLine start={70} end={65} data={data} />
      </SeatGroup>
      <SeatGroup start={71}>
        <SeatLine start={71} end={76} data={data} />
        <SeatLine start={82} end={77} data={data} />
      </SeatGroup>
      <SeatGroup start={83}>
        <SeatLine start={83} end={88} data={data} />
        <SeatLine start={94} end={89} data={data} />
      </SeatGroup>
      <SeatGroup start={101}>
        <SeatLine start={101} end={106} data={data} />
        <SeatLine start={100} end={95} data={data} />
      </SeatGroup>
      <SeatGroup start={113}>
        <SeatLine start={113} end={118} data={data} />
        <SeatLine start={112} end={107} data={data} />
      </SeatGroup>
      <SeatGroup start={125}>
        <SeatLine start={125} end={130} data={data} />
        <SeatLine start={124} end={119} data={data} />
      </SeatGroup>
      <SeatGroup start={137}>
        <SeatLine start={137} end={142} data={data} />
        <SeatLine start={136} end={131} data={data} />
      </SeatGroup>
      <SeatGroup start={149}>
        <SeatLine start={149} end={154} data={data} />
        <SeatLine start={148} end={143} data={data} />
      </SeatGroup>
      <SeatGroup start={160}>
        <SeatLine start={160} end={164} data={data} />
        <SeatLine start={159} end={155} data={data} />
      </SeatGroup>
      <SeatGroup start={171}>
        <SeatLine start={171} end={176} data={data} />
        <SeatLine start={170} end={165} data={data} />
      </SeatGroup>
      <SeatGroup start={183}>
        <SeatLine start={183} end={188} data={data} />
        <SeatLine start={182} end={177} data={data} />
      </SeatGroup>
      <SeatGroup start={194}>
        <SeatLine start={194} end={198} data={data} />
        <SeatLine start={193} end={189} data={data} />
      </SeatGroup>
    </RoomContainer>
  );
};
