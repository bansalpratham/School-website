const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");

const app = express();

// Core Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Auth Service Running 🚀" });
});

app.use("/api/auth", authRoutes);

module.exports = app;
