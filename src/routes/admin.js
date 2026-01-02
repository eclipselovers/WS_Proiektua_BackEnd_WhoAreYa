const express = require("express");
const { getMainAdmin } = require("../controllers/adminController");
const {isAdmin, isAuthenticated} = require("../middlewares/auth");

const router = express.Router();

router.get("/", isAuthenticated,isAdmin ,getMainAdmin);


module.exports = router;
