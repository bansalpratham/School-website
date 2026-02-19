const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    priority: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], required: true, index: true },
    audience: { type: String, enum: ['ALL', 'STUDENTS', 'PARENTS'], required: true, index: true },
    status: { type: String, enum: ['PUBLISHED', 'SCHEDULED'], required: true, index: true }
  },
  { timestamps: true }
);

announcementSchema.index({ status: 1, priority: 1, createdAt: -1 });

module.exports = mongoose.model('Announcement', announcementSchema);
