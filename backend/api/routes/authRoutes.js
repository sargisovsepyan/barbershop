'use strict';

module.exports = function (app) {
  const adminAuth = require('../middleware/adminAuth');

  app.route('/auth/login')
    .post(adminAuth.login);
};
