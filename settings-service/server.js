const mongoose = require("mongoose");
const app = require("./src/app.js");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Settings DB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`Settings Service running on ${process.env.PORT}`);
    });
  });