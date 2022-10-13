const express = require("express");

const router = express.Router();
const { createStudent, studentSignIn } = require("../controllers/student");
const { isAuth } = require("../middleware/auth");
const {
  validateStudentSignIn,
  studentValidation,
} = require("../middleware/student");

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
router.get("/get-student", isAuth, (res, req) => {
  if (!req.student) {
    return res.json({ success: false, message: "unauthorized access!" });
  }

  // return res.json({
  //   success: true,
  //   profile: {
  //     fullname: req.student.fullname,
  //     nisn: req.student.nisn,
  //   },
  // });
});

module.exports = router;
