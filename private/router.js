const moment        = require('moment');

const random        = function(length) {
  let l = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ0123456789';
  let t = l.length - 1;
  let c = '';
  while (c.length < length) {
    c += l.charAt(Math.round(Math.random() * t));
  }
  return c;
};


module.exports = router;