const { apiResponse } = require('../utils/apiResponse');
const {
  createResult,
  listResults,
  getResultsByStudentId
} = require('../services/result.service');

const { createResultDto } = require('../dto/create-result.dto');

async function create(req, res, next) {
  try {
    const payload = await createResultDto.validateAsync(req.body, { abortEarly: true, stripUnknown: true });
    const result = await createResult(payload);
    return res.status(201).json(apiResponse(true, 'Result created', result));
  } catch (err) {
    return next(err);
  }
}

async function list(req, res, next) {
  try {
    const { page, limit, studentId, examName, subject, status } = req.query;
    const result = await listResults({ page, limit, studentId, examName, subject, status });
    return res.status(200).json(apiResponse(true, 'Results fetched', result.items, result.meta));
  } catch (err) {
    return next(err);
  }
}

async function getByStudent(req, res, next) {
  try {
    const items = await getResultsByStudentId(req.params.studentId);
    return res.status(200).json(apiResponse(true, 'Results fetched', items));
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  create,
  list,
  getByStudent
};
