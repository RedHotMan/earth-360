import React from 'react';
import {
  asset,
  AppRegistry,
  View,
  AmbientLight,
  PointLight,
  Model,
  StyleSheet,
} from 'react-360';

import MyHeader from './components/header';

export default class Earth extends React.Component {
  constructor() {
    super();

    this.state = {
      rotation: 0,
    };

    this.lastUpdate = Date.now();
    this.rotate = this.rotate.bind(this);
  }

  componentDidMount() {
    this.rotate();
  }

  rotate() {
    const now = Date.now();
    const delta = now - this.lastUpdate;

    this.lastUpdate = now;

    this.setState({
      rotation: this.state.rotation + delta/150
    });

    this.frameHandle = requestAnimationFrame(this.rotate);
  }

  render() {
    return (
      <View>
        <AmbientLight intensity={1}/>
        < PointLight
          style={[ 
            {
              transform: [{
                translate: [-800, -500, -500]
              }]
            }
          ]}
          intensity = {1}
        />

        <MyHeader/>

        <View style={styles.planet}>
          <Model
            source={{obj: asset('models/earth.obj'), mtl: asset('models/earth.mtl')}}
            lit={true}
            style={[
              {
                transform: [
                  {translate: [0,0,0]},
                  {scale: 120},
                  {rotateY: this.state.rotation}
                ]
              }, styles.model
            ]}
          />
        </View>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  planet: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 1400,
    height: 500,
    transform: [{
      translate: [-200, -100, 0]
    }]
  },
  model: {
    position: 'absolute'
  }
});

AppRegistry.registerComponent('Earth', () => Earth);
