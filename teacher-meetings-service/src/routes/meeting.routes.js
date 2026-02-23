const express = require('express');
const meetingController = require('../controllers/meeting.controller');

const router = express.Router();

router.post('/', meetingController.create);
router.get('/', meetingController.list);
router.get('/:teacherId', meetingController.listByTeacher);

module.exports = router;
