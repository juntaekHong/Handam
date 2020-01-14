import React, { useCallback } from "react";
import styled from "styled-components/native";
import { Title, TitleIcon, RowView, HCenterView } from "../common/View";
import { widthPercentageToDP } from "../../utils/util";
import { Image, View, TouchableOpacity, Platform } from "react-native";
import { NBGBText, NBGText } from "../common/Text";
import colors from "../../configs/colors";
import FastImage from "react-native-fast-image";
import Carousel from "react-native-looped-carousel";
import navigators from "../../utils/navigators";

const HomeTitleRightView = styled.View`
  height: 100%
  justify-content: center
  align-items: center
  flex-direction: row
`;
const HomeTitleIcon = styled(TitleIcon)`
  margin-right: ${({ marginRight = 0 }) => widthPercentageToDP(marginRight)}
  flex-direction: row
  align-items: center
`;

const BadgeIcon = styled.Image`
  width: ${widthPercentageToDP(6)}
  height: ${widthPercentageToDP(6)}
  position: absolute
  right: ${widthPercentageToDP(-2)}
  top: ${widthPercentageToDP(-2)}
`;

const HomeTitleRight = ({ alarm = false }) => {
  const navigateAlarm = useCallback(() => {
    navigators.navigate("alarm");
  }, []);
  const navigateSetting = useCallback(() => {
    navigators.navigate("setting");
  }, []);
  return (
    <HomeTitleRightView>
      <HomeTitleIcon marginRight={21.4} onPress={navigateSetting}>
        <Image source={require("HandamProject/assets/image/home/settings.png")} />
      </HomeTitleIcon>
      <HomeTitleIcon onPress={navigateAlarm}>
        <Image source={require("HandamProject/assets/image/home/alarm.png")} />
        {alarm ? <BadgeIcon source={require("HandamProject/assets/image/home/reddot.png")} /> : null}
      </HomeTitleIcon>
    </HomeTitleRightView>
  );
};

export const HomeTitle = props => {
  return <Title {...props} paddingRight={16.8} leftInVisible={true} rightRender={() => HomeTitleRight(props)} />;
};

const AboutHandamView = styled.View`
  height: ${widthPercentageToDP(20)}
  width:100%
  padding-right: ${widthPercentageToDP(59)}
  margin-top: ${widthPercentageToDP(5)}
  margin-bottom: ${widthPercentageToDP(1)}
  align-items: flex-end
`;
const AboutTouch = styled.TouchableOpacity`
  flex-direction: row
  align-items: center
`;

export const AboutHandam = props => {
  return (
    <AboutHandamView>
      <AboutTouch>
        <NBGBText fontSize={12} color={colors.active}>
          한담에 대해 알아보기
        </NBGBText>
        <FastImage
          style={{
            width: widthPercentageToDP(20),
            height: widthPercentageToDP(20),
            marginLeft: widthPercentageToDP(1.5)
          }}
          source={require("HandamProject/assets/image/home/arrow.png")}
        />
      </AboutTouch>
    </AboutHandamView>
  );
};

const dotStyle = {
  backgroundColor: colors.dotInActive,
  width: widthPercentageToDP(4),
  height: widthPercentageToDP(4),
  borderWidth: 0,
  borderRadius: widthPercentageToDP(2),
  marginLeft: widthPercentageToDP(3),
  marginRight: widthPercentageToDP(3)
};

export const HomeAd = ({ list = [] }) => {
  return list.length > 0 ? (
    <Carousel
      delay={4000}
      style={{ width: "100%", height: widthPercentageToDP(186) }}
      autoplay
      bullets={true}
      bulletStyle={dotStyle}
      chosenBulletStyle={{ ...dotStyle, backgroundColor: colors.active }}
      bulletsContainerStyle={{
        position: "absolute",
        height: widthPercentageToDP(10),
        bottom: 0
      }}
    >
      {list.map((item, index) => {
        return (
          <FastImage
            key={index}
            resizeMode={FastImage.resizeMode.stretch}
            style={{
              width: widthPercentageToDP(375),
              height: widthPercentageToDP(170)
            }}
            source={{ uri: item.noticeImg }}
          />
        );
      })}
    </Carousel>
  ) : (
    <View style={{ width: "100%", height: widthPercentageToDP(186) }} />
  );
};

export const HomeNavigateView = styled.View`
  width: 100%
  margin-top: ${widthPercentageToDP(11)}
  margin-bottom: ${widthPercentageToDP(4)}
  padding-horizontal: ${widthPercentageToDP(41)}
  align-items: center
  flex-direction: row
`;

const TodayLectureTitleView = styled(RowView)`
  width: 100%
  height: ${widthPercentageToDP(50)}
  padding-left: ${widthPercentageToDP(41)}
  padding-right: ${widthPercentageToDP(25)}
  justify-content: space-between
  align-items: center
`;
export const TodayLectureTitle = props => {
  return (
    <TodayLectureTitleView>
      <NBGBText fontSize={20} color={colors.active}>
        오늘의 강의
      </NBGBText>
      <TouchableOpacity {...props}>
        <Image
          style={{
            width: widthPercentageToDP(50),
            height: widthPercentageToDP(50)
          }}
          source={require("HandamProject/assets/image/home/refresh.png")}
        />
      </TouchableOpacity>
    </TodayLectureTitleView>
  );
};

const TodayLineView = styled(RowView)`
  width: 100%
  height: ${widthPercentageToDP(11.5)}
  padding-left: ${widthPercentageToDP(27)}
  padding-right: ${widthPercentageToDP(26.6)}
  justify-content: space-between
  align-items: center;
`;

export const TodayLine = props => {
  return (
    <TodayLineView>
      <View
        style={{
          width: widthPercentageToDP(122),
          height: widthPercentageToDP(0.5),
          backgroundColor: colors.border
        }}
      />
      <NBGText fontSize={10} color={"#9e9e9e"}>
        {props.time}
      </NBGText>
      <View
        style={{
          width: widthPercentageToDP(122),
          height: widthPercentageToDP(0.5),
          backgroundColor: colors.border
        }}
      />
    </TodayLineView>
  );
};
