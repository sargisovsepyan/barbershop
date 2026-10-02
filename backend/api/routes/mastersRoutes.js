'use strict';

module.exports = function(app) {
	var mastersController = require('../controllers/mastersController');
	var adminAuth = require('../middleware/adminAuth');

	app.route('/masters')
		.get(mastersController.list_all_tasks)
		.post(adminAuth.requireAdmin, mastersController.create_a_task);

	app.route('/masters/:taskId')
		.get(mastersController.read_a_task)
		.put(adminAuth.requireAdmin, mastersController.update_a_task)
		.delete(adminAuth.requireAdmin, mastersController.delete_a_task);
};
