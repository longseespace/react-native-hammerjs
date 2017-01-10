import React from 'react';
import { Hammer, injectHammer } from 'react-native-hammerjs';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import image from './pano-1.jpg';

// const IMAGE_WIDTH = 3229;
const IMAGE_HEIGHT = 400;

const styles = StyleSheet.create({
  touchpad: {
    backgroundColor: '#e5e5e5',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    height: IMAGE_HEIGHT,
  },
});

class GestureView extends React.Component {
  state = {
    scale: 1,
  }

  componentDidMount() {
    const mc = this.props.hammer;
    mc.add(new Hammer.Pinch());
    // FIXME: Debounce setting state and/or apply animation here
    mc.on('pinchmove', e => this.setState({ scale: Math.max(this.state.scale * e.scale, 1) }));
  }

  render() {
    const connectEventHandlers = this.props.connectEventHandlers;
    const localStyles = StyleSheet.create({
      transformed: {
        transform: [
          { scale: this.state.scale },
        ],
      },
    });
    return connectEventHandlers(
      <View style={styles.touchpad}>
        <Image
          style={[styles.image, localStyles.transformed]}
          resizeMode={'cover'}
          source={image}
        />
      </View>,
    );
  }
}

export default injectHammer(GestureView);
