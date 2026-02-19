const { apiResponse } = require('../utils/apiResponse');
const {
  createFee,
  listFees,
  getFeesByStudentId,
  applyPayment,
  getSummary
} = require('../services/fee.service');

const { createFeeDto } = require('../dto/create-fee.dto');
const { payFeeDto } = require('../dto/pay-fee.dto');

async function create(req, res, next) {
  try {
    const payload = await createFeeDto.validateAsync(req.body, { abortEarly: true, stripUnknown: true });
    const fee = await createFee(payload);
    return res.status(201).json(apiResponse(true, 'Fee record created', fee));
  } catch (err) {
    return next(err);
  }
}

async function list(req, res, next) {
  try {
    const { page, limit, status, studentId } = req.query;
    const result = await listFees({ page, limit, status, studentId });
    return res.status(200).json(apiResponse(true, 'Fees fetched', result.items, result.meta));
  } catch (err) {
    return next(err);
  }
}

async function getByStudent(req, res, next) {
  try {
    const items = await getFeesByStudentId(req.params.studentId);
    return res.status(200).json(apiResponse(true, 'Fees fetched', items));
  } catch (err) {
    return next(err);
  }
}

async function pay(req, res, next) {
  try {
    const payload = await payFeeDto.validateAsync(req.body, { abortEarly: true, stripUnknown: true });
    const updated = await applyPayment(req.params.id, payload.amount);
    return res.status(200).json(apiResponse(true, 'Payment applied', updated));
  } catch (err) {
    return next(err);
  }
}

async function summary(req, res, next) {
  try {
    const data = await getSummary();
    return res.status(200).json(apiResponse(true, 'Summary fetched', data));
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  create,
  list,
  getByStudent,
  pay,
  summary
};
