const express = require('express');
const diaryController = require('../controllers/diary.controller');

const router = express.Router();

router.post('/', diaryController.create);
router.get('/', diaryController.list);
router.get('/class/:className', diaryController.getByClass);

module.exports = router;
