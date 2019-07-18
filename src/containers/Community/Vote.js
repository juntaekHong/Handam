import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ImageModal } from "../../components/talk/Modal";
import { connect } from "react-redux";
import { TalkActions } from "../../store/actionCreator";

class Vote extends Component {
  render() {
    const imageData =
      this.props.getPosts.imagePath.length > 0
        ? eval("(" + this.props.getPosts.imagePath[0].path + ")").image
        : [];
    return (
      <View>
        <ImageModal
          visible={this.props.imageModal}
          close={() => TalkActions.handleImageModal(false)}
          images={imageData}
          index={this.props.imageIndex}
          indexhandle={TalkActions.handleImageIndex}
        />
        <TouchableOpacity onPress={() => TalkActions.handleImageModal(true)}>
          <Text>하이</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(state => ({
  categoryList: state.talk.categoryList,
  categoryIndex: state.talk.categoryIndex,
  postsList: state.talk.postsList,
  getPosts: state.talk.getPosts,

  replysList: state.talk.replysList,

  filter: state.talk.filter,
  orderby: state.talk.orderby,

  bottomModal: state.talk.bottomModal,
  imageModal: state.talk.imageModal,
  imageIndex: state.talk.imageIndex
}))(Vote);
