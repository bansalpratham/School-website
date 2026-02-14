const mongoose = require('mongoose');
const Student = require('../models/student.model');

function httpError(statusCode, message) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

function ensureObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw httpError(400, 'Invalid student id');
  }
}

async function createStudent(payload) {
  const created = await Student.create(payload);
  return created;
}

async function listStudents({ page = 1, limit = 10, search = '', className = '' }) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);

  const filter = {
    status: { $in: ['ACTIVE', 'INACTIVE'] }
  };

  if (className) {
    filter.className = className;
  }

  if (search) {
    const q = String(search).trim();
    if (q) {
      filter.$or = [
        { firstName: { $regex: q, $options: 'i' } },
        { lastName: { $regex: q, $options: 'i' } },
        { className: { $regex: q, $options: 'i' } }
      ];
    }
  }

  const skip = (safePage - 1) * safeLimit;

  const [items, total] = await Promise.all([
    Student.find(filter).sort({ createdAt: -1 }).skip(skip).limit(safeLimit).lean(),
    Student.countDocuments(filter)
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

async function getStudentById(id) {
  ensureObjectId(id);

  const student = await Student.findById(id).lean();
  if (!student) throw httpError(404, 'Student not found');
  return student;
}

async function updateStudent(id, payload) {
  ensureObjectId(id);

  const updated = await Student.findByIdAndUpdate(id, { $set: payload }, { new: true, runValidators: true }).lean();
  if (!updated) throw httpError(404, 'Student not found');
  return updated;
}

async function updateStudentStatus(id, status) {
  ensureObjectId(id);

  const updated = await Student.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true, runValidators: true }
  ).lean();

  if (!updated) throw httpError(404, 'Student not found');
  return updated;
}

async function softDeleteStudent(id) {
  return updateStudentStatus(id, 'INACTIVE');
}

module.exports = {
  createStudent,
  listStudents,
  getStudentById,
  updateStudent,
  updateStudentStatus,
  softDeleteStudent
};
