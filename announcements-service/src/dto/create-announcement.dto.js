const Joi = require('joi');

const createAnnouncementDto = Joi.object({
  title: Joi.string().trim().max(200).required(),
  description: Joi.string().trim().max(5000).required(),
  priority: Joi.string().valid('HIGH', 'MEDIUM', 'LOW').required(),
  audience: Joi.string().valid('ALL', 'STUDENTS', 'PARENTS').required(),
  status: Joi.string().valid('PUBLISHED', 'SCHEDULED').required()
});

module.exports = { createAnnouncementDto };
