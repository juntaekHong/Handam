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
    case 37:
      return 187;
    case 49:
      return 230;
    case 61:
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
    case 161:
      return 144;
    case 173:
      return 101;
    case 185:
      return 58;
    case 197:
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
      return 28;
    case 37:
      return 28;
    case 49:
      return 28;
    case 61:
      return 45;
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
    case 161:
      return 164;
    case 173:
      return 164;
    case 185:
      return 164;
    case 197:
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

export const Room2 = ({ data }) => {
  return (
    <RoomContainer>
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
        <SeatLine start={25} end={30} data={data} />
        <SeatLine start={36} end={31} data={data} />
      </SeatGroup>
      <SeatGroup start={37}>
        <SeatLine start={37} end={42} data={data} />
        <SeatLine start={48} end={43} data={data} />
      </SeatGroup>
      <SeatGroup start={49}>
        <SeatLine start={49} end={54} data={data} />
        <SeatLine start={60} end={55} data={data} />
      </SeatGroup>
      <SeatGroup start={61}>
        <SeatLine start={61} end={65} data={data} />
        <SeatLine start={70} end={66} data={data} />
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
      <SeatGroup start={161}>
        <SeatLine start={161} end={166} data={data} />
        <SeatLine start={160} end={155} data={data} />
      </SeatGroup>
      <SeatGroup start={173}>
        <SeatLine start={173} end={178} data={data} />
        <SeatLine start={172} end={167} data={data} />
      </SeatGroup>
      <SeatGroup start={185}>
        <SeatLine start={185} end={190} data={data} />
        <SeatLine start={184} end={179} data={data} />
      </SeatGroup>
      <SeatGroup start={197}>
        <SeatLine start={197} end={202} data={data} />
        <SeatLine start={196} end={191} data={data} />
      </SeatGroup>
    </RoomContainer>
  );
};
