const express = require('express');
const timetableController = require('../controllers/timetable.controller');

const router = express.Router();

router.post('/', timetableController.create);
router.get('/:teacherId', timetableController.getByTeacher);
router.patch('/:id', timetableController.patch);
router.delete('/:id', timetableController.remove);

module.exports = router;
