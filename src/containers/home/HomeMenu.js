import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { HCenterView, Title, BaseView } from "../../components/common/View";
import { BottomView, MenuCenterView, ButtonView } from "../../components/homemenu/View";
import DragSortableView from "react-native-drag-sort";
import { widthPercentageToDP, storeData } from "../../utils/util";
import { MenuNavBtn, CancelBtn, SaveBtn } from "../../components/homemenu/Button";
import config from "../../configs/config";
import { FlatList, View } from "react-native";
import navigators from "../../utils/navigators";
import { HomeActions } from "../../store/actionCreator";
import values from "../../configs/values";

const MENU_LENGTH = config.homeMenu.filter(item => item.enabled).length;

const filter = (arr1, arr2) => {
  return arr1.filter(item1 => {
    for (let item2 of arr2) {
      if (item2.title !== undefined && item2.title === item1.title) return false;
    }
    return true;
  });
};

const blankItem = { image: require("HandamProject/assets/image/home/line.png") };

const HomeMenu = ({ homeMenu }) => {
  const [nowArr, setNowArr] = useState(homeMenu.length >= MENU_LENGTH ? homeMenu : [...homeMenu, blankItem]);
  const [baseArr, setBaseArr] = useState(filter(config.homeMenu, homeMenu));

  const removeArr = useCallback(
    obj => {
      try {
        const tmp = nowArr.filter((item, index) => item.title !== undefined && item.title !== obj.title);
        if (tmp.length < MENU_LENGTH) tmp.push(blankItem);
        setNowArr(tmp);
        setBaseArr(filter(config.homeMenu, tmp));
      } catch (e) {
        console.log(e);
      }
    },
    [nowArr, config]
  );

  const addArr = useCallback(
    num => {
      let add,
        newArr = nowArr.filter(item => item.title !== undefined);
      if (newArr.length >= MENU_LENGTH) return;
      const tmp = baseArr.filter((item, index) => {
        if (index !== num) return true;
        else add = item;
      });
      newArr.push(add);
      if (newArr.length < MENU_LENGTH) newArr.push(blankItem);
      setBaseArr(tmp);
      setNowArr(newArr);
    },
    [baseArr, nowArr]
  );

  const cancel = useCallback(() => {
    navigators.navigateBack();
  }, []);

  const save = useCallback(async () => {
    try {
      const saveArr = nowArr.filter(item => item.title !== undefined);
      HomeActions.homeMenuAction(saveArr);
      await storeData(values.storeName.HOME_MENU, JSON.stringify(saveArr));
      navigators.navigateBack();
    } catch (e) {}
  }, [nowArr]);

  return (
    <HCenterView>
      <Title title={"기능 관리 및 추가"} leftInVisible={true} />
      <MenuCenterView>
        <DragSortableView
          dataSource={nowArr}
          parentWidth={widthPercentageToDP(375)}
          childrenWidth={widthPercentageToDP(78)}
          childrenHeight={widthPercentageToDP(78)}
          marginChildrenTop={widthPercentageToDP(21)}
          onDataChange={data => {
            // delete or add data to refresh
            setNowArr(data);
          }}
          fixedItems={
            nowArr.length < MENU_LENGTH || nowArr[nowArr.length - 1].title === undefined
              ? [nowArr.length - 1]
              : undefined
          }
          onClickItem={(data, item, index) => {}}
          delayLongPress={200}
          renderItem={(item, index) => {
            if (item.title) {
              return (
                <MenuNavBtn type={"minus"} title={item.title} image={item.image} onPress={() => removeArr(item)} />
              );
            } else {
              return <MenuNavBtn type={"blank"} title={item.title} image={item.image} />;
            }
          }}
        />
      </MenuCenterView>
      <BottomView>
        <View style={{ width: "100%", height: widthPercentageToDP(131) }}>
          <FlatList
            data={baseArr.length > 0 ? baseArr : [blankItem]}
            extraData={baseArr}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={<View style={{ width: widthPercentageToDP(37) }} />}
            ListFooterComponent={<View style={{ width: widthPercentageToDP(19) }} />}
            contentContainerStyle={{ height: widthPercentageToDP(131), alignItems: "center" }}
            renderItem={({ item, index }) => {
              if (baseArr.length === 0) {
                return <MenuNavBtn type={"blank"} title={item.title} image={item.image} />;
              } else {
                return <MenuNavBtn type={"plus"} title={item.title} image={item.image} onPress={() => addArr(index)} />;
              }
            }}
          />
        </View>
        <ButtonView>
          <CancelBtn onPress={cancel} />
          <SaveBtn onPress={save} />
        </ButtonView>
      </BottomView>
    </HCenterView>
  );
};

export default connect(({ home }) => ({
  homeMenu: home.homeMenu
}))(HomeMenu);
