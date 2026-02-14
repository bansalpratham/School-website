const express = require('express');
const studentController = require('../controllers/student.controller');

const router = express.Router();

router.post('/', studentController.create);
router.get('/', studentController.list);
router.get('/:id', studentController.getById);
router.put('/:id', studentController.update);
router.patch('/:id/status', studentController.patchStatus);
router.delete('/:id', studentController.remove);

module.exports = router;
