const express = require("express");
const { getMainAdmin } = require("../controllers/adminController");

const router = express.Router();

router.get("/", getMainAdmin);


module.exports = router;
