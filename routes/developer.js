const express = require("express");
const router = express.Router();
const { getDevelopers } = require("../controllers/developer");

router.get("/get-developers", getDevelopers);

module.exports = router;
