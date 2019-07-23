import React from "react";
import styled from "styled-components";
import { widthPercentageToDP } from "../../../utils/util";
import colors from "../../../configs/colors";

const PasswordView = styled.View`
  width: 100%
  height: ${widthPercentageToDP(20)}
  flex-direction: row
  justify-content: center
  margin-bottom: ${widthPercentageToDP(97)}
`;
const Word = styled.View`
  width: ${({ active = false }) =>
    active ? widthPercentageToDP(20) : widthPercentageToDP(16)}
  height: ${({ active = false }) =>
    active ? widthPercentageToDP(20) : widthPercentageToDP(16)}
  border-radius: ${({ active = false }) =>
    active ? widthPercentageToDP(10) : widthPercentageToDP(8)}
  background-color: ${({ active = false }) =>
    active ? colors.active : colors.disable}
`;
export const NumberRow = styled.View`
  width: 100%
  flex-direction: row;
  justify-content: space-between
  padding-left: ${widthPercentageToDP(22)}
  padding-right: ${widthPercentageToDP(22)}
  margin-bottom: ${widthPercentageToDP(20)}
`;
export const Password = ({ pass = "" }) => {
  return (
    <PasswordView>
      <Word
        active={pass.length >= 1}
        style={{
          marginRight:
            pass.length < 1
              ? widthPercentageToDP(9.5)
              : widthPercentageToDP(7.5)
        }}
      />
      <Word
        active={pass.length >= 2}
        style={{
          marginLeft:
            pass.length < 2
              ? widthPercentageToDP(9.5)
              : widthPercentageToDP(7.5),
          marginRight:
            pass.length < 2
              ? widthPercentageToDP(9.5)
              : widthPercentageToDP(7.5)
        }}
      />
      <Word
        active={pass.length >= 3}
        style={{
          marginLeft:
            pass.length < 3
              ? widthPercentageToDP(9.5)
              : widthPercentageToDP(7.5),
          marginRight:
            pass.length < 3
              ? widthPercentageToDP(9.5)
              : widthPercentageToDP(7.5)
        }}
      />
      <Word
        active={pass.length >= 4}
        style={{
          marginLeft:
            pass.length < 4
              ? widthPercentageToDP(9.5)
              : widthPercentageToDP(7.5)
        }}
      />
    </PasswordView>
  );
};
