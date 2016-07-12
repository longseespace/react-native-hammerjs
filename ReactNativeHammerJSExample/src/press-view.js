import React from 'react';
import { Hammer, injectHammer } from 'react-native-hammerjs';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';

const IMAGE_WIDTH = 3229;
const IMAGE_HEIGHT = 400;

const styles = StyleSheet.create({
  touchpad: {
    backgroundColor: '#e5e5e5',
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0
  },
  image: {
    height: IMAGE_HEIGHT
  },
  pressed: {
    opacity: 0.4,
  },
  check: {
    width: 64, height: 64,
    position: 'absolute',
    top: 160, left: 150,
    tintColor: 'green'
  }
});

class GestureView extends React.Component {
  state = {
    pressed: false,
  }

  componentDidMount() {
    const mc = this.props.hammer;
    mc.add( new Hammer.Press({ time: 1000 }) );

    mc.on('press', e => {
      this.setState({
        pressed: !this.state.pressed
      });
    });
  }

  render() {
    const connectEventHandlers = this.props.connectEventHandlers;
    return connectEventHandlers(
      <View style={styles.touchpad}>
        <Image
          style={[styles.image, this.state.pressed && styles.pressed]}
          resizeMode='cover'
          source={require('./pano-1.jpg')}
        />
        { this.state.pressed && <Image
          style={styles.check}
          resizeMode='cover'
          source={require('./check.png')}
        /> }
      </View>
    );
  }
};

export default injectHammer(GestureView);
