import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP, timeSince } from "../../utils/util";

const DefaultButton = styled.TouchableOpacity`
  flex-direction: row
  align-items: center
`;

export const DefaultBtn = props => {
  return (
    <TouchableOpacity {...props} style={props.style}>
      {props.children}
    </TouchableOpacity>
  );
};

export const HotPostsListItem = props => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        width: widthPercentageToDP(375),
        height: widthPercentageToDP(81),
        borderBottomWidth: widthPercentageToDP(1),
        borderBottomColor: "#dbdbdb"
      }}
      onPress={() => props.handler()}
    >
      <Text
        style={{
          color: "#0c81ff",
          fontSize: widthPercentageToDP(16),
          fontFamily: fonts.nanumBarunGothicB,
          width: widthPercentageToDP(35),
          height: widthPercentageToDP(81),
          textAlign: "center",
          textAlignVertical: "center"
        }}
      >
        {props.index + 1}
      </Text>
      <View
        style={{
          width: widthPercentageToDP(340),
          paddingRight: widthPercentageToDP(16)
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: widthPercentageToDP(13)
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: widthPercentageToDP(13),
              fontFamily: fonts.nanumBarunGothicB
            }}
            ellipsizeMode={"tail"}
            numberOfLines={1}
          >
            {props.data.title}
          </Text>
          <View
            style={{
              backgroundColor: "#259ffa",
              width: widthPercentageToDP(32),
              height: widthPercentageToDP(14),
              justifyContent: "center",
              alignItems: "center",
              paddingTop: widthPercentageToDP(1),
              borderRadius: widthPercentageToDP(10),
              borderWidth: widthPercentageToDP(1),
              borderColor: "#259ffa"
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: widthPercentageToDP(10),
                fontFamily: fonts.nanumBarunGothicB,
                lineHeight: widthPercentageToDP(12)
              }}
            >
              HOT
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: "#000000",
            fontSize: widthPercentageToDP(11),
            fontFamily: fonts.nanumBarunGothic,
            marginTop: widthPercentageToDP(8)
          }}
          ellipsizeMode={"tail"}
          numberOfLines={1}
        >
          {props.data.content}
        </Text>
        <View
          style={{
            flexDirection: "row",
            height: widthPercentageToDP(12),
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: widthPercentageToDP(10)
          }}
        >
          {/* <Text style={{color: "#646464", fontSize: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothicB}}>{timeSince(item.createdAt)}</Text> */}
          <Text
            style={{
              color: "#646464",
              fontSize: widthPercentageToDP(11),
              fontFamily: fonts.nanumBarunGothicB
            }}
          >
            {timeSince(props.data.createdAt)}
          </Text>
          <View
            style={{
              flexDirection: "row",
              height: widthPercentageToDP(12),
              alignItems: "center"
            }}
          >
            <Image
              style={{
                width: widthPercentageToDP(11),
                height: widthPercentageToDP(11)
              }}
              source={require("../../../assets/image/community/images.png")}
            />
            <Text
              style={{
                color: "#171717",
                fontSize: widthPercentageToDP(11),
                fontFamily: fonts.nanumBarunGothic,
                marginLeft: widthPercentageToDP(5)
              }}
            >
              {props.data.imageCount}
            </Text>
            <Image
              style={{
                width: widthPercentageToDP(8.5),
                height: widthPercentageToDP(10.2),
                marginLeft: widthPercentageToDP(10.5)
              }}
              source={require("../../../assets/image/community/likes.png")}
            />
            <Text
              style={{
                color: "#171717",
                fontSize: widthPercentageToDP(11),
                fontFamily: fonts.nanumBarunGothic,
                marginLeft: widthPercentageToDP(5)
              }}
            >
              {props.data.goodCount}
            </Text>
            <Image
              style={{
                width: widthPercentageToDP(10.2),
                height: widthPercentageToDP(9.9),
                marginLeft: widthPercentageToDP(10.5)
              }}
              source={require("../../../assets/image/community/replys.png")}
            />
            <Text
              style={{
                color: "#171717",
                fontSize: widthPercentageToDP(11),
                fontFamily: fonts.nanumBarunGothic,
                marginLeft: widthPercentageToDP(4.3)
              }}
            >
              {props.data.postsReplyCount}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const PostsListItem = props => {
  return (
    <TouchableOpacity
      style={{
        width: widthPercentageToDP(375),
        height: widthPercentageToDP(81),
        paddingHorizontal: widthPercentageToDP(16),
        borderBottomWidth: widthPercentageToDP(1),
        borderBottomColor: "#dbdbdb"
      }}
      onPress={() => props.handler()}
    >
      <Text
        style={{
          color: "#000000",
          fontSize: widthPercentageToDP(13),
          fontFamily: fonts.nanumBarunGothicB,
          marginTop: widthPercentageToDP(12)
        }}
        ellipsizeMode={"tail"}
        numberOfLines={1}
      >
        {props.data.title}
      </Text>
      <Text
        style={{
          color: "#000000",
          fontSize: widthPercentageToDP(11),
          fontFamily: fonts.nanumBarunGothic,
          marginTop: widthPercentageToDP(8)
        }}
        ellipsizeMode={"tail"}
        numberOfLines={1}
      >
        {props.data.content}
      </Text>
      <View
        style={{
          flexDirection: "row",
          height: widthPercentageToDP(12),
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: widthPercentageToDP(10)
        }}
      >
        <Text
          style={{
            color: "#646464",
            fontSize: widthPercentageToDP(11),
            fontFamily: fonts.nanumBarunGothicB
          }}
        >
          {timeSince(props.data.createdAt)}
        </Text>
        <View
          style={{
            flexDirection: "row",
            height: widthPercentageToDP(12),
            alignItems: "center"
          }}
        >
          <Image
            style={{
              width: widthPercentageToDP(11),
              height: widthPercentageToDP(11)
            }}
            source={require("../../../assets/image/community/images.png")}
          />
          <Text
            style={{
              color: "#171717",
              fontSize: widthPercentageToDP(11),
              fontFamily: fonts.nanumBarunGothic,
              marginLeft: widthPercentageToDP(5)
            }}
          >
            {props.data.imageCount}
          </Text>
          <Image
            style={{
              width: widthPercentageToDP(8.5),
              height: widthPercentageToDP(10.2),
              marginLeft: widthPercentageToDP(10.5)
            }}
            source={require("../../../assets/image/community/likes.png")}
          />
          <Text
            style={{
              color: "#171717",
              fontSize: widthPercentageToDP(11),
              fontFamily: fonts.nanumBarunGothic,
              marginLeft: widthPercentageToDP(5)
            }}
          >
            {props.data.goodCount}
          </Text>
          <Image
            style={{
              width: widthPercentageToDP(10.2),
              height: widthPercentageToDP(9.9),
              marginLeft: widthPercentageToDP(10.5)
            }}
            source={require("../../../assets/image/community/replys.png")}
          />
          <Text
            style={{
              color: "#171717",
              fontSize: widthPercentageToDP(11),
              fontFamily: fonts.nanumBarunGothic,
              marginLeft: widthPercentageToDP(4.3)
            }}
          >
            {props.data.postsReplyCount}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const ReportedPostsListItem = props => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "red",
        width: widthPercentageToDP(375),
        height: widthPercentageToDP(81),
        paddingHorizontal: widthPercentageToDP(16),
        borderBottomWidth: widthPercentageToDP(1),
        borderBottomColor: "#dbdbdb"
      }}
      onPress={() => props.handler()}
    >
      <Text
        style={{
          color: "#000000",
          fontSize: widthPercentageToDP(13),
          fontFamily: fonts.nanumBarunGothicB,
          marginTop: widthPercentageToDP(12)
        }}
        ellipsizeMode={"tail"}
        numberOfLines={1}
      >
        {props.data.title}
      </Text>
      <Text
        style={{
          color: "#000000",
          fontSize: widthPercentageToDP(11),
          fontFamily: fonts.nanumBarunGothic,
          marginTop: widthPercentageToDP(8)
        }}
        ellipsizeMode={"tail"}
        numberOfLines={1}
      >
        {props.data.content}
      </Text>
      <View
        style={{
          flexDirection: "row",
          height: widthPercentageToDP(12),
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: widthPercentageToDP(10)
        }}
      >
        <Text
          style={{
            color: "#646464",
            fontSize: widthPercentageToDP(11),
            fontFamily: fonts.nanumBarunGothicB
          }}
        >
          {timeSince(props.data.createdAt)}
        </Text>
        <View
          style={{
            flexDirection: "row",
            height: widthPercentageToDP(12),
            alignItems: "center"
          }}
        >
          <Image
            style={{
              width: widthPercentageToDP(11),
              height: widthPercentageToDP(11)
            }}
            source={require("../../../assets/image/community/images.png")}
          />
          <Text
            style={{
              color: "#171717",
              fontSize: widthPercentageToDP(11),
              fontFamily: fonts.nanumBarunGothic,
              marginLeft: widthPercentageToDP(5)
            }}
          >
            {props.data.imageCount}
          </Text>
          <Image
            style={{
              width: widthPercentageToDP(8.5),
              height: widthPercentageToDP(10.2),
              marginLeft: widthPercentageToDP(10.5)
            }}
            source={require("../../../assets/image/community/likes.png")}
          />
          <Text
            style={{
              color: "#171717",
              fontSize: widthPercentageToDP(11),
              fontFamily: fonts.nanumBarunGothic,
              marginLeft: widthPercentageToDP(5)
            }}
          >
            {props.data.goodCount}
          </Text>
          <Image
            style={{
              width: widthPercentageToDP(10.2),
              height: widthPercentageToDP(9.9),
              marginLeft: widthPercentageToDP(10.5)
            }}
            source={require("../../../assets/image/community/replys.png")}
          />
          <Text
            style={{
              color: "#171717",
              fontSize: widthPercentageToDP(11),
              fontFamily: fonts.nanumBarunGothic,
              marginLeft: widthPercentageToDP(4.3)
            }}
          >
            {props.data.postsReplyCount}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const WritePostBtn = props => {
  return (
    <TouchableOpacity
      style={{
        width: widthPercentageToDP(87),
        height: widthPercentageToDP(37),
        justifyContent: "center",
        alignItems: "center"
      }}
      onPress={() => {
        props.handler();
      }}
    >
      <Image
        style={{
          width: widthPercentageToDP(87),
          height: widthPercentageToDP(37)
        }}
        source={require("../../../assets/image/community/write.png")}
      />
      <Text
        style={{
          position: "absolute",
          color: "white",
          fontSize: widthPercentageToDP(15),
          fontFamily: fonts.nanumBarunGothicB
        }}
      >
        글쓰기
      </Text>
    </TouchableOpacity>
  );
};
