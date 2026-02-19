const mongoose = require('mongoose');
const Announcement = require('../models/announcement.model');

function httpError(statusCode, message) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

function ensureObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw httpError(400, 'Invalid announcement id');
  }
}

async function createAnnouncement(payload) {
  const created = await Announcement.create(payload);
  return created;
}

async function listAnnouncements({ page = 1, limit = 10, audience, priority, status }) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);

  const filter = {};
  if (audience) filter.audience = audience;
  if (priority) filter.priority = priority;
  if (status) filter.status = status;

  const skip = (safePage - 1) * safeLimit;

  const [items, total] = await Promise.all([
    Announcement.find(filter).sort({ createdAt: -1 }).skip(skip).limit(safeLimit).lean(),
    Announcement.countDocuments(filter)
  ]);

  return {
    items,
    meta: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit)
    }
  };
}

async function updateAnnouncementStatus(id, status) {
  ensureObjectId(id);

  const updated = await Announcement.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true, runValidators: true }
  ).lean();

  if (!updated) throw httpError(404, 'Announcement not found');
  return updated;
}

module.exports = {
  createAnnouncement,
  listAnnouncements,
  updateAnnouncementStatus
};
