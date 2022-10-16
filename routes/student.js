const express = require("express");
const router = express.Router();
const { getQrcode } = require("../controllers/qrcode");
const {
  createStudent,
  studentSignIn,
  getStudentInfo,
} = require("../controllers/student");
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

router.get("/get-student", isAuth, getStudentInfo);

router.get("/get-qrcode", isAuth, getQrcode);

module.exports = router;
