import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import colors from "../../configs/colors";
import { Image, View } from "react-native";
import { NBGText, NBGBText } from "../common/Text";
import Modal from "react-native-modal";
import { Title } from "../common/View";
import HTML from "react-native-render-html";

const StepContainer = styled.View`
  width: 100%;
  height: ${widthPercentageToDP(5)};
  margin-top: ${widthPercentageToDP(102.5)};
  margin-bottom: ${widthPercentageToDP(55)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StepItem = styled.View`
  height: 100%;
  width: ${widthPercentageToDP(46)};
  margin-right: ${props =>
    props.right ? widthPercentageToDP(props.right) : widthPercentageToDP(5)};
  background-color: ${props => (props.value ? colors.active : colors.disable)};
`;

export const Step = ({ number }) => {
  return (
    <StepContainer>
      <StepItem value={number == 1} />
      <StepItem value={number == 2} />
      <StepItem value={number == 3} right={0} />
    </StepContainer>
  );
};

const TermCheckContainer = styled.TouchableOpacity`
  width: ${widthPercentageToDP(289)};
  height: ${widthPercentageToDP(67)};
  flex-direction: row;
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? widthPercentageToDP(marginBottom) : 0};
`;

const TermCheckBox = styled.TouchableOpacity`
  width: ${widthPercentageToDP(42)};
  height: 100%;
  padding-left: ${widthPercentageToDP(7)};
`;

const TermContentView = styled.TouchableOpacity`
  flex: 1;
`;

const TermSubject = styled.View`
  height: ${widthPercentageToDP(21)};
  margin-bottom: ${widthPercentageToDP(6)};
  padding-left: ${widthPercentageToDP(1)};
  justify-content: center;
`;

export const TermCheckView = ({
  check,
  checkHandler,
  subject,
  content,
  open
}) => (
  <TermCheckContainer>
    <TermCheckBox onPress={checkHandler}>
      <Image
        style={{
          width: widthPercentageToDP(21),
          height: widthPercentageToDP(21)
        }}
        source={
          check
            ? require("HandamProject/assets/image/sign/smallselectionblue.png")
            : require("HandamProject/assets/image/sign/smallselectiongrey.png")
        }
      />
    </TermCheckBox>
    <TermContentView onPress={open}>
      <TermSubject>
        <NBGText color={"#646464"}>{subject}</NBGText>
      </TermSubject>
      <NBGText
        numberOfLines={2}
        ellipsizeMode={"tail"}
        fontSize={10}
        color={"#9e9e9e"}
      >
        {content}
      </NBGText>
    </TermContentView>
  </TermCheckContainer>
);

const TermModalView = styled.View`
  flex: 1;
  margin-top: ${widthPercentageToDP(65)};
  border-radius: ${widthPercentageToDP(14)};
  background-color: ${colors.white};
  bottom: 0;
  margin-bottom: 0;
`;
const TermModalBody = styled.ScrollView`
  padding-left: ${widthPercentageToDP(17)};
  padding-right: ${widthPercentageToDP(17)};
  padding-bottom: ${widthPercentageToDP(19)};
`;
export const TermModal = ({
  visible = false,
  title,
  rightHandler,
  content = "<h1></h1>"
}) => {
  return (
    <Modal isVisible={visible} style={{ bottom: 0, paddingBottom: 0 }}>
      <TermModalView>
        <Title
          title={title}
          leftInVisible={true}
          width={70}
          rightHandler={rightHandler}
        />
        <TermModalBody>
          <HTML html={content} />
        </TermModalBody>
      </TermModalView>
    </Modal>
  );
};

const SelectContainer = styled.View`
  width: ${widthPercentageToDP(289)}
  height: ${widthPercentageToDP(42)}
  margin-bottom: ${({ marginBottom = 10 }) => widthPercentageToDP(marginBottom)}
  flex-direction: row
  justify-content: space-between
  border-bottom-width: 1
  border-color: ${colors.notFocus}
`;
const SelectBody = styled.TouchableOpacity`
  flex:1
  align-items: ${({ align = "flex-start" }) => align}
  justify-content: center
`;
export const SelectView = props => {
  return (
    <SelectContainer {...props}>
      <SelectBody disabled={true}>
        <NBGBText fontSize={16} color={colors.notFocus}>
          {props.subject}
        </NBGBText>
      </SelectBody>
      <SelectBody align={"flex-end"} onPress={props.onPress}>
        <NBGBText fontSize={16} color={colors.selectMajor}>
          {props.value === undefined || props.value === null
            ? "선택하기"
            : props.value.length == 0
            ? "해당없음"
            : props.value}
        </NBGBText>
      </SelectBody>
    </SelectContainer>
  );
};
