import React, { useState, useCallback } from "react";
import styled from "styled-components/native";
import { CustomModal } from "../common/Modal";
import { NBGText } from "../common/Text";
import Picker from "react-native-wheel-picker-extended";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import colors from "../../configs/colors";
import FastImage from "react-native-fast-image";
var PickerItem = Picker.Item;

export const SignUpCheckModal = props => {
  return (
    <CustomModal {...props}>
      <NBGText>{props.value}</NBGText>
    </CustomModal>
  );
};

const PickerCheckerView = styled.View`
  width: 100%
  height: ${widthPercentageToDP(64)}
  justify-content: center
  align-items: center
  border-bottom-left-radius: ${widthPercentageToDP(14)}
  border-bottom-right-radius: ${widthPercentageToDP(14)}
`;

const PickerChecker = styled.TouchableOpacity`
  width: ${widthPercentageToDP(35)}
  height: ${widthPercentageToDP(35)}
`;

const PickerFooter = ({ footerHandler }) => {
  return (
    <PickerCheckerView>
      <PickerChecker onPress={footerHandler}>
        <FastImage
          style={{
            width: widthPercentageToDP(35),
            height: widthPercentageToDP(35)
          }}
          source={require("HandamProject/assets/image/sign/selection.png")}
        />
      </PickerChecker>
    </PickerCheckerView>
  );
};

export const WheelPicker = props => {
  const [value, setValue] = useState(
    props.value === null && props.data.length > 0
      ? 0
      : props.data.indexOf(props.value + "")
  );
  const onValueChange = useCallback(index => {
    setValue(index);
  }, []);

  const handleChangeValue = async () => {
    if (value === null) await props.footerHandler(props.value);
    else await props.footerHandler(props.data[value]);
    props.closeHandler();
  };

  handleCloseModal = () => {
    if (props.value === null) setValue(0);
    else setValue(props.data.indexOf(props.value));
    props.closeHandler();
  };

  return (
    <CustomModal
      {...props}
      closeHandler={handleCloseModal}
      renderFooter={() =>
        PickerFooter({ ...props, footerHandler: handleChangeValue })
      }
    >
      <Picker
        style={{ width: "100%", height: "100%" }}
        lineColor={"#cecece"}
        selectedValue={value}
        itemStyle={{
          color: colors.black,
          fontSize: widthPercentageToDP(22),
          fontFamily: fonts.nanumBarunGothic
        }}
        onValueChange={onValueChange}
      >
        {props.data.map((value, i) => (
          <PickerItem label={value} value={i} key={i + value} />
        ))}
      </Picker>
    </CustomModal>
  );
};
