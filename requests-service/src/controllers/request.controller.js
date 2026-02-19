const { apiResponse } = require('../utils/apiResponse');
const {
  createRequest,
  listRequests,
  approveRequest,
  rejectRequest
} = require('../services/request.service');

const { createRequestDto } = require('../dto/create-request.dto');

async function create(req, res, next) {
  try {
    const payload = await createRequestDto.validateAsync(req.body, { abortEarly: true, stripUnknown: true });
    const created = await createRequest(payload);
    return res.status(201).json(apiResponse(true, 'Request created', created));
  } catch (err) {
    return next(err);
  }
}

async function list(req, res, next) {
  try {
    const { page, limit, userId, type, status } = req.query;
    const result = await listRequests({ page, limit, userId, type, status });
    return res.status(200).json(apiResponse(true, 'Requests fetched', result.items, result.meta));
  } catch (err) {
    return next(err);
  }
}

async function approve(req, res, next) {
  try {
    const updated = await approveRequest(req.params.id);
    return res.status(200).json(apiResponse(true, 'Request approved', updated));
  } catch (err) {
    return next(err);
  }
}

async function reject(req, res, next) {
  try {
    const updated = await rejectRequest(req.params.id);
    return res.status(200).json(apiResponse(true, 'Request rejected', updated));
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  create,
  list,
  approve,
  reject
};
