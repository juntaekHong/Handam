import React from "react";
import styled from "styled-components";
import { Scroll, BaseView, HCenterView } from "../../common/View";
import { widthPercentageToDP } from "../../../utils/util";
import { NBGText, NBGLText } from "../../common/Text";
import { FlatList, View } from "react-native";
import * as Animatable from "react-native-animatable";

// const Content = styled.View`
//   width: ${widthPercentageToDP(343)}
//   height: ${widthPercentageToDP(66)}
//   padding-horizontal: ${widthPercentageToDP(16)}
//   margin-bottom: ${widthPercentageToDP(12)}
//   border-radius: ${widthPercentageToDP(8)}
//   flex-direction: row
//   align-items: center
//   background-color: white
// `;

const Content = Animatable.createAnimatableComponent(styled.View`
  width: ${widthPercentageToDP(343)}
  height: ${widthPercentageToDP(66)}
  padding-horizontal: ${widthPercentageToDP(16)}
  margin-bottom: ${widthPercentageToDP(12)}
  border-radius: ${widthPercentageToDP(8)}
  flex-direction: row
  align-items: center
  background-color: white`);

const ContentImage = styled.Image`
  width: ${widthPercentageToDP(45)}
  height: ${widthPercentageToDP(45)}
  margin-right: ${widthPercentageToDP(12)}
  border-radius: ${widthPercentageToDP(22.5)}
`;
const ContentBody = styled(BaseView)`
  justify-content: center;
`;
export const TeamContent = props => {
  return (
    <HCenterView style={{ backgroundColor: "transparent" }}>
      {props.data.map((item, index) => {
        if (props.page !== props.index) {
          return <View key={item.name}></View>;
        } else {
          return (
            <Content
              animation="lightSpeedIn"
              delay={300 * index + 200}
              duration={700}
              key={item.name}
            >
              <ContentImage source={item.image} />
              <ContentBody>
                <NBGText
                  style={{ marginBottom: widthPercentageToDP(4) }}
                  fontSize={16}
                  color={"#505050"}
                >
                  {item.name}
                </NBGText>
                <NBGLText
                  fontSize={10}
                  color={"#505050"}
                >{`${item.major} / ${item.email}`}</NBGLText>
              </ContentBody>
            </Content>
          );
        }
      })}
    </HCenterView>
  );
};
