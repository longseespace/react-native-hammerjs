# Hammer Native
[Hammer.JS](http://hammerjs.github.io) for React Native. HammerJS is a javascript library for multi-touch gestures.

[![Build Status](https://travis-ci.org/longseespace/react-native-hammerjs.svg?branch=master)](https://travis-ci.org/longseespace/react-native-hammerjs)
[![npm](https://img.shields.io/npm/v/npm.svg?maxAge=2592000)](https://www.npmjs.com/package/react-native-hammerjs)
[![hammer.js](https://img.shields.io/badge/hammer.js-v2.0.8-green.svg)](http://hammerjs.github.io)


## Installation
`npm install --save react-native-hammerjs`

## Usage

```jsx

import { Hammer, injectHammer } from 'react-native-hammerjs';

class YourComponent extends React.Component {
  componentDidMount() {
    const mc = this.props.hammer;
    mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );

    mc.on('pan', e => {
      console.log('pan', e);
    });
  }

  render() {
    const connectEventHandlers = this.props.connectEventHandlers;
    return connectEventHandlers(
      <View>
        <Content />
      </View>
    );
  }
}

export default injectHammer(YourComponent);
```

For more examples, check out [examples folder](https://github.com/longseespace/react-native-hammerjs/tree/master/ReactNativeHammerJSExample/src)

This module exposes:
1. `Hammer`: Hammer class as in `HammerJS`
2. `injectHammer`: A function that creates a [Higher Order Component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.kdny7yuwf) that wraps `YourComponent` and injects 2 props:
  - `hammer`: a [`Hammer.Manager`](http://hammerjs.github.io/api/#hammer.manager) object.
  - `connectEventHandlers`: a function connects native gesture responders with `Hammer.Manager` object.

## Contributing
PRs are welcome!
