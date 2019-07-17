import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Hyperlink from "react-native-hyperlink";
import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP, timeSince } from "../../utils/util";

export const LineView = styled.View`
  background-color: #dbdbdb;
  width: ${widthPercentageToDP(375)};
  height: ${widthPercentageToDP(1)};
`;

export const WritePostView = styled.View`
  position: absolute;
  width: ${widthPercentageToDP(87)};
  height: ${widthPercentageToDP(50)};
  padding-bottom: ${widthPercentageToDP(15)};
`;

export const ReplyView = props => {
  return (
    <View
      style={{
        width: widthPercentageToDP(343),
        height: widthPercentageToDP(114),
        paddingTop: widthPercentageToDP(16),
        paddingHorizontal: widthPercentageToDP(12),
        marginBottom: widthPercentageToDP(8)
      }}
    >
      <Image
        style={{
          position: "absolute",
          width: widthPercentageToDP(343),
          height: widthPercentageToDP(114)
        }}
        source={require("../../../assets/image/community/reply.png")}
      />
      <View
        style={{
          flexDirection: "row",
          height: widthPercentageToDP(12),
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{
              width: widthPercentageToDP(16.4),
              height: widthPercentageToDP(10.1)
            }}
            source={require("../../../assets/image/community/quotation.png")}
          />
          <Text
            style={{
              color: "#171717",
              fontSize: widthPercentageToDP(10),
              fontFamily: fonts.nanumBarunGothicR,
              marginLeft: widthPercentageToDP(4)
            }}
          >
            {props.data.userNickName}
          </Text>
          <Text
            style={{
              color: "#9e9e9e",
              fontSize: widthPercentageToDP(8),
              fontFamily: fonts.nanumBarunGothicR,
              marginLeft: widthPercentageToDP(8.5)
            }}
          >
            {timeSince(props.data.createdAt)}
          </Text>
        </View>
        <TouchableOpacity style={{}} onPress={() => props.handler()}>
          <Image
            style={{
              width: widthPercentageToDP(28),
              height: widthPercentageToDP(28)
            }}
            source={require("../../../assets/image/community/dots.png")}
          />
        </TouchableOpacity>
      </View>
      <Hyperlink linkDefault={true} linkStyle={{ color: "#2980b9" }}>
        <Text
          style={{
            color: "#171717",
            fontSize: widthPercentageToDP(13),
            fontFamily: fonts.nanumBarunGothic,
            marginTop: widthPercentageToDP(12)
          }}
        >
          {props.data.content}
        </Text>
      </Hyperlink>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: widthPercentageToDP(16)
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: widthPercentageToDP(40),
            height: widthPercentageToDP(22),
            justifyContent: "center",
            alignItems: "center",
            marginRight: widthPercentageToDP(8),
            borderRadius: widthPercentageToDP(20),
            borderColor: "#9e9e9e",
            borderWidth: widthPercentageToDP(1)
          }}
          onPress={() => props.re_replyHandler()}
        >
          <Text
            style={{
              color: "#171717",
              fontSize: widthPercentageToDP(11),
              fontFamily: fonts.nanumBarunGothicR
            }}
          >
            답글
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: widthPercentageToDP(40),
            height: widthPercentageToDP(22),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: widthPercentageToDP(20),
            borderColor: "#9e9e9e",
            borderWidth: widthPercentageToDP(1)
          }}
        >
          <Image
            style={{
              width: widthPercentageToDP(8.5),
              height: widthPercentageToDP(10.2)
            }}
            source={require("../../../assets/image/community/likes.png")}
          />
          <Text
            style={{
              color: "#171717",
              fontSize: widthPercentageToDP(11),
              fontFamily: fonts.nanumBarunGothicR,
              marginLeft: widthPercentageToDP(4)
            }}
          >
            0
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const Re_ReplyView = props => {
  return (
    <View style={{ paddingLeft: widthPercentageToDP(60) }}>
      <Image
        style={{
          position: "absolute",
          width: widthPercentageToDP(14),
          height: widthPercentageToDP(17),
          marginBottom: widthPercentageToDP(8),
          marginLeft: widthPercentageToDP(39)
        }}
        source={require("../../../assets/image/community/reply_arrow.png")}
      />
      <View
        style={{
          width: widthPercentageToDP(283),
          height: widthPercentageToDP(100),
          marginBottom: widthPercentageToDP(8),
          paddingTop: widthPercentageToDP(4),
          paddingHorizontal: widthPercentageToDP(12)
        }}
      >
        <Image
          style={{
            position: "absolute",
            width: widthPercentageToDP(283),
            height: widthPercentageToDP(100)
          }}
          source={require("../../../assets/image/community/re_reply.png")}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                width: widthPercentageToDP(16.4),
                height: widthPercentageToDP(10)
              }}
              source={require("../../../assets/image/community/quotation.png")}
            />
            <Text
              style={{
                color: "#171717",
                fontSize: widthPercentageToDP(10),
                fontFamily: fonts.nanumBarunGothicR,
                marginLeft: widthPercentageToDP(4)
              }}
            >
              {props.data.userNickName}
            </Text>
            <Text
              style={{
                color: "#9e9e9e",
                fontSize: widthPercentageToDP(8),
                fontFamily: fonts.nanumBarunGothicR,
                marginLeft: widthPercentageToDP(8.5)
              }}
            >
              {timeSince(props.data.createdAt)}
            </Text>
          </View>
          <TouchableOpacity style={{}} onPress={() => props.handler()}>
            <Image
              style={{
                width: widthPercentageToDP(28),
                height: widthPercentageToDP(28)
              }}
              source={require("../../../assets/image/community/dots.png")}
            />
          </TouchableOpacity>
        </View>
        <Hyperlink linkDefault={true} linkStyle={{ color: "#2980b9" }}>
          <Text
            style={{
              color: "#171717",
              fontSize: widthPercentageToDP(13),
              fontFamily: fonts.nanumBarunGothic
            }}
          >
            {props.data.content}
          </Text>
        </Hyperlink>

        <View
          style={{ alignItems: "flex-end", marginTop: widthPercentageToDP(10) }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: widthPercentageToDP(40),
              height: widthPercentageToDP(22),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: widthPercentageToDP(20),
              borderColor: "#9e9e9e",
              borderWidth: widthPercentageToDP(1)
            }}
          >
            <Image
              style={{
                width: widthPercentageToDP(8.5),
                height: widthPercentageToDP(10.2)
              }}
              source={require("../../../assets/image/community/likes.png")}
            />
            <Text
              style={{
                color: "#171717",
                fontSize: widthPercentageToDP(11),
                fontFamily: fonts.nanumBarunGothicR,
                marginLeft: widthPercentageToDP(4)
              }}
            >
              0
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
