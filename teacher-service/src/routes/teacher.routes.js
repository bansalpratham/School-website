const express = require('express');
const teacherController = require('../controllers/teacher.controller');

const router = express.Router();

router.post('/', teacherController.create);
router.get('/', teacherController.list);
router.get('/:id', teacherController.getById);
router.put('/:id', teacherController.update);
router.patch('/:id/status', teacherController.patchStatus);
router.delete('/:id', teacherController.remove);

module.exports = router;
