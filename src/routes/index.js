const express = require("express");
const { getMain, getLogin, getRegister, postLogin, postRegister } = require("../controllers/indexController");

const router = express.Router();

router.get("/", getMain);

router.get("/login", getLogin);

router.post("/login", postLogin);

router.get("/register", getRegister);

router.post("/register", postRegister);

module.exports = router;
