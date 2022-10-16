const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema(
  {
    class: { type: String, required: true },
    homeroomteacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  { collection: "classes" }
);

module.exports = mongoose.model("Classroom", classroomSchema);
