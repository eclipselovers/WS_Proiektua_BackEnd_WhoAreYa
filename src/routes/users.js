const express = require("express");
const { getMainUser, postLogout } = require("../controllers/userController");

const router = express.Router();

router.get("/", getMainUser);

router.post('/logout', postLogout)

module.exports = router;
