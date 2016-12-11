import React from 'react';
import GestureRecognizer from './gesture-recognizer';

/* eslint-disable no-unused-vars */
const injectEventHandlers = eventHandlers => element => React.cloneElement(element, eventHandlers);

const injectHammer = OuterComponent => class extends React.Component {
  gestureRecognizer = new GestureRecognizer();

  render() {
    return (
      <OuterComponent
        {...this.props}
        connectEventHandlers={injectEventHandlers(this.gestureRecognizer.touchHandlers)}
        hammer={this.gestureRecognizer.hammerManager}
      />
    );
  }
};

export { injectHammer };
export default injectHammer;
