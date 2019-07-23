import React, { Component } from "react";
import { connect } from "react-redux";
import { widthPercentageToDP } from "../../utils/util";
import AppIntroSlider from "react-native-app-intro-slider";
import { Image } from "react-native";
import { AuthActions } from "../../store/actionCreator";
import colors from "../../configs/colors";
import { NBGBText, NBGText } from "../../components/common/Text";
import { HCenterView } from "../../components/common/View";
const slides = [
  {
    key: "somethun",
    content1: "새롭게 달라진 한담",
    content2:
      "홈에서는 오늘의 강의 목록과 시간표,\n스쿨버스, 한성공지를 확인할 수 있습니다.",
    image: require("HandamProject/assets/image/intro/Informationpage_1.png"),
    backgroundColor: colors.white
  },
  {
    key: "somethun-dos",
    content1: "왼쪽에서는 성적표와 비교과포인트",
    content2: "성적과 비교과포인트를 확인하고 싶을때는\n왼쪽으로 이동해주세요!",
    image: require("HandamProject/assets/image/intro/Informationpage_2.png"),
    backgroundColor: colors.white
  },
  {
    key: "somethun1",
    content1: "오른쪽에서는 커뮤니티",
    content2: "오른쪽 커뮤니티에서\n한담만의 커뮤니티를 즐겨보세요!",
    image: require("HandamProject/assets/image/intro/Informationpage_3.png"),
    backgroundColor: colors.white
  }
];

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intro: false
    };
  }

  onDone = async () => {
    await AuthActions.storeIntro("true");
    if (this.props.passLock) this.props.navigation.navigate("locksolve");
    else this.props.navigation.navigate(this.props.signin_navigate);
  };

  renderItem = ({ image, content1, content2 }) => (
    <HCenterView paddingTop={widthPercentageToDP(50)}>
      <Image source={image} />
      <NBGBText fontSize={20} color={colors.active} marginTop={8.2}>
        {content1}
      </NBGBText>
      <NBGText
        fontSize={14}
        color={colors.subContent}
        align={"center"}
        marginTop={11}
      >
        {content2}
      </NBGText>
    </HCenterView>
  );

  render() {
    const { intro } = this.state;
    if (!intro)
      return (
        <AppIntroSlider
          slides={slides}
          showSkipButton={true}
          onDone={this.onDone}
          renderNextButton={() => (
            <NBGBText fontSize={18} color={colors.active}>
              Next
            </NBGBText>
          )}
          dotStyle={{
            width: widthPercentageToDP(4),
            height: widthPercentageToDP(4),
            backgroundColor: colors.introInActive,
            marginBottom: widthPercentageToDP(30)
          }}
          activeDotStyle={{
            width: widthPercentageToDP(4),
            height: widthPercentageToDP(4),
            backgroundColor: colors.active,
            marginBottom: widthPercentageToDP(30)
          }}
          paginationStyle={{
            height: widthPercentageToDP(20),
            marginLeft: widthPercentageToDP(10),
            marginRight: widthPercentageToDP(10),
            marginBottom: widthPercentageToDP(10),
            bottom: widthPercentageToDP(34)
          }}
          renderItem={this.renderItem}
          renderSkipButton={() => <NBGBText fontSize={18}>Skip</NBGBText>}
          renderDoneButton={() => (
            <NBGBText fontSize={18} color={colors.active}>
              Start
            </NBGBText>
          )}
        />
      );
  }
}

export default connect(({ signin, lock }) => ({
  signin_navigate: signin.signin_navigate,
  passLock: lock.passLock
}))(Intro);
