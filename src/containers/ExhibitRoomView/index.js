import React from "react";
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
  Image,
  Model,
  AmbientLight,
  DirectionalLight,
  PointLight,
  SpotLight,
  Animated,
  Cylinder,
  Sphere,
  Box,
  AsyncStorage
} from 'react-vr';
import { func } from "prop-types";
import { connect } from "react-redux";
// import { setUsername } from "../../actions";
// import NavButton from "../../components/NavButton";

const AnimatedCylinder = Animated.createAnimatedComponent(Cylinder);
const AnimatedSphere = Animated.createAnimatedComponent(Sphere);
const AnimatedBox = Animated.createAnimatedComponent(Box);

let TimerVar;

class ExhibitRoomView extends React.Component {
  constructor() {
    super(); 
  }

  async getData() {
    let valuex;
    try {
      valuex = await AsyncStorage.getItem('scorekey');
      if (valuex !== null){
        // We have data!
        this.setState({score:valuex})
        // return valuex;
      }
      else {
        this.setState({score:0})
        //  score = 0;
        //return 0;
      }
    } catch (error) {
      this.setState({score:0})
      // Error retrieving data
      // return 0;
    }
  }

  componentWillMount() {
    this.getData().done();
    this.setState({
      textColor:'yellow',
      shapeHeight:new Animated.Value(100),
      triggerstatus: false,
      playingGame: false,
      opacity: {box:0, cylinder:0, enemy:0},
      gameOverOpacity: 0,
      infoOpacity: 1,
      actionOpacity:1,
      tubeOpacity:0
    })
  }

  shapeFall = () => {
   timerVar = setTimeout(()=>{this.reset()},6000);
    Animated.timing(
      this.state.shapeHeight,
      {
        toValue: -10,
        duration: 6000,
      }
    ).start();
  }

  reset() {
     clearTimeout(timerVar);
    if (this.state.triggerstatus === false && this.state.shapeType !== 'enemy') {
      this.gameOver();
    }
    if (this.state.gameOverShow === false) {
      this.setState({playingGame:false,shapeHeight:new Animated.Value(100),triggerstatus: false})
      this._onStartClicked();
    }
  }

  goHome() {
       this.props.history.push("/");
  }

  _onStartClicked() {
    this.setState({score2:this.state.score})
    if (this.state.playingGame===false) {
      // randomly decide if enemy or not and reset height
      let shapetype = Math.floor(Math.random() * 3) === 0 ? 'enemy' : 'friend';
      // choose shape type
      if (shapetype === 'enemy') {
        // choose sphere
      }
      else {
        // choose another shape
        let shapetypem = Math.floor(Math.random() * 2);
        shapetype = shapetypem === 0 ? 'cylinder' : 'box'
      }


      // so now we know what our shape is let's call the appropritat one
      let opacity2 = {box:0,cylinder:0,enemy:0}
      opacity2[shapetype]=1;
      this.setState({actionOpacity:0,triggerstatus:false, gameOverShow:false,playingGame: true, shapeType: shapetype,opacity:opacity2,tubeOpacity:0.2})
      
      this.shapeFall();
    }
  }

  _onShapeClicked() {
    if (this.state.playingGame === true) {
      this.setState({triggerstatus:true})
      this.collisionCheck();
    }
  }

  collisionCheck() {
    if (this.state.shapeHeight._value < 50) {
      if (this.state.triggerstatus === true) {
   
        if (this.state.shapeType === 'enemy') {
         this.gameOver();
        }
        else {
        this.increaseScore();
        }
      }
     else {
        //this.gameOver();
      }
      
    }
  }

  async saveScore() {
    try {
      await AsyncStorage.setItem('scorekey', this.state.score++);
    } catch (error) {
      // Error saving data
    }
  }

  increaseScore() {
    this.saveScore();
    this.setState({score:this.state.score++,playingGame:false});
  }

  gameOver() {
    this.setState({shapeHeight:new Animated.Value(100),gameOverOpacity:1,infoOpacity:0,triggerstatus:false,gameOverShow:true,actionOpacity:1,playingGame :false,tubeOpacity:0});
  }

  render() {
    return (
      <View>
        <VrButton
          onClick={()=>this._onShapeClicked()}>
        <Pano source={asset('gamebackground.jpg')} onClick={()=>this._onShapeClicked()} />
      
        <Cylinder 
         lit={true}
          radiusTop={1}
          radiusBottom={0.8}
          dimHeight={100}
          segments={12}
          style={{
          opacity:this.state.tubeOpacity,
          color: '#cccccc',
          transform: [ {translate: [-2.3, 0, -3]}],
              }}
            />
        <Text>--{this.state.score}--</Text>
        <Text style={{ opacity:this.state.tubeOpacity,fontSize:0.5,transform: [ {translate: [-2.8, 1.5, -3]}] }}>Score: {this.state.score2+0}</Text>
        <AnimatedBox
          dimWidth={0.8}
          dimDepth={0.8}
          dimHeight={0.8}
          texture={asset('materialGreen.jpg')} 
          style={{
            color: '#af1e23',
            opacity:this.state.opacity.box,
            transform: [
               {translateX: -2.3},
               {translateY: this.state.shapeHeight},
               {translateZ: -3} 
            ]
          }}
        />
        <AnimatedSphere
          texture={asset('materialRed.jpg')} 
          style={{
            color: '#00ff00',
            opacity: this.state.opacity.enemy,
            transform: [
               {translateX: -2.3},
               {translateY: this.state.shapeHeight},
               {translateZ: -3} 
            ]
          }}
        />
        <AnimatedCylinder
          texture={asset('materialBlue.jpg')} 
          style={{
            opacity:this.state.opacity.cylinder,
            color: '#0000ff',
            transform: [
               {translateX: -2.3},
               {translateY: this.state.shapeHeight},
               {translateZ: -3}
            ]
          }}
        />
       
        <AmbientLight/>
        <PointLight style={{color:'red', transform:[{translate:[0,10,-1]}]}}/>
        <DirectionalLight style={{color:'green'}}/>
        <View style={{opacity:this.state.actionOpacity}}>
          <Text
            style={{
              fontSize: 0.2,
              layoutOrigin: [0.5, 0.5],
              transform: [{translate: [0, 1, -3]}],
              color: this.state.textColor,
              opacity: this.state.infoOpacity,
          }}>
          Select all the shapes as they fall, except the red ones!
          </Text>

          <Text
            style={{
              fontSize: 0.9,
              layoutOrigin: [0.5, 0.5],
              transform: [{translate: [0, 1.5, -3]}],
              color: this.state.textColor,
              opacity: this.state.gameOverOpacity,
            }}>
            GAME OVER
          </Text>


          <VrButton
            style={{width:3}}
            onClick={()=>this._onStartClicked()}>
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
                transform: [{translate: [0, 1.6, -3]}],
              }}
            >
            START
            </Text>
          </VrButton>
          
          <VrButton
            style={{width:3}}
            onClick={()=>this.goHome()}>
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
                transform: [{translate: [0, 1.2, -3]}],
              }}
            >
            HOME
            </Text>
          </VrButton>
        </View>
      </VrButton>
    </View>
    );
  }
}
export default ExhibitRoomView;
