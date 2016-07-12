import React from 'react';
import { Hammer, injectHammer } from 'react-native-hammerjs';
import {
  StyleSheet,
  View,
  Image,
  Text,
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
  pagination: {
    fontSize: 50,
    color: 'gray',
    textAlign: 'center'
  },
  active: {
    color: 'red'
  }
});

const IMAGES = [
  require('./pano-1.jpg'),
  require('./pano-2.jpg'),
  require('./pano-3.jpg'),
];

class GestureView extends React.Component {
  state = {
    imgIndex: 0,
  }

  componentDidMount() {
    const mc = this.props.hammer;
    mc.add( new Hammer.Swipe() );
    mc.on('swipeleft', () => this.setState({
      imgIndex: (this.state.imgIndex + 1) % IMAGES.length
    }));
    mc.on('swiperight', () => this.setState({
      imgIndex: (this.state.imgIndex - 1 + IMAGES.length) % IMAGES.length
    }));
  }

  render() {
    const connectEventHandlers = this.props.connectEventHandlers;
    return connectEventHandlers(
      <View style={styles.touchpad}>
        <Image
          style={styles.image}
          resizeMode='cover'
          source={IMAGES[this.state.imgIndex]}
        />
        <Text style={styles.pagination}>
          <Text style={this.state.imgIndex === 0 && styles.active}>1</Text>
          <Text style={this.state.imgIndex === 1 && styles.active}>2</Text>
          <Text style={this.state.imgIndex === 2 && styles.active}>3</Text>
        </Text>
      </View>
    );
  }
};

export default injectHammer(GestureView);
