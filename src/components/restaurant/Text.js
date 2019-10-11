import styled from "styled-components/native";
import fonts from "../../configs/fonts";
import { widthPercentageToDP } from "../../utils/util";

//restaurant

export const Name = styled.Text`
  color: ${"#0b0b0b"};
  font-size: ${widthPercentageToDP(15)};
  font-family: ${fonts.nanumBarunGothicB};
`;

export const Tag = styled.Text`
  color: ${"#404040"};
  font-size: ${widthPercentageToDP(8)};
  font-family: ${fonts.nanumBarunGothicB};
`;

export const ReplyCount = styled.Text`
  color: ${"#b1b1b1"};
  font-size: ${widthPercentageToDP(11)};
  font-family: ${fonts.nanumBarunGothic};
`;

export const MenuName = styled.Text`
  color: ${"#404040"};
  font-size: ${widthPercentageToDP(11)};
  font-family: ${fonts.nanumBarunGothic};
  width: ${widthPercentageToDP(167)}
  margin-top: ${widthPercentageToDP(5)};
  margin-bottom: ${widthPercentageToDP(16)};
  margin-right: ${widthPercentageToDP(5)};
`;

//restaurantdetail

export const D_Name = styled.Text`
  color: ${"#0b0b0b"};
  font-size: ${widthPercentageToDP(18)};
  font-family: ${fonts.nanumBarunGothicB};
  margin-top: ${widthPercentageToDP(18)};
  margin-left: ${widthPercentageToDP(21)};
  margin-bottom: ${widthPercentageToDP(17)};
`;

export const D_Name2 = styled.Text`
  color: ${"#0b0b0b"};
  font-size: ${widthPercentageToDP(15)};
  font-family: ${fonts.nanumBarunGothicB};
  margin-right: ${widthPercentageToDP(12)};
`;

export const D_Name3 = styled(D_Name2)`
  margin-right: ${widthPercentageToDP(0)};
`;

export const D_Oneline = styled.Text`
  color: ${"#404040"};
  font-size: ${widthPercentageToDP(12)};
  font-family: ${fonts.nanumBarunGothic};
  line-height: ${widthPercentageToDP(18)};
  margin-top: ${widthPercentageToDP(10)};
`;

export const D_PhoneClock = styled.Text`
  color: ${"#404040"};
  font-size: ${widthPercentageToDP(14)};
  font-family: ${fonts.nanumBarunGothicB};
`;

export const D_Pagenation = styled.Text`
  position: absolute;
  color: ${"#ffffff"};
  font-size: ${widthPercentageToDP(10)};
  font-family: ${fonts.nanumBarunGothicB};
  margin-top: ${widthPercentageToDP(4)};
  margin-left: ${widthPercentageToDP(9)};
`;

export const D_Reviewcount = styled.Text`
  color: ${"#404040"};
  font-size: ${widthPercentageToDP(12)};
  font-family: ${fonts.nanumBarunGothic};
`;

export const D_Goodcount = styled(D_Reviewcount)`
  margin-right: ${widthPercentageToDP(19.6)};
  margin-left: ${widthPercentageToDP(8)};
`;

export const D_MenuName = styled(D_Reviewcount)``;

export const D_MenuPrice = styled.Text`
  color: ${"#404040"};
  font-size: ${widthPercentageToDP(12)};
  font-family: ${fonts.nanumBarunGothic};
  margin-left: ${widthPercentageToDP(10)};
`;

export const D_Represent = styled.Text`
  color: ${"#ffffff"};
  font-size: ${widthPercentageToDP(8)};
  font-family: ${fonts.nanumBarunGothicB};
`;

export const D_ReviewTitle = styled.Text`
  color: ${"#101010"};
  font-size: ${widthPercentageToDP(13)};
  font-family: ${fonts.nanumBarunGothicB};
  width: ${widthPercentageToDP(288)};
  margin-bottom: ${widthPercentageToDP(5)};
  line-height: ${widthPercentageToDP(17)};
`;

export const D_ReviewContent = styled.Text`
  color: ${"#000000"};
  font-size: ${widthPercentageToDP(11)};
  font-family: ${fonts.nanumBarunGothic};
  width: ${widthPercentageToDP(288)};
  margin-bottom: ${widthPercentageToDP(10)};
  line-height: ${widthPercentageToDP(15)};
`;

export const D_ReviewCreatedAt = styled.Text`
  color: ${"#646464"};
  font-size: ${widthPercentageToDP(11)};
  font-family: ${fonts.nanumBarunGothicB};
`;

export const ModalIndicator = styled.Text`
  position: absolute;
  color: ${"#ffffff"};
  font-size: ${widthPercentageToDP(15)};
  font-family: ${fonts.nanumBarunGothicB};
  width: ${widthPercentageToDP(375)};
  text-align: center;
`;
