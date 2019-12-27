import React from "react";
import { CustomModal } from "../common/Modal";
import { FilterView, ModalFooterView } from "./View";
import { WheelPicker } from "../signup/Modal";

export const FilterModal = props => {
  return (
    <CustomModal
      {...props}
      width={325}
      height={347}
      closeHandler={() => props.closeHandler()}
      children={
        <FilterView
          trackList={() => props.trackList()}
          professorList={() => {
            props.professorList();
          }}
          selectTrack={props.selectTrack}
          professorListDisabled={props.selectTrack}
          selectProfessor={props.selectProfessor}
        />
      }
      renderFooter={() => {
        return (
          <ModalFooterView
            selectTrack={props.selectTrack}
            onPress={() => {
              props.footerHandler();
            }}
          />
        );
      }}
    ></CustomModal>
  );
};

export const TrackWheelPicker = props => {
  return <WheelPicker {...props} />;
};

export const ProfessorWheelPicker = props => {
  return <WheelPicker {...props} />;
};
