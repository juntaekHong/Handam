import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import {PointListText} from "./Text";
import colors from "../../configs/colors";
import {Text, View, ImageBackground, Image} from "react-native";
import fonts from '../../configs/fonts';

// 비교과, 성적표 프로그레스 영역
export const ProgressView = styled.View`
  width: 100%;
  height: ${widthPercentageToDP(142)};
  background-color: white;
  paddingHorizontal: ${widthPercentageToDP(20)};
  paddingTop: ${widthPercentageToDP(19.7)};
`;

// 비교과, 성적표 주요 목록 값 영역
export const DetailView = styled.View`
  flex: 1;
  paddingTop: ${widthPercentageToDP(16)};
  backgroundColor: white;
`;

// 학기별 성적표 영역
export const GradesDetailView = styled.View`
  flexDirection: row;
  marginTop: ${widthPercentageToDP(22)};
`;

// 비교과 인증 리스트 뷰
export const PointListItem = props => {
    if(props.index % 2 == 1) {
        return (
            <View style={{position: "relative", left: widthPercentageToDP(10), flexDirection: "row", marginHorizontal: widthPercentageToDP(15), marginBottom: widthPercentageToDP(19)}}>
                <ImageBackground style={{flexDirection: "column", width: widthPercentageToDP(154), height: widthPercentageToDP(78)}} source={require("../../../assets/image/hansungInfo/square_993.png")}>
                    <View>
                        <View style={{flexDirection: "row", justifyContent: "space-between", marginRight: widthPercentageToDP(15)}}>
                            <PointListText style={{marginTop: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothic}}>{props.data.status}</PointListText>
                            {
                                props.index == 1 ?
                                    <Image style={{marginTop: widthPercentageToDP(9)}} width={widthPercentageToDP(12)} height={widthPercentageToDP(12)} source={require("../../../assets/image/hansungInfo/circle_825.png")} />
                                    :
                                    null
                            }
                        </View>
                        <PointListText style={{textAlign: "center", fontSize: widthPercentageToDP(20), color: "#24a0fa"}}>{props.data.score}</PointListText>
                        <PointListText style={{textAlign: "center"}}>{props.data.item.length > 20 ? props.data.item.slice(0, 21) + ".." : props.data.item}</PointListText>
                    </View>
                </ImageBackground>
            </View>
        );
    } else {
        return (
            <View style={{position: "absolute",bottom: widthPercentageToDP(0), left: widthPercentageToDP(186), flexDirection: "row", marginLeft: widthPercentageToDP(8), marginBottom: widthPercentageToDP(19)}}>
                <ImageBackground style={{flexDirection: "column", width: widthPercentageToDP(154), height: widthPercentageToDP(78)}} source={require("../../../assets/image/hansungInfo/square_993.png")}>
                    <View>
                        <View style={{flexDirection: "row", justifyContent: "space-between", marginRight: widthPercentageToDP(15)}}>
                            <PointListText style={{marginTop: widthPercentageToDP(11), fontFamily: fonts.nanumBarunGothic}}>{props.data.status}</PointListText>
                            {
                                props.index == 1 ?
                                    <Image style={{marginTop: widthPercentageToDP(9)}} width={widthPercentageToDP(12)} height={widthPercentageToDP(12)} source={require("../../../assets/image/hansungInfo/circle_825.png")} />
                                    :
                                    null
                            }
                        </View>
                        <PointListText style={{textAlign: "center", fontSize: widthPercentageToDP(20), color: "#24a0fa"}}>{props.data.score}</PointListText>
                        <PointListText style={{textAlign: "center"}}>{props.data.item.length > 20 ? props.data.item.slice(0, 21) + ".." : props.data.item}</PointListText>
                    </View>
                </ImageBackground>
            </View>
        );
    }
};