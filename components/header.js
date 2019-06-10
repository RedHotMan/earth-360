import React from 'react';
import {
  asset,
  Text,
  View,
  StyleSheet,
  NativeModules,
  VrButton
} from 'react-360';

const {
  AudioModule
} = NativeModules;

export default class MyHeader extends React.Component {
  constructor() {
    super();

    this.state = {
      isMusicMuted: false
    }
  }

  componentDidMount() {
    AudioModule.createAudio('interstellar', {
      source: asset('ost-interstellar.mp3'),
      loop: true,
      muted: this.state.isMusicMuted
    });

    AudioModule.play('interstellar');
  }

  toggleMuteMusic() {
    console.log('toggle mute music');

    this.setState(prevState => {
      AudioModule.setParams('interstellar', {
        muted: !prevState.isMusicMuted
      });

      return {
        isMusicMuted: !prevState.isMusicMuted
      }
    });
  }

  render() {
    return (
      <View style={styles.header}>
        <Text style = {styles.headerTitle} > Planet Earth </Text>
        <VrButton onClick={() => this.toggleMuteMusic()}>
          < Text style = {styles.headerSubtitle}>
            {this.state.isMusicMuted ? 'Unmute' : 'Mute'}
          </Text>
        </VrButton>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: 600,
    transform: [{
      translate: [200, 0, 0]
    }]
  },
  headerTitle: {
    fontSize: 60,
    textAlign: 'center',
    color: '#fff'
  },
  headerSubtitle: {
      fontSize: 30,
      textAlign: 'center',
      color: '#fff'
  }
});
