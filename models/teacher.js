const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    nip: { type: String, required: true },
    password: { type: String, required: true },
    classroom: { type: mongoose.Schema.Types.ObjectId },
    gender: String,
    religion: String,
    phonenumber: String,
    birthdate: { type: mongoose.Schema.Types.Date },
    address: String,
  },
  { collection: "teachers" }
);

module.exports = mongoose.model("Teacher", teacherSchema);
