const express = require("express");
const router = express.Router();
const { getQrcode } = require("../controllers/qrcode");
const {
  createStudent,
  studentSignIn,
  getStudentInfo,
  studentPresent,
} = require("../controllers/student");
const { isAuth } = require("../middleware/authStudent");
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

router.post("/student-present", isAuth, studentPresent);
router.get("/get-student", isAuth, getStudentInfo);

module.exports = router;
