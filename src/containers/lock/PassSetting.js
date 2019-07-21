import React, { useState } from "react";
import { connect } from "react-redux";
import { HCenterView, Title } from "../../components/common/View";
import { NBGText } from "../../components/common/Text";
import { widthPercentageToDP } from "../../utils/util";
import { Password } from "../../components/lock/view/Password";

const PassSetting = props => {
  const firstPass = useState("");
  const secondPass = useState("");
  return (
    <HCenterView>
      <Title title={"암호잠금 설정"} />
      <NBGText
        style={{
          height: widthPercentageToDP(51),
          lineHeight: widthPercentageToDP(28)
        }}
        marginTop={72}
        marginBottom={40}
        align={"center"}
        alignVertical={"center"}
        fontSize={20}
      >
        {firstPass.length < 4
          ? "새롭게 사용할\n암호 잠금번호를 입력하세요"
          : "재입력 해주세요"}
      </NBGText>
      <Password />
    </HCenterView>
  );
};

export default connect(({ lock }) => ({
  password: lock.password
}))(PassSetting);
