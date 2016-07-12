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
  image: {
    height: IMAGE_HEIGHT
  }
});

class GestureView extends React.Component {
  state = {
    translateX: 0,
  }

  componentDidMount() {
    const mc = this.props.hammer;
    mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );

    mc.on('pan', e => {
      const newX = Math.max(Math.min(this.state.translateX + e.deltaX, 0), -IMAGE_WIDTH);
      this.setState({
        translateX: newX
      });
    });
  }

  render() {
    const connectEventHandlers = this.props.connectEventHandlers;
    const localStyles = StyleSheet.create({
      transformed: {
        transform: [
          { translateX: this.state.translateX }
        ]
      }
    });
    return connectEventHandlers(
      <View style={styles.touchpad}>
        <Image
          style={[styles.image, localStyles.transformed]}
          resizeMode='cover'
          source={require('./pano-1.jpg')}
        />
      </View>
    );
  }
};

export default injectHammer(GestureView);
