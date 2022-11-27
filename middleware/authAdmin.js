const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

exports.isAuthAdmin = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      const admin = await Admin.findById(decode.userId);
      if (!admin) {
        return res.json({ success: false, message: "unauthorized access!" });
      }

      req.admin = admin;
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
