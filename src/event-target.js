class EventTarget {
  listeners = {};

  addEventListener = (type, callback) => {
    if (!(type in this.listeners)) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
  }

  removeEventListener = (type, callback) => {
    if (!(type in this.listeners)) {
      return false;
    }
    const stack = this.listeners[type];
    for (let i = 0, l = stack.length; i < l; i += 1) {
      if (stack[i] === callback) {
        stack.splice(i, 1);
        return this.removeEventListener(type, callback);
      }
    }
    return true;
  }

  dispatchEvent = (event) => {
    if (!(event.type in this.listeners)) {
      return;
    }
    const stack = this.listeners[event.type];
    // eslint-disable-next-line
    event.target = this;
    for (let i = 0, l = stack.length; i < l; i += 1) {
      stack[i].call(this, event);
    }
  }
}

export default EventTarget;
