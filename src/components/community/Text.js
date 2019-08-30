import { Platform } from "react-native";
import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

//기본
export const C_Text = styled.Text`
  font-size: ${widthPercentageToDP(16)};
  font-family: ${fonts.nanumBarunGothicB};
  height: ${widthPercentageToDP(18)};
  color: ${props => (props.selected == true ? "#259ffa" : "#dbdbdb")};
`;
//

//community

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
  margin-left: ${widthPercentageToDP(4)};
  margin-top: ${widthPercentageToDP(2)};
`;

export const C_ContentText = styled.Text`
  color: ${"#171717"};
  width: ${widthPercentageToDP(309)};
  font-size: ${widthPercentageToDP(13)};
  font-family: ${fonts.nanumBarunGothic};
  margin-bottom: ${widthPercentageToDP(16)};
  line-height: ${widthPercentageToDP(18)};
`;

export const C_ReContentText = styled(C_ContentText)`
  width: ${widthPercentageToDP(251)};
  margin-bottom: ${widthPercentageToDP(10)};
`;

export const C_ReplyText = styled.Text`
  color: ${"#171717"};
  font-size: ${widthPercentageToDP(11)};
  font-family: ${fonts.nanumBarunGothic};
  margin-left: ${Platform.OS == "ios" ? widthPercentageToDP(2) : 0}
  margin-top: ${
    Platform.OS == "ios" ? widthPercentageToDP(2) : widthPercentageToDP(1)
  }
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
