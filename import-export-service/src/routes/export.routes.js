const express = require('express');
const exportController = require('../controllers/export.controller');

const router = express.Router();

router.get('/students', exportController.exportStudents);

module.exports = router;
