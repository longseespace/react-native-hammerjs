import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  touchpad: {
    backgroundColor: '#e5e5e5',
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0
  },
  button: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    width: 100,
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 30,
    textAlign: 'center'
  },
});

export const injectGoBackButton = (Component) => ({ goBack, ...props }) => (
  <View style={styles.touchpad}>
    <Component {...props} />
    <TouchableHighlight style={styles.button} onPress={goBack}>
      <Text style={styles.buttonText}>Back</Text>
    </TouchableHighlight>
  </View>
)
