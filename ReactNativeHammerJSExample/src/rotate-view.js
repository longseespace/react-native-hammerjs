import React from 'react';
import { Hammer, injectHammer } from 'react-native-hammerjs';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';

const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = 400;

const styles = StyleSheet.create({
  touchpad: {
    backgroundColor: '#e5e5e5',
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0
  },
  image: {
    height: IMAGE_HEIGHT
  }
});

class GestureView extends React.Component {
  state = {
    rotate: 0,
  }

  componentDidMount() {
    const mc = this.props.hammer;
    mc.add( new Hammer.Rotate() );
    mc.on('rotatemove', e => this.setState({ rotate: e.rotation }));
  }

  render() {
    const connectEventHandlers = this.props.connectEventHandlers;
    const localStyles = StyleSheet.create({
      transformed: {
        transform: [
          { rotate: `${this.state.rotate}deg` }
        ]
      }
    });
    return connectEventHandlers(
      <View style={styles.touchpad}>
        <Image
          style={[styles.image, localStyles.transformed]}
          resizeMode='cover'
          source={require('./ww.jpg')}
        />
      </View>
    );
  }
};

export default injectHammer(GestureView);
