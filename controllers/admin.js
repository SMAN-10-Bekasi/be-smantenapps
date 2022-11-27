const Admin = require("../models/admin");
const Student = require("../models/student");

const jwt = require("jsonwebtoken");

exports.createAdmin = async (req, res) => {
  const { username, fullname, password, phonenumber, avatar } = req.body;
  try {
    const admin = await Admin({
      username,
      fullname,
      password,
      phonenumber,
      avatar,
    });
    await admin.save();
    res.json(admin);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.getAdminInfo = async (req, res) => {
  if (!req.admin) {
    return res.json({ success: false, message: "unauthorized access!" });
  }

  const admin = await Admin.findOne({ username: req.query.username });

  if (!admin)
    return res.json({
      success: false,
      message: "admin not found, with the given username",
    });

  const adminInfo = {
    fullname: admin.fullname,
    username: admin.username,
    phonenumber: admin.phonenumber,
    avatar: admin.avatar ? admin.avatar : "",
  };

  return res.json({ success: true, admin: adminInfo });
};

exports.adminSignIn = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (!admin)
    return res.json({
      success: false,
      message: "admin not found, with the given username",
    });

  const isMatch = await admin.comparePassword(password);

  if (!isMatch)
    return res.json({
      success: false,
      message: "username / password does not match!",
    });

  const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  const adminInfo = {
    fullname: admin.fullname,
    username: admin.username,
    classroom: admin.classroom,
    avatar: admin.avatar ? admin.avatar : "",
  };

  res.json({ success: true, admin: adminInfo, token });
};

exports.getStudentInfo_Admin = async (req, res) => {
  if (!req.admin) {
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
    isPresentToday: student.isPresentToday,
    motherphonenumber: student.motherphonenumber,
    avatar: student.avatar ? student.avatar : "",
  };

  return res.json({ success: true, student: studentInfo });
};
