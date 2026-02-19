const Result = require('../models/result.model');

async function createResult(payload) {
  const created = await Result.create(payload);
  return created;
}

async function listResults({ page = 1, limit = 10, studentId, examName, subject, status }) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);

  const filter = {};
  if (studentId) filter.studentId = String(studentId).trim();
  if (examName) filter.examName = String(examName).trim();
  if (subject) filter.subject = String(subject).trim();
  if (status) filter.status = status;

  const skip = (safePage - 1) * safeLimit;

  const [items, total] = await Promise.all([
    Result.find(filter).sort({ createdAt: -1 }).skip(skip).limit(safeLimit).lean(),
    Result.countDocuments(filter)
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

async function getResultsByStudentId(studentId) {
  const sid = String(studentId || '').trim();
  if (!sid) {
    const err = new Error('studentId is required');
    err.statusCode = 400;
    throw err;
  }

  const items = await Result.find({ studentId: sid }).sort({ createdAt: -1 }).lean();
  return items;
}

module.exports = {
  createResult,
  listResults,
  getResultsByStudentId
};
