import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

//기본
export const CText = styled.Text`
  font-size: ${widthPercentageToDP(16)};
  font-family: ${fonts.nanumBarunGothicB};
  height: ${widthPercentageToDP(18)};
  color: ${props => (props.selected == true ? "#259ffa" : "#dbdbdb")};
`;
//카테고리 제목
export const CTText = styled(CText)`
  height: ${widthPercentageToDP(18)};
  color: ${"#101010"};
  margin-vertical: ${widthPercentageToDP(8)};
`;
//카테고리 설명
export const CEText = styled(CText)`
  font-size: ${widthPercentageToDP(12)};
  width: ${widthPercentageToDP(200)};
  height: ${widthPercentageToDP(13)};
  color: ${"#646464"};
`;

export const WriterName = styled.Text`
  color: ${"#0c81ff"};
  font-size: ${widthPercentageToDP(10)};
  font-family: ${fonts.nanumBarunGothicB};
  margin-left: ${widthPercentageToDP(4)};
`;

export const AnonymousWriterName = styled(WriterName)`
  color: ${"#171717"};
`;

export const ReportModalText = styled.Text`
  color: ${"#272727"};
  font-size: ${widthPercentageToDP(16)};
  font-family: ${fonts.nanumBarunGothic};
  margin-left: ${widthPercentageToDP(12)};
`;

export const C_CreatedAtText = styled.Text`
  color: ${"#9e9e9e"};
  font-size: ${widthPercentageToDP(8)};
  font-family: ${fonts.nanumBarunGothic};
  margin-left: ${widthPercentageToDP(8.5)};
`;

export const C_ContentText = styled.Text`
  color: ${"#171717"};
  width: ${widthPercentageToDP(309)};
  font-size: ${widthPercentageToDP(13)};
  font-family: ${fonts.nanumBarunGothic};
  margin-top: ${widthPercentageToDP(12)};
`;

export const C_ReContentText = styled(C_ContentText)`
  margin-top: ${widthPercentageToDP(0)};
`;

export const C_ReplyText = styled.Text`
  color: ${"#171717"};
  font-size: ${widthPercentageToDP(11)};
  font-family: ${fonts.nanumBarunGothic};
`;

export const C_ReportText = styled.Text`
  color: ${"#101010"};
  font-size: ${widthPercentageToDP(11)};
  font-family: ${fonts.nanumBarunGothicB};
`;

export const C_LikeText = styled.Text`
  color: ${"#171717"};
  font-size: ${widthPercentageToDP(11)};
  font-family: ${fonts.nanumBarunGothic};
  margin-left: ${widthPercentageToDP(4)};
`;

//alert
export const AlertText = styled.Text`
  color: ${"#000000"};
  font-size: ${widthPercentageToDP(18)};
  font-family: ${fonts.nanumBarunGothic};
`;
