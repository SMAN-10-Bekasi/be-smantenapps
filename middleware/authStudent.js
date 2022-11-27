const jwt = require("jsonwebtoken");
const Student = require("../models/student");

exports.isAuth = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      const student = await Student.findById(decode.userId);
      if (!student) {
        return res.json({ success: false, message: "unauthorized access!" });
      }

      req.student = student;
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        res.json({ success: false, message: "unauthorized access!" });
      }
      if (error.name === "TokenExpiredError") {
        res.json({ success: false, message: "session expired try sign in!" });
      }

      res.json({ success: false, message: "Internal server error!" });
    }
  } else {
    res.json({ success: false, message: "unauthorized access!" });
  }
};
