'use strict';

module.exports = function(app) {
	
	var bookList = require('../controllers/bookController');

	// todoList Routes
		app.route('/book')
		.get(bookList.list_all_books)
		.post(bookList.create_a_book);
		

		app.route('/book/:bookId')
		.delete(bookList.delete_a_task);
		// .get(bookList.read_a_book)
		// .put(bookList.update_a_book)
		
};
