const express = require("express");
const { getMainUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", getMainUser);

module.exports = router;
