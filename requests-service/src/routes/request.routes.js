const express = require('express');
const requestController = require('../controllers/request.controller');

const router = express.Router();

router.post('/', requestController.create);
router.get('/', requestController.list);
router.patch('/:id/approve', requestController.approve);
router.patch('/:id/reject', requestController.reject);

module.exports = router;
