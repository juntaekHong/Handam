import styled from "styled-components";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

// 성적 계산기

export const NameTI = styled.TextInput`
    background-color: #fff; 
    width: ${widthPercentageToDP(205)};
    height: ${widthPercentageToDP(40)}; 
    padding: 0;
    padding-left: ${widthPercentageToDP(10)};
    margin:0;
    margin-right: ${widthPercentageToDP(13)};
    border-width: ${widthPercentageToDP(0.5)};
    border-color: #d6d6d6;
    color: #000;
    font-size: ${widthPercentageToDP(14)};
    font-family: ${fonts.nanumBarunGothic};
`;

export const ScoreTI = styled(NameTI)`
    width: ${widthPercentageToDP(37)};
    padding-left: ${widthPercentageToDP(0)};
    text-align: center;
`;
