import noop from 'lodash.noop';
import clone from 'lodash.clone';

/**
 * create an touch point
 * @constructor
 * @param target
 * @param identifier
 * @param pos
 * @param deltaX
 * @param deltaY
 * @returns {Object} touchPoint
 */
class Touch {
  constructor(target, identifier, pos, deltaX = 0, deltaY = 0) {
    this.identifier = identifier;
    this.target = target;
    this.clientX = pos.locationX + deltaX;
    this.clientY = pos.locationY + deltaY;
    this.screenX = pos.locationX + deltaX;
    this.screenY = pos.locationY + deltaY;
    this.pageX = pos.locationX + deltaX;
    this.pageY = pos.locationY + deltaY;
  }
}

/**
 * create empty touchlist with the methods
 * @constructor
 * @returns touchList
 */
class TouchList {
  constructor() {
    const touchList = [];

    touchList.item = index => this[index] || null;

    // specified by Mozilla
    touchList.identifiedTouch = id => this[id + 1] || null;

    return touchList;
  }
}

/**
 * Simple trick to fake touch event support
 * this is enough for most libraries like Modernizr and Hammer
 */
function fakeTouchSupport() {
  const objs = [window, document.documentElement];
  const props = ['ontouchstart', 'ontouchmove', 'ontouchcancel', 'ontouchend'];

  for (let o = 0; o < objs.length; o += 1) {
    for (let p = 0; p < props.length; p += 1) {
      if (objs[o] && objs[o][props[p]] === undefined) {
        objs[o][props[p]] = null;
      }
    }
  }
}

class TouchSession {
  static multiTouchOffset = 75;
  multiTouchStartPos = {};

  constructor(isMultiTouch, multiTouchStartPos) {
    this.isMultiTouch = isMultiTouch;
    this.multiTouchStartPos = multiTouchStartPos;
  }

  /**
   * create a touchList based on the mouse event
   * @param mouseEv
   * @returns {TouchList}
   */
  createTouchList(mouseEv) {
    if (this.isMultiTouch) {
      return mouseEv.touches.map(touch => new Touch(mouseEv.target, touch.identifier, touch, 0, 0));
    }
    return [new Touch(mouseEv.target, 1, mouseEv, 0, 0)];
  }

  /**
   * receive all active touches
   * @param mouseEv
   * @returns {TouchList}
   */
  getActiveTouches(mouseEv, eventName) {
    // empty list
    if (mouseEv.type === 'touchend') {
      return new TouchList();
    }

    const touchList = this.createTouchList(mouseEv);
    if (this.isMultiTouch && mouseEv.type !== 'touchend' && eventName === 'touchend') {
      touchList.splice(1, 1);
    }
    return touchList;
  }

  /**
   * receive a filtered set of touches with only the changed pointers
   * @param mouseEv
   * @param eventName
   * @returns {TouchList}
   */
  getChangedTouches(mouseEv, eventName) {
    const touchList = this.createTouchList(mouseEv);

    // we only want to return the added/removed item on multitouch
    // which is the second pointer, so remove the first pointer from the touchList
    //
    // but when the mouseEv.type is mouseup, we want to send all touches because then
    // no new input will be possible
    if (this.isMultiTouch && mouseEv.type !== 'touchend' &&
      (eventName === 'touchstart' || eventName === 'touchend')) {
      touchList.splice(0, 1);
    }

    return touchList;
  }
}

let currentTouchSession;

/**
 * build a touch event
 * @param eventName
 * @param mouseEv
 */
function buildTouchEvent(eventName, mouseEv) {
  if (eventName === 'touchstart') {
    const isMultiTouch = mouseEv.touches.length >= 2;
    const multiTouchStartPos = {
      pageX: mouseEv.screenX,
      pageY: mouseEv.screenY,
      clientX: mouseEv.clientX,
      clientY: mouseEv.clientY,
      screenX: mouseEv.screenX,
      screenY: mouseEv.screenY,
    };
    // FIXME: remove dead vars
    currentTouchSession = new TouchSession(isMultiTouch, multiTouchStartPos);
  }

  const touchEvent = clone(mouseEv);
  touchEvent.eventName = eventName;
  touchEvent.preventDefault = noop;

  touchEvent.altKey = mouseEv.altKey;
  touchEvent.ctrlKey = mouseEv.ctrlKey;
  touchEvent.metaKey = mouseEv.metaKey;
  touchEvent.shiftKey = mouseEv.shiftKey;

  touchEvent.touches = currentTouchSession.getActiveTouches(mouseEv, eventName);
  touchEvent.targetTouches = currentTouchSession.getActiveTouches(mouseEv, eventName);
  touchEvent.changedTouches = currentTouchSession.getChangedTouches(mouseEv, eventName);

  if (eventName === 'touchend') {
    currentTouchSession = null;
  }

  return touchEvent;
}

export { fakeTouchSupport };
export { buildTouchEvent };
