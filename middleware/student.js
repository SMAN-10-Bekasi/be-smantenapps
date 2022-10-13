const { check, validationResult } = require("express-validator");

exports.studentValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({ success: false, message: error });
};

exports.validateStudentSignIn = [
  check("nisn")
    .trim()
    .not()
    .isEmpty()
    .withMessage("username / password is required!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("username / password is required!"),
];
