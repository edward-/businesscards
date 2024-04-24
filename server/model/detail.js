let mongoose = require("mongoose");

const detailSchema = new mongoose.Schema({
  company: String,
  position: String,
  description: String,
  userId: String,
});

module.exports = mongoose.model("Detail", detailSchema);
