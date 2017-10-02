import React from "react";
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
  Image,
  AsyncStorage
} from 'react-vr';

import { withRouter, NativeRouter, Route, Push } from "react-router-native";
import { push } from 'connected-react-router'

import { func, bool, object } from "prop-types";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as viewingExhibitActions from "../../actions/Exhibition";
// import NavButton from "../../components/NavButton";

class WaitingRoomView extends React.Component {
  constructor() {
    super();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state.exhibition.viewingExhibits) {
     this.props.history.push("/exhibit");
    }
  }

  componentWillMount() {
        this.setState({textColor:'yellow'});
  }

  async resetScore() {
    try {
      await AsyncStorage.setItem('scorekey', 0);
    } catch (error) {
      // Error saving data
    }
  }

  _onViewClicked(type) {
    if (type===1) {
      this.resetScore();
    }
    this.props.viewExhibit.viewExhibito(3);
  }

  render() {

    return (
      <View>
        <Pano source={asset('gameinside.jpg')}/>
        <VrButton
          style={{width:3}}
          onClick={()=>this._onViewClicked(1)}>
          <Text
            style={{
              backgroundColor: '#731a05',
              fontSize: 0.4,
              fontWeight: '400',
              layoutOrigin: [0.5, 0.5],
              paddingLeft: 0.05,
              paddingRight: 0.05,
              borderRadius: 0.2,
              textAlign: 'center',
              textAlignVertical: 'center',
              transform: [{translate: [0, -0.2, -3]}],
              }}>
            NEW GAME
          </Text>
        </VrButton>


        <VrButton
          style={{width:3}}
          onClick={()=>this._onViewClicked(2)}>
          <Text
              style={{
                backgroundColor: '#065c16',
                fontSize: 0.4,
                fontWeight: '400',
                layoutOrigin: [0.5, 0.5],
                paddingLeft: 0.05,
                paddingRight: 0.05,
                borderRadius: 0.2,
                textAlign: 'center',
                textAlignVertical: 'center',
                transform: [{translate: [0, -0.6, -3]}],
                }}>
            CONTINUE
          </Text>
        </VrButton>
        
        <Text
          style={{
            fontSize: 3,
            layoutOrigin: [0.5, 0.5],
            transform: [{translate: [0, 3, -9]}],
            color: this.state.textColor
          }}
          onEnter={() => this.setState({textColor: 'white'})}
          onExit={() => this.setState({textColor: 'white'})}>
            SHAPE ATTACK!
          </Text>
      </View>
    );
  }
}


const mapDispatchToProps = dispatch => ({
    viewExhibit: bindActionCreators(viewingExhibitActions, dispatch),
});

WaitingRoomView.propTypes = {
  viewingExhibits: bool,
  state: object.isRequired,
  history: object.isRequired
};

export default (connect(state => ({
  state,
}),
mapDispatchToProps)(WaitingRoomView));
