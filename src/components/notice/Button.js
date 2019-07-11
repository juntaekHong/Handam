import React from "react";
import styled from "styled-components/native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { widthPercentageToDP } from "../../utils/util";
import { TouchableOpacity } from "react-native-gesture-handler";

const style = {
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  width: widthPercentageToDP(100)
};
export const ReloadButton = props => {
  return (
    <TouchableOpacity {...props} style={style}>
      <MaterialIcon
        size={widthPercentageToDP(25)}
        color={"#4a4a4a"}
        name={"refresh"}
      />
    </TouchableOpacity>
  );
};

export const BackButton = props => {
  return (
    <TouchableOpacity {...props} style={style}>
      <MaterialIcon
        size={widthPercentageToDP(30)}
        color={props.disabled ? "rgb(210,212,213)" : "#4a4a4a"}
        name={"chevron-left"}
      />
    </TouchableOpacity>
  );
};

export const ForwardButton = props => {
  return (
    <TouchableOpacity {...props} style={style}>
      <MaterialIcon
        size={widthPercentageToDP(30)}
        color={props.disabled ? "rgb(210,212,213)" : "#4a4a4a"}
        name={"chevron-right"}
      />
    </TouchableOpacity>
  );
};
