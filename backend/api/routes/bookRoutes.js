'use strict';

module.exports = function(app) {
  var bookingController = require('../controllers/bookController');
  var adminAuth = require('../middleware/adminAuth');

  app.route('/book')
    .get(adminAuth.requireAdmin, bookingController.list_all_books)
    .post(adminAuth.requireAdmin, bookingController.create_a_book);

  app.route('/book/:bookId')
    .delete(adminAuth.requireAdmin, bookingController.delete_a_book)
    .put(bookingController.update_a_book);

  app.route('/book/:dateOFC')
    .get(bookingController.read_a_book);
};
