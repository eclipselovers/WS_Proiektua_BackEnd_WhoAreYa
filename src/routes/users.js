const express = require("express");
const { getMainUser, getLogout } = require("../controllers/userController");
const {isAuthenticated} = require("../middlewares/auth");

const router = express.Router();

router.get("/", isAuthenticated,getMainUser);

router.get('/logout', isAuthenticated, getLogout)

module.exports = router;
