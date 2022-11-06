const express = require("express");
const router = express.Router();
const { getDevelopers } = require("../controllers/developer");
const { isAuth } = require("../middleware/auth");
const developer = require("../models/developer");

router.get("/get-developers", getDevelopers);

module.exports = router;
