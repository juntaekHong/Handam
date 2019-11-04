import React from "react";
import styled from "styled-components/native";
import {widthPercentageToDP} from "../../utils/util";
import {ResetText, AddText, CalculateText, GradeTriggerText} from "./Text";

// Calculation.js

const Reset = styled.TouchableOpacity`
    width: ${widthPercentageToDP(37+11.6*2)};
    height:${widthPercentageToDP(30)}; 
    justify-content: center;
    align-items: center;
`;

export const ResetBtn = props => {
    return(
        <Reset onPress={()=>props.handler()}>
            <ResetText>초기화</ResetText>
        </Reset>
    )
}

const List = styled.TouchableOpacity`
    width: ${widthPercentageToDP(91+11.6*2)};
    height:${widthPercentageToDP(30)}; 
    justify-content: center;
    align-items: center;
`;

export const ListBtn = props => {
    return(
        <List onPress={()=>props.handler()}>
            <ResetText>시간표 불러오기</ResetText>
        </List>
    )
}

const Add = styled.TouchableOpacity`
    margin-top: ${widthPercentageToDP(12)};
`;

export const AddBtn = props => {
    return(
        <Add onPress={()=> props.handler()}>
            <AddText>+ 추가하기</AddText>
        </Add>
    )
}

const Calculate = styled.TouchableOpacity`
    background-color:#24a0fa;
    width: ${widthPercentageToDP(319)};
    height: ${widthPercentageToDP(40)};
    justify-content:center;
    align-items: center;
    border-width:${widthPercentageToDP(1)};
    border-color:#24a0fa;
    border-radius: ${widthPercentageToDP(8)};
    margin-top: ${widthPercentageToDP(18)};
`;

export const CalculateBtn = props => {
    return (
        <Calculate onPress={()=>props.handler()}>
            <CalculateText>계산하기</CalculateText>
        </Calculate>
    )
}

const MenuTrigger = styled.TouchableOpacity`
    background-color: #fff;
    width: ${widthPercentageToDP(51)}; 
    height: ${widthPercentageToDP(40)};
    justify-content: center;
    align-items: center;
    border-width: ${widthPercentageToDP(0.5)};
    border-color: #dbdbdb;
`;

export const MenuTriggerBtn = props => {
    return (
        <MenuTrigger onPress={()=>props.handler()}>
            <GradeTriggerText>{props.text}</GradeTriggerText>
        </MenuTrigger>
    )
}
