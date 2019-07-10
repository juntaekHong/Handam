import React from "react";
import styled from "styled-components/native";
import { Title, TitleIcon } from "../common/View";
import { widthPercentageToDP } from "../../utils/util";
import { Image, View } from "react-native";
import { NBGBText } from "../common/Text";
import colors from "../../configs/colors";
import FastImage from "react-native-fast-image";
import Carousel from "react-native-looped-carousel";

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
  right: ${widthPercentageToDP(2)}
  top: ${widthPercentageToDP(2)}
`;

const HomeTitleRight = ({ alarm = false }) => {
  return (
    <HomeTitleRightView>
      <HomeTitleIcon marginRight={8.9}>
        <Image
          source={require("HandamProject/assets/image/home/settings.png")}
        />
      </HomeTitleIcon>
      <HomeTitleIcon>
        <Image source={require("HandamProject/assets/image/home/alarm.png")} />
        {alarm ? (
          <BadgeIcon
            source={require("HandamProject/assets/image/home/reddot.png")}
          />
        ) : null}
      </HomeTitleIcon>
    </HomeTitleRightView>
  );
};

export const HomeTitle = props => {
  return (
    <Title
      {...props}
      paddingRight={16.8}
      leftInVisible={true}
      rightRender={() => HomeTitleRight(props)}
    />
  );
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
        return item.noticeImg.indexOf("https") >= 0 ||
          item.noticeImg.indexOf("http") >= 0 ? (
          <FastImage
            key={index}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: widthPercentageToDP(375),
              height: widthPercentageToDP(170)
            }}
            source={{ uri: item.noticeImg }}
          />
        ) : (
          <View style={{ width: "100%", height: widthPercentageToDP(186) }} />
        );
      })}
    </Carousel>
  ) : null;
};
