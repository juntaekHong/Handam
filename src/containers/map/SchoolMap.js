import React, { useState, useEffect, useRef } from "react";
import { BaseView, Title } from "../../components/common/View";
import { connect } from "react-redux";
import { SchoolMapContainer, SchoolMapItem } from "../../components/map/View";
import { MapActions } from "../../store/actionCreator";
import { widthPercentageToDP as wp } from "../../utils/util";

const SchoolMap = props => {
  const [modal, setModal] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    MapActions.initItem();
    setTimeout(() => {
      mapRef.current.scrollTo({ x: wp(300), y: wp(250), animated: false });
    }, 0);
  }, []);

  return (
    <BaseView>
      <Title title={"학교 위치"} rightInVisible={true} />
      <SchoolMapContainer mapRef={mapRef}>
        {props.mapList.map((item, index) => (
          <SchoolMapItem key={index} data={item} onPress={() => MapActions.enableItem(item.index)} />
        ))}
      </SchoolMapContainer>
    </BaseView>
  );
};

export default connect(({ map }) => ({
  mapList: map.mapList
}))(SchoolMap);
