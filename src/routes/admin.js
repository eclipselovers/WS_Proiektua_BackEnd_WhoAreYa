const express = require("express");
const { getMainAdmin, getNewPlayerForm, getEditPlayerForm } = require("../controllers/adminController");
const {isAdmin, isAuthenticated} = require("../middlewares/auth");

const router = express.Router();

router.get("/", isAuthenticated,isAdmin ,getMainAdmin);

router.get("/players/new", isAuthenticated, isAdmin, getNewPlayerForm);

router.get("/players/edit/:id", isAuthenticated, isAdmin, getEditPlayerForm);


module.exports = router;
