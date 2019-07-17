import React from "react";
import { BaseView, Title } from "../../components/common/View";
import styled from "styled-components";
import { widthPercentageToDP } from "../../utils/util";
import { Dimensions } from "react-native";

const BusTimeImg = styled.Image`
  flex: 1
  width: ${Dimensions.get("window").width}
  height: ${widthPercentageToDP(729)}
`;
const BusTime = () => {
  return (
    <BaseView>
      <Title title="버스시간표" rightInVisible={true} />
      <BusTimeImg
        source={require("HandamProject/assets/image/bus/bustimetable.png")}
      />
    </BaseView>
  );
};

export default BusTime;
