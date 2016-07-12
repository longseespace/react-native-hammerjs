import noop from 'lodash.noop';

document = {
  createElement: () => ({
    style: {},
  }),
};

window.ontouchstart = noop;

export default Hammer = require('hammerjs');
