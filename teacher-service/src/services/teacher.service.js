const mongoose = require('mongoose');
const Teacher = require('../models/teacher.model');

function httpError(statusCode, message) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

function ensureObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw httpError(400, 'Invalid teacher id');
  }
}

async function createTeacher(payload) {
  const created = await Teacher.create(payload);
  return created;
}

async function listTeachers({ page = 1, limit = 10, search = '' }) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);

  const filter = {
    status: { $in: ['ACTIVE', 'INACTIVE'] }
  };

  if (search) {
    const q = String(search).trim();
    if (q) {
      filter.$or = [
        { firstName: { $regex: q, $options: 'i' } },
        { lastName: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { subjects: { $elemMatch: { $regex: q, $options: 'i' } } }
      ];
    }
  }

  const skip = (safePage - 1) * safeLimit;

  const [items, total] = await Promise.all([
    Teacher.find(filter).sort({ createdAt: -1 }).skip(skip).limit(safeLimit).lean(),
    Teacher.countDocuments(filter)
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

async function getTeacherById(id) {
  ensureObjectId(id);

  const teacher = await Teacher.findById(id).lean();
  if (!teacher) throw httpError(404, 'Teacher not found');
  return teacher;
}

async function updateTeacher(id, payload) {
  ensureObjectId(id);

  const updated = await Teacher.findByIdAndUpdate(id, { $set: payload }, { new: true, runValidators: true }).lean();
  if (!updated) throw httpError(404, 'Teacher not found');
  return updated;
}

async function updateTeacherStatus(id, status) {
  ensureObjectId(id);

  const updated = await Teacher.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true, runValidators: true }
  ).lean();

  if (!updated) throw httpError(404, 'Teacher not found');
  return updated;
}

async function softDeleteTeacher(id) {
  return updateTeacherStatus(id, 'INACTIVE');
}

module.exports = {
  createTeacher,
  listTeachers,
  getTeacherById,
  updateTeacher,
  updateTeacherStatus,
  softDeleteTeacher
};
