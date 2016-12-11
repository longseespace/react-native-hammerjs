import clone from 'lodash.clone';
import Hammer from './hammer';
import { fakeTouchSupport, buildTouchEvent } from './touch-emulator';
import EventTarget from './event-target';

fakeTouchSupport();

function buildHammerEvent(type, target, e) {
  const event = clone(e.nativeEvent);
  event.type = type;
  event.x = event.clientX = event.screenX = event.locationX;
  event.y = event.clientY = event.screenY = event.locationY;
  event.target = target;
  return buildTouchEvent(type, event);
}

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

    this.fakeElement = new EventTarget();

    this.hammerManager = new Hammer.Manager(this.fakeElement, {
      touchAction: 'compute',
      inputClass: Hammer.TouchInput,
    });
  }

  onStartShouldSetResponder = () => true;

  onMoveShouldSetResponder = () => true;

  onResponderGrant = (e) => {
    this.fakeElement.dispatchEvent(buildHammerEvent('touchstart', this.fakeElement, e));
  };

  onResponderReject = (e) => {
    this.fakeElement.dispatchEvent(buildHammerEvent('touchcancel', this.fakeElement, e));
  };

  onResponderMove = (e) => {
    this.fakeElement.dispatchEvent(buildHammerEvent('touchmove', this.fakeElement, e));
  };

  onResponderRelease = (e) => {
    this.fakeElement.dispatchEvent(buildHammerEvent('touchend', this.fakeElement, e));
  };
}

export default GestureRecognizer;
