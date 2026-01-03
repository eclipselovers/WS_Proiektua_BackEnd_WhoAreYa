const express = require("express");
const { body } = require('express-validator');
const { getAllPlayers, getPlayer, createPlayer, updatePlayer, deletePlayer } = require("../controllers/playersController");
const {isAdmin, isAuthenticated} = require("../middlewares/auth");
const { playerValidators, playerValidatorsForUpdate, validateRequest } = require("../middlewares/errorHandler");

const router = express.Router();

// Public read endpoints
router.get("/", getAllPlayers);
router.get("/:id", getPlayer);

// Protected write endpoints
router.post("/", isAuthenticated, isAdmin, playerValidators, validateRequest, createPlayer);
router.put("/:id", isAuthenticated, isAdmin, playerValidatorsForUpdate, validateRequest, updatePlayer);
router.delete("/:id", isAuthenticated, isAdmin, deletePlayer);

module.exports = router;
