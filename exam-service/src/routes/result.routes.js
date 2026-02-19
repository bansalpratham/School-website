const express = require('express');
const resultController = require('../controllers/result.controller');

const router = express.Router();

router.post('/', resultController.create);
router.get('/', resultController.list);
router.get('/student/:studentId', resultController.getByStudent);

module.exports = router;
