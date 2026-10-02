'use strict';

module.exports = function(app) {
	var galleryController = require('../controllers/galleryController');
	var adminAuth = require('../middleware/adminAuth');

	app.route('/gallery')
		.get(galleryController.list_all_tasks)
		.post(adminAuth.requireAdmin, galleryController.create_a_task);

	app.route('/gallery/:taskId')
		.get(galleryController.read_a_task)
		.put(adminAuth.requireAdmin, galleryController.update_a_task)
		.delete(adminAuth.requireAdmin, galleryController.delete_a_task);
};
