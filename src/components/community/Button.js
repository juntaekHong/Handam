import React from "react";
import { TouchableOpacity, Image } from "react-native";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import { Image28, Image21 } from "./Image";

export const BackBtn = props => {
  return (
    <TouchableOpacity
      style={{ marginLeft: widthPercentageToDP(10) }}
      onPress={() => props.handler()}
    >
      <Image28 source={require("../../../assets/image/community/back.png")} />
    </TouchableOpacity>
  );
};

export const WriteButton = props => {
  return (
    <TouchableOpacity
      style={{ marginLeft: widthPercentageToDP(5) }}
      onPress={() => props.handler()}
      disabled={props.no_click}
    >
      <Image28
        source={require("../../../assets/image/community/reply_write.png")}
      />
    </TouchableOpacity>
  );
};

export const AnonymousButton = props => {
  return (
    <TouchableOpacity
      style={{ marginLeft: widthPercentageToDP(7) }}
      onPress={() => {
        props.handler();
      }}
      disabled={props.disabled}
    >
      <Image28
        source={
          props.anonymous == 0
            ? require("../../../assets/image/community/anonymous_off.png")
            : require("../../../assets/image/community/anonymous_on.png")
        }
      />
    </TouchableOpacity>
  );
};

export const EmojiButton = props => {
  return (
    <TouchableOpacity
      style={{ marginLeft: widthPercentageToDP(9.5) }}
      onPress={() => {
        props.handler();
      }}
    >
      <Image21
        source={
          props.emoji == false
            ? require("../../../assets/image/community/emoji.png")
            : require("../../../assets/image/community/emoji_color.png")
        }
      />
    </TouchableOpacity>
  );
};

export const C_ReplyButton = styled.TouchableOpacity`
  flex-direction: row;
  width: ${widthPercentageToDP(40)};
  height: ${widthPercentageToDP(22)};
  justify-content: center;
  align-items: center;
  margin-right: ${widthPercentageToDP(8)};
  border-radius: ${widthPercentageToDP(20)};
  border-color: ${"#9e9e9e"};
  border-width: ${widthPercentageToDP(1)};
`;

export const C_LikeButton = styled.TouchableOpacity`
  flex-direction: row;
  width: ${widthPercentageToDP(40)};
  height: ${widthPercentageToDP(22)};
  justify-content: center;
  align-items: center;
  border-radius: ${widthPercentageToDP(20)};
  border-color: ${"#9e9e9e"};
  border-width: ${widthPercentageToDP(1)};
`;
