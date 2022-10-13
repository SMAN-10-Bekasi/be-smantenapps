const Student = require("../models/student");

const jwt = require("jsonwebtoken");
exports.createStudent = async (req, res) => {
  const {
    fullname,
    nisn,
    password,
    classroom,
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
      password,
      classroom,
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

exports.studentSignIn = async (req, res) => {
  const { nisn, password } = req.body;
  const student = await Student.findOne({ nisn });

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
    avatar: student.avatar ? student.avatar : "",
  };

  res.json({ success: true, student: studentInfo, token });
};
