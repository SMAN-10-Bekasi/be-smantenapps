const Qrcode = require("../models/qrcode");

exports.validateQrcode = async (qrcodeInput) => {
  const qrcode = await Qrcode.findOne();
  if (qrcode.qrcode != qrcodeInput)
    return {
      success: false,
      message: "Qrcode tidak cocok!",
    };

  return {
    success: true,
    message: "Qrcode match, you are present today",
  };
};
