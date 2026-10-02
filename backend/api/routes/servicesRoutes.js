'use strict';

module.exports = function(app) {
	var servicesController = require('../controllers/servicesController');
	var adminAuth = require('../middleware/adminAuth');

	app.route('/services')
		.get(servicesController.list_all_tasks)
		.post(adminAuth.requireAdmin, servicesController.create_a_task);

	app.route('/services/:taskId')
		.get(servicesController.read_a_task)
		.put(adminAuth.requireAdmin, servicesController.update_a_task)
		.delete(adminAuth.requireAdmin, servicesController.delete_a_task);
};
