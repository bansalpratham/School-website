const express = require('express');
const announcementController = require('../controllers/announcement.controller');

const router = express.Router();

router.post('/', announcementController.create);
router.get('/', announcementController.list);
router.patch('/:id/status', announcementController.patchStatus);

module.exports = router;
