const Student = require("../models/student");

const jwt = require("jsonwebtoken");
const { validateQrcode } = require("./qrcode");
exports.createStudent = async (req, res) => {
  const {
    fullname,
    nisn,
    nis,
    password,
    classroom,
    presence,
    isPresentToday,
    gender,
    religion,
    phonenumber,
    birthdate,
    address,
    avatar,
    fathername,
    fatherphonenumber,
    mothername,
    motherphonenumber,
    parentaddress,
  } = req.body;
  try {
    const student = await Student({
      fullname,
      nisn,
      nis,
      password,
      classroom,
      presence,
      isPresentToday,
      gender,
      religion,
      phonenumber,
      birthdate,
      address,
      avatar,
      fathername,
      fatherphonenumber,
      mothername,
      motherphonenumber,
      parentaddress,
    });
    await student.save();
    res.json(student);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.getStudentInfo = async (req, res) => {
  if (!req.student) {
    return res.json({ success: false, message: "unauthorized access!" });
  }
  let student;
  if (req.query.nisn != 0) {
    student = await Student.findOne({ nisn: req.query.nisn }).populate({
      path: "classroom",
      populate: {
        path: "homeroomteacher",
      },
    });
  } else {
    student = await Student.find();
    return res.json({ success: true, students: student });
  }

  if (!student)
    return res.json({
      success: false,
      message: "student not found, with the given username",
    });

  const studentInfo = {
    fullname: student.fullname,
    nisn: student.nisn,
    nis: student.nis,
    classroom: student.classroom,
    presence: student.presence,
    motherphonenumber: student.motherphonenumber,
    avatar: student.avatar ? student.avatar : "",
  };

  return res.json({ success: true, student: studentInfo });
};

exports.studentSignIn = async (req, res) => {
  const { nisn, password } = req.body;
  const student = await Student.findOne({ nisn }).populate({
    path: "classroom",
    populate: {
      path: "homeroomteacher",
    },
  });

  if (!student)
    return res.json({
      success: false,
      message: "student not found, with the given username",
    });

  const isMatch = await student.comparePassword(password);

  if (!isMatch)
    return res.json({
      success: false,
      message: "username / password does not match!",
    });

  const token = jwt.sign({ userId: student._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  const studentInfo = {
    fullname: student.fullname,
    nisn: student.nisn,
    nis: student.nis,
    classroom: student.classroom,
    avatar: student.avatar ? student.avatar : "",
  };

  res.json({ success: true, student: studentInfo, token });
};

exports.studentPresent = async (req, res) => {
  const { nisn, qrcode } = req.body;

  if (!req.student) {
    return res.json({ success: false, message: "unauthorized access!" });
  }

  const student = await Student.findOne({ nisn: nisn }).populate({
    path: "classroom",
    populate: {
      path: "homeroomteacher",
    },
  });

  if (!student)
    return res.json({
      success: false,
      message: "student not found, with the given username",
    });

  const checkQrcode = await validateQrcode(qrcode);

  if (!checkQrcode.success) return res.json(checkQrcode);

  if (student.isPresentToday.in)
    return res.json({ success: false, message: "Kamu sudah absen hari ini!" });

  const updatePresence = await Student.updateOne(
    { nisn: nisn },
    {
      $push: { presence: { desc: "present" } },
      $set: { "isPresentToday.in": true },
    }
  );

  return res.json({
    ...updatePresence,
    success: true,
    message: "Student successfully present today.",
  });
};
