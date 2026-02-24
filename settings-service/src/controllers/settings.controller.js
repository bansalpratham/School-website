const settingsService = require("../services/settings.service");

exports.getProfile = async (req, res) => {
  const data = await settingsService.getProfile(req.user.userId);
  res.json({ success: true, data });
};

exports.updateProfile = async (req, res) => {
  const data = await settingsService.updateProfile(req.user.userId, req.body);
  res.json({ success: true, message: "Profile updated", data });
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  await settingsService.changePassword(
    req.user.userId,
    currentPassword,
    newPassword
  );

  res.json({ success: true, message: "Password updated" });
};

exports.getNotifications = async (req, res) => {
  const data = await settingsService.getNotifications(req.user.userId);
  res.json({ success: true, data });
};

exports.updateNotifications = async (req, res) => {
  const data = await settingsService.updateNotifications(req.user.userId, req.body);
  res.json({ success: true, message: "Preferences updated", data });
};

exports.getSchool = async (req, res) => {
  const data = await settingsService.getSchool();
  res.json({ success: true, data });
};

exports.updateSchool = async (req, res) => {
  const data = await settingsService.updateSchool(req.body);
  res.json({ success: true, message: "School updated", data });
};