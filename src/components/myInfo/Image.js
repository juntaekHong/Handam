import React from "react"; 
import styled from "styled-components";
import {widthPercentageToDP} from "../../utils/util";

export const DropdownImg = styled.Image`
    width: ${widthPercentageToDP(7)};
    height: ${widthPercentageToDP(6)};
    margin-left: ${widthPercentageToDP(5)};
`;

const Handamon = styled.Image`
    width: ${widthPercentageToDP(16)};
    height: ${widthPercentageToDP(19.6)};
    margin-top: ${widthPercentageToDP(20.4)};
    margin-bottom: ${widthPercentageToDP(9)};
`;

export const HandamonImg = (props) =>{
    return <Handamon source={require("../../../assets/image/myInfo/handamon.png")}/>
}

