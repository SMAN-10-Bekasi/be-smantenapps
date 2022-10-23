const Qrcode = require("../models/qrcode");

exports.validateQrcode = async (qrcodeInput) => {
  const qrcode = await Qrcode.findOne();
  if (qrcode.qrcode != qrcodeInput)
    return {
      success: false,
      message: "Qrcode doesn't match!",
    };

  return {
    success: true,
    message: "Qrcode match, you are present today",
  };
};
