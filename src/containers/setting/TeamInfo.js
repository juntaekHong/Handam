import React from "react";
import { HCenterView, Title, Scroll } from "../../components/common/View";
import { connect } from "react-redux";
import { Image } from "react-native";
import { widthPercentageToDP } from "../../utils/util";

const TeamInfo = () => {
  return (
    <HCenterView>
      <Title title={"팀 정보"} rightInVisible={true} />
      <Scroll>
        <Image
          style={{
            width: widthPercentageToDP(375),
            height: widthPercentageToDP(729),
            resizeMode: "cover"
          }}
          source={require("HandamProject/assets/image/setting/teaminfo.jpg")}
        />
      </Scroll>
    </HCenterView>
  );
};

export default connect()(TeamInfo);
