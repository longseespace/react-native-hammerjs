import noop from 'lodash.noop';

document = {
  createElement: () => ({
    style: {},
    addEventListener: noop
  }),
};

window.ontouchstart = noop;
window.addEventListener= noop;

export default Hammer = require('hammerjs');
