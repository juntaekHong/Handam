import React, { useRef, useState, useCallback, useEffect } from "react";
import { HCenterView, Title, BaseView } from "../../components/common/View";
import { connect } from "react-redux";
import { widthPercentageToDP } from "../../utils/util";
import Carousel from "react-native-snap-carousel";
import LoopCarousel from "react-native-looped-carousel";
import { TeamCard } from "../../components/setting/view/TeamCard";
import { View } from "react-native";
import { TeamPagination } from "../../components/setting/view/TeamPagination";
import { TeamContent } from "../../components/setting/view/TeamContent";

const TeamInfo = () => {
  const _carousel = useRef(null);
  const [index, setIndex] = useState(0);
  const [entries] = useState([
    {
      group: "Design",
      text: ["- UX/UI 디자인", "- 그래픽 디자인", "- 브랜딩 디자인"],
      bar: "#cc76e4",
      people: [
        {
          name: "전소은",
          major: "시각미디어디자인과",
          email: "jjkl456@gmail.com",
          image: require("HandamProject/assets/image/setting/teaminfo/design2.png")
        },
        {
          name: "최지현",
          major: "시각미디어디자인과",
          email: "bene.jeean95@gmail.com",
          image: require("HandamProject/assets/image/setting/teaminfo/design3.png")
        },
        {
          name: "최혜종",
          major: "시각미디어디자인과",
          email: "anamor7000@gmail.com",
          image: require("HandamProject/assets/image/setting/teaminfo/design4.png")
        }
      ]
    },
    {
      group: "Backend",
      text: ["- 아키텍쳐", "- DB 모델링", "- API 개발"],
      bar: "#ff6384",
      people: [
        {
          name: "제갈효선",
          major: "산업경영공학과",
          email: "dott.goo@gmail.com",
          image: require("HandamProject/assets/image/setting/teaminfo/backend1.png")
        },

        {
          name: "조용훈",
          major: "컴퓨터공학과",
          email: "starctak@gmail.com",
          image: require("HandamProject/assets/image/setting/teaminfo/backend2.png")
        },
        {
          name: "정서영",
          major: "지식정보학부",
          email: "dlwlrma0203@gmail.com",
          image: require("HandamProject/assets/image/setting/teaminfo/backend3.png")
        }
      ]
    },
    {
      group: "Service",
      text: ["- 서비스 및 전략 기획", "- 마케팅", "- CS, QA"],
      bar: "#6386ff",
      people: [
        {
          name: "김서연",
          major: "행정학과",
          email: "seoyeon199515@daum.net",
          image: require("HandamProject/assets/image/setting/teaminfo/service1.png")
        },
        {
          name: "노희륜",
          major: "사회과학부",
          email: "gmlfbs9812@gmail.com",
          image: require("HandamProject/assets/image/setting/teaminfo/service2.png")
        },
        {
          name: "원정은",
          major: "사회과학부",
          email: "jkjk2654@naver.com",
          image: require("HandamProject/assets/image/setting/teaminfo/service3.png")
        },
        {
          name: "허혜정",
          major: "크리에이티브인문학부",
          email: "gpwjd5019@gmail.com",
          image: require("HandamProject/assets/image/setting/teaminfo/service4.png")
        }
      ]
    },
    {
      group: "Frontend",
      text: ["- 데이터 처리", "- 인터페이스 시각화", "- Web / App 개발"],
      bar: "#ffca6c",
      people: [
        {
          name: "신현수",
          major: "정보시스템공학과",
          email: "shs0655@gmail.com",
          image: require("HandamProject/assets/image/setting/teaminfo/frontend1.png")
        },
        {
          name: "홍준택",
          major: "컴퓨터공학부",
          email: "wnsxor3489@gmail.com",
          image: require("HandamProject/assets/image/setting/teaminfo/frontend2.png")
        }
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
          {entries.map((item, i) => {
            return (
              <TeamContent
                key={i}
                data={item.people}
                key={item.key}
                page={index}
                index={i}
              />
            );
          })}
        </LoopCarousel>
      </View>
    </HCenterView>
  );
};

export default connect()(TeamInfo);
