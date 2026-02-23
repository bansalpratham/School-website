const express = require('express');
const attendanceController = require('../controllers/attendance.controller');

const router = express.Router();

router.post('/', attendanceController.createBulk);
router.get('/', attendanceController.list);
router.get('/class/:className', attendanceController.getByClass);

module.exports = router;
