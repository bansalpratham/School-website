const express = require('express');
const feedbackController = require('../controllers/feedback.controller');

const router = express.Router();

router.post('/', feedbackController.create);
router.get('/', feedbackController.list);
router.get('/student/:studentId', feedbackController.getByStudent);

module.exports = router;
