const express = require("express");
const { getMain } = require("../controllers/indexController");

const router = express.Router();

router.get("/", getMain);

module.exports = router;
