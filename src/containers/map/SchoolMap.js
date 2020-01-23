import React, { useState, useEffect, useRef, useCallback } from "react";
import { Keyboard } from "react-native";
import { BaseView, Title } from "../../components/common/View";
import { connect } from "react-redux";
import { SchoolMapContainer, SchoolMapItem, SearchBar, InfoList, InfoItem } from "../../components/map/View";
import { MapActions } from "../../store/actionCreator";
import { widthPercentageToDP as wp } from "../../utils/util";
import colors from "../../configs/colors";
import { View } from "react-native";
import navigators from "../../utils/navigators";

const SchoolMap = props => {
  const [infoList, setInfoList] = useState([]);
  const mapRef = useRef(null);

  const selectBuilding = useCallback(
    item => {
      Keyboard.dismiss();
      MapActions.enableItem(item.index);
      const list = [item];
      setInfoList(list);
    },
    [infoList]
  );

  const removeBuilding = useCallback(
    item => {
      const list = infoList.filter((info, i) => (info.index !== item.index ? true : false));
      MapActions.disableItem(item.index);
      setInfoList(list);
    },
    [infoList]
  );

  const detailBuilding = useCallback(item => {
    navigators.navigate("schoolbuilding", { info: item });
  }, []);

  const searchBuilding = useCallback(
    event => {
      const text = event.nativeEvent.text;
      MapActions.initItem();
      let index = [];
      const list = props.mapList.filter((item, i) => {
        if (item.title.indexOf(text) >= 0) {
          index.push(item.index);
          return true;
        }

        for (let main of item.mainInfo) {
          if (main.indexOf(text) >= 0) {
            index.push(item.index);
            return true;
          }
        }

        if (item.detailEnable) {
          for (let detail of item.detail) {
            for (let info of detail.info) {
              for (let name of info) {
                if (name.indexOf(text) >= 0) {
                  index.push(item.index);
                  return true;
                }
              }
            }
          }
        }
        return false;
      });
      MapActions.searchItem(index);
      setInfoList(list);
    },
    [props.mapList]
  );

  useEffect(() => {
    MapActions.initItem();
    setTimeout(() => {
      mapRef.current.scrollTo({ x: wp(300), y: wp(250), animated: false });
    }, 0);
  }, []);

  return (
    <BaseView>
      <Title title={"학교 위치"} rightInVisible={true} style={{ zIndex: 10, backgroundColor: colors.white }} />
      <BaseView>
        <BaseView>
          <SchoolMapContainer mapRef={mapRef}>
            {props.mapList.map((item, index) => (
              <SchoolMapItem key={index} data={item} onPress={() => selectBuilding(item)} />
            ))}
          </SchoolMapContainer>
        </BaseView>
        <SearchBar search={searchBuilding} />
        <InfoList>
          <View style={{ width: wp(33) }} />
          {infoList.map((item, index) => (
            <InfoItem
              key={`info${index}`}
              item={item}
              close={() => removeBuilding(item)}
              detail={() => detailBuilding(item)}
            />
          ))}
          <View style={{ width: wp(33) }} />
        </InfoList>
      </BaseView>
    </BaseView>
  );
};

export default connect(({ map }) => ({
  mapList: map.mapList
}))(SchoolMap);
