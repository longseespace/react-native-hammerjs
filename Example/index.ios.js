/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import PanView from './src/pan-view';
import SwipeView from './src/swipe-view';
import TapView from './src/tap-view';
import DoubleTapView from './src/double-tap-view';
import PressView from './src/press-view';
import RotateView from './src/rotate-view';
import PinchView from './src/pinch-view';
import { injectGoBackButton } from './src/util';

const VIEWS = [{
  name: 'Pan',
  Component: injectGoBackButton(PanView),
}, {
  name: 'Swipe',
  Component: injectGoBackButton(SwipeView),
}, {
  name: 'Tap',
  Component: injectGoBackButton(TapView),
}, {
  name: 'DoubleTap',
  Component: injectGoBackButton(DoubleTapView),
}, {
  name: 'Press',
  Component: injectGoBackButton(PressView),
}, {
  name: 'Rotate',
  Component: injectGoBackButton(RotateView),
}, {
  name: 'Pinch',
  Component: injectGoBackButton(PinchView),
}];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderRadius: 3,
    width: 200,
    marginTop: 5, marginBottom: 5,
  },
  buttonText: {
    fontSize: 30,
    textAlign: 'center',
  },
});

class Example extends React.Component {
  state = {
    currentView: false,
  }
  renderButtons() {
    return VIEWS.map(({ name, Component }) => (
      <TouchableHighlight key={name} style={styles.button} onPress={this.showView(Component)}>
        <Text style={styles.buttonText}>{name}</Text>
      </TouchableHighlight>
    ));
  }
  showView = Component => () => this.setState({ currentView: Component });
  goBack = () => this.setState({ currentView: false });
  render() {
    const ExampleView = this.state.currentView;
    return (
      <View style={styles.container}>
        {
          !ExampleView && <View style={styles.buttonContainer}>
            {this.renderButtons()}
          </View>
        }
        {
          ExampleView && <ExampleView goBack={this.goBack} />
        }
      </View>
    );
  }
}

AppRegistry.registerComponent('Example', () => Example);
