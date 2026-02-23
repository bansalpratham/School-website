const express = require('express');
const achievementController = require('../controllers/achievement.controller');

const router = express.Router();

router.post('/', achievementController.create);
router.get('/', achievementController.list);
router.get('/student/:studentId', achievementController.listByStudent);

module.exports = router;
