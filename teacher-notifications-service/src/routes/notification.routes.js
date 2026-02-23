const express = require('express');
const notificationController = require('../controllers/notification.controller');

const router = express.Router();

router.post('/', notificationController.create);
router.get('/:teacherId', notificationController.listByTeacher);
router.patch('/:id/read', notificationController.patchRead);

module.exports = router;
