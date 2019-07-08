import React from "react";
import styled from "styled-components/native";
import { CustomModal } from "../common/Modal";
import { HCenterView } from "../common/View";
import { NBGText } from "../common/Text";
import { widthPercentageToDP } from "../../utils/util";
import colors from "../../configs/colors";
import fonts from "../../configs/fonts";

const FindPwInputView = styled.View`
  width: ${widthPercentageToDP(259)}
  height: ${widthPercentageToDP(44)}
  padding-left: ${widthPercentageToDP(12)}
  padding-right: ${widthPercentageToDP(12)}
  margin-bottom: ${widthPercentageToDP(5)}
  border-radius: ${widthPercentageToDP(8)}
  border-width: 1
  border-color: ${colors.border}
  justify-content: center
`;
const FindPwInput = styled.TextInput`
  width: 100%
  height: 100%
  font-size: ${widthPercentageToDP(17)}
  font-family: ${fonts.nanumBarunGothic}
  color: ${colors.black}
  padding: 0
`;

const FindPwError = styled(NBGText)`
  font-size: ${widthPercentageToDP(12)}
  color: ${({ error = 0 }) => (error == 2 ? colors.active : colors.error)}
`;

export const FindPwModal = props => {
  return (
    <CustomModal {...props}>
      <HCenterView>
        <NBGText fontSize={20} marginBottom={18}>
          비밀번호 찾기
        </NBGText>
        <NBGText
          align={"center"}
          alignVertical={"center"}
          marginBottom={28}
        >{`가입시 입력한 이메일로\n임시 비밀번호를 전송합니다.`}</NBGText>
        <FindPwInputView>
          <FindPwInput
            value={props.value}
            onChangeText={props.onChangeText}
            autoCapitalize={"none"}
            underlineColorAndroid={"transparent"}
            keyboardType={"email-address"}
            placeholder={"이메일을 입력해주세요"}
            placeholderTextColor={colors.border}
          />
        </FindPwInputView>
        <FindPwError error={props.error}>
          {props.error == 1
            ? "이메일 형식이 아닙니다."
            : props.error == 2
            ? "가입확인 된 이메일입니다."
            : props.error == 3
            ? "가입되지 않은 이메일입니다."
            : ""}
        </FindPwError>
      </HCenterView>
    </CustomModal>
  );
};
