import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP as wp } from "../../utils/util";
import { CenterView } from "../common/View";
import { NBGText, NBGBText } from "../common/Text";
import colors from "../../configs/colors";
import { TouchableOpacity, Image, Platform, View, ScrollView } from "react-native";

const shadow = {
  ...Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84
    },
    android: {
      elevation: 5
    }
  })
};

const CountView = styled.View`
  flex-direction: row
  width: 100%
  height: ${wp(74)}
  margin-top: ${wp(10)}
  margin-bottom: ${wp(25)}
  border-radius: ${wp(8)}
  background-color: ${colors.white}
  ${shadow}
`;

export const ReadingCountView = props => {
  return (
    <CountView>
      <CenterView style={{ borderRadius: wp(8) }}>
        <NBGBText marginBottom={14} color={colors.active} fontSize={18}>
          {props.total}
        </NBGBText>
        <NBGText fontSize={18}>전체 좌석수</NBGText>
      </CenterView>
      <CenterView style={{ borderRadius: wp(8) }}>
        <NBGBText marginBottom={14} color={colors.active} fontSize={18}>
          {props.use}
        </NBGBText>
        <NBGText fontSize={18}>사용 좌석수</NBGText>
      </CenterView>
      <CenterView style={{ borderRadius: wp(8) }}>
        <NBGBText marginBottom={14} color={colors.active} fontSize={18}>
          {props.rest}
        </NBGBText>
        <NBGText fontSize={18}>잔여 좌석수</NBGText>
      </CenterView>
    </CountView>
  );
};

const ReadingRowView = styled.View`
  flex-direction: row
  width: 100%
  height: ${wp(50)}
`;

export const ReadingTabContainer = styled(ReadingRowView)`
  height: ${wp(51)};
`;

const SelectBar = styled.View`
  position: absolute
  width: 100%
  bottom: 0
  height: ${({ height = 2 }) => wp(height)}
  background-color: ${({ color = colors.active }) => color}
`;

const TabBar = styled.TouchableOpacity`
  flex: 1
  justify-content: center
  align-items: center
`;

export const ReadingTab = props => {
  return (
    <TabBar {...props}>
      {props.selected ? (
        <NBGBText color={colors.active} fontSize={18}>
          {props.title}
        </NBGBText>
      ) : (
        <NBGText fontSize={18}>{props.title}</NBGText>
      )}
      <SelectBar color={props.selected ? colors.active : colors.border} height={props.selected ? 2 : 1} />
    </TabBar>
  );
};

export const ReadingRefresh = props => {
  return (
    <ReadingRowView style={{ justifyContent: "space-between", alignItems: "center" }}>
      <NBGBText>{`${props.title} 좌석`}</NBGBText>
      <TouchableOpacity {...props}>
        <Image
          style={{ width: wp(50), height: wp(50) }}
          source={require("HandamProject/assets/image/home/refresh.png")}
        />
      </TouchableOpacity>
    </ReadingRowView>
  );
};

export const Seat = styled.View`
  width: ${wp(14)}
  height: ${wp(14)}
  border-radius: ${wp(2)}
  background-color: #c6c6c6
`;

export const ActiveSeat = styled(Seat)`
  background-color: ${colors.active};
`;

export const ReadingTimeView = props => {
  return (
    <ReadingRowView style={{ height: wp(40), justifyContent: "space-between", alignItems: "center" }}>
      <View style={{ flexDirection: "row" }}>
        <ActiveSeat />
        <NBGText marginLeft={8} fontSize={13}>
          사용중
        </NBGText>
        <Seat style={{ marginLeft: wp(16) }} />
        <NBGText marginLeft={8} fontSize={13}>
          미사용
        </NBGText>
      </View>
      <NBGText fontSize={10}>{props.time}</NBGText>
    </ReadingRowView>
  );
};

export const SeatMapContainer = styled.ScrollView.attrs(props => ({
  horizontal: true
}))`
  width: ${wp(323)}
  height: ${wp(280)}
  margin-bottom: ${wp(27)}
  border-radius: ${wp(8)}
  background-color: #f7f7f7
`;
