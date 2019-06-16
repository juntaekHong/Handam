import React, { Component, PureComponent } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import styled from "styled-components/native";

export const CustomText = styled.Text`
  font-size: ${props => props.fontSize};
  font-family: ${props => props.fontFamily};
  color: ${props => props.color};
`;
