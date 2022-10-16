const express = require("express");

const router = express.Router();
const { createStudent, studentSignIn } = require("../controllers/student");
const { isAuth } = require("../middleware/auth");
const {
  validateStudentSignIn,
  studentValidation,
} = require("../middleware/student");
const Student = require("../models/student");

router.post("/create-student", createStudent);

router.post(
  "/sign-in",
  validateStudentSignIn,
  studentValidation,
  studentSignIn
);

router.post("/create-post", isAuth, (req, res) => {
  res.send("private bro");
});

router.get("/get-student", isAuth, async (req, res) => {
  if (!req.student) {
    return res.json({ success: false, message: "unauthorized access!" });
  }

  const student = await Student.findOne({ nisn: req.query.nisn }).populate({
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

  const studentInfo = {
    fullname: student.fullname,
    nisn: student.nisn,
    classroom: student.classroom,
    presence: student.presence,
    avatar: student.avatar ? student.avatar : "",
  };

  return res.json({ success: true, student: studentInfo });
});

module.exports = router;
