const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    jobdesk: { type: String, required: true },
    avatar: { type: String },
  },
  { collection: "developer" }
);

module.exports = mongoose.model("Developer", developerSchema);
