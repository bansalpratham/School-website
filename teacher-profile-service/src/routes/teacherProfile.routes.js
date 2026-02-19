const express = require('express');
const teacherProfileController = require('../controllers/teacherProfile.controller');

const router = express.Router();

router.get('/:id', teacherProfileController.getById);
router.patch('/:id', teacherProfileController.patch);

module.exports = router;
