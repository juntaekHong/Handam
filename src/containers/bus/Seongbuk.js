import React, { useState, useCallback, PureComponent, Component } from "react";
import { connect } from "react-redux";
import { BusView } from "../../components/bus/view/BusView";
import { BusStationListItem } from "../../components/bus/listItem/BusStationListItem";

class Seungbuk extends PureComponent {
  render() {
    return (
      <BusView
        data={this.props.seongbuk_list}
        extraData={this.props}
        renderItem={({ item, index }) => {
          return (
            <BusStationListItem
              data={item}
              barIndex={
                index == 0
                  ? 1
                  : index == this.props.seongbuk_list.length - 1
                  ? 2
                  : 0
              }
            />
          );
        }}
      />
    );
  }
}

export default connect(({ bus }) => ({
  seongbuk_list: bus.seongbuk_list
}))(Seungbuk);
