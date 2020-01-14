import React from "react";
import { BaseView, Title, Scroll } from "../../components/common/View";
import { connect } from "react-redux";
import { DetailListItem } from "../../components/map/View";

const SchoolBuilding = props => {
  const info = props.navigation.getParam("info");
  return (
    <BaseView>
      <Title title={info.title} rightInVisible={true} />
      <Scroll>
        {info.detail.map((item, index) => (
          <DetailListItem info={item} />
        ))}
      </Scroll>
    </BaseView>
  );
};

export default connect()(SchoolBuilding);
