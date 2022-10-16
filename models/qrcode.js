const mongoose = require("mongoose");

const qrcodeSchema = new mongoose.Schema(
  {
    qrcode: { type: String, required: true },
  },
  { collection: "qrcode" }
);

module.exports = mongoose.model("Qrcode", qrcodeSchema);
