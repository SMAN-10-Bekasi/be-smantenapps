const express = require("express");
const router = express.Router();
const {
  createAdmin,
  adminSignIn,
  getAdminInfo,
  getStudentInfo_Admin,
} = require("../controllers/admin");
const { isAuthAdmin } = require("../middleware/authAdmin");
const { validateAdminSignIn, adminValidation } = require("../middleware/admin");
const Admin = require("../models/admin");

router.post("/create-admin", createAdmin);
router.post(
  "/sign-in-admin",
  validateAdminSignIn,
  adminValidation,
  adminSignIn
);
router.get("/get-admin", isAuthAdmin, getAdminInfo);
router.get("/get-student-admin", isAuthAdmin, getStudentInfo_Admin);

module.exports = router;
