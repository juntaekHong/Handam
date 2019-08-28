import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
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
import { VoteItemImg } from "./Image";

export const TopView = styled.View`
  width: ${widthPercentageToDP(343)};
  height: ${widthPercentageToDP(379)};
  align-items: center;
  margin-top: ${widthPercentageToDP(11)};
  margin-horizontal: ${widthPercentageToDP(16)};
`;

export const BottomView = styled.View``;

const VoteItem = props => {
  return (
    <TouchableOpacity onPress={() => props.handler()} disabled={!props.enabled}>
      <VoteItemImg
        source={require("../../../assets/image/community/vote.png")}
      />
      <VoteContainer>
        <DaText>{props.datext}</DaText>
        {props.text == "O" ? (
          <OText>{props.text}</OText>
        ) : (
          <XText>{props.text}</XText>
        )}
      </VoteContainer>
    </TouchableOpacity>
  );
};

const PushedVoteItem = props => {
  return (
    <View style={{ alignItems: "center" }}>
      <VoteItemImg
        source={require("../../../assets/image/community/vote_color.png")}
      />
      <VoteContainer>
        <PushedDaText>{props.datext}</PushedDaText>
        <PushedText>{props.text}</PushedText>
      </VoteContainer>

      <MySelect>
        <MySelectText>나의 선택</MySelectText>
      </MySelect>
    </View>
  );
};

const VoteContainer = styled.View`
  position: absolute;
  width: ${widthPercentageToDP(129)}
  align-items: center;
  margin-top: ${widthPercentageToDP(12)};
`;

const MySelect = styled.View`
  position: absolute;
  background-color: ${"#848484"};
  width: ${widthPercentageToDP(56)};
  height: ${widthPercentageToDP(20)};
  justify-content: center;
  align-items: center;
  margin-top: ${widthPercentageToDP(130)}
  border-width: ${widthPercentageToDP(0.5)};
  border-radius: ${widthPercentageToDP(15)};
  border-color: ${"#848484"};
`;

export const VoteView = props => {
  if (props.text === "O") {
    if (props.pushed == true) {
      return <PushedVoteItem datext={props.oText} text={"O"} />;
    } else return <VoteItem {...props} datext={props.oText} text={"O"} />;
  } else {
    if (props.pushed == true) {
      return <PushedVoteItem datext={props.xText} text={"X"} />;
    } else return <VoteItem {...props} datext={props.xText} text={"X"} />;
  }
};

const PercentContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${widthPercentageToDP(7)};
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
        {props.check == true ? (
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
              marginRight: widthPercentageToDP(13),
              marginLeft: widthPercentageToDP(
                13 +
                  parseInt(
                    props.oPercent > props.xPercent ? 0 : props.oPercent * 1.6
                  )
              ),
              borderRadius: widthPercentageToDP(15),
              borderWidth: widthPercentageToDP(1),
              borderColor: "#848484"
            }}
          />
        ) : null}
      </View>
    );
  } else {
    return <PercentBar />;
  }
};

export const PercentView = props => {
  return (
    <View style={{ width: widthPercentageToDP(255), alignItems: "center" }}>
      <PersonText>{`총 ${props.number}명 참여`}</PersonText>
      <PercentContainer>
        {props.check == true ? (
          <PercentText>{props.oPercent}%</PercentText>
        ) : null}
        <PercentBarContainer {...props} />
        {props.check == true ? (
          <PercentText>{props.xPercent}%</PercentText>
        ) : null}
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
