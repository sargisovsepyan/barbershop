'use strict';

module.exports = function(app) {
	var todoList = require('../controllers/WhatWeCanDoController');

	// todoList Routes
	app.route('/WhatWeCanDo')
		.get(todoList.list_all_tasks)
		.post(todoList.create_a_task);

	app.route('/WhatWeCanDo/:taskId')
		.get(todoList.read_a_task)
		.put(todoList.update_a_task)
		.delete(todoList.delete_a_task);

		
		
		

};
