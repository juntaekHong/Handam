import React from "react";
import { View, Platform } from "react-native";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import {
  DaText,
  PushedDaText,
  OText,
  XText,
  PushedText,
  MySelectText,
  PercentText,
  PersonText,
  PreVoteText
} from "./Text";

export const TopView = styled.View`
  width: ${widthPercentageToDP(343)};
  height: ${widthPercentageToDP(379)};
  align-items: center;
  margin-top: ${widthPercentageToDP(11)};
  margin-horizontal: ${widthPercentageToDP(16)};
`;

export const BottomView = styled.View``;

const Vote = styled.TouchableOpacity`
  width: ${widthPercentageToDP(105)};
  height: ${widthPercentageToDP(110)};
  align-items: center;
  border-color: ${"#000000"}
  border-width: ${widthPercentageToDP(0)};
  border-radius: ${widthPercentageToDP(10)};
`;

const PushedVote = styled.View`
  background-color: ${"#646464"};
  width: ${widthPercentageToDP(105)};
  height: ${widthPercentageToDP(110)};
  align-items: center;
  border-color: ${"#000000"}
  border-width: ${widthPercentageToDP(0)};
  border-radius: ${widthPercentageToDP(10)};
`;

const Shadow = {
  ...Platform.select({
    ios: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.16,
      shadowRadius: 10
    },
    android: {
      elevation: 3
    }
  })
};

const MySelect = styled.View`
  background-color: ${"#848484"}
  width: ${widthPercentageToDP(56)}
  height: ${widthPercentageToDP(20)}
  justify-content: center;
  align-items: center;
  border-color: ${"#848484"}
  border-width: ${widthPercentageToDP(1)};
  border-radius: ${widthPercentageToDP(15)};
  `;

export const VoteView = props => {
  if (props.text === "O") {
    if (props.pushed == true) {
      return (
        <PushedVote>
          <PushedDaText>{props.oText}</PushedDaText>
          <PushedText>O</PushedText>
          <MySelect>
            <MySelectText>나의 선택</MySelectText>
          </MySelect>
        </PushedVote>
      );
    }
    return (
      <Vote
        style={[Shadow]}
        onPress={() => props.handler()}
        disabled={!props.enabled}
      >
        <DaText>{props.oText}</DaText>
        <OText>O</OText>
      </Vote>
    );
  } else {
    if (props.pushed == true) {
      return (
        <PushedVote>
          <PushedDaText>{props.xText}</PushedDaText>
          <PushedText>X</PushedText>
          <MySelect>
            <MySelectText>나의 선택</MySelectText>
          </MySelect>
        </PushedVote>
      );
    } else {
      return (
        <Vote
          style={[Shadow]}
          onPress={() => props.handler()}
          disabled={!props.enabled}
        >
          <DaText>{props.xText}</DaText>
          <XText>X</XText>
        </Vote>
      );
    }
  }
};

const PercentContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${widthPercentageToDP(9)};
`;

const PercentBar = styled.View`
  background-color: ${"#dbdbdb"};
  width: ${widthPercentageToDP(160)};
  height: ${widthPercentageToDP(11)};
  margin-horizontal: ${widthPercentageToDP(13)};
  border-radius: ${widthPercentageToDP(15)};
  border-width: ${widthPercentageToDP(1)};
  border-color: ${"#dbdbdb"};
`;

const PercentBarContainer = props => {
  if (props.oPercent != props.xPercent) {
    return (
      <View>
        <PercentBar />
        <View
          style={{
            position: "absolute",
            backgroundColor: "#848484",
            width: widthPercentageToDP(
              parseInt(
                props.oPercent > props.xPercent
                  ? props.oPercent
                  : props.xPercent
              ) * 1.6
            ),
            height: widthPercentageToDP(11),
            marginHorizontal: widthPercentageToDP(13),
            borderRadius: widthPercentageToDP(15),
            borderWidth: widthPercentageToDP(1),
            borderColor: "#848484"
          }}
        />
      </View>
    );
  } else {
    return <PercentBar />;
  }
};

export const PercentView = props => {
  return (
    <View style={{ alignItems: "center" }}>
      <PersonText>{`총 ${props.number}명 참여`}</PersonText>
      <PercentContainer>
        <PercentText>{props.oPercent}%</PercentText>
        <PercentBarContainer {...props} />
        <PercentText>{props.xPercent}%</PercentText>
      </PercentContainer>
    </View>
  );
};

export const PreVote = styled.TouchableOpacity`
  background-color: ${"#ffffff"};
  flex-direction: row;
  width: ${widthPercentageToDP(80)};
  height: ${widthPercentageToDP(26)};
  justify-content: center;
  align-items: center;
  margin-top: ${widthPercentageToDP(4)};
  margin-left: ${widthPercentageToDP(279)};
  border-radius: ${widthPercentageToDP(15)};
  border-width: ${widthPercentageToDP(1)};
  border-color: ${"#ffffff"};
`;

export const PreImage = styled.Image`
  width: ${widthPercentageToDP(4.6)};
  height: ${widthPercentageToDP(10)};
  margin-left: ${widthPercentageToDP(4.4)};
`;

export const PreVoteView = props => {
  return (
    <PreVote
      onPress={() => {
        props.handler();
      }}
    >
      <PreVoteText>지난 투표</PreVoteText>
      <PreImage source={require("../../../assets/image/community/next.png")} />
    </PreVote>
  );
};
