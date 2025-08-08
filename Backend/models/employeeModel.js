const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  contact: Number,
  designation: String,
});

module.exports = mongoose.model("Employee", schema);
