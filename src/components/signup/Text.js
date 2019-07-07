import React from "react";
import styled from "styled-components/native";
import { TextField } from "react-native-material-textfield";
import { widthPercentageToDP } from "../../utils/util";
import colors from "../../configs/colors";
import fonts from "../../configs/fonts";
import { View } from "react-native";

export const SignUpTextField = ({
  label = "",
  error = false,
  value = "",
  onChangeText = () => {},
  marginBottom = 12,
  keyboardType = "default",
  secureTextEntry = false,
  placeholder = "",
  isFocus = false,
  ref,
  onFocus,
  onBlur
}) => (
  <TextField
    ref={ref => ref}
    onFocus={onFocus}
    onBlur={onBlur}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
    allowFontScaling={false}
    autoCapitalize={"none"}
    label={label}
    lineWidth={1}
    placeholder={isFocus ? placeholder : ""}
    fontSize={widthPercentageToDP(14)}
    labelFontSize={widthPercentageToDP(12)}
    labelHeight={widthPercentageToDP(18)}
    inputContainerPadding={widthPercentageToDP(11.5)}
    tintColor={error ? colors.error : colors.active}
    baseColor={
      error ? colors.error : value.length > 0 ? colors.active : colors.notFocus
    }
    value={value}
    onChangeText={onChangeText}
    style={{ fontFamily: fonts.nanumBarunGothic }}
    containerStyle={{ marginBottom: widthPercentageToDP(marginBottom) }}
    labelTextStyle={{
      fontFamily: fonts.nanumBarunGothicB
    }}
    inputContainerStyle={{
      width: widthPercentageToDP(289),
      paddingLeft: value.length > 0 ? widthPercentageToDP(5) : 0
    }}
  />
);
