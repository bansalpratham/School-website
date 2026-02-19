const Joi = require('joi');

const updateStatusDto = Joi.object({
  status: Joi.string().valid('PUBLISHED', 'SCHEDULED').required()
});

module.exports = { updateStatusDto };
