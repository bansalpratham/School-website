const bcrypt = require("bcryptjs");
const Admin = require("../models/admin.model");
const Notification = require("../models/notification.model");
const School = require("../models/school.model");

const axios = require("axios");

exports.getProfile = async (userId) => {
  const response = await axios.get(
    `http://localhost:5000/api/auth/user/${userId}`
  );

  return response.data.data;
};

exports.updateProfile = async (userId, updateData) => {
  const response = await axios.put(
    `http://localhost:5000/api/auth/user/${userId}`,
    updateData
  );

  return response.data.data;
};

exports.changePassword = async (userId, currentPassword, newPassword) => {
  await axios.put(
    `http://localhost:5000/api/auth/change-password/${userId}`,
    {
      currentPassword,
      newPassword
    }
  );
};

exports.getNotifications = async (adminId) => {
  let prefs = await Notification.findOne({ adminId });

  if (!prefs) {
    prefs = await Notification.create({ adminId });
  }

  return prefs;
};

exports.updateNotifications = async (adminId, data) => {
  return Notification.findOneAndUpdate(
    { adminId },
    data,
    { new: true, upsert: true }
  );
};

exports.getSchool = async () => {
  return School.findOne();
};

exports.updateSchool = async (data) => {
  let school = await School.findOne();

  if (!school) {
    school = await School.create(data);
  } else {
    school = await School.findByIdAndUpdate(school._id, data, { new: true });
  }

  return school;
};