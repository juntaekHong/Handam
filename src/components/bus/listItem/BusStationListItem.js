import React, { PureComponent } from "react";
import styled from "styled-components";
import {
  widthPercentageToDP,
  getArrMsg,
  returnArrayItem,
  secondToMinute
} from "../../../utils/util";
import { NBGText, NBGBText } from "../../common/Text";
import colors from "../../../configs/colors";
import { View, Image } from "react-native";

const BusStationView = styled.View`
  flex-direction: row
  width: 100%
  height: ${widthPercentageToDP(70)}
  justify-content: space-between
  background-color: ${({ favorite }) => (favorite ? "#f4f4f4" : colors.white)}
`;
const LeftView = styled.View`
  flex: 1
  flex-direction: row
  height: ${widthPercentageToDP(70)}
  padding-right: ${widthPercentageToDP(25.5)}
  align-items: center
  justify-content: flex-end 
`;
const LeftItem = styled.View`
  height: ${widthPercentageToDP(25)}
  padding-left: ${widthPercentageToDP(5)}
  padding-right: ${widthPercentageToDP(5)}
  border-width: ${widthPercentageToDP(1)}
  border-color: #c1c1c1
`;
const BusTagImage = styled.ImageBackground`
  height: ${widthPercentageToDP(14)}
  width: ${widthPercentageToDP(38)}
  padding-left: ${widthPercentageToDP(5.7)}
  margin-right: ${widthPercentageToDP(13.2)}
  justify-content: center
`;

const BarView = styled.View`
  width: ${widthPercentageToDP(10)}
  height: 100%
`;
const BarArrow = styled.View`
  height: ${widthPercentageToDP(1)}
  justify-content: center
  align-items: center
  right: ${widthPercentageToDP(3.5)}
  z-index: 10
`;
const Bar = styled.View`
  flex: 1
  width: ${widthPercentageToDP(3)}
  background-color: #00ddef
`;
const RightView = styled.View`
  position: relative
  flex-direction: row
  width: ${widthPercentageToDP(273)}
  align-items: center
  justify-content: center
  border-bottom-width: ${widthPercentageToDP(0.8)}
  border-color: #b4b4b420
`;
const FavoriteButton = styled.TouchableOpacity`
  position: absolute
  width: ${widthPercentageToDP(48)}
  height: ${widthPercentageToDP(48)}
  right: ${widthPercentageToDP(16)}
  z-index: 10
`;
const ContentView = styled.View`
  flex: 1
  justify-content: center
  padding-right: ${widthPercentageToDP(10)}
`;
const ContentFooter = styled.View`
  flex-direction: row
  justify-content: space-between
`;
export const BusStationListItem = ({
  data = {},
  barIndex = 0,
  favorite = false,
  handleFavorite
}) => {
  return (
    <BusStationView favorite={favorite}>
      <LeftView>
        {getArrMsg(data.arrmsg1) == "곧 도착" ? (
          <BusTagImage
            source={require("HandamProject/assets/image/bus/bus-tag.png")}
          >
            <NBGText fontSize={9} color={"#979797"}>
              {returnArrayItem(data.plainNo1).substr(-4)}
            </NBGText>
          </BusTagImage>
        ) : (
          <View />
        )}
        <BarView>
          <Bar
            style={barIndex == 1 ? { backgroundColor: "transparent" } : null}
          />
          <BarArrow>
            {getArrMsg(data.arrmsg1) == "곧 도착" ? (
              <Image
                source={require("HandamProject/assets/image/bus/bus.png")}
              />
            ) : (
              <Image
                source={require("HandamProject/assets/image/bus/bus-check.png")}
              />
            )}
          </BarArrow>
          <Bar
            style={barIndex == 2 ? { backgroundColor: "transparent" } : null}
          />
        </BarView>
      </LeftView>
      <RightView>
        <FavoriteButton onPress={handleFavorite}>
          {favorite === true ? (
            <Image
              source={require("HandamProject/assets/image/bus/bus-enable.png")}
            />
          ) : (
            <Image
              source={require("HandamProject/assets/image/bus/bus-disable.png")}
            />
          )}
        </FavoriteButton>
        <ContentView>
          <View style={{ marginBottom: widthPercentageToDP(6) }}>
            <NBGText>{data.stNm}</NBGText>
          </View>
          <ContentFooter>
            <NBGBText fontSize={10} color={"#525252"}>
              {data.arrmsg1 == "운행종료"
                ? "운행종료"
                : data.arrmsg1 == "[차고지출발] "
                ? "차고지출발"
                : getArrMsg(data.arrmsg1) == "곧 도착"
                ? "곧 도착"
                : data.kals1 == 0
                ? "도착예정버스 없음"
                : secondToMinute(data.kals1)}
            </NBGBText>
          </ContentFooter>
        </ContentView>
      </RightView>
    </BusStationView>
  );
};
