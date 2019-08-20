import React, { useRef, useState, useCallback, useEffect } from "react";
import { HCenterView, Title, BaseView } from "../../components/common/View";
import { connect } from "react-redux";
import { widthPercentageToDP } from "../../utils/util";
import Carousel, { Pagination } from "react-native-snap-carousel";
import LoopCarousel from "react-native-looped-carousel";
import { TeamCard } from "../../components/setting/view/TeamCard";
import { View, Dimensions } from "react-native";
import { TeamPagination } from "../../components/setting/view/TeamPagination";
import { TeamContent } from "../../components/setting/view/TeamContent";
import { NBGBText } from "../../components/common/Text";

const TeamInfo = () => {
  const _carousel = useRef(null);
  const [index, setIndex] = useState(0);
  const [entries] = useState([
    {
      group: "Designer",
      bar: "#cc76e4",
      people: [
        {
          name: "전소은",
          major: "시각미디어디자인과",
          email: "jjkl456@gmail.com"
        },
        {
          name: "최지현",
          major: "시각미디어디자인과",
          email: "bene.jeean95@gmail.com"
        }
      ]
    },
    {
      group: "Backend Developer",
      bar: "#ff6384",
      people: [
        {
          name: "제갈효선",
          major: "산업경영공학과",
          email: "dott.goo@gmail.com"
        },
        { name: "조용훈", major: "컴퓨터공학과", email: "starctak@gmail.com" },
        {
          name: "정서영",
          major: "지식정보학부",
          email: "dlwlrma0203@gmail.com"
        }
      ]
    },
    {
      group: "Service",
      bar: "#6386ff",
      people: [
        { name: "김서연", major: "행정학", email: "seoyeon199515@daum.net" },
        { name: "노희륜", major: "사회과학부", email: "gmlfbs9812@gmail.com" },
        { name: "원정은", major: "사회과학부", email: "jkjk2654@naver.com" },
        {
          name: "허혜정",
          major: "크리에이티브인문학부",
          email: "gpwjd5019@gmail.com"
        }
      ]
    },
    {
      group: "Frontend Developer",
      bar: "#ffca6c",
      people: [
        {
          name: "신현수",
          major: "정보시스템공학과",
          email: "shs0655@gmail.com"
        },
        { name: "홍준택", major: "컴퓨터공학부", email: "wnsxor3489@gmail.com" }
      ]
    }
  ]);

  const changePage = useCallback(page => {
    setIndex(page);
  }, []);

  useEffect(() => {
    if (_carousel) _carousel.current.animateToPage(index);
  }, [index]);
  return (
    <HCenterView style={{ backgroundColor: "rgba(243, 242, 242, 0.72)" }}>
      <Title
        title={"팀 정보"}
        rightInVisible={true}
        style={{ backgroundColor: "white" }}
      />
      <View style={{ height: widthPercentageToDP(206) }}>
        <Carousel
          data={entries}
          renderItem={({ item, index }) => <TeamCard data={item} />}
          onSnapToItem={changePage}
          sliderWidth={widthPercentageToDP(375)}
          sliderHeight={widthPercentageToDP(188)}
          itemWidth={widthPercentageToDP(315)}
          itemHeight={widthPercentageToDP(188)}
          loop={false}
          removeClippedSubviews={false}
        />
      </View>
      <TeamPagination data={entries} index={index} />
      <View
        style={{
          width: widthPercentageToDP(375),
          height: widthPercentageToDP(374),
          paddingTop: widthPercentageToDP(30)
        }}
      >
        <LoopCarousel
          ref={_carousel}
          style={{ flex: 1 }}
          autoplay={false}
          isLooped={false}
          swipe={false}
        >
          {entries.map((item, index) => {
            return <TeamContent data={item.people} key={item.key} />;
          })}
        </LoopCarousel>
      </View>
    </HCenterView>
  );
};

export default connect()(TeamInfo);
