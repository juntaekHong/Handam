import React from "react";
import styled from "styled-components";
import { widthPercentageToDP } from "../../utils/util";

const Search = styled.Image`
  width: ${widthPercentageToDP(24)};
  height: ${widthPercentageToDP(24)};
  margin-vertical: ${widthPercentageToDP(8)};
  margin-left: ${widthPercentageToDP(10)};
`;

export const SearchImg = () => {
  return (
    <Search source={require("../../../assets/image/professor/search.png")} />
  );
};

const Filter = styled.Image`
  width: ${widthPercentageToDP(36)};
  height: ${widthPercentageToDP(36)};
`;

export const FilterImg = () => {
  return (
    <Filter source={require("../../../assets/image/professor/filter.png")} />
  );
};

const Filter2 = styled.Image`
  width: ${widthPercentageToDP(58)};
  height: ${widthPercentageToDP(58)};
`;

export const FilterImg2 = () => {
  return (
    <Filter2 source={require("../../../assets/image/professor/filter-2.png")} />
  );
};

export const RefreshImg = () => {
  return (
    <Filter2 source={require("../../../assets/image/professor/refresh.png")} />
  );
};

// 이미지 및 사이즈 수정 예정
const Selection = styled.Image`
  width: ${widthPercentageToDP(16)};
  height: ${widthPercentageToDP(16)};
`;

export const TrackSelectionImg = props => {
  if (props.select === "해당없음")
    return (
      <Selection
        source={require("../../../assets/image/sign/smallselectiongrey.png")}
      />
    );
  else
    return (
      <Selection
        source={require("../../../assets/image/sign/smallselectionblue.png")}
      />
    );
};

export const ProfessorSelectionImg = props => {
  if (props.select === "해당없음")
    return (
      <Selection
        source={require("../../../assets/image/sign/smallselectiongrey.png")}
      />
    );
  else
    return (
      <Selection
        source={require("../../../assets/image/sign/smallselectionblue.png")}
      />
    );
};

const Reply = styled.Image`
  width: ${widthPercentageToDP(16)};
  height: ${widthPercentageToDP(16)};
`;

export const ReplyImg = props => {
  return (
    <Reply source={require("../../../assets/image/community/smalltalk.png")} />
  );
};

const GoBack = styled.Image`
  width: ${widthPercentageToDP(28)};
  height: ${widthPercentageToDP(28)};
`;

export const BackImg = props => {
  return (
    <GoBack source={require("../../../assets/image/community/back.png")} />
  );
};

const Close = styled.Image`
  width: ${widthPercentageToDP(28)};
  height: ${widthPercentageToDP(28)};
`;

export const CloseImg = props => {
  return (
    <Close source={require("../../../assets/image/community/close.png")} />
  );
};

// 추후 이미지 변경 예정
const Recommend = styled.Image`
  width: ${widthPercentageToDP(9.5)};
  height: ${widthPercentageToDP(11.2)};
`;

export const RecommendImg = props => {
  return (
    <Recommend
      source={require("../../../assets/image/community/likes_color.png")}
    />
  );
};

export const RecommendImg2 = props => {
  return (
    <Recommend source={require("../../../assets/image/community/likes.png")} />
  );
};

const Good = styled.Image`
  width: ${widthPercentageToDP(24)};
  height: ${widthPercentageToDP(24)};
`;

const Bad = styled.Image`
  width: ${widthPercentageToDP(24)};
  height: ${widthPercentageToDP(24)};
`;

// 교수평가 상세페이지 굿, 베드 아이콘
export const GoodImg = props => {
  return <Good source={require("../../../assets/image/professor/good.png")} />;
};

export const GoodCheckImg = props => {
  return (
    <Good source={require("../../../assets/image/professor/goodcheck.png")} />
  );
};

export const BadImg = props => {
  return <Bad source={require("../../../assets/image/professor/bed.png")} />;
};

export const BadCheckImg = props => {
  return (
    <Bad source={require("../../../assets/image/professor/bedcheck.png")} />
  );
};

// 검색&댓글 없을 때
export const NonResult = styled.Image`
  width: ${widthPercentageToDP(136)};
  height: ${widthPercentageToDP(68)};
`;

export const NonResultImg = () => {
  return (
    <NonResult source={require("../../../assets/image/professor/empty.png")} />
  );
};

const Star = styled.Image`
  width: ${props =>
    props.size === "Large" ? widthPercentageToDP(16) : widthPercentageToDP(16)};
  height: ${props =>
    props.size === "Large" ? widthPercentageToDP(18) : widthPercentageToDP(16)};
`;

export const EmptyStarImg = props => {
  return (
    <Star
      {...props}
      source={require("../../../assets/image/professor/star-0.png")}
    />
  );
};

export const HalfStarImg = props => {
  return (
    <Star
      {...props}
      source={require("../../../assets/image/professor/star-0-5.png")}
    />
  );
};

export const PullStarImg = props => {
  return (
    <Star
      {...props}
      source={require("../../../assets/image/professor/star-1.png")}
    />
  );
};

export const HalfMoreStarImg = props => {
  return (
    <Star
      {...props}
      source={require("../../../assets/image/professor/star-0-75.png")}
    />
  );
};

export const HalfBelowStarImg = props => {
  return (
    <Star
      {...props}
      source={require("../../../assets/image/professor/star-0-25.png")}
    />
  );
};
