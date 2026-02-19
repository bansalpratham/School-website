const { apiResponse } = require('../utils/apiResponse');
const {
  createAnnouncement,
  listAnnouncements,
  updateAnnouncementStatus
} = require('../services/announcement.service');

const { createAnnouncementDto } = require('../dto/create-announcement.dto');
const { updateStatusDto } = require('../dto/update-announcement.dto');

async function create(req, res, next) {
  try {
    const payload = await createAnnouncementDto.validateAsync(req.body, {
      abortEarly: true,
      stripUnknown: true
    });

    const announcement = await createAnnouncement(payload);
    return res.status(201).json(apiResponse(true, 'Announcement created', announcement));
  } catch (err) {
    return next(err);
  }
}

async function list(req, res, next) {
  try {
    const { page, limit, audience, priority, status } = req.query;
    const result = await listAnnouncements({ page, limit, audience, priority, status });
    return res.status(200).json(apiResponse(true, 'Announcements fetched', result.items, result.meta));
  } catch (err) {
    return next(err);
  }
}

async function patchStatus(req, res, next) {
  try {
    const payload = await updateStatusDto.validateAsync(req.body, {
      abortEarly: true,
      stripUnknown: true
    });

    const updated = await updateAnnouncementStatus(req.params.id, payload.status);
    return res.status(200).json(apiResponse(true, 'Announcement status updated', updated));
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  create,
  list,
  patchStatus
};
