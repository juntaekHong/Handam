import styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util";
import { Platform } from "react-native";

//Talk.js

export const CategoryIMG = styled.Image`
  position: absolute;
  width: ${widthPercentageToDP(343)};
  height: ${widthPercentageToDP(105)};
`;

export const QuotationIMG = styled.Image`
  width: ${widthPercentageToDP(20)};
  height: ${widthPercentageToDP(13)};
`;

export const NewIMG = styled.Image`
  width: ${widthPercentageToDP(13)};
  height: ${widthPercentageToDP(14)};
  margin-left: ${widthPercentageToDP(5)};
  margin-top: ${Platform.OS == "ios" ? widthPercentageToDP(1) : 0};
`;

//TalkAbout.js

export const ImageIMG = styled.Image`
  width: ${widthPercentageToDP(11)};
  height: ${widthPercentageToDP(11)};
`;

export const LikeIMG = styled.Image`
  width: ${widthPercentageToDP(8.5)};
  height: ${widthPercentageToDP(10.2)};
  margin-left: ${widthPercentageToDP(10.5)};
`;

export const ReplyIMG = styled.Image`
  width: ${widthPercentageToDP(10.2)};
  height: ${widthPercentageToDP(9.9)};
  margin-left: ${widthPercentageToDP(10.5)};
`;

export const SearchIMG = styled.Image`
  width: ${widthPercentageToDP(21)};
  height: ${widthPercentageToDP(21)};
  margin-right: ${widthPercentageToDP(16)};
`;

export const WriteIMG = styled.Image`
  width: ${widthPercentageToDP(87)};
  height: ${widthPercentageToDP(37)};
`;

//TalkDetail.js

export const QuotationIMG2 = styled.Image`
  width: ${widthPercentageToDP(19)};
  height: ${widthPercentageToDP(12)};
`;

export const ScrapIMG = styled.Image`
  width: ${widthPercentageToDP(10.3)};
  height: ${widthPercentageToDP(10.3)};
`;

export const LikeIMG2 = styled.Image`
  width: ${widthPercentageToDP(8.5)};
  height: ${widthPercentageToDP(10.2)};
`;

export const ReplyIMG2 = styled.Image`
  width: ${widthPercentageToDP(10.2)};
  height: ${widthPercentageToDP(10)};
`;

//TalkSearch.js

export const HandaMonIMG = styled.Image`
  width: ${widthPercentageToDP(30)};
  height: ${widthPercentageToDP(40)};
  margin-bottom: ${widthPercentageToDP(10)};
`;

export const SearchInIMG = styled.Image`
  width: ${widthPercentageToDP(15)};
  height: ${widthPercentageToDP(15)};
  margin-right: ${widthPercentageToDP(8)};
  margin-left: ${widthPercentageToDP(17)};
`;

//TalkWrite.js

export const AddedImage = styled.Image`
  width: ${widthPercentageToDP(95)};
  height: ${widthPercentageToDP(95)};
  margin-right: ${widthPercentageToDP(10)};
  border-radius: ${widthPercentageToDP(4)};
`;
