import React, { useState, useCallback, PureComponent } from "react";
import { connect } from "react-redux";
import { BusView } from "../../components/bus/view/BusView";
import { BusStationListItem } from "../../components/bus/listItem/BusStationListItem";

class Jongro extends PureComponent {
  render() {
    return (
      <BusView
        data={this.props.jongro_list}
        extraData={this.props}
        renderItem={({ item, index }) => {
          return (
            <BusStationListItem
              data={item}
              barIndex={
                index == 0
                  ? 1
                  : index == this.props.jongro_list.length - 1
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
  jongro_list: bus.jongro_list
}))(Jongro);
