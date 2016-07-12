import noop from 'lodash.noop';
import clone from 'lodash.clone';
import Hammer from './hammer';
import { fakeTouchSupport, buildTouchEvent } from './touch-emulator';

fakeTouchSupport();

class GestureRecognizer {
  constructor() {
    this.touchHandlers = {
      onStartShouldSetResponder: this.onStartShouldSetResponder,
      onMoveShouldSetResponder: this.onMoveShouldSetResponder,
      onResponderGrant: this.onResponderGrant,
      onResponderReject: this.onResponderReject,
      onResponderMove: this.onResponderMove,
      onResponderRelease: this.onResponderRelease,
      onResponderTerminationRequest: this.onResponderTerminationRequest,
      onResponderTerminate: this.onResponderTerminate,
    };

    this.eventHandlers = {
      touchstart: noop,
      touchmove: noop,
      touchend: noop,
      touchcancel: noop,
    };

    this.fakeElement = {
      addEventListener: (type, handler) => {
        this.eventHandlers[type] = (e) => handler(this.buildHammerEvent(type, e));
      },
    };

    this.hammerManager = new Hammer.Manager(this.fakeElement);
  }

  buildHammerEvent(type, e) {
    const event = clone(e);
    event.type = type;
    event.x = event.clientX = event.screenX = event.locationX = event.nativeEvent.locationX;
    event.y = event.clientY = event.screenY = event.locationY = event.nativeEvent.locationY;
    event.touches = event.nativeEvent.touches;
    event.target = this.fakeElement;
    return buildTouchEvent(type, event);
  }

  onStartShouldSetResponder = () => true;

  onMoveShouldSetResponder = () => true;

  onResponderGrant = e => {
    this.eventHandlers.touchstart(e);
  };

  onResponderReject = e => {
    this.eventHandlers.touchcancel(e);
  };

  onResponderMove = e => {
    this.eventHandlers.touchmove(e);
  };

  onResponderRelease = e => {
    this.eventHandlers.touchend(e);
  };
}

export default GestureRecognizer;
