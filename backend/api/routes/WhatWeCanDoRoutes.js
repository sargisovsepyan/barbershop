'use strict';

module.exports = function(app) {
	var capabilityController = require('../controllers/WhatWeCanDoController');
	var adminAuth = require('../middleware/adminAuth');

	app.route('/WhatWeCanDo')
		.get(capabilityController.list_all_tasks)
		.post(adminAuth.requireAdmin, capabilityController.create_a_task);

	app.route('/WhatWeCanDo/:taskId')
		.get(capabilityController.read_a_task)
		.put(adminAuth.requireAdmin, capabilityController.update_a_task)
		.delete(adminAuth.requireAdmin, capabilityController.delete_a_task);
};
