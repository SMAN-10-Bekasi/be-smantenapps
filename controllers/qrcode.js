const Student = require("../models/student");
const Qrcode = require("../models/qrcode");

exports.getQrcode = async (req, res) => {
  if (!req.student) {
    return res.json({ success: false, message: "unauthorized access!" });
  }

  const student = await Student.findOne({ nisn: req.query.nisn }).populate({
    path: "classroom",
    populate: {
      path: "homeroomteacher",
    },
  });

  const updatePresence = await Student.updateOne(
    { nisn: req.query.nisn },
    { $push: { presence: { desc: "present" } } }
  );

  if (!student)
    return res.json({
      success: false,
      message: "student not found, with the given username",
    });

  const qrcode = await Qrcode.findOne();
  if (qrcode.qrcode != req.query.qrcode)
    return res.json({
      success: false,
      message: "Qrcode doesn't match!",
    });

  return res.json({
    success: true,
    message: "Qrcode match, you are present today",
  });
};
