import React from "react";
import styled from "styled-components";
import { widthPercentageToDP } from "../../../utils/util";
import { Platform } from "react-native";
import { NBGBText, NBGText, NBGULText } from "../../common/Text";
import { BaseView } from "../../common/View";

const shadow = {
  ...Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84
    },
    android: {
      elevation: 5
    }
  })
};

const Container = styled.View`
  width: ${widthPercentageToDP(315)}
  height: ${widthPercentageToDP(188)}
  padding-top: ${widthPercentageToDP(34)}
  align-items: center
  background-color: transparent
`;
const Card = styled.View`
  width: ${widthPercentageToDP(311)}
  height: ${widthPercentageToDP(154)}
  flex-direction: row
  background-color: white
  border-radius: ${widthPercentageToDP(10)}
`;
const Bar = styled.View`
  width: ${widthPercentageToDP(16)}
  height: 100%
  border-top-left-radius: ${widthPercentageToDP(10)}
  border-bottom-left-radius: ${widthPercentageToDP(10)}
  background-color: ${({ bar = "black" }) => bar}
`;
const ContentView = styled.ImageBackground.attrs(props => ({
  source: require("HandamProject/assets/image/setting/teaminfo/teamcard.png"),
  resizeMode: "stretch"
}))`
  flex: 1
  padding-top: ${widthPercentageToDP(16)}
  padding-left: ${widthPercentageToDP(16)}
  border-top-right-radius: ${widthPercentageToDP(10)}
  border-bottom-right-radius: ${widthPercentageToDP(10)}
  background-color: white
`;

const GroupText = styled(NBGText)`
  font-size: ${widthPercentageToDP(17)}
  margin-bottom: ${widthPercentageToDP(39)}
`;

const ProfileContainer = styled.View`
  width: 100%;
`;
const Profile = styled.View`
  width: ${widthPercentageToDP(50)}
  margin-right: ${widthPercentageToDP(12)}
  align-items: center
`;
const ProfileImg = styled.Image`
  width: ${widthPercentageToDP(50)}
  height: ${widthPercentageToDP(50)}
  margin-bottom: ${widthPercentageToDP(7)}
  border-radius: ${widthPercentageToDP(25)}
`;
const ProfileText = styled(NBGULText)`
  font-size: ${widthPercentageToDP(14)};
`;
export const TeamCard = props => {
  return (
    <Container>
      <Card style={shadow}>
        <Bar bar={props.data.bar} />
        <ContentView>
          <GroupText>{props.data.group}</GroupText>
          <ProfileContainer>
            {props.data.text.map((item, index) => (
              <ProfileText>{item}</ProfileText>
            ))}
          </ProfileContainer>
        </ContentView>
      </Card>
    </Container>
  );
};
