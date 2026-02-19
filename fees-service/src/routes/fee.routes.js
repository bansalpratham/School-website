const express = require('express');
const feeController = require('../controllers/fee.controller');

const router = express.Router();

router.post('/', feeController.create);
router.get('/', feeController.list);
router.get('/student/:studentId', feeController.getByStudent);
router.patch('/:id/pay', feeController.pay);
router.get('/summary', feeController.summary);

module.exports = router;
