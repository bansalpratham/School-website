const express = require('express');
const paymentController = require('../controllers/payment.controller');

const router = express.Router();

router.post('/', paymentController.create);
router.get('/', paymentController.list);
router.get('/student/:studentId', paymentController.getByStudent);

module.exports = router;
