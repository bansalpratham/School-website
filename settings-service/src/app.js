const express = require("express");
const cors = require("cors");
require("dotenv").config();

const settingsRoutes = require("./routes/settings.routes.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/settings", settingsRoutes);

module.exports = app;